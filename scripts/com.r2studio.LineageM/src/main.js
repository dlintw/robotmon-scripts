// == Global variables start
// -- screen info
const _wh = getScreenSize();
const gDevWidth = 1920;
const gDevHeight = 1080;
const gTargetWidth = 960;
const gTargetHeight = 540;
const gDeviceWidth = Math.max(_wh.width, _wh.height);
const gDeviceHeight = Math.min(_wh.width, _wh.height);
let gGameWidth = gDeviceWidth;
let gGameHeight = gDeviceHeight;
let gGameOffsetX = 0;
let gGameOffsetY = 0;
if (gDeviceWidth / gDeviceHeight > 1.78) {
  gGameWidth = Math.round(gGameHeight * 1.777778);
  gGameOffsetX = (gDeviceWidth - gGameWidth) / 2;
} else if (gDeviceWidth / gDeviceHeight < 1.77) {
  gGameHeight = Math.round(gGameWidth / 1.777778);
  gGameOffsetY = (gDeviceHeight - gGameHeight) / 2;
}
const gRatioTarget = gTargetWidth / gDevWidth;
const gRatioDevice = gGameWidth / gDevWidth;
// -- others
const gZeroColor = {r: 0, g: 0, b: 0};
// == Global variables en

// Utils for sending message
let gUserPlan = -1;
let gLastSendingTime = 0;

class Utils {
  static checkCanSendMessage() {
    gUserPlan = -1;
    if (getUserPlan !== undefined && sendNormalMessage !== undefined) {
      gUserPlan = getUserPlan();
    }
  }
  static canSendMessage() {
    if (gUserPlan == -1) { return; }
    const during = Date.now() - gLastSendingTime;
    if (gUserPlan >= 0 && during > 60 * 60 * 1000) {
      return true;
    }
  }
  static sendMessage(topMsg, msg, force) {
    if (force || Utils.canSendMessage()) {
      gLastSendingTime = Date.now();
      if (force) {
        console.log(sendUrgentMessage(topMsg, msg));
      } else {
        console.log(sendNormalMessage(topMsg, msg));
      }
    }
  }
  static nearColor(c, c1, c2) {
    const d1 = Math.abs(c1.r - c.r) + Math.abs(c1.g - c.g) + Math.abs(c1.b - c.b);
    const d2 = Math.abs(c2.r - c.r) + Math.abs(c2.g - c.g) + Math.abs(c2.b - c.b);
    return d1 - d2;
  }
  static mergeColor(c1, c2) {
    return {
      r: Math.round((c1.r + c2.r) / 2),
      g: Math.round((c1.g + c2.g) / 2),
      b: Math.round((c1.b + c2.b) / 2),
    };
  }
  static diffColor(c, c1) {
    return Math.abs(c1.r - c.r) + Math.abs(c1.g - c.g) + Math.abs(c1.b - c.b);
  }
  static minMaxDiff(c) {
    const max = Math.max(Math.max(c.r, c.g), c.b);
    const min = Math.min(Math.min(c.r, c.g), c.b);
    return max - min;
  }
  static isSameColor(c1, c2, d = 25) {
    if (Math.abs(c1.r - c2.r) < d && Math.abs(c1.g - c2.g) < d && Math.abs(c1.b - c2.b) < d) {
      return true;
    }
    return false;
  }
  static targetToDevice(xy) {
    const r = gRatioDevice / gRatioTarget;
    return {x: gGameOffsetX + xy.x * r, y: gGameOffsetY + xy.y * r};
  }
}
Utils.checkCanSendMessage();
class Rect {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.w = x2 - x1;
    this.h = y2 - y1;
    this.tx = this.x1 * gRatioTarget;
    this.ty = this.y1 * gRatioTarget;
    this.tw = (this.x2 - this.x1) * gRatioTarget;
    this.th = (this.y2 - this.y1) * gRatioTarget; 
  }
  crop(img) {
    return cropImage(img, this.tx, this.ty, this.tw, this.th);
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tx = this.x * gRatioTarget;
    this.ty = this.y * gRatioTarget;
    this.dx = gGameOffsetX + this.x * gRatioDevice;
    this.dy = gGameOffsetY + this.y * gRatioDevice;
  }
  tap(times = 1, delay = 0) {
    while(times > 0) {
      if (delay > 0) {
        sleep(delay);
      }
      tap(this.dx, this.dy, 20);
      times--;
    }
  }
  tapDown() {
    tapDown(this.dx, this.dy, 20);
  }
  tapUp() {
    tapUp(this.dx, this.dy, 20);
  }
  moveTo() {
    moveTo(this.dx, this.dy, 20);
  }
}

class FeaturePoint extends Point {
  // need: true => should exist, false => should not exist
  constructor(x, y, r, g, b, need, diff = 25) {
    super(x, y);
    this.r = r;
    this.g = g;
    this.b = b;
    this.d = diff;
    this.need = need;
  }
  check(img) {
    const c = getImageColor(img, this.tx, this.ty);
    if (this.need && !Utils.isSameColor(c, this, this.d)) {
      return false;
    } else if (!this.need && Utils.isSameColor(c, this)) {
      return false;
    }
    return true;
  }
  print(img) {
    const c = getImageColor(img, this.tx, this.ty);
    console.log('target', this.tx, this.ty, 'param', `${this.x}, ${this.y}, ${c.r}, ${c.g}, ${c.b}, true`);
  }
}

class PageFeature {
  constructor(name, featurPoints) {
    this.name = name || 'Unknown';
    this.featurPoints = featurPoints || [];
  }
  check(img) {
    for (let i = 0; i < this.featurPoints.length; i++) {
      const p = this.featurPoints[i];
      if (!p.check(img)) {
        return false;
      }
    }
    return true;
  }
  print(img) {
    for (let i = 0; i < this.featurPoints.length; i++) {
      const p = this.featurPoints[i];
      p.print(img);
    }
  }
  tap(idx = 0) {
    this.featurPoints[idx].tap(); 
  }
}

