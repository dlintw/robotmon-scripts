'use strict;';

var config = { // ref: DEFAULT_CONFIG in RBM-<version>.js
  appName: 'com.twpda.tsum',
  // global for this game
  isRunning: false,
  appOnChkPeriod: 500, // check per 0.5 s
  maxAppOffCount: 3, // continue 3 times off will trigger stop()
  packageName: 'com.linecorp.LGTMTMG',
  activityName: '.TsumTsum',
  chkPagePeriod: 100, // check per 0.1 second
  loopSleepMS: 100, // sleep per 0.1 second in main loop
  // loopSleepMS: 5000, // sleep per 5 second in main loop
  pageColors: [{ // sort by action sequence, y, x, comment with color, position, button
    /*
      name: 'BlueFrame',
      colors: [
        {x:983, y:160, b:228,g:189,r:31, match: true, threshold:80},
        {x:976, y:1945, b:58,g:52,r:7, match: true, threshold:80},
        {x:107, y:1943, b:231,g:195,r:28, match: true, threshold:80},
      ],
    },{
    */
    name: 'ChooseLanguage*',
    colors: [
      {x: 777, y: 208, r: 255, g: 255, b: 255, match: true, threshold: 60}, // white Language button left edge
      {x: 956, y: 212, r: 156, g: 158, b: 156, match: true, threshold: 60}, // gray Language button right triangle
      {x: 553, y: 1539, r: 247, g: 190, b: 16, match: true, threshold: 60}, // yellow to Start button's top
    ],
    back: {x: 553, y: 1539},
    next: {x: 553, y: 1539},
  }, {
    name: 'TodayMission',
    colors: [
      {x: 540, y: 1480, r: 238, g: 181, b: 12, match: true, threshold: 80},
      {x: 975, y: 500, r: 161, g: 224, b: 231, match: true, threshold: 80},
      {x: 554, y: 1332, r: 24, g: 189, b: 219, match: true, threshold: 80},
    ],
    back: {x: 558, y: 1473},
    next: {x: 558, y: 1473},
  }, {
    name: 'ScorePage*',
    colors: [
      {x: 774, y: 500, r: 243, g: 248, b: 242, match: true, threshold: 80}, // white score title
      {x: 302, y: 1581, r: 235, g: 184, b: 7, match: true, threshold: 60}, // yellow Close button
      {x: 777, y: 1588, r: 248, g: 142, b: 20, match: true, threshold: 80}, // orange Play button
    ],
    back: {x: 309, y: 1653},
    next: {x: 784, y: 1653},
  }, {
    name: 'FriendPage*',
    colors: [
      {x: 540, y: 1592, r: 246, g: 135, b: 17, match: true, threshold: 60}, // top of the start button
      {x: 187, y: 1599, r: 240, g: 218, b: 72, match: true, threshold: 60}, // top of the card button
      {x: 799, y: 1653, r: 232, g: 170, b: 7, match: true, threshold: 60}, // left of the myTsum button
      {x: 698, y: 464, r: 244, g: 249, b: 243, match: true, threshold: 60}, // left top of the ranking time
    ],
    back: {x: 547, y: 1653},
    next: {x: 547, y: 1653},
  }, {
    name: 'FriendPage2',
    colors: [
      {x: 540, y: 1649, r: 175, g: 188, b: 197, match: true, threshold: 60}, // center of the Tsum Hades
      {x: 187, y: 1599, r: 240, g: 218, b: 72, match: true, threshold: 60}, // top of the card button
      {x: 799, y: 1653, r: 232, g: 170, b: 7, match: true, threshold: 60}, // left of the myTsum button
      {x: 698, y: 464, r: 244, g: 249, b: 243, match: true, threshold: 60}, // left top of the ranking time
    ],
    back: {x: 547, y: 1653},
    next: {x: 547, y: 1653},
  }, {
    name: 'FriendPage3',
    colors: [
      {x: 540, y: 1649, r: 203, g: 192, b: 237, match: true, threshold: 80}, // center of the Tsum Ursula
      {x: 187, y: 1599, r: 240, g: 218, b: 72, match: true, threshold: 80}, // top of the card button
      {x: 799, y: 1653, r: 232, g: 170, b: 7, match: true, threshold: 80}, // left of the myTsum button
      {x: 698, y: 464, r: 244, g: 249, b: 243, match: true, threshold: 80}, // left top of the ranking time
    ],
    back: {x: 547, y: 1653},
    next: {x: 547, y: 1653},
  }, {
    name: 'FriendPage4',
    colors: [
      {x: 540, y: 1649, r: 79, g: 89, b: 94, match: true, threshold: 80}, // center of the Tsum Maleficentd
      {x: 187, y: 1599, r: 240, g: 218, b: 72, match: true, threshold: 80}, // top of the card button
      {x: 799, y: 1653, r: 232, g: 170, b: 7, match: true, threshold: 80}, // left of the myTsum button
      {x: 698, y: 464, r: 244, g: 249, b: 243, match: true, threshold: 80}, // left top of the ranking time
    ],
    back: {x: 547, y: 1653},
    next: {x: 547, y: 1653},
  }, {
    name: 'MailBox1*',
    colors: [
      {x: 738, y: 414, r: 240, g: 245, b: 239, match: true, threshold: 60}, // white mail box title
      {x: 604, y: 1419, r: 234, g: 171, b: 6, match: true, threshold: 60}, // yellow receive button
      {x: 550, y: 1581, r: 238, g: 187, b: 10, match: true, threshold: 60}, // yellow close button
    ],
    back: {x: 561, y: 1653},
    next: {x: 561, y: 1653},
  }, {
    name: 'ReceiveGiftHeart*',
    colors: [
      {x: 781, y: 447, r: 49, g: 49, b: 49, match: true, threshold: 60}, // dark white mail box title
      {x: 572, y: 561, r: 30, g: 193, b: 224, match: true, threshold: 80}, // blue top frame
      {x: 468, y: 803, r: 214, g: 61, b: 143, match: true, threshold: 100}, // red heart
      {x: 216, y: 1084, r: 233, g: 172, b: 6, match: true, threshold: 80}, // yellow Cancel button
      {x: 673, y: 1080, r: 235, g: 174, b: 8, match: true, threshold: 80}, // yellow OK button
      {x: 583, y: 1195, r: 28, g: 186, b: 221, match: true, threshold: 80}, // blue bottom frame
    ],
    back: {x: 774, y: 1095},
    next: {x: 320, y: 1091},
  }, {
    /* TODO
    name: 'ReceiveGiftAd*',
    colors: [
      {x: 781, y: 447, r: 49, g: 49, b: 49, match: true, threshold: 60}, // dark white mail box title
      {x: 560, y: 555, r: 33, g: 194, b: 230, match: true, threshold: 60}, // blue top frame
      {x: 468, y: 803, r: 214, g: 61, b: 143, match: false, threshold: 100}, // red heart(not ReceiveGiftHeart)
      {x: 209, y: 1092, r: 247, g: 178, b: 8, match: true, threshold: 60}, // left of yellow Cancel button
      {x: 668, y: 1092, r: 239, g: 174, b: 8, match: true, threshold: 60}, // left of yellow OK button
      {x: 583, y: 1195, r: 28, g: 186, b: 221, match: true, threshold: 80}, // blue bottom frame
    ],
    back: {x: 209, y: 1092},
    next: {x: 668, y: 1092},
  }, {
    */
    name: 'ReceiveGiftOther*',
    colors: [
      {x: 781, y: 447, r: 49, g: 49, b: 49, match: true, threshold: 60}, // dark white mail box title
      {x: 560, y: 555, r: 33, g: 194, b: 230, match: true, threshold: 60}, // blue top frame
      {x: 468, y: 803, r: 214, g: 61, b: 143, match: false, threshold: 100}, // red heart(not ReceiveGiftHeart)
      {x: 209, y: 1092, r: 247, g: 178, b: 8, match: true, threshold: 60}, // left of yellow Cancel button
      {x: 668, y: 1092, r: 239, g: 174, b: 8, match: true, threshold: 60}, // left of yellow OK button
      {x: 583, y: 1195, r: 28, g: 186, b: 221, match: true, threshold: 80}, // blue bottom frame
    ],
    back: {x: 209, y: 1092},
    next: {x: 668, y: 1092},
  }, {
    name: 'MailBox2',
    colors: [
      {x: 738, y: 414, r: 240, g: 245, b: 239, match: true, threshold: 80},
      {x: 550, y: 1581, r: 238, g: 187, b: 10, match: true, threshold: 80},
      {x: 619, y: 1426, r: 19, g: 137, b: 175, match: true, threshold: 80},
    ],
    back: {x: 561, y: 1653},
    next: {x: 561, y: 1653},
  }, {
    name: 'ReceiveHeart',
    colors: [
      {x: 208, y: 1080, r: 233, g: 172, b: 6, match: true, threshold: 80},
      {x: 662, y: 1080, r: 232, g: 171, b: 5, match: true, threshold: 80},
      {x: 561, y: 554, r: 28, g: 191, b: 222, match: true, threshold: 80},
      {x: 565, y: 1210, r: 30, g: 195, b: 225, match: true, threshold: 80},
      {x: 334, y: 817, r: 213, g: 62, b: 143, match: true, threshold: 90},
      {x: 586, y: 821, r: 248, g: 249, b: 51, match: true, threshold: 100},
    ],
    back: {x: 774, y: 1095},
    next: {x: 320, y: 1091},
  }, {
    name: 'Received',
    colors: [
      {x: 799, y: 716, r: 30, g: 188, b: 223, match: true, threshold: 80},
      {x: 806, y: 889, r: 45, g: 80, b: 122, match: true, threshold: 80},
      {x: 799, y: 1048, r: 27, g: 188, b: 217, match: true, threshold: 80},
    ],
    back: {x: 774, y: 1095},
    next: {x: 320, y: 1091},
  }, {
    name: 'Received2',
    colors: [
      {x: 799, y: 716, r: 30, g: 188, b: 223, match: true, threshold: 80},
      {x: 889, y: 824, r: 40, g: 72, b: 111, match: true, threshold: 80},
      {x: 799, y: 1048, r: 27, g: 188, b: 217, match: true, threshold: 80},
    ],
    back: {x: 774, y: 1095},
    next: {x: 320, y: 1091},
  }, {
    name: 'StartPage',
    colors: [
      {x: 752, y: 471, r: 244, g: 249, b: 243, match: true, threshold: 80},
      {x: 856, y: 1430, r: 30, g: 193, b: 224, match: true, threshold: 80},
      {x: 169, y: 1581, r: 239, g: 188, b: 11, match: true, threshold: 80},
      {x: 547, y: 1581, r: 235, g: 118, b: 134, match: true, threshold: 80},
      {x: 792, y: 1660, r: 234, g: 171, b: 8, match: true, threshold: 100},
    ],
    back: {x: 190, y: 1646},
    next: {x: 558, y: 1635},
  }, {
    name: 'ChooseBonusItem',
    colors: [
      {x: 153, y: 380, r: 222, g: 61, b: 148, match: true, threshold: 60}, // first red heart
      {x: 859, y: 380, r: 239, g: 174, b: 8, match: true, threshold: 60}, // message box
      {x: 545, y: 469, r: 255, g: 255, b: 255, match: true, threshold: 60}, // Bonus Items white title
      {x: 179, y: 1580, r: 247, g: 190, b: 16, match: true, threshold: 60}, // yellow Back button
      {x: 545, y: 1591, r: 230, g: 101, b: 123, match: true, threshold: 60}, // red Start button
      {x: 799, y: 1647, r: 239, g: 178, b: 8, match: true, threshold: 60}, // right yellow Tsum button
      {x: 1005, y: 1543, r: 173, g: 0, b: 0, match: true, threshold: 60}, // right bottom red box!
    ],
    back: {x: 179, y: 1580},
    next: {x: 545, y: 1591},
  }, {
    /* conflict with StartPage2
    name: 'StartPage3',
    colors: [
      {x: 400, y: 1672, r: 245, g: 85, b: 115, match: true, threshold: 80},
      {x: 680, y: 1672, r: 245, g: 85, b: 115, match: true, threshold: 80},
      {x: 540, y: 1722, r: 235, g: 70, b: 90, match: true, threshold: 80},
    ],
    back: {x: 190, y: 1646},
    next: {x: 558, y: 1635},
  }, {
    */
    /* replaced by TsumsMe & TsumsOther
    name: 'TsumsPage',
    colors: [
      {x: 514, y: 914, r: 41, g: 177, b: 203, match: true, threshold: 80},
      {x: 180, y: 1592, r: 238, g: 180, b: 11, match: true, threshold: 100},
      {x: 817, y: 1588, r: 238, g: 191, b: 13, match: true, threshold: 80},
    ],
    back: {x: 176, y: 1592},
    next: {x: 176, y: 1592},
  }, {
    */
    name: 'GamePause',
    colors: [
      {x: 165, y: 1077, r: 234, g: 173, b: 7, match: true, threshold: 80},
      {x: 594, y: 1073, r: 233, g: 171, b: 8, match: true, threshold: 80},
      {x: 367, y: 774, r: 24, g: 191, b: 225, match: true, threshold: 80},
      {x: 738, y: 612, r: 248, g: 244, b: 245, match: true, threshold: 80},
      {x: 550, y: 1336, r: 236, g: 182, b: 11, match: true, threshold: 80},
    ],
    back: {x: 331, y: 1080},
    next: {x: 561, y: 1422},
  }, {
    name: 'GamePlaying',
    colors: [
      // {x: 980, y: 258, r: 244, g: 197, b: 5, match: true, threshold: 60}, // right of pause
      {x: 916, y: 318, r: 230, g: 150, b: 6, match: true, threshold: 60}, // below pause
      {x: 916, y: 1688, r: 230, g: 150, b: 6, match: true, threshold: 60}, // below fan
      {x: 287, y: 1662, r: 0, g: 182, b: 230, match: true, threshold: 60}, // between mytsum and fever
    ],
    back: {x: 986, y: 273},
    next: {x: 986, y: 273},
  }, {
    /* conflict with GamePlaying
    name: 'GamePlaying2',
    colors: [
      {x: 980, y: 258, r: 244, g: 197, b: 5, match: true, threshold: 80}, // right of pause
      {x: 916, y: 1688, r: 230, g: 150, b: 6, match: true, threshold: 80}, // below fan
    ],
    back: {x: 986, y: 273},
    next: {x: 986, y: 273},
  }, {
    */
    name: 'MagicalTime',
    colors: [
      {x: 817, y: 507, r: 244, g: 249, b: 243, match: true, threshold: 80},
      {x: 594, y: 857, r: 248, g: 102, b: 121, match: true, threshold: 100},
      {x: 208, y: 1217, r: 236, g: 175, b: 9, match: true, threshold: 80},
      {x: 662, y: 1213, r: 232, g: 171, b: 5, match: true, threshold: 80},
    ],
    back: {x: 381, y: 1221},
    next: {x: 856, y: 1221},
  }, {
    name: 'NetworkDisable',
    colors: [
      {x: 478, y: 1080, r: 236, g: 94, b: 116, match: true, threshold: 80},
      {x: 932, y: 1077, r: 232, g: 171, b: 5, match: true, threshold: 80},
    ],
    back: {x: 885, y: 1080},
    next: {x: 885, y: 1084},
  }, {
    name: 'NetworkTimeout',
    colors: [
      {x: 478, y: 1080, r: 232, g: 171, b: 5, match: true, threshold: 80},
      {x: 932, y: 1077, r: 232, g: 171, b: 5, match: true, threshold: 80},
    ],
    back: {x: 885, y: 1084},
    next: {x: 885, y: 1084},
  }, { // FriendInfo of Friend Page, SocailAccount of Setting Page
    name: 'FriendInfo',
    colors: [
      {x: 565, y: 576, r: 31, g: 190, b: 220, match: true, threshold: 80},
      {x: 547, y: 1195, r: 27, g: 192, b: 222, match: true, threshold: 80},
      {x: 554, y: 1332, r: 238, g: 186, b: 12, match: true, threshold: 80},
    ],
    back: {x: 576, y: 1408},
    next: {x: 576, y: 1408},
  }, { // LevelUp and RankUp
    name: 'LevelUp',
    colors: [
      {x: 140, y: 1656, r: 233, g: 175, b: 6, match: true, threshold: 80}, // left of the close button
      {x: 450, y: 1656, r: 233, g: 175, b: 6, match: true, threshold: 80}, // right of the close button
      {x: 620, y: 1656, r: 233, g: 175, b: 6, match: true, threshold: 80}, // left of the share button
      {x: 930, y: 1656, r: 233, g: 175, b: 6, match: true, threshold: 80}, // right of the share button
    ],
    back: {x: 300, y: 1660},
    next: {x: 300, y: 1660},
  }, { // including EventPage, MyInfo, SettingPage, others
    name: 'ClosePage*', // the close button at center bottom
    colors: [
      {x: 540, y: 1588, r: 233, g: 180, b: 10, match: true, threshold: 60}, // top right of the close button
      {x: 540, y: 1714, r: 233, g: 180, b: 10, match: true, threshold: 60}, // top right of the close button
      {x: 604, y: 1419, r: 234, g: 171, b: 6, match: false, threshold: 80}, // yellow receive button (not MailBox1)
    ],
    back: {x: 576, y: 1660},
    next: {x: 576, y: 1660},
  }, { // including Login Bonus
    name: 'ClosePage2*', // the close button at 3/4 height
    colors: [
      {x: 545, y: 570, r: 33, g: 198, b: 239, match: true, threshold: 60}, // top center of blue info box
      {x: 545, y: 1260, r: 25, g: 190, b: 230, match: true, threshold: 60}, // bottom center of blue info box
      {x: 545, y: 1409, r: 247, g: 190, b: 8, match: true, threshold: 60}, // top center of yellow Close button
      {x: 549, y: 1562, r: 230, g: 121, b: 8, match: true, threshold: 60}, // bottom center of yellow Close button
    ],
    back: {x: 545, y: 1409},
    next: {x: 545, y: 1409},
  }, {
    name: 'HighScore',
    colors: [
      {x: 298, y: 1325, r: 238, g: 187, b: 10, match: true, threshold: 80},
      {x: 810, y: 1325, r: 238, g: 187, b: 10, match: true, threshold: 80},
    ],
    back: {x: 298, y: 1325},
    next: {x: 810, y: 1325},
  }, {
    name: 'TsumsMe', // the close button at left bottom
    colors: [
      {x: 180, y: 1592, r: 238, g: 180, b: 11, match: true, threshold: 80}, // left bottom back button
      {x: 919, y: 1696, r: 173, g: 0, b: 0, match: true, threshold: 60}, // right bottom red Store
      {x: 1005, y: 1543, r: 173, g: 0, b: 0, match: true, threshold: 60}, // right bottom red box!
      {x: 414, y: 1655, r: 49, g: 154, b: 197, match: true, threshold: 60}, // bottom disabled MyTsum Set
      {x: 1008, y: 898, r: 239, g: 178, b: 16, match: true, threshold: 60}, // Sort Button yellow
      {x: 982, y: 909, r: 115, g: 57, b: 41, match: true, threshold: 60}, // Sort Button dark yellow
    ],
    back: {x: 180, y: 1592},
    next: {x: 176, y: 1592},
  }, {
    name: 'TsumsOther', // the close button at left bottom
    colors: [
      {x: 180, y: 1592, r: 238, g: 180, b: 11, match: true, threshold: 80}, // left bottom back button
      {x: 919, y: 1696, r: 173, g: 0, b: 0, match: true, threshold: 60}, // right bottom red Store
      {x: 1005, y: 1543, r: 173, g: 0, b: 0, match: true, threshold: 60}, // right bottom red box!
      {x: 553, y: 1718, r: 239, g: 93, b: 8, match: true, threshold: 60}, // bottom MyTsum Set
      {x: 1008, y: 898, r: 239, g: 178, b: 16, match: true, threshold: 60}, // Sort Button yellow
      {x: 982, y: 909, r: 115, g: 57, b: 41, match: true, threshold: 60}, // Sort Button dark yellow
    ],
    back: {x: 180, y: 1592},
    next: {x: 176, y: 1592},
  }, /* {
    name: 'InvitePage', // the close button at left bottom
    colors: [
      {x: 180, y: 1592, r: 238, g: 180, b: 11, match: true, threshold: 60},
    ],
    back: {x: 176, y: 1592},
    next: {x: 176, y: 1592},
  }*/],
};

