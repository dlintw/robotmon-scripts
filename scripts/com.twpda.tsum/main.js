'use strict;';

var config = { // ref: DEFAULT_CONFIG in RBM-<version>.js
  appName: 'com.twpda.tsum',
  // global for this game
  isRunning: false,
  bonusState: 0,
  packageName: 'com.linecorp.LGTMTMG',
  activityName: '.TsumTsum',
  animationMS: 500,
  during: 200, // human can click only about 3~4 clicks, this is 5 clicks
  oriScreenWidth: 1080,
  oriScreenHeight: 1920,
  oriVirtualButtonHeight: 0,
  oriAppWidth: 1080,
  oriAppHeight: 1920 - 0, // Height - VirtualButtonHeight
  oriResizeFactor: 0.4, // original screen capture to smaller image
  resizeFactor: 0.4, // screen capture to smaller image
  imageQuality: 100,
  playResizeWidth: 200,
  playResizeHeight: 200,
  tsumWidth: 16,
  // for draw different circles
  groupColors: [[255, 0, 0], [0, 255, 0], [0, 0, 255], [0, 255, 255], [255, 0, 255]],
  runTimes: 0, // keep count of screenshots count
  /* runtime parameters from player's env
  screenWidth: 0,
  screenHeight: 0,
  virtualButtonHeight: 0,
  appWidth: 0,
  appHeight: 0,
  resizeAppWidth, 0,
  resizeAppHeight, 0,
  // mapping from original to runtime screen ratio
  appWidthRatio: 1,
  appHeightRatio: 1,

  playOffsetX,
  playOffsetY,
  playWidth,
  playHeight,
  storagePath,
  */

  // UI options in settings.js order
  isLangZhTW: false,
  isPlay: true,
  isRecvGift: true,
  isSendHeart: false,
  debug: true,

  autoPlayCount: 1,
  isBonusScore: false,
  isBonusCoin: false,
  isBonusExp: false,
  isBonusTime: false,
  isBonusBubble: false,
  isBonus5to4: false,

  isAutoLaunch: true,
  isPermitRootScan: true,
  hibernateMS: 10000, // check app on per 10s
  maxAppOffMS: 1000, // max 1s on other app switch to hibernate mode
  appOnChkMS: 500, // check per 0.5s
  findPageMS: 100, // call findPage() per 0.1s
  waitUnknownMS: 1000, // wait 1 second before click on unknown page
  captureMS: 50, // sleep per 0.05 second before capture screen
  sendHeartMin: 30, // send heart period

  uiOptionCount: 20, // count of UI options

  points: {
    'RedMail': {x: 964, y: 311, r: 255, g: 32, b: 41}, // red number
    'Mail': {x: 909, y: 366, r: 164, g: 89, b: 58}, // dark yellow mail
    'RecvFirstMail': {x: 768, y: 596, r: 239, g: 174, b: 8}, // yellow Check button left side
    'FirstMailGet': {x: 950, y: 541, r: 247, g: 227, b: 33}, // yellow Get icon
    'ADGift': {x: 308, y: 651, r: 222, g: 166, b: 99}, // yellow gift
    'BonusScore': {x: 140, y: 863, r: 49, g: 109, b: 197}, // blue 1
    'BonusCoin': {x: 357, y: 854, r: 49, g: 117, b: 206}, // blue 2
    'BonusExp': {x: 594, y: 845, r: 49, g: 113, b: 206}, // blue 4
    'BonusTime': {x: 799, y: 857, r: 49, g: 121, b: 206}, // blue 8
    'BonusBubble': {x: 136, y: 1127, r: 49, g: 117, b: 206}, // blue 16
    'Bonus5to4': {x: 351, y: 1127, r: 49, g: 121, b: 206}, // blue 32
    'Close1': {x: 540, y: 1329, r: 247, g: 190, b: 16}, // yellow Close of PackageInfo
    'Close2': {x: 550, y: 1581, r: 238, g: 187, b: 10}, // yellow Close of MailBoxNoMessage
    'Close3': {x: 382, y: 1612, r: 239, g: 182, b: 8}, // yellow Close of OptionsPage
  },

  pagePixels: [{ // sort by action sequence, y, x, comment with color, position, button
    // ZERO ACTIONS PAGES => just wait
    /*
    name: 'NetworkDisable+',
    colors: [
      {x: 540, y: 825, r: 90, g: 57, b: 25, match: false, threshold: 60}, // yellow gift conflict with PackagePage
      {x: 932, y: 1077, r: 232, g: 171, b: 5, match: true, threshold: 80},
      {x: 478, y: 1080, r: 236, g: 94, b: 116, match: true, threshold: 80},
    ],
    actions: [], // just sleep
  }, {
*/
    // ONE ACTIONS PAGES => always click
    /*
    name: 'NetworkTimeout+',
    colors: [
      {x: 478, y: 1080, r: 232, g: 171, b: 5, match: true, threshold: 80},
      {x: 155, y: 1073, r: 239, g: 170, b: 8, match: true, threshold: 60}, // yellow Try Again button conflict of GamePause
      {x: 932, y: 1077, r: 232, g: 171, b: 5, match: true, threshold: 80},
    ],
    actions: [{x: 885, y: 1084}], // TODO: retry?
  }, {
  */
    name: 'ChooseLanguage',
    colors: [
      {x: 777, y: 208, r: 255, g: 255, b: 255, match: true, threshold: 60}, // white Language button left edge
      {x: 956, y: 212, r: 156, g: 158, b: 156, match: true, threshold: 60}, // gray Language button right triangle
      {x: 553, y: 1539, r: 247, g: 190, b: 16, match: true, threshold: 60}, // yellow to Start button's top
    ],
    actions: [{x: 553, y: 1539}],
  }, {
    /*
    name: 'OptionsPage',
    colors: [
      {x: 550, y: 347, r: 33, g: 194, b: 230, match: true, threshold: 60}, // blue top frame
      {x: 317, y: 441, r: 255, g: 251, b: 255, match: true, threshold: 60}, // white title
      {x: 373, y: 1015, r: 239, g: 170, b: 8, match: true, threshold: 60}, // yellow Envents button
      {x: 171, y: 1158, r: 239, g: 174, b: 8, match: true, threshold: 60}, // yellow Notice button
      {x: 582, y: 1152, r: 239, g: 178, b: 8, match: true, threshold: 60}, // yellow How To Play button
      {x: 158, y: 1301, r: 247, g: 174, b: 16, match: true, threshold: 60}, // yellow Account button
      {x: 585, y: 1292, r: 247, g: 178, b: 8, match: true, threshold: 60}, // yellow Help button
      {x: 382, y: 1612, r: 239, g: 182, b: 8, match: true, threshold: 60}, // yellow Close
    ],
    actions: [{x: 382, y: 1612}],
  }, {
  */
    name: 'TodayMission+',
    colors: [
      {x: 540, y: 1480, r: 238, g: 181, b: 12, match: true, threshold: 80},
      {x: 975, y: 500, r: 161, g: 224, b: 231, match: true, threshold: 80},
      {x: 554, y: 1332, r: 24, g: 189, b: 219, match: true, threshold: 80},
    ],
    actions: [{x: 558, y: 1473}],
  }, {
    name: 'PackageInfo',
    colors: [
      {x: 546, y: 540, r: 33, g: 194, b: 230, match: true, threshold: 60}, // blue top frame
      {x: 540, y: 969, r: 255, g: 255, b: 247, match: true, threshold: 60}, // light yellow gift box
      {x: 774, y: 1210, r: 25, g: 190, b: 222, match: true, threshold: 60}, // blue bottom frame
      {x: 540, y: 1329, r: 247, g: 190, b: 16, match: true, threshold: 60}, // yellow Close button
      {x: 540, y: 1570, r: 49, g: 36, b: 0, match: true, threshold: 60}, // dark yellow Close button
    ],
    actions: [{x: 540, y: 1329}], // Close
  }, {
    name: 'MailBoxNoMessage',
    colors: [

      {x: 738, y: 414, r: 240, g: 245, b: 239, match: true, threshold: 60}, // white Mail Box title
      {x: 768, y: 596, r: 239, g: 174, b: 8, match: false, threshold: 60}, // yellow watch Ad button
      // {x: 619, y: 1426, r: 19, g: 137, b: 175, match: true, threshold: 60}, // yellow Claim All Button
      {x: 889, y: 1395, r: 0, g: 105, b: 156, match: true, threshold: 60}, // blue Claim All Button
      {x: 550, y: 1581, r: 238, g: 187, b: 10, match: true, threshold: 60}, // yellow Close Button
    ],
    actions: [{x: 550, y: 1581}], // Close
  }, {
    name: 'Received',
    colors: [
      {x: 799, y: 716, r: 30, g: 188, b: 223, match: true, threshold: 80},
      {x: 806, y: 889, r: 45, g: 80, b: 122, match: true, threshold: 80},
      {x: 799, y: 1048, r: 27, g: 188, b: 217, match: true, threshold: 80},
    ],
    actions: [{x: 799, y: 716}], // Any key
    /*
  }, { // FriendInfo of Friend Page, SocailAccount of Setting Page
    name: 'FriendInfo',
    colors: [
      {x: 565, y: 576, r: 31, g: 190, b: 220, match: true, threshold: 80},
      {x: 540, y: 825, r: 90, g: 57, b: 25, match: false, threshold: 60}, // yellow gift conflict of PackagePage
      {x: 155, y: 1073, r: 239, g: 170, b: 8, match: false, threshold: 60}, // yellow Try Again button conflict of GamePause
      {x: 547, y: 1195, r: 27, g: 192, b: 222, match: true, threshold: 80},
      {x: 554, y: 1332, r: 238, g: 186, b: 12, match: true, threshold: 80},
    ],
    actions: [{x: 576, y: 1408}], // TODO:?
    */
  }, { // LevelUp and RankUp
    name: 'LevelUp+',
    colors: [
      {x: 140, y: 1656, r: 233, g: 175, b: 6, match: true, threshold: 80}, // left of the close button
      {x: 450, y: 1656, r: 233, g: 175, b: 6, match: true, threshold: 80}, // right of the close button
      {x: 620, y: 1656, r: 233, g: 175, b: 6, match: true, threshold: 80}, // left of the share button
      {x: 930, y: 1656, r: 233, g: 175, b: 6, match: true, threshold: 80}, // right of the share button
    ],
    actions: [{x: 300, y: 1660}], // TODO:test
    /*
  }, { // including EventPage, MyInfo, SettingPage, others
    name: 'ClosePage', // the close button at center bottom
    colors: [
      // {x: 738, y: 414, r: 240, g: 245, b: 239, match: false, threshold: 60}, // white Mail Box title (not MailBox2)
      {x: 604, y: 1419, r: 234, g: 171, b: 6, match: false, threshold: 60}, // yellow receive button (not MailBox)
      {x: 889, y: 1395, r: 0, g: 105, b: 156, match: false, threshold: 60}, // blue Claim All Button (not MailBoxNoMessage)
      {x: 540, y: 1588, r: 233, g: 180, b: 10, match: true, threshold: 60}, // top right of the close button
      {x: 540, y: 1714, r: 233, g: 180, b: 10, match: true, threshold: 60}, // top right of the close button
    ],
    actions: [{x: 576, y: 1660}], // Close
    */
  }, { // including Login Bonus
    name: 'ClosePage2', // the close button at 3/4 height
    colors: [
      {x: 545, y: 570, r: 33, g: 198, b: 239, match: true, threshold: 60}, // top center of blue info box
      {x: 545, y: 1260, r: 25, g: 190, b: 230, match: true, threshold: 60}, // bottom center of blue info box
      {x: 545, y: 1409, r: 247, g: 190, b: 8, match: true, threshold: 60}, // top center of yellow Close button
      {x: 549, y: 1562, r: 230, g: 121, b: 8, match: true, threshold: 60}, // bottom center of yellow Close button
    ],
    actions: [{x: 545, y: 1409}], // Close
  }, {
    name: 'HighScore',
    colors: [
      {x: 547, y: 748, r: 33, g: 202, b: 239, match: true, threshold: 60}, // blue frame top
      {x: 186, y: 922, r: 41, g: 77, b: 123, match: true, threshold: 60}, // dark blue middle frame
      {x: 547, y: 1087, r: 25, g: 186, b: 222, match: true, threshold: 60}, // blue frame bottom
      {x: 152, y: 1379, r: 247, g: 182, b: 16, match: true, threshold: 60}, // yellow Close button
      {x: 619, y: 1379, r: 247, g: 182, b: 16, match: true, threshold: 60}, // yellow Share button
    ],
    actions: [{x: 152, y: 1379}], // Close
  }, {
    name: 'GetTsum',
    colors: [
      {x: 323, y: 1071, r: 239, g: 105, b: 156, match: true, threshold: 60}, // pink New
      {x: 161, y: 1071, r: 33, g: 186, b: 222, match: true, threshold: 60}, // blue frame top
      {x: 149, y: 1242, r: 33, g: 65, b: 107, match: true, threshold: 60}, // dark blue frame
      {x: 220, y: 1407, r: 33, g: 194, b: 230, match: true, threshold: 60}, // blue frame bottom
      {x: 389, y: 1631, r: 239, g: 174, b: 8, match: true, threshold: 60}, // yellow Close button
    ],
    actions: [{x: 389, y: 1631}], // Close
  }, {
    name: 'MagicalTime', // Do you want to continue? (extend time by use ruby)
    colors: [
      {x: 532, y: 534, r: 33, g: 190, b: 230, match: true, threshold: 60}, // blue top frame
      {x: 280, y: 636, r: 239, g: 243, b: 239, match: true, threshold: 60}, // white title
      {x: 130, y: 984, r: 33, g: 65, b: 107, match: true, threshold: 60}, // dark blue frame
      {x: 644, y: 956, r: 33, g: 202, b: 230, match: true, threshold: 60}, // light blue near ruby
      {x: 205, y: 1354, r: 247, g: 174, b: 8, match: true, threshold: 60}, // yellow Cancel button
      {x: 650, y: 1354, r: 247, g: 178, b: 16, match: true, threshold: 60}, // yellow OK button
    ],
    actions: [{x: 205, y: 1354}], // Cancel
  }, {

    // TWO ACTIONS PAGES => first for back/cancel/close, second for ok
    name: 'RootDetection',
    colors: [
      // {x: 541, y: 67, r: 102, g: 102, b: 102, match: true, threshold: 60}, // dark white top
      {x: 538, y: 548, r: 10, g: 9, b: 3, match: true, threshold: 60}, // black frame top
      {x: 127, y: 1300, r: 214, g: 214, b: 214, match: true, threshold: 60}, // white left of Permit botton
      {x: 541, y: 1300, r: 150, g: 150, b: 150, match: true, threshold: 60}, // gray between two botton
      {x: 631, y: 1300, r: 214, g: 214, b: 214, match: true, threshold: 60}, // white left of Refuse botton
      // {x: 556, y: 1547, r: 99, g: 73, b: 6, match: true, threshold: 60}, // dark yellow 'TAP TO START' button
    ],
    actions: [{x: 631, y: 1300}, {x: 127, y: 1300}], // Cancel, Permit
  }, {
    name: 'ScorePage',
    colors: [
      {x: 774, y: 500, r: 243, g: 248, b: 242, match: true, threshold: 80}, // white score title
      {x: 302, y: 1581, r: 235, g: 184, b: 7, match: true, threshold: 60}, // yellow Close button
      {x: 777, y: 1588, r: 248, g: 142, b: 20, match: true, threshold: 80}, // orange Play button
    ],
    actions: [{x: 309, y: 1653}, {x: 784, y: 1653}], // Close, Play
  }, {
    name: 'MailBox',
    colors: [
      {x: 738, y: 414, r: 240, g: 245, b: 239, match: true, threshold: 60}, // white mail box title
      {x: 604, y: 1419, r: 234, g: 171, b: 6, match: true, threshold: 60}, // yellow receive button
      {x: 550, y: 1581, r: 238, g: 187, b: 10, match: true, threshold: 60}, // yellow close button
    ],
    actions: [{x: 550, y: 1581}, {x: 604, y: 1419}], // Close, Receive
  }, {
    name: 'MailBoxAd',
    colors: [
      {x: 738, y: 414, r: 240, g: 245, b: 239, match: true, threshold: 60}, // white Mail Box title
      {x: 768, y: 596, r: 239, g: 174, b: 8, match: true, threshold: 60}, // yellow Watch Ad button
      {x: 889, y: 1395, r: 0, g: 105, b: 156, match: true, threshold: 60}, // blue Claim All Button
      {x: 550, y: 1581, r: 238, g: 187, b: 10, match: true, threshold: 60}, // yellow Close Button
    ],
    actions: [{x: 550, y: 1581}, {x: 768, y: 596}], // Close, Watch
  }, {
    name: 'ReceiveGiftHeart',
    colors: [
      {x: 781, y: 447, r: 49, g: 49, b: 49, match: true, threshold: 60}, // dark white mail box title
      {x: 572, y: 561, r: 30, g: 193, b: 224, match: true, threshold: 80}, // blue top frame
      {x: 468, y: 803, r: 214, g: 61, b: 143, match: true, threshold: 100}, // red heart
      {x: 216, y: 1084, r: 233, g: 172, b: 6, match: true, threshold: 80}, // yellow Cancel button
      {x: 673, y: 1080, r: 235, g: 174, b: 8, match: true, threshold: 80}, // yellow OK button
      {x: 583, y: 1195, r: 28, g: 186, b: 221, match: true, threshold: 80}, // blue bottom frame
    ],
    actions: [{x: 216, y: 1084}, {x: 673, y: 1080}], // Cancel, OK
  }, {
    name: 'PackagePage',
    colors: [
      {x: 546, y: 520, r: 33, g: 194, b: 230, match: true, threshold: 60}, // blue top frame
      {x: 540, y: 825, r: 90, g: 57, b: 25, match: true, threshold: 60}, // yellow gift
      {x: 151, y: 1082, r: 247, g: 93, b: 115, match: true, threshold: 60}, // red Delete button
      {x: 604, y: 1085, r: 239, g: 174, b: 8, match: true, threshold: 60}, // yellow Watch an Ad button
      {x: 536, y: 1204, r: 33, g: 198, b: 230, match: true, threshold: 60}, // blue bottom frame
      {x: 533, y: 1335, r: 247, g: 186, b: 8, match: true, threshold: 60}, // yellow close button
    ],
    actions: [{x: 533, y: 1335}, {x: 151, y: 1082}], // Close, Delete
  }, {
    name: 'ReceiveGiftOther',
    colors: [
      {x: 781, y: 447, r: 49, g: 49, b: 49, match: true, threshold: 60}, // dark white mail box title
      {x: 560, y: 555, r: 33, g: 194, b: 230, match: true, threshold: 60}, // blue top frame
      {x: 468, y: 803, r: 214, g: 61, b: 143, match: false, threshold: 100}, // red heart(not ReceiveGiftHeart)
      {x: 209, y: 1092, r: 247, g: 178, b: 8, match: true, threshold: 60}, // left of yellow Cancel button
      {x: 668, y: 1092, r: 239, g: 174, b: 8, match: true, threshold: 60}, // left of yellow OK button
      {x: 583, y: 1195, r: 28, g: 186, b: 221, match: true, threshold: 80}, // blue bottom frame
    ],
    actions: [{x: 209, y: 1092}, {x: 668, y: 1092}], // Cancel, OK
  }, {
    name: 'ChooseBonusItem',
    colors: [
      {x: 153, y: 380, r: 222, g: 61, b: 148, match: true, threshold: 60}, // first red heart
      {x: 859, y: 380, r: 239, g: 174, b: 8, match: true, threshold: 60}, // message box
      {x: 545, y: 469, r: 255, g: 255, b: 255, match: true, threshold: 60}, // Bonus Items white title
      {x: 179, y: 1580, r: 247, g: 190, b: 16, match: true, threshold: 60}, // yellow Back button
      {x: 370, y: 1631, r: 247, g: 101, b: 123, match: true, threshold: 60}, // red Start button
      {x: 799, y: 1647, r: 239, g: 178, b: 8, match: true, threshold: 60}, // right yellow Tsum button
      {x: 1005, y: 1543, r: 173, g: 0, b: 0, match: true, threshold: 60}, // right bottom red box!
    ],
    actions: [{x: 179, y: 1580}, {x: 545, y: 1591}], // Back, Start
  }, {
    name: 'GamePause',
    colors: [
      {x: 535, y: 538, r: 33, g: 194, b: 230, match: true, threshold: 60}, // blue frame top
      {x: 327, y: 658, r: 255, g: 251, b: 255, match: true, threshold: 60}, // white title
      {x: 158, y: 771, r: 25, g: 202, b: 239, match: true, threshold: 60}, // blue Sound
      {x: 155, y: 1073, r: 239, g: 170, b: 8, match: true, threshold: 60}, // yellow Try Again button
      {x: 583, y: 1073, r: 247, g: 186, b: 8, match: true, threshold: 60}, //  yellow View Rankings button
      {x: 541, y: 1329, r: 247, g: 190, b: 8, match: true, threshold: 60}, //  yellow Continue button
    ],
    actions: [{x: 155, y: 1073}, {x: 541, y: 1329}], // TryAgain, Continue
  }, {
    name: 'TsumsMe', // the close button at left bottom
    colors: [
      {x: 1008, y: 898, r: 239, g: 178, b: 16, match: true, threshold: 60}, // Sort Button yellow
      {x: 982, y: 909, r: 115, g: 57, b: 41, match: true, threshold: 60}, // Sort Button dark yellow
      {x: 180, y: 1592, r: 238, g: 180, b: 11, match: true, threshold: 60}, // left bottom back button
      // {x: 922, y: 1620, r: 156, g: 0, b: 0, match: true, threshold: 80}, // right bottom red Store
      {x: 790, y: 1652, r: 239, g: 174, b: 8, match: true, threshold: 60}, // right bottom yellow button
      // {x: 1005, y: 1543, r: 173, g: 0, b: 0, match: true, threshold: 60}, // right bottom red box!
      {x: 414, y: 1655, r: 49, g: 154, b: 197, match: true, threshold: 60}, // bottom disabled MyTsum Set
    ],
    actions: [{x: 180, y: 1592}, {x: 790, y: 1592}], // Close, Store
  }, {
    name: 'TsumsOther', // the close button at left bottom
    colors: [
      {x: 1008, y: 898, r: 239, g: 178, b: 16, match: true, threshold: 60}, // Sort Button yellow
      {x: 982, y: 909, r: 115, g: 57, b: 41, match: true, threshold: 60}, // Sort Button dark yellow
      {x: 180, y: 1592, r: 238, g: 180, b: 11, match: true, threshold: 60}, // left bottom back button
      // {x: 922, y: 1620, r: 156, g: 0, b: 0, match: true, threshold: 80}, // right bottom red Store
      {x: 790, y: 1652, r: 239, g: 174, b: 8, match: true, threshold: 60}, // right bottom yellow button
      // {x: 1005, y: 1543, r: 173, g: 0, b: 0, match: true, threshold: 60}, // right bottom red box!
      {x: 553, y: 1718, r: 239, g: 93, b: 8, match: true, threshold: 60}, // bottom MyTsum Set
    ],
    actions: [{x: 180, y: 1592}, {x: 790, y: 1592}], // Close, Store
  }, {
    // THREE ACTIONS BUTTONS

    name: 'FriendPage',
    colors: [
      {x: 187, y: 1599, r: 240, g: 218, b: 72, match: true, threshold: 60}, // top of the card button
      {x: 540, y: 1592, r: 246, g: 135, b: 17, match: true, threshold: 60}, // top of the start button
      {x: 799, y: 1653, r: 232, g: 170, b: 7, match: true, threshold: 60}, // left of the myTsum button
      {x: 698, y: 464, r: 244, g: 249, b: 243, match: true, threshold: 60}, // left top of the ranking time
    ],
    actions: [{x: 187, y: 1599}, {x: 540, y: 1592}, {x: 799, y: 1653}], // Card, Play, MyTsum
  }, {
    name: 'FriendPage2+',
    colors: [
      {x: 540, y: 1649, r: 175, g: 188, b: 197, match: true, threshold: 60}, // center of the Tsum Hades
      {x: 187, y: 1599, r: 240, g: 218, b: 72, match: true, threshold: 60}, // top of the card button
      {x: 799, y: 1653, r: 232, g: 170, b: 7, match: true, threshold: 60}, // left of the myTsum button
      {x: 698, y: 464, r: 244, g: 249, b: 243, match: true, threshold: 60}, // left top of the ranking time
    ],
    actions: [{x: 187, y: 1599}, {x: 540, y: 1592}, {x: 799, y: 1653}], // Card, Play, MyTsum
  }, {
    name: 'FriendPage3+',
    colors: [
      {x: 540, y: 1649, r: 203, g: 192, b: 237, match: true, threshold: 80}, // center of the Tsum Ursula
      {x: 187, y: 1599, r: 240, g: 218, b: 72, match: true, threshold: 80}, // top of the card button
      {x: 799, y: 1653, r: 232, g: 170, b: 7, match: true, threshold: 80}, // left of the myTsum button
      {x: 698, y: 464, r: 244, g: 249, b: 243, match: true, threshold: 80}, // left top of the ranking time
    ],
    actions: [{x: 187, y: 1599}, {x: 540, y: 1592}, {x: 799, y: 1653}], // Card, Play, MyTsum
  }, {
    name: 'FriendPage4+',
    colors: [
      {x: 540, y: 1649, r: 79, g: 89, b: 94, match: true, threshold: 80}, // center of the Tsum Maleficentd
      {x: 187, y: 1599, r: 240, g: 218, b: 72, match: true, threshold: 80}, // top of the card button
      {x: 799, y: 1653, r: 232, g: 170, b: 7, match: true, threshold: 80}, // left of the myTsum button
      {x: 698, y: 464, r: 244, g: 249, b: 243, match: true, threshold: 80}, // left top of the ranking time
    ],
    actions: [{x: 187, y: 1599}, {x: 540, y: 1592}, {x: 799, y: 1653}], // Card, Play, MyTsum
  }, {
    name: 'GamePlay1', // blue around MyTsum
    colors: [
      {x: 917, y: 210, r: 247, g: 210, b: 8, match: true, threshold: 60}, // yellow Pause button higher part
      {x: 923, y: 325, r: 230, g: 146, b: 8, match: true, threshold: 90}, // dark yellow Pause button lower part
      {x: 137, y: 1555, r: 90, g: 117, b: 164, match: true, threshold: 160}, // light blue to dark MyTsum button 11 clock part
      {x: 913, y: 1562, r: 247, g: 215, b: 0, match: true, threshold: 200}, // light yellow to dark Fan button upper part
    ],
    actions: [{x: 917, y: 210}, {x: 137, y: 1555}, {x: 913, y: 1562}], // Pause, MyTsum, Fan
  }, {
    name: 'GamePlay2', // yellow around MyTsum
    colors: [
      {x: 917, y: 210, r: 247, g: 210, b: 8, match: true, threshold: 60}, // yellow Pause button higher part
      {x: 923, y: 325, r: 230, g: 146, b: 8, match: true, threshold: 90}, // dark yellow Pause button lower part
      {x: 137, y: 1555, r: 247, g: 219, b: 25, match: true, threshold: 160}, // light yellow to dark MyTsum button 11 clock part
      {x: 913, y: 1562, r: 247, g: 215, b: 0, match: true, threshold: 200}, // light yellow to dark Fan button upper part
    ],
    actions: [{x: 917, y: 210}, {x: 137, y: 1555}, {x: 913, y: 1562}], // Pause, MyTsum, Fan
  }, {
    name: 'GamePlay3', // white around MyTsum
    colors: [
      {x: 917, y: 210, r: 247, g: 210, b: 8, match: true, threshold: 60}, // yellow Pause button higher part
      {x: 923, y: 325, r: 230, g: 146, b: 8, match: true, threshold: 90}, // dark yellow Pause button lower part
      {x: 137, y: 1555, r: 255, g: 255, b: 247, match: true, threshold: 120}, // white MyTsum button 11 clock part
      {x: 913, y: 1562, r: 247, g: 215, b: 0, match: true, threshold: 200}, // light yellow to dark Fan button upper part
    ],
    actions: [{x: 917, y: 210}, {x: 137, y: 1555}, {x: 913, y: 1562}], // Pause, MyTsum, Fan
  }, {
    name: 'GamePlay4', // black around MyTsum
    colors: [
      {x: 917, y: 210, r: 247, g: 210, b: 8, match: true, threshold: 60}, // yellow Pause button higher part
      {x: 923, y: 325, r: 230, g: 146, b: 8, match: true, threshold: 90}, // dark yellow Pause button lower part
      {x: 137, y: 1555, r: 33, g: 36, b: 33, match: true, threshold: 120}, // black MyTsum button 11 clock part
      {x: 913, y: 1562, r: 247, g: 215, b: 0, match: true, threshold: 200}, // light yellow to dark Fan button upper part
    ],
    actions: [{x: 917, y: 210}, {x: 137, y: 1555}, {x: 913, y: 1562}], // Pause, MyTsum, Fan
  }],
};