class GameInfo {
  constructor() {
    this.hpBarRect = new Rect(122, 30, 412, 51);
    this.mpBarRect = new Rect(122, 58, 412, 72);
    this.expBarRect = new Rect(16, 1070, 1904, 1072);
    this.zeroRect = new Rect(0, 0, 1, 1);
    this.mapRect = new Rect(384, 217, 1920, 937); // 1536, 720
    this.regionTypeRect = new Rect(1710, 470, 1816, 498);
    this.storeHpRect = new Rect(94, 276, 94 + 100, 276 + 100);
    this.mapSelector = new Rect(56, 339, 350, 937); // h 112
    this.moneyRect = new Rect(990, 40, 1150, 80);
    this.centerRect = new Rect(600, 200, 1400, 800);

    this.storeOther = new Point(510, 220);
    this.store10 = new Point(670, 970);
    this.store100 = new Point(900, 970);
    this.store1000 = new Point(1100, 970);
    this.storeMax = new Point(1300, 970);
    this.storeHp = new Point(150, 330);
    this.storeArrow = new Point(260, 560);
    this.storeBuy = new Point(1600, 970);
    this.storeBuy2 = new Point(1130, 882);
    this.getReward = new Point(1680, 320);
    this.signAlliance = new Point(1820, 252);

    this.itemBtns = [
      new Point(810, 960),
      new Point(930, 960),
      new Point(1050, 960),
      new Point(1180, 960),
      new Point(1440, 960),
      new Point(1560, 960),
      new Point(1690, 960),
      new Point(1810, 960),
      new Point(1310, 960), // special skills
    ];

    this.unknownBtn = new Point(1100, 800);

    this.mapBtn = new Point(1740, 300);
    this.mapDetailBtn = new Point(700, 160);
    this.mapController = new Point(290, 860);
    this.mapControllerL = new Point(190, 860);
    this.mapControllerR = new Point(390, 860);
    this.mapControllerT = new Point(290, 760);
    this.mapControllerB = new Point(290, 960);
    this.mapMoveBtn = new Point(1588, 986);
    this.mapFloorBtn = new Point(1120, 886);

    this.storeMode = new PageFeature('storeMode', [
      new FeaturePoint(184, 956, 212, 192, 139, true, 32),
      new FeaturePoint(220, 984, 15, 14, 10, true, 20),
      new FeaturePoint(208, 982, 233, 227, 205, true, 20),
    ]);
    this.menuOffEvent = new PageFeature('menuOffEvent', [
      new FeaturePoint(1850, 56, 173, 166, 147, true, 80),
      new FeaturePoint(1850, 66, 173, 166, 147, true, 80),
      new FeaturePoint(1860, 76, 173, 166, 147, true, 80),
      new FeaturePoint(1880, 42, 242, 30, 26, true, 30),
    ]);
    this.menuSign = new PageFeature('menuOpenSign', [
      new FeaturePoint(1652, 250, 242, 30, 26, true, 80),
    ]);
    this.menuMail = new PageFeature('menuOpenMail', [
      new FeaturePoint(1538, 466, 242, 30, 26, true, 80),
    ]);
    this.menuAlliance = new PageFeature('menuOpenAlliance', [
      new FeaturePoint(1418, 360, 242, 30, 26, true, 80),
    ]);

    this.menuOnBtn = new PageFeature('menuOn', [
      new FeaturePoint(1844, 56, 245, 245, 241, true, 30),
      new FeaturePoint(1844, 66, 128, 70, 56, true, 30),
      new FeaturePoint(1844, 76, 245, 220, 215, true, 30),
    ]);
    this.menuOffBtn = new PageFeature('menuOff', [
      new FeaturePoint(1850, 56, 173, 166, 147, true, 80),
      new FeaturePoint(1850, 66, 173, 166, 147, true, 80),
      new FeaturePoint(1860, 76, 173, 166, 147, true, 80),
    ]);
    this.autoPlayBtn = new PageFeature('autoPlayOff', [
      new FeaturePoint(1430, 768, 140, 154, 127, true, 60),
      new FeaturePoint(1476, 772, 140, 157, 130, true, 60),
    ]);
    this.killNumber = new PageFeature('killNumber', [
      new FeaturePoint(1678, 538, 65, 62, 45, true, 60),
      new FeaturePoint(1780, 554, 235, 83, 44, true, 40),
      new FeaturePoint(1810, 554, 220, 59, 39, true, 40),
      new FeaturePoint(1804, 532, 255, 186, 142, true, 40),
    ]);
    this.selfSkillBtn = new PageFeature('selfSkillOff', [
      new FeaturePoint(1594, 601, 141, 147, 137, true, 60),
      new FeaturePoint(1591, 624, 117, 128, 114, true, 60),
    ]);
    this.attackBtn = new PageFeature('attackOff', [
      new FeaturePoint(1634, 769, 165, 180, 170, true, 60),
    ]);
    this.disconnectBtn = new PageFeature('disconnect', [
      new FeaturePoint(840, 880, 34, 51, 79, true, 20),
      new FeaturePoint(1080, 880, 34, 51, 79, true, 20),
      new FeaturePoint(1170, 880, 31, 20, 14, true, 20),
      new FeaturePoint(1150, 916, 31, 24, 14, true, 20),
    ]);
    this.loginBtn = new PageFeature('login', [
      new FeaturePoint(335, 310, 236, 175, 110, true, 40),
      new FeaturePoint(430, 415, 161, 123, 78, true, 40),
      new FeaturePoint(140, 145, 60, 55, 55, true, 40),
      new FeaturePoint(280, 191, 140, 100, 90, true, 40),
    ]);
    this.enterBtn = new PageFeature('enter', [
      new FeaturePoint(1480, 990, 31, 47, 70, true, 20),
      new FeaturePoint(1750, 990, 31, 47, 70, true, 20),
      new FeaturePoint(1690, 990, 31, 47, 70, true, 20),
    ]);
    this.beAttacked = new PageFeature('beAttacked', [
      new FeaturePoint(1616, 744, 210, 90, 50, true, 45),
      new FeaturePoint(1676, 744, 210, 90, 50, true, 45),
      new FeaturePoint(1666, 756, 210, 90, 50, true, 45),
      new FeaturePoint(1624, 750, 210, 90, 50, true, 45),
      new FeaturePoint(1800, 818, 240, 160, 140, true, 30),
      new FeaturePoint(1634, 769, 165, 180, 170, false, 50),
    ]);
    this.storeExceed = new PageFeature('storeExceed', [
      new FeaturePoint(1102, 812, 33, 23, 0, true, 40),
    ]);
  }
}