var rbm;

function init() {
  rbm = new RBM(config);
  rbm.init();
  config.isRunning = true;
}
function fini() {
  rbm = undefined;
}

// remove RBM 0.0.3's log delay time
// RBM.prototype.log = function() {
function mylog() {
  // sleep(10);
  console.log('dbg:');
  for (var i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] == 'object') {
      arguments[i] = JSON.stringify(arguments[i]);
    }
  }
  console.log('dbg:');
  console.log.apply(console, arguments);
};

/* failed
// patch for BOOTCLASSPATH of RBM 0.0.3
// RBM.prototype.startApp = function(packageName, activityName) {
function startApp(packageName, activityName) {
  var path = 'BOOTCLASSPATH=/system/framework/core.jar:/system/framework/conscrypt.jar:/system/framework/okhttp.jar:/system/framework/core-junit.jar:/system/framework/bouncycastle.jar:/system/framework/ext.jar:/system/framework/framework.jar:/system/framework/framework2.jar:/system/framework/telephony-common.jar:/system/framework/voip-common.jar:/system/framework/mms-common.jar:/system/framework/android.policy.jar:/system/framework/services.jar:/system/framework/apache-xml.jar:/system/framework/webviewchromium.jar';
  execute(path + ' am start -n ' + packageName + '/' + activityName);
  // monkey -p com.linecorp.LGTMTMG -c android.intent.category.LAUNCHER 1
};
*/

