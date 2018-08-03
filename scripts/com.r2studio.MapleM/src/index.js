// ===== developer global config start =====
var wh = getScreenSize();
var gUserScreenWidth = wh.width;
var gUserScreenHeight = wh.height;
var gDevScreenWidth = 1920;
var gDevScreenHeight = 1080;
var gTargetWidth = 800;
var gTargetHeight = 450;
var gDevToResizeRatio = 1/2.4;
var gGameWidth = gUserScreenWidth;
var gGameHeight = gUserScreenHeight;
var gGameOffsetX = 0;
var gGameOffsetY = 0;
if (gUserScreenWidth / gUserScreenHeight > 1.777778) {
  gGameWidth = Math.round(gGameHeight * 1.777778);
  gGameOffsetX = (gUserScreenWidth - gGameWidth) / 2;
} else if (gUserScreenWidth / gUserScreenHeight < 1.777778) {
  gGameHeight = Math.round(gGameWidth / 1.777778);
  gGameOffsetY = (gUserScreenHeight - gGameHeight) / 2;
}
var gDevToUserRatio = gGameWidth / gDevScreenWidth;
// ===== developer global config end =====

// ===== init robotmon and basic functions =====
var robotmon = new Robotmon();

function stop() {
  robotmon.stop();
}

function start() {

}

// ===== game features =====

// ===== game pages =====
var gamePage = new Page("gamePage");
gamePage.onPage = function(img) {
  // var img = this.onScreenshot();
  // var isFeature = fInGamePage.checkColor();
  // releaseImage(img);
  // console.log(isFeature);
  return true;
};
gamePage.onInit = function() {
};
gamePage.onEnter = function() {
  this.context.debug('Enter', this.name);
};
gamePage.onExit = function() {
  this.context.debug('Exit', this.name);
};
gamePage.onScreenshot = function() {
  return getScreenshotModify(gGameOffsetX, gGameOffsetY, gGameWidth, gGameHeight, gTargetWidth, gTargetHeight, 90);
};
gamePage.onDevToUserXY = function(devX, devY) {
  var x = gGameOffsetX + devX * gDevToUserRatio;
  var y = gGameOffsetY + devY * gDevToUserRatio;
  return {x: x, y: y};
}
gamePage.onDevToResizeXY = function(devX, devY) {
  var x = devX * gDevToResizeRatio;
  var y = devY * gDevToResizeRatio;
  return {x: x, y: y};
}

// ===== game tasks =====
var goInToGameTask = new Task("gamePage", "goInToGameTask");
goInToGameTask.onTask = function(img) {
  return true;
};
goInToGameTask.onInit = function() {};
goInToGameTask.onEnter = function() {
  this.context.debug('Enter', this.name);
};
goInToGameTask.onExit = function() {
  this.context.debug('Exit', this.name);
};
goInToGameTask.onRun = function() {
  
};

// var updateStatusTask = new Task("gamePage", "updateStatus");
// updateStatusTask.onTask = function(img) {
//   return false;
// };
// updateStatusTask.onInit = function() {};
// updateStatusTask.onEnter = function() {
//   this.context.debug('Enter', this.name);
// };
// updateStatusTask.onExit = function() {
//   this.context.debug('Exit', this.name);
// };
// updateStatusTask.onRun = function() {
//   // var hp = this.getHP();
//   // var mp = this.getMP();
//   // this.expChanged();
//   // this.isAutoOn();
//   // console.log('time', hp, mp);
//   // var region = this.inRegion();
//   // this.context.debug(region);
//   this.isMenuOn();
// };

// ===== developer test utils =====
function getScreenColorByPoint(p) {
  var img = gamePage.onScreenshot();
  var xy = gamePage.onDevToResizeXY(p.x, p.y);
  var c = getImageColor(img, xy.x, xy.y);
  var s = Colors.identityScore(p, c).toFixed(3);
  console.log("new Point("+p.x.toFixed(0)+", "+p.y.toFixed(0)+", "+c.r+", "+c.g+", "+c.b+", true, "+s+");");
  releaseImage(img);
}

function getScreenColorByFeature(f) {
  var img = gamePage.onScreenshot();
  for (var i = 0; i < f.points.length; i++) {
    var p = f.points[i];
    var xy = gamePage.onDevToResizeXY(p.x, p.y);
    var c = getImageColor(img, xy.x, xy.y);
    var s = Colors.identityScore(p, c).toFixed(3);
    console.log("new Point("+p.x.toFixed(0)+", "+p.y.toFixed(0)+", "+c.r+", "+c.g+", "+c.b+", true, "+s+");");
  }
  releaseImage(img);
}

var mapleNews1 = new Point(1740, 96, 254, 255, 248, true, 0.960);
var mapleNews2 = new Point(1718, 74, 245, 247, 242, true, 0.960);
var mapleNews3 = new Point(1738, 72, 24, 27, 20, true, 0.960);
var fMapleNews = new Feature("fMapleNews", [
  mapleNews1, mapleNews2, mapleNews3
]);


// ===== robotmon register =====
// robotmon.registAll();
// robotmon.start();

// getScreenColorByFeature(fMapleNews);
robotmon.addTask(gamePage, goInToGameTask);

robotmon.start();