class RoleState {
  constructor(gi) {
    this.gi = gi;
    this.lastHP = 0;
    this.lastMP = 0;
    this.hp = 0;
    this.mp = 0;
    this.exp = 0;
    this.isDisconnect = false;
    this.isLogin = false;
    this.isEnter = false;
    this.isMenuOn = false;
    this.isMenuOff = false;
    this.lastSafeRegion = false;
    this.isSafeRegion = false;
    this.isAutoPlay = false;
    this.isAttacking = false;
    this.isSelfSkill = false;
    this.isAttacked = false;
    this.hasKillNumber = false;
    this.autoPlayOffCount = 0;
    this.isPoison = false;
  }

  print() {
    if (this.lastHP !== this.hp || this.lastMP !== this.mp) {
      console.log(`血量：${this.hp}，魔量：${this.mp}`);
      this.lastHP = this.hp;
      this.lastMP = this.mp;
    }
  }
}

class LineageM {
  constructor(config) {
    this.config = config || {conditions: []};
    this.gi = new GameInfo();
    this.rState = new RoleState(this.gi);
    this.localPath = getStoragePath() + `/scripts/com.r2studio.LineageM/images`
    this._loop = false;
    this._img = 0;

    this.refreshScreen();

    // load images
    this.images = {
      safeRegion: openImage(`${this.localPath}/safeRegionType.png`),
      normalRegion: openImage(`${this.localPath}/normalRegionType.png`),
      hpWater: openImage(`${this.localPath}/hp.png`),
      store: openImage(`${this.localPath}/store.png`),
      arrow: openImage(`${this.localPath}/arrow.png`),
      floor1: openImage(`${this.localPath}/floor1.png`),
      floor2: openImage(`${this.localPath}/floor2.png`),
    };
    // this.gi.menuOffEvent.print(this._img);
    this.tmpExp = 0;
    this.isRecordLocation = false;
  }

  safeSleep(t) {
    while(this._loop && t > 0) {
      t-=100;
      sleep(100);
    }
  }

  refreshScreen() {
    if (this._img !== 0) {
      releaseImage(this._img);
      this._img = 0;
    }
    const startTime = Date.now();
    this._img = getScreenshotModify(gGameOffsetX, gGameOffsetY, gGameWidth, gGameHeight, gTargetWidth, gTargetHeight, 80);
    if (Date.now() - startTime < 100) {
      sleep(100);
    }
    return this._img;
  }

  checkIsSystemPage() {
    if (this.rState.isLogin) {
      console.log('登入遊戲，等待 5 秒');
      this.gi.loginBtn.tap();
      this.safeSleep(5 * 1000);
      return true;
    }
    if (this.rState.isEnter) {
      console.log('進入遊戲，等待 10 秒');        
      this.gi.enterBtn.tap();
      this.safeSleep(10 * 1000);
      return true;
    }
    if (this.rState.isDisconnect) {
      console.log('重新連線中，等待 10 秒');
      this.gi.disconnectBtn.tap();
      this.safeSleep(10 * 1000);
      return true;
    }
    if (!this.rState.isMenuOn && !this.rState.isMenuOff) {
      console.log('未知狀態，隨便點看看，等待 3 秒');
      this.gi.enterBtn.tap();
      this.safeSleep(3 * 1000);

      this.refreshScreen();
      if (this.rState.isLogin) {
        console.log('登入遊戲，等待 5 秒');
        this.gi.loginBtn.tap();
        this.safeSleep(5 * 1000);
        return true;
      }

      console.log('未知狀態，等待 5 秒');
      keycode('BACK', 100);
      this.safeSleep(5 * 1000);
      return true;
    }
    return false;
  }

  checkBeAttacked() {
    if (this.config.beAttackedRandTeleport && this.gi.beAttacked.check(this._img)) {
      const c = getImageColor(this._img, this.gi.zeroRect.tx, this.gi.zeroRect.ty);
      if (c.r > (c.g + c.b) / 2) {
        console.log('警告！你被攻擊了，使用按鈕 7');
        this.gi.itemBtns[6].tap();
        this.safeSleep(2000);
        return true;
      }
    }
    return false;
  }