function mappingResizeXY(xy) {
  var nx = Math.round(xy.x * rbm.resizeAppWidth / rbm.oriAppWidth);
  var ny = Math.round(xy.y * rbm.resizeAppHeight / rbm.oriAppHeight);
  return {x: nx, y: ny};
};


function getColor(img, xy) {
  // var rxy = rbm.mappingImageWHs({height: xy.y, width: xy.x});
  var rxy = mappingResizeXY(xy);
  // rbm.log('dbg: getColor', xy, rxy);
  return getImageColor(img, rxy.x, rxy.y);
};

function findPage(img, pageColors) {
  var result = [];
  var names = [];
  var page;
  for (var p = 0; p < pageColors.length; p++) {
    page = pageColors[p];
    var i;
    for (i = 0; i < page.colors.length; i++) {
      var pcolor = page.colors[i];
      // rbm.log('dbg: pcolor', pcolor);
      var pxcolor = getColor(img, pcolor);
      // rbm.log('dbg: pxcolor', pxcolor);
      var diff = Colors.diffColor(pcolor, pxcolor);
      // rbm.log('dbg: diff', diff);
      if ((pcolor.match && diff >= pcolor.threshold) ||
        (!pcolor.match && diff < pcolor.threshold)) {
        break;
      }
    }
    if (i == page.colors.length) {
      result.push(page);
      names.push(page.name);
    }
  }
  if (result.length === 1) {
    // rbm.log('dbg: findPage:', names);
    return result[0];
  }
  if (result.length > 0) {
    mylog('dbg: too many page:', names);
  }
  return {name: ''};
};