function init(args) {
  config.storagePath = getStoragePath();
  execute('mkdir -p ' + config.storagePath + '/tmp');

  var size = getScreenSize();
  config.screenWidth = size.width;
  config.screenHeight = size.height;
  config.virtualButtonHeight = getVirtualButtonHeight();
  config.appWidth = config.screenWidth;
  config.appHeight = config.screenHeight - config.virtualButtonHeight;
  config.resizeAppWidth = config.appWidth * config.resizeFactor;
  config.resizeAppHeight = config.appHeight * config.resizeFactor;
  config.appWidthRatio = config.appWidth / config.oriAppWidth;
  config.appHeightRatio = config.appHeight / config.oriAppHeight;
  mylog('dbg: runtime screensize', size, 'virtualButtonHeight',
      config.virtualButtonHeight);
  config.playOffsetX = 0;
  config.playOffsetY = (config.appHeight - config.appWidth)/2;
  config.playWidth = config.appWidth;
  config.playHeight= config.appWidth;
  config.tsumCount = 5;
  if (config.isBonus5to4) {
    config.tsumCount = 4;
  }

  if (args !== undefined) {
    if (args.length != config.uiOptionCount) {
      mylog('dbg: parameter length invalid', args.length);
      stop();
      return false;
    } else {
      var i=0;
      config.isLangZhTW = args[i++];
      config.isPlay = args[i++];
      config.isRecvGift = args[i++];
      config.isSendHeart = args[i++];

      config.autoPlayCount = args[i++];
      config.isBonusScore = args[i++];
      config.isBonusCoin = args[i++];
      config.isBonusExp = args[i++];
      config.isBonusTime = args[i++];
      config.isBonusBubble = args[i++];
      config.isBonus5to4 = args[i++];

      config.isAutoLaunch = args[i++];
      config.isPermitRootScan = args[i++];
      config.hibernateMS = args[i++];
      config.maxAppOffMS = args[i++];
      config.appOnChkMS = args[i++];
      config.findPageMS = args[i++];
      config.waitUnknownMS = args[i++];
      config.captureMS = args[i++];
    }
  } else {
    mylog('dbg: no arguments of start(), use default');
  }
  config.isRunning = true;
  return true;
};