  updateGlobalState() {
    this.rState.isDisconnect = this.gi.disconnectBtn.check(this._img);
    this.rState.isLogin = this.gi.loginBtn.check(this._img);
    this.rState.isEnter = this.gi.enterBtn.check(this._img);
    if (this.rState.isDisconnect || this.rState.isLogin || this.rState.isEnter) {
      return;
    }
    this.rState.isMenuOn = this.gi.menuOnBtn.check(this._img);
    this.rState.isMenuOff = this.gi.menuOffBtn.check(this._img);
    // console.log(this.rState.isMenuOn, this.rState.isMenuOff);
    if (!this.rState.isMenuOn && !this.rState.isMenuOff) {
      return;
    }
    if (this.rState.isMenuOn) {
      return;
    }
    this.rState.hp = this.getHpPercent();
    if (this.rState.hp < 30 && this.rState.hp > 0.1) {
      sleep(300);
      this.refreshScreen();
      this.rState.hp = this.getHpPercent();
    }
    this.rState.mp = this.getMpPercent();
    // this.rState.exp = this.getExpPercent();
    this.rState.isSafeRegion = this.isSafeRegionState();
    this.rState.isAttacking = !this.gi.attackBtn.check(this._img);
    this.rState.isSelfSkill = !this.gi.selfSkillBtn.check(this._img);
    this.rState.hasKillNumber = this.gi.killNumber.check(this._img);
    if (this.gi.autoPlayBtn.check(this._img)) {
      this.rState.autoPlayOffCount++;
    } else {
      this.rState.autoPlayOffCount = 0;
    }
    if (this.rState.autoPlayOffCount > 4) {
      this.rState.isAutoPlay = false;
    } else {
      this.rState.isAutoPlay = true;
    }
    this.rState.print();
  }

  checkCondiction() {
    for(let i = 0; i < this.config.conditions.length && this._loop; i++) {
      const cd = this.config.conditions[i];
      if (cd.useTime === undefined) {
        cd.useTime = 0;
      }
      if (Date.now() - cd.useTime < cd.interval) {
        continue;
      }
      let value = this.rState[cd.type];
      if (value < 0.1) {
        continue;
      }
      if (cd.type === 'exp') {
        if (this.rState.exp !== this.tmpExp) {
          this.gi.itemBtns[cd.btn].tap(1, 50);
          console.log(`使用按鈕 ${cd.btn+1}，條件 ${cd.type} ${cd.op===1?'大於':'小於'} ${cd.value} (${value})`);
          cd.useTime = Date.now();
          break;
        }
      } else if (value * cd.op > cd.value * cd.op) {
        if (cd.btn >= 0 && cd.btn < this.gi.itemBtns.length) {
          if (cd.btn === 7 && this.rState.isSafeRegion && !this.rState.isAttacking) {
            continue;
          }
          this.gi.itemBtns[cd.btn].tap(1, 50);
          console.log(`使用按鈕 ${cd.btn+1}，條件 ${cd.type} ${cd.op===1?'大於':'小於'} ${cd.value} (${value})`);
          cd.useTime = Date.now();
          break;
        }
      }
    }
  }

  start() { 
    this._loop = true;
    let goBackTime = Date.now();
    let useHomeTime = Date.now();
    let poisonTime = 0;
    let isBuy = false;
    let receiveTime = 0;
    while(this._loop) {
      this.refreshScreen();
      if (this.checkBeAttacked()) {
        this.sendDangerMessage('你被攻擊了，使用順卷');
        continue;
      }
      this.updateGlobalState();
      if (this.checkIsSystemPage()) {
        continue;
      }
      if (this.rState.isMenuOn) {
        console.log('關閉選單');
        this.gi.menuOnBtn.tap();
        this.safeSleep(500);
        continue;
      }

      // go home (8th btn), rand teleport (7th btn)
      if (this.rState.isSafeRegion && !this.rState.isAttacking) {
        let isAttacking = true;
        for (let i = 0; i < 2; i++) {
          this.safeSleep(1000);
          this.refreshScreen();
          this.rState.isAttacking = !this.gi.attackBtn.check(this._img);
          if (!this.rState.isAttacking) {
            isAttacking = false;
            break;
          }
        }
        if (!isAttacking) {
          if (!isBuy && (this.config.autoBuyHp !== 0 || this.config.autoBuyArrow !== 0)) {
            this.checkAndBuyItems();
            isBuy = true;
          } else if (this.config.inHomeUseBtn && Date.now() - useHomeTime > 4000) {
            this.gi.itemBtns[6].tap();
            useHomeTime = Date.now();
          } else if (this.config.mapSelect > 0 && this.rState.hp > 40) {
            console.log('移動到地圖', this.config.mapSelect);
            this.goToMapPage();
            this.slideMapSelector(this.config.mapSelect);
          }
        }
      } else {
        isBuy = false;
        if (this.config.dangerousGoHome && this.rState.hp < 25 && this.rState.hp > 0.1) {
          this.gi.itemBtns[7].tap(1, 100);
          this.safeSleep(1000);
          console.log('危險，血量少於 25%，使用按鈕 8');
          this.sendDangerMessage('危險，血量少於25%，回家');
          continue;
        }
        if (!this.rState.isAutoPlay && this.config.autoAttack) {
          console.log('開啟自動攻擊');
          this.gi.autoPlayBtn.tap();
          this.rState.autoPlayOffCount = 0;
          continue;
        }
        if (this.config.autoUseAntidote && this.gi.isPoison && Date.now() - poisonTime > 1500) {
          console.log('中毒，使用解毒劑，使用按鈕 6');
          sleep(500);
          this.gi.itemBtns[5].tap();
          poisonTime = Date.now();
        }
      }

      // console.log('Check conditions');
      this.checkCondiction();

      if (this.config.autoReceiveReward && (Date.now() - receiveTime) > 300 * 1000) {
        this.checkAndAutoGetReward();
        receiveTime = Date.now();
      }

      this.sendMoneyInfo();

      if (this.rState.lastSafeRegion != this.rState.isSafeRegion) {
        this.rState.lastSafeRegion = this.rState.isSafeRegion;
        if (this.rState.lastSafeRegion) {
          console.log('安全區域');
        }
      }
      if (this.rState.isSafeRegion) {
        continue;
      }

      if (this.config.goBackInterval != 0 && !this.isRecordLocation) {
        console.log('記錄現在位置');
        this.goToMapPage();
        this.recordCurrentLocation();
        this.gi.menuOnBtn.tap();
        this.isRecordLocation = true;
        continue;
      }
      
      // go back to record location
      if (this.config.goBackInterval != 0 && Date.now() - goBackTime > this.config.goBackInterval) {
        console.log('嘗試走回紀錄點');
        this.goToMapPage();
        const diffXY = this.getDiffRecordLocation();
        this.gi.menuOnBtn.tap();
        sleep(1000);
        console.log(JSON.stringify(diffXY));
        if (diffXY !== undefined) {
          this.goMap(-diffXY.x, -diffXY.y);
        }
        goBackTime = Date.now();
      }
    }
  }