/* eslint no-unused-vars: ["error", { "vars": "local" }]*/
function start( // exported start()
    isLocaleTW, autoLaunch, detectAppOnPeriod, autoPlay, isPause,
    clearBubbles, useFan, isFourTsum, coinItem, bubbleItem,
    enableAllItems, skillInterval, skillLevel, skillType, receiveItem,
    receiveItemInterval, receiveOneItem, keepRuby, receiveCheckLimit,
    receiveOneItemInterval,
    recordReceive, largeImage, sendHearts, sentToZero, sendFromFirst,
    sendHeartMaxDuring, sendHeartsInterval, numParams) {
  console.log('dbg: start()');
  if (numParams != 27) { // check the index.html genStartCommand()
    console.log('dbg: invalid numParams=', numParams);
    return;
  }
  init();
  if (autoLaunch) {
    // rbm.startApp('com.linecorp.LGTMTM', '.TsumTsum'); // isJP
    console.log('dbg: startApp');
    var r = rbm.startApp(config.packageName, config.activityName); // test failed 2019/06/16
    // var r = startApp(config.packageName, config.activityName);
    console.log('dbg:', r);
    rbm.sleep(3000);
  }

  var lastChkAppTime = 0;
  var outOfGameCount = 0;
  var prevPage = {name: ''};
  var currentPage = prevPage;
  var lastChkPageTime = 0;
  var samePageCount = 0;

  while (config.isRunning) {
    // check if out of game
    var now = Date.now();
    if (now - lastChkAppTime > config.appOnChkPeriod) {
      var r = rbm.currentApp();
      // rbm.log('dbg: currentApp()=', r);
      if (r.packageName !== config.packageName) {
        outOfGameCount++;
        console.log('dbg: outOfGameCount', outOfGameCount);
        if (outOfGameCount >= config.maxAppOffCount) {
          config.isRunning = false;
          break;
        }
      }
      lastChkAppTime = now;
    }
    rbm.screenshot('tsum.png'); // failed
    var img = getScreenshotModify(0, 0, rbm.appWidth, rbm.appHeight,
        rbm.resizeAppWidth, rbm.resizeAppHeight, rbm.imageQuality);

    // check current page
    if (now - lastChkPageTime > config.chkPagePeriod) {
      prevPage = currentPage;
      currentPage = findPage(img, config.pageColors);
      // rbm.log('dbg: page=', currentPage);
      lastChkPageTime = now;
    }
    if (prevPage.name != currentPage.name) {
      console.log('dbg: prevPage:', prevPage.name, 'currentPage:', currentPage.name);
      samePageCount = 1;
    } else {
      samePageCount++;
      if (samePageCount === 2) {
        console.log('dbg: Page:', currentPage.name);
      }
    }
    releaseImage(img);
    // rbm.log('dbg: wait', config.loopSleepMS/1000, 's for debug', Date(now));
    sleep(config.loopSleepMS);
  }
  console.log('dbg: start() end');
}

function stop() { // exported stop()
  console.log('dbg: stop()');
  config.isRunning = false;
  sleep(500); // wait other thread before release memory
  fini();
  console.log('dbg: stop() end');
}

/* example test function
start(
  false, // isLocaleTW
  true, // autoLaunch,
  3, // detectAppOnPeriod,
  true, // autoPlay,
  false, // isPause,
  true, // clearBubbles,
  true, // useFan,
  false, // isFourTsum,
  false, // coinItem,
  false, // bubbleItem,
  false, // enableAllItems,
  1, // skillInterval,
  3, // skillLevel,
  'burst', // skillType,
  false, // receiveItem,
  25, // receiveItemInterval,
  true, // receiveOneItem,
  false, // keepRuby,
  1, // receiveCheckLimit,
  5, // receiveOneItemInterval,
  false, // recordReceive,
  false, // largeImage,
  true, // sendHearts,
  false, // sentToZero,
  true, // sendFromFirst,
  9, // sendHeartMaxDuring,
  25, // sendHeartsInterval,
  27 // numParams
);
*/
// vim:et sw=2 ts=2 ai