function fini() {
}

// remove RBM 0.0.3's log delay time
// RBM.prototype.log = function() {
function mylog() {
  for (var i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] == 'object') {
      arguments[i] = JSON.stringify(arguments[i]);
    }
  }
  console.log.apply(console, arguments);
};


// patch for BOOTCLASSPATH of RBM 0.0.3
function myStartApp(packageName, activityName) {
  var path = 'BOOTCLASSPATH=/system/framework/core.jar:/system/framework/conscrypt.jar:/system/framework/okhttp.jar:/system/framework/core-junit.jar:/system/framework/bouncycastle.jar:/system/framework/ext.jar:/system/framework/framework.jar:/system/framework/framework2.jar:/system/framework/telephony-common.jar:/system/framework/voip-common.jar:/system/framework/mms-common.jar:/system/framework/android.policy.jar:/system/framework/services.jar:/system/framework/apache-xml.jar:/system/framework/webviewchromium.jar';
  execute(path + ' am start -n ' + packageName + '/' + activityName);
  // monkey -p com.linecorp.LGTMTMG -c android.intent.category.LAUNCHER 1
};


function mappingResizeXY(xy) {
  var nx = Math.round(xy.x * config.resizeAppWidth / config.oriAppWidth);
  var ny = Math.round(xy.y * config.resizeAppHeight / config.oriAppHeight);
  return {x: nx, y: ny};
};