  waitForChangeScreen(score = 0.8, maxSleep = 10000) {
    const oriImg = clone(this._img);
    for(let i = 0; i < (maxSleep/500) && this._loop; i++) {
      sleep(400);
      this.refreshScreen();
      const s = getIdentityScore(this._img, oriImg);
      if (s < score) {
        break;
      }
    }
    releaseImage(oriImg);
  }

  goToMapPage() {
    this.gi.mapBtn.tap();
    this.waitForChangeScreen();
    this.gi.mapDetailBtn.tap();
    this.waitForChangeScreen(0.8, 2000);
    console.log('地圖畫面');
  }

  stop() {
    this._loop = false;
    releaseImage(this._img);
    for (let k in this.images) {
      releaseImage(this.images[k]);
    }
  }

  sendDangerMessage(msg) {
    console.log('送危險訊息中...');
    const centerImg = this.gi.centerRect.crop(this._img);
    const rmi = resizeImage(centerImg, this.gi.centerRect.w/2, this.gi.centerRect.h/2);
    const base64 = getBase64FromImage(rmi);
    releaseImage(rmi);
    releaseImage(centerImg);
    Utils.sendMessage('天堂M 危險', base64, true);
  }

  sendMoneyInfo() {
    if (Utils.canSendMessage()) {
      console.log('送錢訊息中...');
      const moneyImg = this.gi.moneyRect.crop(this._img);
      const rmi = resizeImage(moneyImg, this.gi.moneyRect.w/2, this.gi.moneyRect.h/2);
      const base64 = getBase64FromImage(rmi);
      releaseImage(rmi);
      releaseImage(moneyImg);
      Utils.sendMessage('天堂M', base64);
    }
  }

  checkAndBuyItems(tryTimes = 10) {
    console.log('嘗試購買物品');
    for (let i = 0; i < tryTimes && this._loop; i++) {
      if (i == 4) {
        console.log('移動到燃柳村莊，確保有商人');
        this.goToMapPage();
        this.slideMapSelector(36);
        this.safeSleep(4000);
      }
      if (this.findStore()) {  
        this.buyItems();
        this.refreshScreen();
        break;
      } else if (i < tryTimes - 1) {
        console.log('找不到商店，再試一次');
        this.gi.itemBtns[7].tap();
        this.safeSleep(4000);
        this.refreshScreen();
      }
    }
  }

  findStore() {
    const stores = findImages(this._img, this.images.store, 0.89, 4, true);
    for (let k in stores) {
      if (!this._loop) {return false;}
      const dXY = Utils.targetToDevice(stores[k]);
      tap(dXY.x + 5, dXY.y + 5, 50);
      this.waitForChangeScreen(0.95, 7000);if (!this._loop) {return false;}
      this.safeSleep(1000);
      if (this.gi.storeMode.check(this._img)) {
        this.gi.storeMode.tap();
        this.safeSleep(500);if (!this._loop) {return false;}
        this.refreshScreen();
        const testHpImg = this.gi.storeHpRect.crop(this._img);
        const s = getIdentityScore(this.images.hpWater, testHpImg);
        releaseImage(testHpImg);
        if (s > 0.9) {
          console.log('找到商店');
          return true;
        }
      }
      if (this.gi.menuOnBtn.check(this._img)) {
        this.gi.menuOnBtn.tap();
      }
      this.safeSleep(2000);
      continue;
    }
    return false;
  }

  buyItems() {
    if (this.config.autoBuyHp > 0) {
      this.gi.storeHp.tap();
      this.gi.store100.tap(Math.min(this.config.autoBuyHp, 10), 200);
    }
    sleep(500);if (!this._loop) {return false;}
    if (this.config.autoBuyArrow > 0) {
      this.gi.storeOther.tap();
      sleep(500);if (!this._loop) {return false;}
      this.refreshScreen();
      const arrowPos = findImage(this._img, this.images.arrow);
      if (arrowPos.score > 0.8) {
        const dXY = Utils.targetToDevice(arrowPos);
        tap(dXY.x + 5, dXY.y + 5, 50);
        this.gi.store1000.tap(Math.min(this.config.autoBuyArrow, 10), 200);
      }
    }
    sleep(500);if (!this._loop) {return false;}
    if (this.config.autoBuyHp === -1) {
      this.gi.storeHp.tap();
      this.gi.storeMax.tap();
    }
    sleep(500);if (!this._loop) {return false;}
    if (this.config.autoBuyArrow === -1) {
      this.gi.storeArrow.tap();
      this.gi.storeMax.tap();
    }
    this.safeSleep(500);if (!this._loop) {return false;}
    this.refreshScreen();if (!this._loop) {return false;}
    if (this.gi.storeExceed.check(this._img)) {
      console.log('購買物品');
      this.safeSleep(500);if (!this._loop) {return false;}
      this.gi.storeBuy.tap();
      this.safeSleep(500);if (!this._loop) {return false;}
      this.gi.storeBuy2.tap();
      this.safeSleep(1000);if (!this._loop) {return false;}
      this.gi.menuOnBtn.tap();
      return true;
    }
    console.log('超過負重，取消購買');
    this.gi.menuOnBtn.tap();
    return true;
  }

  // utils
  cropAndSave(filename, rect) {
    const img = rect.crop(this._img);
    saveImage(img, `${this.localPath}/lineageM/${filename}`);
    releaseImage(img);
  }

  // globalState
  isSafeRegionState() {
    const img = this.gi.regionTypeRect.crop(this._img);
    const safeScore = getIdentityScore(img, this.images.safeRegion);
    const normalScore = getIdentityScore(img, this.images.normalRegion);
    releaseImage(img);
    if (safeScore > normalScore) {
      return true;
    }
    return false;
  }

  checkAndAutoGetReward() {
    if (!this.gi.menuOffEvent.check(this._img)) {
      return;
    }
    this.gi.menuOffEvent.tap();
    this.waitForChangeScreen(0.95, 3000);
    if (!this._loop) {return;}
    if (this.gi.menuMail.check(this._img)) {
      console.log('自動收取獎勵：信箱');
      this.gi.menuMail.tap();
      this.waitForChangeScreen(0.9, 5000);
      if (!this._loop) {return;}
      this.gi.getReward.tap();this.safeSleep(1000);
      this.gi.getReward.tap();this.safeSleep(1000);
      this.gi.getReward.tap();this.safeSleep(1000);
      this.gi.menuOnBtn.tap();
      this.waitForChangeScreen(0.95, 5000);
    } 
    if (this.gi.menuSign.check(this._img)) {
      console.log('自動收取獎勵：登入');
      this.gi.menuSign.tap();
      this.waitForChangeScreen(0.95, 5000);
      if (!this._loop) {return;}
      this.gi.getReward.tap();this.safeSleep(500);
      this.safeSleep(5000);
      if (!this._loop) {return;}
      this.gi.getReward.tap();this.safeSleep(500);
      this.gi.menuOnBtn.tap();
      this.waitForChangeScreen(0.95, 5000);
    }
    if (this.gi.menuAlliance.check(this._img)) {
      console.log('自動收取獎勵：血盟');
      this.gi.menuAlliance.tap();
      this.waitForChangeScreen(0.9, 5000);
      if (!this._loop) {return;}
      this.gi.signAlliance.tap();
      this.safeSleep(3000);
      if (!this._loop) {return;}
      this.gi.menuOnBtn.tap();
      this.waitForChangeScreen(0.95, 5000);
    }
  }

  // HP MP EXP
  getHpPercent() {
    return this.getBarPercent(this.gi.hpBarRect, 70, 14, true);
  }

  getMpPercent() {
    return this.getBarPercent(this.gi.mpBarRect, 70, 70);
  }

  getExpPercent() {
    return this.getBarPercent(this.gi.expBarRect, 70, 70);
  }

  getBarPercent(barRect, b1, b2, poison = false) {
    const bar = cropImage(this._img, barRect.tx, barRect.ty, barRect.tw, barRect.th);
    const fc = Utils.mergeColor(getImageColor(bar, 0, y1), getImageColor(bar, 0, y2));
    const y1 = barRect.th / 3;
    const y2 = barRect.th / 3 * 2;
    let bright1 = 0;
    let bright2 = 0;
    for(let x = 0; x < barRect.tw; x += 1) {
      const c = Utils.mergeColor(getImageColor(bar, x, y1), getImageColor(bar, x, y2));
      const d = Utils.minMaxDiff(c);
      if (d > b1) {
        bright1++;
      }
      if (d > b2) {
        bright2++;
      }
    }
    releaseImage(bar);
    if (fc.g > fc.r) {
      if (poison) {
        this.gi.isPoison = true;
      }
      return (bright2 / barRect.tw * 100).toFixed(0);
    } else {
      if (poison) {
        this.gi.isPoison = false;
      }
      return (bright1 / barRect.tw * 100).toFixed(0);
    }
  }

  // MAP
  goMap(disX, disY) {
    const max = 20000;
    if (Math.abs(disX) < 30 && Math.abs(disY) < 30) {
      return;
    }
    let timeL = 3000; let timeR = 3000; let timeT = 3000; let timeB = 3000;
    if (disX >= 0 && disX > 30) {
      timeR += Math.min((1600 * Math.abs(disX) / 10), max);
    } else if (disX < 0 && disX < -30) {
      timeL += Math.min((1600 * Math.abs(disX) / 10), max);
    }
    if (disY >= 0 && disY > 30) {
      timeB += Math.min((1600 * Math.abs(disY) / 10), max);
    } else if (disY < 0 && disY < -30) {
      timeT += Math.min((1600 * Math.abs(disY) / 10), max);
    }
    const times = Math.ceil((timeL + timeR + timeT + timeB) / 24000);
    console.log('左', timeL, '右', timeR, '上', timeT, '下', timeB, times);
    const tl = Math.ceil(timeL / times);
    const tr = Math.ceil(timeR / times);
    const tt = Math.ceil(timeT / times);
    const tb = Math.ceil(timeB / times);
    this.gi.mapController.tapDown();
    for(let t = 0; t < times && this._loop; t++) {
      if (timeL > 100) {
        console.log('往左移動', tl);
        this.gi.mapControllerL.moveTo();
        this.gi.mapControllerL.moveTo();
        this.safeSleep(tl);
        timeL -= tl;
      }
      if (timeT > 100) {
        console.log('往上移動', tt);
        this.gi.mapControllerT.moveTo();
        this.gi.mapControllerT.moveTo();
        this.safeSleep(tt);
        timeT -= tt;
      }
      if (timeR > 100) {
        console.log('往右移動', tr);
        this.gi.mapControllerR.moveTo();
        this.gi.mapControllerR.moveTo();
        this.safeSleep(tr);
        timeR -= tr;
      }
      if (timeB > 100) {
        console.log('往下移動', tb);
        this.gi.mapControllerB.moveTo();
        this.gi.mapControllerB.moveTo();
        this.safeSleep(tb);
        timeB -= tb;
      }
    }
    this.gi.mapController.tapUp();
  }