function myDiffColor(c, c1) {
  return Math.abs(c1.r - c.r) + Math.abs(c1.g - c.g) + Math.abs(c1.b - c.b);
};

function getColor(img, xy) {
  var rxy = mappingResizeXY(xy);
  return getImageColor(img, rxy.x, rxy.y);
};

function checkPoint(img, pointName) {
  var pcolor = config.points[pointName];
  var pxcolor = getColor(img, pcolor);
  var diff = myDiffColor(pcolor, pxcolor);
  return (diff < 60);
};

function whyNotPoint(img, pointName) {
  var pcolor = config.points[pointName];
  var pxcolor = getColor(img, pcolor);
  var diff = myDiffColor(pcolor, pxcolor);
  if (diff < 60) {
    mylog('dbg: v', diff, pointName, pcolor, pxcolor);
  } else {
    mylog('dbg: x', diff, pointName, pcolor, pxcolor);
  }
};

function findPage(img, pagePixels) {
  var result = [];
  var names = [];
  var page;
  for (var p = 0; p < pagePixels.length; p++) {
    page = pagePixels[p];
    var i;
    for (i = 0; i < page.colors.length; i++) {
      var pcolor = page.colors[i];
      var pxcolor = getColor(img, pcolor);
      var diff = myDiffColor(pcolor, pxcolor);
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
    return result[0];
  }
  if (result.length > 0) {
    mylog('dbg: too many page:', names);
  }
  return {name: '', actions: []};
};

function whyNotPage(img, pageName) {
  var page;
  var p;
  var pagePixels = config.pagePixels;
  for (p = 0; p < pagePixels.length; p++) {
    page = pagePixels[p];
    if (page.name == pageName) {
      break;
    }
  }
  if (p == pagePixels.length) {
    mylog('dbg: pageName invalid:', pageName);
    return;
  }
  mylog('dbg: whyNotPage:', pageName);
  var i;
  for (i = 0; i < page.colors.length; i++) {
    var pcolor = page.colors[i];
    var pxcolor = getColor(img, pcolor);
    var diff = myDiffColor(pcolor, pxcolor);
    if (pcolor.match) {
      if (diff >= pcolor.threshold) {
        mylog('dbg: x match', diff, 'img', pxcolor, 'page', pcolor);
      } else {
        mylog('dbg: v match', diff, 'img', pxcolor, 'page', pcolor);
      }
    } else {
      if (diff < pcolor.threshold) {
        mylog('dbg: x notmatch', diff, 'img', pxcolor, 'page', pcolor);
      } else {
        mylog('dbg: v notmatch', diff, 'img', pxcolor, 'page', pcolor);
      }
    }
  }
};

function mySleep(t, prevMS) {
  var now = Date.now();
  var diff = t - (now - prevMS);
  if (diff <= 0) {
    return now;
  }
  t = diff;
  sleep(t);
  return Date.now();
};

function getBonusState(img) {
  var flag = 0;
  flag += checkPoint(img, 'BonusScore') ? 1: 0; // : 1;
  flag += checkPoint(img, 'BonusCoin') ? 2: 0; // : 2;
  flag += checkPoint(img, 'BonusExp') ? 4: 0; // : 4;
  flag += checkPoint(img, 'BonusTime') ? 8: 0; // : 8;
  flag += checkPoint(img, 'BonusBubble') ? 16: 0; // : 16;
  flag += checkPoint(img, 'Bonus5to4') ? 32: 0; // : 32;
  return flag;
};

function mappingXY(xy) {
  var nx = Math.round(xy.x * config.appWidthRatio);
  var ny = Math.round(xy.y * config.appHeightRatio);
  return {x: nx, y: ny};
};

function myclick(xy) {
  var xy = mappingXY(xy);
  tap(xy.x, xy.y, config.during);
};

function clickBonus(bonusState) {
  var clickCount = 0;
  if ((bonusState & 1) == (config.bonusState & 1)) {
    mylog('dbg: click BonusScore');
    myclick(config.points['BonusScore']);
    clickCount++;
  };
  if ((bonusState & 2) == (config.bonusState & 2)) {
    mylog('dbg: click BonusCoin');
    myclick(config.points['BonusCoin']);
    clickCount++;
  };
  if ((bonusState & 4) == (config.bonusState & 4)) {
    mylog('dbg: click BonusExp');
    myclick(config.points['BonusExp']);
    clickCount++;
  };
  if ((bonusState & 8) == (config.bonusState & 8)) {
    mylog('dbg: click BonusTime');
    myclick(config.points['BonusTime']);
    clickCount++;
  };
  if ((bonusState & 16) == (config.bonusState & 16)) {
    mylog('dbg: click BonusBubble');
    myclick(config.points['BonusBubble']);
    clickCount++;
  };
  if ((bonusState & 32) == (config.bonusState & 32)) {
    mylog('dbg: click Bonus5to4');
    myclick(config.points['Bonus5to4']);
    clickCount++;
  };
  return clickCount;
};

// rbm.CurrentApp() exist bug when screenlock, so use com.r2studio.Tsum index.js
function myCurrentApp() {
  var result = execute('dumpsys window windows').split('mCurrentFocus');
  if (result.length >= 2) {
    result = result[1].split(' ');
    if (result.length >= 3) {
      result = result[2].split('/');
      if (result.length >= 2) {
        var packageName = result[0];
        return {packageName: packageName};
      }
    }
  }
  return {packageName: ''};
};

function clickUnknown(img) {
  var r = myCurrentApp();
  if (r.packageName !== config.packageName) {
    mylog('dbg: not in currentApp', r.packageName);
    return;
  }
  // whyNotPage(img, 'GamePlay1');
  // whyNotPage(img, 'GamePlay2');
  // whyNotPage(img, 'GamePlay3');
  // whyNotPage(img, 'GamePlay4');
  // whyNotPage(img, 'ChooseBonusItem');
  // whyNotPage(img, 'RootDetection');
  // whyNotPage(img, 'ClosePage');
  // whyNotPage(img, 'ClosePage2');
  var buttons = ['Close1', 'Close2', 'Close3'];
  for (var i=0; i< buttons.length; i++) {
    if (checkPoint(img, buttons[i])) {
      mylog('dbg: click', buttons[i], r.packageName);
      myclick(config.points[buttons[i]]);
      return;
    }
  }
  mylog('dbg: click center of screen', r.packageName);
  myclick({x: config.oriScreenWidth/2, y: config.oriScreenHeight/2});
};

function longSleep(ms) {
  var maxSleepMS = 500; ;
  while (ms > 0) {
    if (ms >= maxSleepMS) {
      sleep(maxSleepMS);
      ms -= maxSleepMS;
    } else {
      sleep(ms);
      break;
    }
  }
};

function myPlay(img) {
  config.runTimes++;
  longSleep(config.hibernateMS); // wait animation finished
  scanBoard(img);
}

function findTsums(img) {
  mylog('dbg: findTsum start', Date());
  var hsvImg = clone(img);
  // ref: /usr/include/opencv4/opencv2/imgproc/imgproc.hpp for CV_BLUR
  // ref: /usr/include/opencv4/opencv2/imgproc/types_c.h for CV_RGB2HSV
  smooth(hsvImg, 1, 7); // CV_BLUR with size 7 filter
  saveImage(hsvImg, config.storagePath + '/tmp/f1_blur.png');
  convertColor(hsvImg, 40); // CV_BGR2HSV
  saveImage(hsvImg, config.storagePath + '/tmp/f1_blur_bgrhsv.png');

  // debug purpose begin
  var hsvImg2 = clone(img);
  var hsvImg3 = clone(img);
  var hsvImg4 = clone(img);
  smooth(hsvImg2, 1, 7); // CV_BLUR with size 7 filter
  convertColor(hsvImg2, 41); // CV_RGB2HSV
  saveImage(hsvImg2, config.storagePath + '/tmp/f1_blur_rgbrhsv.png');

  smooth(hsvImg3, 2, 7); // CV_GAUSSIAN with size 7 filter
  saveImage(hsvImg3, config.storagePath + '/tmp/f1_gaussian.png');
  convertColor(hsvImg3, 40); // CV_BGR2HSV
  saveImage(hsvImg3, config.storagePath + '/tmp/f1_gaussian_bgrhsv.png');

  smooth(hsvImg4, 2, 7); // CV_GAUSSIAN with size 7 filter
  convertColor(hsvImg4, 41); // CV_RGB2HSV
  saveImage(hsvImg4, config.storagePath + '/tmp/f1_gaussian_rgbrhsv.png');
  releaseImage(hsvImg2);
  releaseImage(hsvImg3);
  releaseImage(hsvImg4);
  // debug purpose end

  // H<80 or H>120,  S<160 or S>255, V<20 or V>210
  var filter1 = outRange(hsvImg, 80, 160, 20, 0, 120, 255, 210, 255);
  saveImage(filter1, config.storagePath + '/tmp/f2_filter1.png');
  // H<80 or H>130,  S<100 or S>170, V<90 or V>190
  var filter2 = outRange(filter1, 80, 100, 90, 0, 130, 170, 190, 255);
  saveImage(filter2, config.storagePath + '/tmp/f3_filter2.png');
  var mask = bgrToGray(filter2);
  saveImage(mask, config.storagePath + '/tmp/f4_bgrtogray.png');

  releaseImage(filter1);
  releaseImage(filter2);

  // method:(3 = CV_HOUGH_GRADIENT)
  // dp:1 float, ratio between input image and input params.
  // minDist:22 float, min distance between circles
  // p1: 4 float, canny parameter
  // p2: 7 float, canny parameter
  // minR:8 int, min radius
  // maxR:14 int, max radius
  var points = houghCircles(mask, 3, 1, 22, 4, 7, 8, 14);
  smooth(hsvImg, 1, 22); // smooth more
  saveImage(mask, config.storagePath + '/tmp/f5_blurmore.png');
  var circleImg = clone(img);
  var results = [];
  for (var k in points) {
    var p = points[k];
    drawCircle(circleImg, p.x, p.y, p.r, 255, 0, 0, 0); // draw red circle
    var hsv1 = getImageColor(hsvImg, p.x, p.y);
    var hsv2 = hsv1; var hsv3 = hsv1; var hsv4 = hsv1; var hsv5 = hsv1;
    if (p.x - 1 >= 0) {
      hsv2 = getImageColor(hsvImg, p.x - 1, p.y);
    }
    if (p.x + 1 < 200) {
      hsv3 = getImageColor(hsvImg, p.x + 1, p.y);
    }
    if (p.y - 1 >= 0) {
      hsv4 = getImageColor(hsvImg, p.x, p.y - 1);
    }
    if (p.y + 1 < 200) {
      hsv5 = getImageColor(hsvImg, p.x, p.y + 1);
    }
    var avgb = (hsv1.b + hsv2.b + hsv3.b + hsv4.b + hsv5.b) / 5;
    var avgg = (hsv1.g + hsv2.g + hsv3.g + hsv4.g + hsv5.g) / 5;
    var avgr = (hsv1.r + hsv2.r + hsv3.r + hsv4.r + hsv5.r) / 5;
    results.push({x: p.x, y: p.y, z: p.r, b: avgb, g: avgg, r: avgr});
  }
  saveImage(circleImg, config.storagePath + '/tmp/f6_found.png');

  releaseImage(circleImg);
  releaseImage(mask);
  releaseImage(hsvImg);
  mylog('dbg: findTsum end', Date());
  return results;
}

// ref: https://stackoverflow.com/questions/35113979/calculate-distance-between-colors-in-hsv-space
function distanceHSV(p1, p2) {
  // Note: here the .b, .g, .r is HSV
  var dh = Math.abs(p1.b - p2.b);
  dh = Math.min(dh, 256-dh)*2; // hue range from 0~255, after min range in 0~128
  var d = Math.sqrt(dh*dh + (p1.g-p2.g)*(p1.g-p2.g) + (p1.r-p2.r)*(p1.r-p2.r));
  if (dh < 20) {
    d -= 10;
  }
  if (Math.abs(p1.g - p2.g) < 20) {
    d -= 10;
  }
  if (p1.r < 120 && p2.r < 120) {
    d -= 20;
  }
  return d;
}

function classifyTsums(points) {
  mylog('dbg: classifyTsum begin', Date());
  var tcs = [];
  if (points.length === 0) {
    return tcs;
  }
  var p = points[0];
  tcs.push({sumb: p.b, sumg: p.g, sumr: p.r, b: p.b, g: p.g, r: p.r, points: [p]});
  for (var i = 1; i < points.length; i++) {
    var p = points[i];
    var isSame = false;
    for (var j in tcs) {
      var tc = tcs[j];
      var d = distanceHSV(tc, p);
      if (d < 15) {
        var count = tc.points.length + 1;
        isSame = true;
        tc.sumb += p.b; tc.sumg += p.g; tc.sumr += p.r;
        tc.b = tc.sumb/count; tc.g = tc.sumg/count; tc.r = tc.sumr/count;
        tc.points.push(p);
        break;
      }
    }
    if (!isSame) {
      tcs.push({sumb: p.b, sumg: p.g, sumr: p.r, b: p.b, g: p.g, r: p.r, points: [p]});
    }
  }
  if (tcs.length > config.tsumCount) {
    mylog('dbg: error for too many Tsum groups', tcs.length);
    return [];
  }
  mylog('dbg: classifyTsum end', Date());
  return tcs;
}

function scanBoard(img) {
  var startTime = Date.now();
  var playImg = cropImage(img, config.playOffsetX, config.playOffsetY,
      config.playWidth, config.playHeight);
  var srcImg = resizeImage(playImg, config.playResizeWidth,
      config.playResizeHeight);
  saveImage(img, config.storagePath + '/tmp/s0_full.png');
  saveImage(playImg, config.storagePath + '/tmp/s1_play.png');
  saveImage(srcImg, config.storagePath + '/tmp/s2_200.png');
  releaseImage(playImg);

  var points = findTsums(srcImg);
  var tcs = classifyTsums(points);
  tcs.sort(function(a, b) {
    return a.points.length > b.points.length ? -1: 1;
  });
  var board = [];
  for (var i in tcs) {
    if (i >= config.tsumCount - 1) {
      break;
    }
    var tc = tcs[i];
    for (var j in tc.points) {
      var p = tc.points[j];
      board.push({tsumIdx: i, x: p.x - (config.tsumWidth / 2), y: p.y - (config.tsumWidth / 2)});
      if (config.debug) {
        drawCircle(srcImg, p.x, p.y, p.r, config.groupColors[i][0],
            config.groupColors[i][1], config.groupColors[i][2], 0);
      }
    }
  }
  if (config.debug) {
    saveImage(srcImg, config.storagePath + '/tmp/boardImg-' + config.runTimes + '.png');
  }
  releaseImage(srcImg);
  mylog('dbg: board length', board.length);
  sleep(30);
  mylog('dbg: recognition Time', Date.now() - startTime);

  if (this.isPause) {
    this.sleep(Config.gameContinueDelay);
    this.tap(Button.gameContinue);
    this.sleep(Config.gameContinueDelay / 2);
    this.tap(Button.gameContinue);
    this.sleep(Config.gameContinueDelay / 2);
  }

  return board;
};
/* exported start */
function start(params) { // exported start()
  if (!init(params)) {
    return;
  }

  if (config.isAutoLaunch) {
    mylog('dbg: startApp');
    var r = myStartApp(config.packageName, config.activityName);
    longSleep(3000);
  }
  var lastChkAppTime = 0;
  var outOfGameCount = 0;
  var prevPage = {name: '', actions: []};
  var currentPage = prevPage;
  var lastFindPageTime = 0;
  var samePageCount = 0;
  var prevCaptureTime = Date.now();
  var nextSendHeartTime = prevCaptureTime;
  var nextPlayTime = prevCaptureTime;
  // state could be:
  //   init(0) ->send0(21)->send1(22)->send2(23)->0,31
  //           ->play0(31)->play1(32)->play2(33)->0,22
  var state = 0;
  var prevBonusState = -1;
  var bonusState;
  var waitUnknownCount = config.waitUnknownMS/config.captureMS; ;
  var autoPlayCount = 0;
  var maxAppOffCount = config.maxAppOffMS / config.appOnChkMS;
  var minSamePageCount = 2 * config.findPageMS / config.captureMS;
  var gotCoins = 0;
  var msgClicks = 0;
  // var shotnum = 0;
  mylog('dbg:', nextSendHeartTime);
  var img;

  if (!config.isSendHeart) {
    nextSendHeartTime += 24*60*60*365; // next year
  }
  if (!config.isPlay) {
    nextPlayTime += 24*60*60*365; // next year
  }
  while (config.isRunning) {
    // if focus window not in game and continue for config.maxAppOffMS
    // wait config.hibernateMS before check again
    var now = Date.now();
    if (now - lastChkAppTime > config.appOnChkMS) {
      var r = myCurrentApp();
      if (r.packageName !== config.packageName) {
        outOfGameCount++;
        mylog('dbg: outOfGameCount', outOfGameCount, r.packageName);
        if (outOfGameCount >= maxAppOffCount) {
          mylog('dbg: hibernate', Date());
          longSleep(config.hibernateMS);
          continue;
        }
      } else {
        outOfGameCount = 0;
      }
      lastChkAppTime = now;
    }

    // shotnum = (shotnum + 1) % 10;
    if (img !== undefined) { // prevent forgotting free when break/continue
      releaseImage(img);
    }
    img = getScreenshotModify(0, 0, config.appWidth, config.appHeight,
        config.resizeAppWidth, config.resizeAppHeight, config.imageQuality);

    // check current page
    if (now - lastFindPageTime > config.findPageMS) {
      prevPage = currentPage;
      currentPage = findPage(img, config.pagePixels);
      // mylog('dbg: page=', currentPage);
      lastFindPageTime = now;
    }
    if (prevPage.name != currentPage.name) {
      mylog('dbg: prevPage:', prevPage.name, 'currentPage:', currentPage.name);
      if (currentPage.name == '' && (prevPage.name === 'GamePlay1' || prevPage.name === 'GamePlay2' ||
         prevPage.name === 'GamePlay3' || prevPage.name === 'GamePlay4')) {
        whyNotPage(img, 'GamePlay1');
        whyNotPage(img, 'GamePlay2');
        whyNotPage(img, 'GamePlay3');
        whyNotPage(img, 'GamePlay4');
      }
      samePageCount = 1;
    } else {
      samePageCount++;
      if (samePageCount >= minSamePageCount) {
        // mylog('dbg: Page:', currentPage.name, 'samePageCount=', samePageCount);
        switch (currentPage.actions.length) {
          case 0:
            if (currentPage.name == '') {
              // mylog('dbg: sleep 1 second for unknown page');
              // sleep(5000);
              if (samePageCount > waitUnknownCount) {
                clickUnknown(img);
                sleep(config.findPageMS);
                lastFindPageTime = 0;
                samePageCount = 0;
              }
            }
            break;
          case 1:
            myclick(currentPage.actions[0]);
            if (currentPage.name == 'Received') {
              sleep(config.animationMS);
            } else if (currentPage.name == 'MailBoxNoMessage') {
              mylog('dbg: gotCoins:', gotCoins, 'in clicks:', msgClicks);
            }
            break;
          case 2:
            switch (currentPage.name) {
              case 'RootDetection':
                if (config.isPermitRootScan) {
                  mylog('dbg: click next');
                  myclick(currentPage.actions[1]);
                } else {
                  mylog('dbg: wait human action');
                  longSleep(config.hibernateMS);
                }
                break;
              case 'ScorePage':
                if (state == 22) {
                  mylog('dbg: play end', Date());
                  state = 23;
                }
                if (config.isRecvGift) {
                  if (checkPoint(img, 'RedMail')) {
                    mylog('dbg: click Mail button');
                    myclick(config.points['Mail']);
                    state = 0;
                    break;
                  }
                }
                if (now > nextSendHeartTime) {
                  myclick(currentPage.actions[0]); // Close
                } else if (now > nextPlayTime) {
                  myclick(currentPage.actions[1]); // Play
                }
                break;
              case 'MailBox':
              case 'MailBoxAd':
                if (config.isRecvGift) {
                  if (checkPoint(img, 'RecvFirstMail')) {
                    if (checkPoint(img, 'FirstMailGet')) {
                      gotCoins++;
                    }
                    msgClicks++;
                    mylog('dbg: click First Mail button');
                    myclick(config.points['RecvFirstMail']);
                    sleep(config.animationMS);
                  } else {
                    whyNotPoint(img, 'RecvFirstMail');
                    whyNotPoint(img, 'FirstMailGet');
                    mylog('dbg: click Back, got coins', gotCoins, 'in clicks:', msgClicks);
                    gotCoins = 0;
                    msgClicks = 0;
                    myclick(currentPage.actions[0]);
                  }
                } else {
                  mylog('dbg: click Back');
                  myclick(currentPage.actions[0]);
                }
                break;
              case 'ReceiveGiftHeart':
              case 'PackagePage':
              case 'ReceiveGiftOther':
                if (config.isRecvGift) {
                  myclick(currentPage.actions[1]); // OK/delete
                } else {
                  myclick(currentPage.actions[0]); // Close/Cancel
                }
                break;
              case 'ChooseBonusItem':
                if (config.isRecvGift) {
                  if (checkPoint(img, 'RedMail')) {
                    mylog('dbg: click Mail button');
                    myclick(config.points['Mail']);
                    break;
                  }
                }
                if (config.isSendHeart && now > nextSendHeartTime) {
                  myclick(currentPage.actions[0]);
                } else if (config.isPlay && now > nextPlayTime) {
                  bonusState = getBonusState(img);
                  if (prevBonusState == bonusState) { // check two times
                    prevBonusState = -1;
                    if (clickBonus(bonusState) == 0) {
                      if (config.autoPlayCount == 0 ||
                          config.autoPlayCount > autoPlayCount) {
                        mylog('dbg: bonus OK, click Start ', autoPlayCount);
                        myclick(currentPage.actions[1]);
                        state = 31;
                        autoPlayCount++;
                      } else {
                        mylog('dbg: hibernate');
                        longSleep(config.hibernateMS);
                      }
                    } else {
                      sleep(config.findPageMS);
                      lastFindPageTime = 0;
                      samePageCount = 0;
                    }
                  } else {
                    prevBonusState = bonusState;
                  }
                } else {
                  myclick(currentPage.actions[0]);
                }
                break;
              case 'GamePause':
                if (config.isSendHeart && now > nextSendHeartTime) {
                  myclick(currentPage.actions[0]);
                } else if (config.isPlay && now > nextPlayTime) {
                  myclick(currentPage.actions[1]);
                } else {
                  myclick(currentPage.actions[0]);
                }
                break;
              case 'TsumsMe':
              case 'TsumsOther':
                myclick(currentPage.actions[0]);
                break;
              default:
                mylog('dbg: unknown page');
                break;
            }
            break;
          default: // more than 2 actions
            switch (currentPage.name) {
              case 'GamePlay1':
              case 'GamePlay2':
              case 'GamePlay3':
              case 'GamePlay4':
                if (state == 31) {
                  mylog('dbg: play start', Date());
                  state = 32;
                }
                mylog('dbg: playing', samePageCount);
                myPlay(img);
                break;
              case 'FriendPage':
              case 'FriendPage2':
                if (config.isRecvGift) {
                  if (checkPoint(img, 'RedMail')) {
                    mylog('dbg: click Mail button');
                    myclick(config.points['Mail']);
                    break;
                  }
                }
                if (config.isSendHeart && now > nextSendHeartTime) {
                  mylog('dbg:send heart');
                  if (state != 21) { // send0
                    state = 21;
                    // TODO: init send heart variables
                  }
                } else if (config.isPlay && now > nextPlayTime) {
                  mylog('dbg: click play button');
                  myclick(currentPage.actions[1]); // Play
                }
                break;
              default:
                mylog('dbg: unknown page');
                break;
            }
            break;
        }
      }
    }
    prevCaptureTime = mySleep(config.captureMS, prevCaptureTime);
  }
  if (img != undefined) {
    releaseImage(img);
  }
  mylog('dbg: start() end');
}

/* exported stop */
function stop() {
  mylog('dbg: stop()');
  config.isRunning = false;
  sleep(500); // wait other thread before release memory
  fini();
  mylog('dbg: stop() end');
}
// vim:et sw=2 ts=2 ai