  recordCurrentLocation() {
    const p = new Point(768, 360);
    const rect1 = new Rect(p.x - 120, p.y - 90, p.x - 30, p.y - 30); // left top
    const rect2 = new Rect(p.x + 30, p.y - 90, p.x + 120, p.y - 30); // right top
    const rect3 = new Rect(p.x - 120, p.y + 30, p.x - 30, p.y + 90); // left bottom
    const rect4 = new Rect(p.x + 30, p.y + 30, p.x + 120, p.y + 90); // right bottom
    const img1 = cropImage(this._img, rect1.tx, rect1.ty, rect1.tw, rect1.th);
    const img2 = cropImage(this._img, rect2.tx, rect2.ty, rect2.tw, rect2.th);
    const img3 = cropImage(this._img, rect3.tx, rect3.ty, rect3.tw, rect3.th);
    const img4 = cropImage(this._img, rect4.tx, rect4.ty, rect4.tw, rect4.th);
    saveImage(img1, this.localPath + '/mapRecord1.png');
    saveImage(img2, this.localPath + '/mapRecord2.png');
    saveImage(img3, this.localPath + '/mapRecord3.png');
    saveImage(img4, this.localPath + '/mapRecord4.png');
    releaseImage(img1); releaseImage(img2); releaseImage(img3); releaseImage(img4);
  }

  getDiffRecordLocation() {
    let result = undefined;
    for (let i = 0; i < 3; i++) {
      result = this.findDiffRecordLocation();
      if (result !== undefined) {
        break;
      }
      sleep(1000);
      this.refreshScreen();
    }
    if (result === undefined) {
      console.log('無法找到紀錄點');
      return {x: 0, y: 0};
    }
    return result;
  }

  findDiffRecordLocation() {
    const p = new Point(768, 360);
    const images = [
      openImage(this.localPath + '/mapRecord1.png'),
      openImage(this.localPath + '/mapRecord2.png'),
      openImage(this.localPath + '/mapRecord3.png'),
      openImage(this.localPath + '/mapRecord4.png'),
    ];
    const findXYs = [];
    for (let i = 0; i < images.length; i++) {
      if (images[i] === 0) {
        console.log('無法記錄地圖位置');
        return;
      }
      const xy = findImage(this._img, images[i]);
      switch(i) {
        case 0:
          xy.x = p.x - (xy.x / gRatioTarget) - 120;
          xy.y = p.y - (xy.y / gRatioTarget) - 90;
        break;
        case 1:
          xy.x = p.x - (xy.x / gRatioTarget) + 30;
          xy.y = p.y - (xy.y / gRatioTarget) - 90;
        break;
        case 2:
          xy.x = p.x - (xy.x / gRatioTarget) - 120;
          xy.y = p.y - (xy.y / gRatioTarget) + 30;
        break;
        case 3:
          xy.x = p.x - (xy.x / gRatioTarget) + 30;
          xy.y = p.y - (xy.y / gRatioTarget) + 30;
        break;
      }
      findXYs.push(xy);
      releaseImage(images[i]);
    }
    let finalXY = undefined;
    for (let i = 0; i < findXYs.length; i++) {
      let count = 0;
      for (let j = 0; j < findXYs.length; j++) {
        if (Math.abs(findXYs[i].x - findXYs[j].x) < 30 && Math.abs(findXYs[i].y - findXYs[j].y) < 30) {
          count++;
        }
      }
      if (count > 1) {
        finalXY = findXYs[i];
      }
    }
    if (finalXY !== undefined) {
      // console.log(JSON.stringify(findXYs));
      console.log(`位置相差 x：${finalXY.x}，y：${finalXY.y}`);
    }
    return finalXY;
  }

  slideMapSelector(nth) {
    const itemHeight = 112 * gRatioDevice; // dev 1920 * 1080 => device item height
    const sDCX = gGameOffsetX + (this.gi.mapSelector.x1 + this.gi.mapSelector.x2) / 2 * gRatioDevice;
    const sDCY = gGameOffsetY + this.gi.mapSelector.y1 * gRatioDevice;
    const itemsY = [
      sDCY + itemHeight * 0.5,
      sDCY + itemHeight * 1.5,
      sDCY + itemHeight * 2.5,
      sDCY + itemHeight * 3.5,
      sDCY + itemHeight * 4.5,
    ];
    // move to top
    const move2Top = () => {
      for (let i = 0; i < 3; i++) {
        tapDown(sDCX, itemsY[0], 10);
        tapUp(sDCX, itemsY[4], 10);
        sleep(1000);
      }
    };
    const move4down = () => {
      tapDown(sDCX, itemsY[4], 20);
      moveTo(sDCX, itemsY[4], 20);
      moveTo(sDCX, itemsY[3], 20);
      moveTo(sDCX, itemsY[2], 20);
      moveTo(sDCX, itemsY[1], 20);
      sleep(150);
      moveTo(sDCX, itemsY[0], 20);
      sleep(1500);
      tapUp(sDCX, itemsY[0], 20);
    };
    move2Top();
    sleep(500);
    for (let i = 0; i < Math.floor((nth-1)/4) && this._loop; i++) {
      move4down();
    }
    tap(sDCX, itemsY[(nth-1)%4], 20);
    sleep(500);
    
    this.refreshScreen();
    this.gi.mapMoveBtn.tap();
    this.waitForChangeScreen(0.92, 5000);
    this.safeSleep(3000); if (!this._loop) {return;}
    this.refreshScreen();
    const floorXY1 = findImage(this._img, this.images.floor1);
    if (floorXY1.score > 0.8) {
      const dXY = Utils.targetToDevice(floorXY1);
      tap(dXY.x + 5, dXY.y + 5, 50);
      sleep(1000);
      this.gi.mapFloorBtn.tap();
      sleep(1000);
      return;
    }
    const floorXY2 = findImage(this._img, this.images.floor2);
    if (floorXY2.score > 0.8) {
      const dXY = Utils.targetToDevice(floorXY2);
      tap(dXY.x + 5, dXY.y + 5, 50);
      sleep(1000);
      this.gi.mapFloorBtn.tap();
      sleep(1000);
      return;
    }
  }

  getImageNumber(img, numbers, maxLength = 8) {
    if (numbers.length != 10) {
      console.log('圖片數量應為 10');
      return 0;
    }
    let results = [];
    for (let i = 0; i < 10; i++) {
      const nImg = numbers[i];
      if (nImg == 0) {
        console.log(`圖片 ${i} 不存在`);
        return 0;
      }
      const rs = findImages(img, nImg, 0.95, maxLength, true);
      for (let k in rs) {
        rs[k].number = i;
        results.push(rs[k]);
      }
    }
    results.sort((a, b) => {return b.score - a.score;});
    results = results.slice(0, Math.min(maxLength, results.length));
    results.sort((a, b) => {return a.x - b.x;});
    const numberSize = getImageSize(numbers[0]);
    const nw = numberSize.width;
    const imgSize = getImageSize(img);
    const iw = imgSize.width;
    let px = 0;
    let numberStr = '';
    for(let i in results) {
      const r = results[i];
      if (r.x > p) {
        numberStr += r.number.toString();
        p = r.x - 2;
      }
    }
    console.log(`圖片大小為 ${numberStr}`);
    return numberStr;
  }
}

const DefaultConfig = {
  conditions: [
    // {type: 'hp', op: -1, value: 80, btn: 0, interval: 1000}, // if hp < 60% use 3th button, like 瞬移
    // {type: 'mp', op: 1, value: 50, btn: 1, interval: 1000}, // if hp < 30% use 8th button, like 回卷
    // {type: 'mp', op: -1, value: 80, btn: 2, interval: 2000}, // if hp < 75% use 4th button, like 高治
    // {type: 'mp', op: -1, value: 70, btn: 4, interval: 2000}, // if mp < 70% use 5th button, like 魂體
    // {type: 'mp', op:  1, value: 50, btn: 1, interval: 8000}, // if mp > 80% use th button, like 三重矢, 光箭, 火球等
  ],
  inHomeUseBtn: false, // if in safe region use 3th button, like 瞬移.
  beAttackedRandTeleport: true,
  dangerousGoHome: true, // if hp < 25%, go home, use button 8th
  autoAttack: false,
  autoReceiveReward: false,
  autoUseAntidote: false, // take an antidote for the poison, use six button
  goBackInterval: 0, // whether to go back to origin location, check location every n min
  autoBuyHp: 0, // 1 * 100, -1 => max
  autoBuyArrow: 0, // 1 * 1000, -1 => max
  mapSelect: 0, // move to nth map in safe region
};
 
let lm = undefined;

function start(config) {
  console.log('📢 啟動腳本 📢');
  if (typeof config === 'string') {
    config = JSON.parse(config);
  }
  if (lm !== undefined) {
    console.log('📢 腳本已啟動 📢');
    return;
  }
  lm = new LineageM(config);
  lm.start();
  lm.stop();
  lm = undefined;
  console.log('📢 腳本已停止 📢');
}

function stop() {
  if (lm == undefined) {
    return;
  }
  lm._loop = false;
  console.log('📢 停止腳本中 📢');
}

// start(DefaultConfig);
// lm = new LineageM(DefaultConfig);
// lm._loop=true;
// lm.goToMapPage();
// lm.slideMapSelector(5);
// lm.buyItems();
// lm.checkAndAutoGetReward();
// for (var i= 0; i < 1; i++) {
//   lm.refreshScreen();
//   const a = lm.gi.attackBtn.check(lm._img);
//   const b = lm.gi.killNumber.check(lm._img);
//   // lm.gi.killNumber.print(lm._img);
//   // console.log(b)
//   const c = lm.gi.autoPlayBtn.check(lm._img);
//   lm.gi.autoPlayBtn.print(lm._img);
//   console.log('attack Off', a, 'has kn', b, 'autoOff', c);
// }

// lm.findStore();
// for (let i = 0; i < 5; i++) {
//   const hp = lm.getHpPercent();
//   // const mp = lm.getMpPercent();
//   // const exp = lm.getExpPercent();
//   lm.refreshScreen();
//   console.log(hp);
// } 

// lm.checkAndBuyItems(1);
// lm.goToMapPage();
// const hp = lm.getHpPercent();
// const mp = lm.getMpPercent();
// const exp = lm.getExpPercent();
// console.log(hp, mp, exp);
// lm.goToMapPage();
// lm._loop = true;
// lm.recordCurrentLocation();
// var xy = lm.getDiffRecordLocation();
// lm.gi.menuOnBtn.tap();
// sleep(1000);
// lm.goMap(-xy.x, -xy.y);
// lm.cropAndSave('safeRegionType.png', lm.gi.regionTypeRect);
// lm.updateGlobalState();
// lm.stop();