'use strict;';

var config = {
  // UI options NOTE: keep the same order with settings.js and setupUIOptions()
  isLangZhTW: false,
  isRecvGift: true,
  autoRecvMin: 5, // auto Recv gift  period
  isSendHeart: true,
  autoSendMin: 30, // send heart period
  isPlay: true,
  autoPlayMin: 1, // auto play period
  // autoPlayMin: 24*60, // auto play period
  autoFanSec: 5, // auto fan period
  skillPlayMS: 1000,
  debug: false,

  isBonusScore: false,
  isBonusCoin: false,
  isBonusExp: false,
  isBonusTime: false,
  isBonusBubble: false,
  isBonus5to4: false,

  isAutoLaunch: false,
  isPermitRootScan: true,
  hibernateSec: 10, // check app on per 10s
  maxOutOfGameSec: 3000, // if out of game for 3s, switch to hibernate mode
  appOnChkMS: 500, // check per 0.5s
  findPageMS: 100, // call findPage() per 0.1s
  waitUnknownMS: 1000, // wait 1 second before click on unknown page
  captureMS: 50, // sleep per 0.05 second before capture screen
  testFile: '', // test file which can't assigned by UI
  uiOptionCount: 25, // count of UI options

  // globals (default value at compile time)
  appName: 'com.twpda.tsum',
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
  tsumWidth: 25,
  // for draw different circles
  groupColors: [[255, 0, 0], [0, 255, 0], [0, 0, 255], [0, 255, 255],
    [255, 0, 255], [255, 255, 0]],
  runTimes: 0, // keep count of screenshots count
  skillOnCount: 0,
  snapCount: 1, // capture image myPlay() runtime per snapCount
  friendGridHeight: 196,

  nextChkAppOnTime: 0,
  outOfGameCount: 0,
  firstOutOfGameTime: 0,
  lastAppOnStatus: false,
  prevPage: {name: '', actions: []},
  currentPage: {name: '', actions: []},
  diffScore: 0.9,
  nextRecvTime: 0,
  nextSendTime: 0,
  nextPlayTime: 0,
  nextFanTime: 0,
  initRecvTime: 0,
  initSendTime: 0,
  initPlayTime: 0,
  gotCoins: 0,
  msgClicks: 0,
  prevImg: 0,
  img: 0,
  endSendCount: 0,
  endRecvCount: 0,
  isPlaying: false, // when playing disable diff color check to save 0.5 ms

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
    'Close1': {x: 645, y: 1080, r: 239, g: 174, b: 8}, // yellow Close of error code page
    'Close2': {x: 540, y: 1329, r: 247, g: 190, b: 16}, // yellow Close of PackageInfo
    'Close3': {x: 550, y: 1581, r: 238, g: 187, b: 10}, // yellow Close of MailBoxNoMessage
    'Close4': {x: 563, y: 1581, r: 247, g: 194, b: 8}, // yellow Close of Login Bonus page
    'Close5': {x: 382, y: 1612, r: 239, g: 182, b: 8}, // yellow Close of OptionsPage
    // yellow Close of OptionsPage
    'SkillOn1': {x: 137, y: 1555, r: 255, g: 255, b: 247}, // white MyTsum button 11 clock part
    'SkillOn2': {x: 137, y: 1555, r: 247, g: 219, b: 25}, // light yellow to dark MyTsum button 11 clock part
    'SkillOff1': {x: 137, y: 1555, r: 85, g: 112, b: 157},
    'SkillOff2': {x: 137, y: 1555, r: 72, g: 139, b: 181},
    'SkillOff3': {x: 137, y: 1555, r: 16, g: 73, b: 128},
    'SkillOff4': {x: 137, y: 1555, r: 3, g: 153, b: 178},
    // 'SkillOn1': {x: 151, y: 1560, r: 247, g: 219, b: 247}, // white MyTsum button 11 clock part
    // 'SkillOn2': {x: 151, y: 1560, r: 247, g: 219, b: 25}, // light yellow to dark MyTsum button 11 clock part
    'HeartWhite1': {x: 910, y: 689, r: 253, g: 253, b: 253}, // white first heart on friend page
    'HeartYellow1': {x: 910, y: 689, r: 239, g: 189, b: 16}, // yellow first heart on friend page
    'HeartRed1': {x: 910, y: 689, r: 255, g: 105, b: 140}, // red first heart on friend page
    'ZeroScore1': {x: 550, y: 689, r: 49, g: 85, b: 140}, // blue zero score of 1st
    'HeartBlue1': {x: 910, y: 689, r: 41, g: 69, b: 115}, // blue first heart on friend page
    'HeartEnd1': {x: 550, y: 689, r: 33, g: 117, b: 197}, // 1st light blue frame of heart

    'outReceiveOk': {x: 835, y: 1092, r: 236, g: 175, b: 6}, // dark yellow ? left of send heart button
    'outSendHeartFrom': {x: 910, y: 562},
    'outSendHeartTo': {x: 910, y: 1352},
    'outSendHeart0': {x: 910, y: 698, r: 209, g: 60, b: 142}, // pink center of send heart button
    'outSendHeart02': {x: 910, y: 698, r: 3, g: 65, b: 140}, // dark blue center of send heart button
    'outFriendScoreFrom': {x: 550, y: 935, r: 55, g: 93, b: 140}, // dark blue left of score number
    'outFriendScoreTo': {x: 760, y: 935}, // right of score number before last digit
    // 'outSendHeartEnd': {x: 227, y: 1262, r: 44, g: 78, b: 123}, // dark blue on ranking?
    // 'outSendHeartEnd2': {x: 316, y: 1224, r: 55, g: 91, b: 139}, // dark blue on portrait icon?
    'outSendHeartEnd1': {x: 173, y: 1266, r: 44, g: 78, b: 123}, // dark blue on ranking
    'outSendHeartEnd2': {x: 173, y: 1266+30, r: 44, g: 78, b: 123}, // dark blue on ranking
    'outSendHeartEnd3': {x: 173, y: 1266+60, r: 44, g: 78, b: 123}, // dark blue on ranking
    'outSendHeartEnd4': {x: 173, y: 1266+90, r: 44, g: 78, b: 123}, // dark blue on ranking
    'outSendHeartEnd5': {x: 316, y: 1266, r: 55, g: 91, b: 139}, // dark blue on portrait icon
    'outSendHeartEnd6': {x: 316, y: 1266+30, r: 55, g: 91, b: 139}, // dark blue on portrait icon
    'outSendHeartEnd7': {x: 316, y: 1266+60, r: 55, g: 91, b: 139}, // dark blue on portrait icon
    'outSendHeartEnd8': {x: 316, y: 1266+90, r: 55, g: 91, b: 139}, // dark blue on portrait icon
  },

  pagePixels: [{ // sort by action sequence, y, x, comment with color, position, button
    // check Game Play at first priority
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
  }, {
    // ZERO ACTIONS PAGES
    name: 'Get30000Coins',
    colors: [
      {x: 122, y: 620, r: 52, g: 209, b: 254, match: true, threshold: 60}, // blue top
      {x: 201, y: 686, r: 255, g: 255, b: 255, match: true, threshold: 60}, // white
      {x: 184, y: 1101, r: 78, g: 204, b: 15, match: true, threshold: 60}, // green Login Line
      {x: 208, y: 1626, r: 255, g: 255, b: 255, match: true, threshold: 60}, // white
    ],
    actions: [],
  }, {
    // ONE ACTIONS PAGES => always click

    name: 'ChooseLanguage',
    colors: [
      {x: 777, y: 208, r: 255, g: 255, b: 255, match: true, threshold: 60}, // white Language button left edge
      {x: 956, y: 212, r: 156, g: 158, b: 156, match: true, threshold: 60}, // gray Language button right triangle
      {x: 553, y: 1539, r: 247, g: 190, b: 16, match: true, threshold: 60}, // yellow to Start button's top
    ],
    actions: [{x: 553, y: 1539}],
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
  }, {
    name: 'NotEnoughHearts',
    colors: [
      {x: 541, y: 550, r: 33, g: 190, b: 230, match: true, threshold: 60}, // blue frame
      {x: 117, y: 961, r: 239, g: 171, b: 11, match: true, threshold: 60}, // yellow Buy with Rubies button
      {x: 618, y: 961, r: 239, g: 171, b: 11, match: true, threshold: 60}, // yellow Ask Friends button
      {x: 541, y: 1203, r: 33, g: 190, b: 230, match: true, threshold: 60}, // blue frame
      {x: 538, y: 1329, r: 247, g: 190, b: 16, match: true, threshold: 60}, // yellow Close button
    ],
    actions: [{x: 538, y: 1329}], // Close
  }, {
    name: 'MagicalTime',
    colors: [
      {x: 541, y: 544, r: 33, g: 190, b: 230, match: true, threshold: 60}, // blue frame
      {x: 204, y: 1355, r: 239, g: 171, b: 11, match: true, threshold: 60}, // yellow Cancel button
      {x: 673, y: 1355, r: 239, g: 171, b: 11, match: true, threshold: 60}, // yellow OK button
      {x: 541, y: 1491, r: 33, g: 190, b: 230, match: true, threshold: 60}, // blue frame
    ],
    actions: [{x: 204, y: 1355}], // Cancel
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
      // {x: 153, y: 380, r: 222, g: 61, b: 148, match: true, threshold: 60}, // first red heart, not work on 5th years
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
      {x: 698, y: 464, r: 244, g: 249, b: 243, match: true, threshold: 60}, // left top of the ranking time
      {x: 187, y: 1599, r: 240, g: 218, b: 72, match: true, threshold: 60}, // top of the card button
      {x: 540, y: 1592, r: 246, g: 135, b: 17, match: true, threshold: 60}, // top of the start button
      {x: 799, y: 1653, r: 232, g: 170, b: 7, match: true, threshold: 60}, // left of the myTsum button
    ],
    actions: [{x: 187, y: 1599}, {x: 540, y: 1592}, {x: 799, y: 1653}], // Card, Play, MyTsum
  }],
};

function setupUIOptions(args) {
  if (args.length != config.uiOptionCount) {
    mylog('dbg: setupUIOptions length invalid', args.length);
    return false;
  }
  var i=0;
  config.isLangZhTW = args[i++];
  config.isRecvGift = args[i++];
  config.autoRecvMin = args[i++];
  config.isSendHeart = args[i++];
  config.autoSendMin = args[i++];
  config.isPlay = args[i++];
  config.autoPlayMin = args[i++];
  config.autoFanSec = args[i++];
  config.skillPlayMS = args[i++];
  config.debug = args[i++];

  config.isBonusScore = args[i++];
  config.isBonusCoin = args[i++];
  config.isBonusExp = args[i++];
  config.isBonusTime = args[i++];
  config.isBonusBubble = args[i++];
  config.isBonus5to4 = args[i++];

  config.isAutoLaunch = args[i++];
  config.isPermitRootScan = args[i++];
  config.hibernateSec = args[i++];
  config.maxOutOfGameSec = args[i++];
  config.appOnChkMS = args[i++];
  config.findPageMS = args[i++];
  config.waitUnknownMS = args[i++];
  config.captureMS = args[i++];
  config.testFile = args[i++];

  if (i != config.uiOptionCount) {
    mylog('dbg: setupUIOptions count invalid', config.uiOptionCount, i);
    return false;
  }
  return true;
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
  config.playOffsetY = (config.appHeight - config.appWidth)/2 +
    1*config.tsumWidth;
  config.playWidth = config.appWidth;
  config.playHeight= config.appWidth;
  config.sendHeartCount = 0;
  config.tsumCount = 5;
  if (config.isBonus5to4) {
    config.tsumCount = 4;
  }

  if (args !== undefined) {
    if (!setupUIOptions(args)) {
      stop();
      return false;
    }
  } else {
    mylog('dbg: no arguments of start(), use default');
  }
  config.isRunning = true;
  return true;
};

function fini() {
  if (config.img !== 0) {
    releaseImage(config.img);
    config.img = 0;
  }
  if (config.prevImg !== 0) {
    releaseImage(config.prevImg);
    config.prevImg = 0;
  }
}

// remove RBM 0.0.3's log delay time
// RBM.prototype.log = function() {
function mylog() {
  for (var i in arguments) {
    if (typeof arguments[i] == 'object') {
      arguments[i] = JSON.stringify(arguments[i]);
    }
  }
  console.log.apply(console, arguments);
};


// patch for BOOTCLASSPATH of RBM 0.0.3
function myStartApp(packageName, activityName) {
  var path = 'BOOTCLASSPATH=/system/framework/core.jar:/system/framework/conscrypt.jar:/system/framework/okhttp.jar:/system/framework/core-junit.jar:/system/framework/bouncycastle.jar:/system/framework/ext.jar:/system/framework/framework.jar:/system/framework/framework2.jar:/system/framework/telephony-common.jar:/system/framework/voip-common.jar:/system/framework/mms-common.jar:/system/framework/android.policy.jar:/system/framework/services.jar:/system/framework/apache-xml.jar:/system/framework/webviewchromium.jar';
  return execute(path + ' am start -n ' + packageName + '/' + activityName);
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

function isSameColor(c1, c2, diff) {
  if (diff == undefined) {
    diff = 20;
  }
  // mylog('dbg:');
  if (Math.abs(c1.r - c2.r) > diff) {
    return false;
  }
  if (Math.abs(c1.g - c2.g) > diff) {
    return false;
  }
  if (Math.abs(c1.b - c2.b) > diff) {
    return false;
  }
  return true;
}

function findPage() {
  var result = [];
  var names = [];
  var page;
  for (var p = 0; p < config.pagePixels.length; p++) {
    page = config.pagePixels[p];
    var i;
    for (i=0; i<page.colors.length; i++) {
      var pcolor = page.colors[i];
      var pxcolor = getColor(config.img, pcolor);
      var diff = myDiffColor(pcolor, pxcolor);
      if ((pcolor.match && diff >= pcolor.threshold) ||
        (!pcolor.match && diff < pcolor.threshold)) {
        break;
      }
    }
    if (i == page.colors.length) {
      result.push(page);
      names.push(page.name);
      if (config.isPlaying) {
        break;
      }
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

function myClick(xy) {
  var xy = mappingXY(xy);
  tap(xy.x, xy.y, config.during);
};

function clickBonus(bonusState) {
  var clickCount = 0;
  if ((bonusState & 1) == (config.bonusState & 1)) {
    mylog('dbg: click BonusScore');
    myClick(config.points['BonusScore']);
    clickCount++;
  };
  if ((bonusState & 2) == (config.bonusState & 2)) {
    mylog('dbg: click BonusCoin');
    myClick(config.points['BonusCoin']);
    clickCount++;
  };
  if ((bonusState & 4) == (config.bonusState & 4)) {
    mylog('dbg: click BonusExp');
    myClick(config.points['BonusExp']);
    clickCount++;
  };
  if ((bonusState & 8) == (config.bonusState & 8)) {
    mylog('dbg: click BonusTime');
    myClick(config.points['BonusTime']);
    clickCount++;
  };
  if ((bonusState & 16) == (config.bonusState & 16)) {
    mylog('dbg: click BonusBubble');
    myClick(config.points['BonusBubble']);
    clickCount++;
  };
  if ((bonusState & 32) == (config.bonusState & 32)) {
    mylog('dbg: click Bonus5to4');
    myClick(config.points['Bonus5to4']);
    clickCount++;
  };
  if (clickCount > 0) {
    longSleep(config.animationMS);
  }
  return clickCount;
};

function clickUnknown() {
  // saveImg('dbg:', config.img, 'NotEnoughHearts');
  // whyNotPage(config.img, 'NotEnoughHearts');
  // whyNotPage(config.img, 'Get30000Coins');

  config.nextChkAppOnTime = 0; // force check again
  longSleep(config.animationMS);
  if (!chkAppOn()) {
    mylog('dbg: out of game');
    return;
  }
  mylog('dbg: try click yellow button if found');
  var buttons = ['Close5', 'Close4', 'Close3', 'Close2', 'Close1'];
  for (var i in buttons) {
    if (checkPoint(config.img, buttons[i])) {
      mylog('dbg: click', buttons[i]);
      myClick(config.points[buttons[i]]);
      longSleep(config.animationMS);
      return;
    }
  }
  mylog('dbg: click screen center');
  myClick({x: config.oriScreenWidth/2, y: config.oriScreenHeight/2});
  longSleep(config.animationMS);
};

function longSleep(ms) {
  var maxSleepMS = 500; ;
  while (ms > 0) {
    if (!config.isRunning) {
      break;
    }
    if (ms >= maxSleepMS) {
      sleep(maxSleepMS);
      ms -= maxSleepMS;
    } else {
      sleep(ms);
      break;
    }
  }
};

function linkTsums(path) {
  for (var j in path) {
    var point = path[j];
    var x = Math.floor(config.playOffsetX + (point.x + config.tsumWidth / 2) * config.playWidth / config.playResizeWidth);
    var y = Math.floor(config.playOffsetY + (point.y + config.tsumWidth / 2) * config.playHeight / config.playResizeHeight);
    if (j == 0) {
      tapDown(x, y, 10);
    }
    moveTo(x, y, 10);
    if (j == path.length - 1) {
      tapUp(x, y, 10);
    }
  }
};

function clickLinks(paths) {
  var isBubble = false;
  for (var i in paths) {
    var path = paths[i];
    if (path.length > 7) {
      isBubble = true;
    }
    linkTsums(path);
  }
  return isBubble;
};

function checkSkillON(img) {
  var result = true;
  for (var i=1; i<=4; i++) {
    if (checkPoint(img, 'SkillOff'+i)) {
      result = false;
      break;
    }
  }
  /*
  if (checkPoint(img, 'SkillOn1') || checkPoint(img, 'SkillOn2')) {
    config.skillOnCount++;
    if (config.skillOnCount >= 2) {
      result = true;
    }
  } else {
    config.skillOnCount= 0;
  }
  */
  mylog('dbg: check skillCount', config.skillOnCount);
  return result;
};

function myRecv(now) {
  mylog('dbg: myRecv');
  if (config.isRecvGift) {
    if (config.initRecvTime == 0) {
      config.initRecvTime = now;
    }
    if (checkPoint(config.img, 'RecvFirstMail')) {
      if (checkPoint(config.img, 'FirstMailGet')) {
        config.gotCoins++;
      }
      config.msgClicks++;
      mylog('dbg: click First Mail button');
      myClick(config.points['RecvFirstMail']);
      longSleep(config.animationMS);
    } else {
      // whyNotPoint(config.img, 'RecvFirstMail');
      // whyNotPoint(config.img, 'FirstMailGet');
      mylog('dbg: click Back, got coins', gotCoins, 'in clicks:', config.msgClicks);
      myClick(config.currentPage.actions[0]);
    }
  } else {
    mylog('dbg: click Back');
    myClick(config.currentPage.actions[0]);
  }
}

function mySend(now) {
  mylog('dbg: mySend');
  switch (config.currentPage.name) {
    case 'FriendPage':
      if (config.initSendTime == 0) {
        config.initSendTime = now;
        config.sendHeartCount = 0;
        toTopFriendPage();
      }
      if (sendHearts(now)) { // true for end
        var s = (Date.now() - config.initSendTime)/1000;
        config.nextSendTime = config.initSendTime +
              config.autoSendMin * 60* 1000;
        mylog('dbg: send heart time(s):', s, 'hearts:',
            config.sendHeartCount, 'avg/min=', config.sendHeartCount / s * 60,
            'nextSendTime=', new Date(config.nextSendTime));
        config.initSendTime = 0;
      }
      break;
    case 'PackagePage':
    case 'ReceiveGiftHeart':
    case 'ReceiveGiftOther':
      myClick(config.currentPage.actions[1]); // OK/delete
      longSleep(config.animationMS);
      break;
    case 'ChooseBonusItem':
    case 'ScorePage':
      myClick(config.currentPage.actions[0]); // back
      longSleep(config.animationMS);
      break;
    case 'TsumsOther':
    case 'TsumsMe':
      userPlay('dbg:', now);
      break;
    case 'GamePlay1':
    case 'GamePlay2':
    case 'GamePlay3':
    case 'GamePlay4':
      mylog('dbg: wait game over for manual play');
      longSleep(config.hibernateSec * 1000);
      break;
    default:
      // mylog('dbg: invalid logic');
      keepImgLog('dbg:', 'invalid.'+ config.currentPage.name, 1);
      sleep(config.hibernateSec*1000);
      break;
  }
}

function clickFan(now) {
  myClick(config.currentPage.actions[2]); // click Fan
  longSleep(config.animationMS);
  myClick(config.currentPage.actions[2]); // click Fan
  longSleep(config.animationMS);
  config.nextFanTime = Date.now() + config.autoFanSec * 1000;
}

function myPlay(now) {
  mylog('dbg: myPlay');
  config.isPlaying = false;
  switch (config.currentPage.name) {
    case 'FriendPage':
      mylog('dbg: click play button');
      myClick(config.currentPage.actions[1]); // Play
      longSleep(config.animationMS);
      break;
    case 'ChooseBonusItem':
      var bonusState = getBonusState(config.img);
      if (clickBonus(bonusState) == 0) {
        mylog('dbg: bonus OK, click Start');
        myClick(config.currentPage.actions[1]);
        longSleep(1000);
        config.isPlaying = true;
      }
      break;
    case 'GamePlay1':
    case 'GamePlay2':
    case 'GamePlay3':
    case 'GamePlay4':
      if (config.initPlayTime == 0) {
        config.initPlayTime = now;
        config.nextFanTime = now + config.autoFanSec * 1000;
        config.runTimes = 0;
        longSleep(500);
        mylog('dbg: play start', Date());
      }
      config.isPlaying = true;
      config.runTimes++;
      /*
      if (config.debug && config.runTimes >= 2) { // TODO: remove
        stop();
        break;
      }
      */
      if (checkSkillON(config.img)) {
        // keepImgLog('dbg:', 'skill', 1);
        myClick(config.currentPage.actions[1]); // click MyTsum to use skill
        longSleep(config.skillPlayMS);
      } else if (now > config.nextFanTime) {
        clickFan(now);
      } else {
        board = scanBoard(config.img);
        var paths = calculatePaths(board);
        paths = paths.splice(0, 6); // don't generate bubble
        if (paths.length >= 3) {
          clickLinks(paths);
        } else {
          // TODO: find bubbles, click bubbles, keep at most 2 bubbles.
          mylog('dbg: not found, click fan');
          clickFan(now);
        }
      }
      break;
    case 'ScorePage':
      mylog('dbg: play end', Date());
      if (config.initPlayTime !== 0) {
        config.nextPlayTime = config.initPlayTime + config.autoPlayMin * 60 * 1000;
        mylog('dbg: play time(s):', (Date.now() - config.initPlayTime)/1000,
            'nextPlayTime:', new Date(config.nextPlayTime));
        config.initPlayTime = 0;
      }
      // TODO: if want to crazy play, click play
      myClick(config.currentPage.actions[0]); // Close
      // myClick(config.currentPage.actions[1]); // Play
      longSleep(config.animationMS);
      break;
    case 'TsumsMe':
    case 'TsumsOther':
      userPlay('dbg:', now);
      break;
    default:
      keepImgLog('dbg:', 'invalid.'+ config.currentPage.name, 1);
      sleep(config.hibernateSec*1000);
      break;
  }
}

function findTsums(img) {
  var hsvImg = clone(img);
  // ref: /usr/include/opencv4/opencv2/imgproc/imgproc.hpp for CV_BLUR
  // ref: /usr/include/opencv4/opencv2/imgproc/types_c.h for CV_RGB2HSV
  smooth(hsvImg, 1, 7); // CV_BLUR with size 7 filter
  // saveImage(hsvImg, config.storagePath + '/tmp/f1_blur.png');
  convertColor(hsvImg, 40); // CV_BGR2HSV
  // saveImage(hsvImg, config.storagePath + '/tmp/f1_blur_bgrhsv.png');

  /* debug purpose begin
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
  */


  // H<80 or H>120,  S<160 or S>255, V<20 or V>210
  var filter1 = outRange(hsvImg, 80, 160, 20, 0, 120, 255, 210, 255);
  // saveImage(filter1, config.storagePath + '/tmp/f2_filter1.png');
  // H<80 or H>130,  S<100 or S>170, V<90 or V>190
  var filter2 = outRange(filter1, 80, 100, 90, 0, 130, 170, 190, 255);
  // saveImage(filter2, config.storagePath + '/tmp/f3_filter2.png');
  releaseImage(filter1);
  // var filter2 = outRange(hsvImg, 80, 100, 20, 0, 120, 255, 210, 255);
  // saveImage(filter2, config.storagePath + '/tmp/f3_filter2.png');
  var mask = bgrToGray(filter2);
  // saveImage(mask, config.storagePath + '/tmp/f4_bgrtogray.png');

  releaseImage(filter2);

  // method:(3 = CV_HOUGH_GRADIENT)
  // dp:1 float, ratio between input image and input params.
  // minDist:22 float, min distance between circles
  // p1: 4 float, canny parameter
  // p2: 7 float, canny parameter
  // minR:8 int, min radius
  // maxR:14 int, max radius
  // if search 0.5w ~ 1w, will found too many wrong circles
  var points = houghCircles(mask, 3, 1, config.tsumWidth, 4, 7,
      config.tsumWidth/3, config.tsumWidth/2);
  smooth(hsvImg, 1, 22); // smooth more
  // saveImage(mask, config.storagePath + '/tmp/f5_blurmore.png');
  var circleImg=0;
  if (config.debug && (config.runTimes % config.snapCount)==0) {
    circleImg = clone(img);
  }
  var results = [];
  for (var k in points) {
    var p = points[k];
    if (config.debug && (config.runTimes % config.snapCount)==0) {
      mylog('dbg:');
      drawCircle(circleImg, p.x, p.y, p.r, 255, 0, 0, 0); // draw red circle
    }
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
    // mylog('dbg:');
    var avgr = (hsv1.r + hsv2.r + hsv3.r + hsv4.r + hsv5.r) / 5;
    results.push({x: p.x, y: p.y, z: p.r, b: avgb, g: avgg, r: avgr});
  }
  if (config.debug && (config.runTimes % config.snapCount)==0) {
    saveImage(circleImg, config.storagePath + '/tmp/' + config.runTimes + '_found.png');
  }
  if (circleImg !== 0) {
    releaseImage(circleImg);
  }
  releaseImage(mask);
  releaseImage(hsvImg);
  return results;
}

/* exported findBubbles */
function findBubbles(img) {
  var grayImg = clone(img);
  smooth(grayImg, 2, 7); // CV_GAUSSIAN with size 7 filter
  var hsvImg = clone(grayImg);
  convertColor(grayImg, 6); // CV_BGR2GRAY
  convertColor(hsvImg, 40); // CV_BGR2HSV
  var points = houghCircles(grayImg, 3, 1, config.tsumWidth, 4, 7,
      config.tsumWidth/2, config.tsumWidth);
  var circleImg = 0;
  if (config.debug && (config.runTimes % config.snapCount)==0) {
    circleImg = clone(img);
  }
  var results = [];
  for (var k in points) {
    var p = points[k];
    if (config.debug && (config.runTimes % config.snapCount)==0) {
      mylog('dbg:');
      drawCircle(circleImg, p.x, p.y, p.r, 255, 0, 0, 0); // draw red circle
    }
    // get 5 point avg color as
    var rgb0 = getImageColor(img, p.x, p.y);
    var hsv0 = getImageColor(hsvImg, p.x, p.y);
    var rgbU = rgb0; var rgbD = rgb0; var rgbL = rgb0; var rgbR = rgb0;
    var hsvU = hsv0; var hsvD = hsv0; var hsvL = hsv0; var hsvR = hsv0;
    if (p.y >= 1) {
      rgbU = getImageColor(img, p.x, p.y - 1);
      hsvU = getImageColor(hsvImg, p.x, p.y - 1);
    }
    if (p.y + 1 < 200) {
      rgbD = getImageColor(img, p.x, p.y + 1);
      hsvD = getImageColor(hsvImg, p.x, p.y + 1);
    }
    if (p.x >= 1) {
      rgbL = getImageColor(img, p.x - 1, p.y);
      hsvL = getImageColor(hsvImg, p.x - 1, p.y);
    }
    if (p.x + 1 < 200) {
      rgbR = getImageColor(img, p.x + 1, p.y);
      hsvR = getImageColor(hsvImg, p.x + 1, p.y);
    }
    mylog('dbg:');
    var result = {x: p.x, y: p.y, z: p.r,
      r: (rgb0.r + rgbU.r + rgbD.r + rgbL.r + rgbR.r)/5,
      g: (rgb0.g + rgbU.g + rgbD.g + rgbL.g + rgbR.g)/5,
      b: (rgb0.b + rgbU.b + rgbD.b + rgbL.b + rgbR.b)/5,
      r: (hsv0.r + hsvU.r + hsvD.r + hsvL.r + hsvR.r)/5,
      g: (hsv0.g + hsvU.g + hsvD.g + hsvL.g + hsvR.g)/5,
      b: (hsv0.b + hsvU.b + hsvD.b + hsvL.b + hsvR.b)/5};
    mylog('dbg:', k, result);
    results.push(result);
  }
  if (config.debug && (config.runTimes % config.snapCount)==0) {
    saveImage(circleImg, config.storagePath + '/tmp/' + config.runTimes + '_bubble.png');
  }
  if (circleImg !== 0) {
    releaseImage(circleImg);
  }
  releaseImage(hsvImg);
  releaseImage(grayImg);
  return results;
}

// ref: https://stackoverflow.com/questions/35113979/calculate-distance-between-colors-in-hsv-space
function distanceHSV(p1, p2) {
  // Note: here the .b, .g, .r is HSV
  /*
  var dh = Math.abs(p1.b - p2.b);
  dh = Math.min(dh, 256-dh)*2; // hue range from 0~255, after min range in 0~128
  mylog('dbg:');
  var d = Math.sqrt(dh*dh + (p1.g-p2.g)*(p1.g-p2.g) + (p1.r-p2.r)*(p1.r-p2.r));
  if (dh < 20) {
    d -= 10;
  }
  */
  var d = Math.sqrt((p1.b-p2.b)*(p1.b-p2.b) + (p1.g-p2.g)*(p1.g-p2.g) + (p1.r-p2.r)*(p1.r-p2.r));
  if (Math.abs(p1.b - p2.b) < 20) {
    d -= 10;
  }
  if (Math.abs(p1.g - p2.g) < 20) {
    d -= 10;
  }
  // mylog('dbg:');
  if (p1.r < 120 && p2.r < 120) {
    d -= 20;
  }
  return d;
}

function classifyTsums(points) {
  var tcs = [];
  if (points.length === 0) {
    return tcs;
  }
  var p = points[0];
  // mylog('dbg:');
  tcs.push({sumb: p.b, sumg: p.g, sumr: p.r, b: p.b, g: p.g, r: p.r, points: [p]});
  for (var i in points) {
    var p = points[i];
    var isSame = false;
    for (var j in tcs) {
      var tc = tcs[j];
      var d = distanceHSV(tc, p);
      if (d < 15) {
        var count = tc.points.length + 1;
        isSame = true;
        // mylog('dbg:');
        tc.sumb += p.b; tc.sumg += p.g; tc.sumr += p.r;
        tc.b = tc.sumb/count; tc.g = tc.sumg/count; tc.r = tc.sumr/count;
        tc.points.push(p);
        break;
      }
    }
    if (!isSame) {
      // mylog('dbg:');
      tcs.push({sumb: p.b, sumg: p.g, sumr: p.r, b: p.b, g: p.g, r: p.r, points: [p]});
    }
  }
  if (tcs.length > config.tsumCount) {
    mylog('dbg: Tsum groups count:', tcs.length);
  }
  return tcs;
}

function getDistance(t1, t2) {
  // return Math.sqrt((t1.x - t2.x) * (t1.x - t2.x) + (t1.y - t2.y) * (t1.y - t2.y));
  return (t1.x - t2.x) * (t1.x - t2.x) + (t1.y - t2.y) * (t1.y - t2.y);
}

function findNearTsum(tsum, tsums) {
  var minDis = 99999;
  var minTsum = null;
  var idx = -1;
  for (var i in tsums) {
    var dis = getDistance(tsum, tsums[i]);
    if (dis < minDis) {
      minDis = dis;
      minTsum = tsums[i];
      idx = i;
    }
  }
  minDis = Math.sqrt(minDis);
  return {dis: minDis, tsum: minTsum, idx: idx};
}

function calculateNearTsumPaths(tsum, ts) {
  var path = [];
  var tsums = ts.slice(); // copy array
  while (true) {
    var result = findNearTsum(tsum, tsums);
    var minDis = result.dis;
    var minTsum = result.tsum;
    var minIdx = result.idx;
    if (minIdx == -1 || minDis > config.tsumWidth * 2.8) {
      break;
    }
    tsum = minTsum;
    tsums.splice(minIdx, 1);
    path.push(tsum);
  }
  return path;
}

function calculatePathCenter(path) {
  var cx = 0;
  var cy = 0;
  for (var i in path) {
    cx += path[i].x;
    cy += path[i].y;
  }
  return {x: Math.floor(cx / path.length), y: Math.floor(cy / path.length)};
}

function calculatePaths(board) {
  var tsums = {};
  for (var i in board) {
    var tsum = board[i];
    if (tsums[tsum.tsumIdx] == undefined) { // Why?
      tsums[tsum.tsumIdx] = [];
    }
    tsums[tsum.tsumIdx].push(tsum);
  }

  var centers = {};
  var paths = [];

  for (var tsumIdx in tsums) {
    for (var i = 0; i < tsums[tsumIdx].length; i++) {
      var path = calculateNearTsumPaths(tsums[tsumIdx][i], tsums[tsumIdx]);
      if (path.length > 2) {
        var c = calculatePathCenter(path);
        if (centers[c.x] == c.y) {
          // path already exists
        } else {
          centers[c.x] = c.y;
          paths.push(path);
          // console.log(runTimes, tsumIdx, path.length, c.x, c.y, JSON.stringify(path));
        }
      } else {
        tsums[tsumIdx].splice(i, 1);
        i--;
      }
    }
  }

  paths.sort(function(a, b) {
    if (a.length < b.length) {
      return 1;
    }
    return -1;
  });
  mylog('dbg: paths.length=', paths.length);
  return paths;
}

function scanBoard(img) {
  var startTime = Date.now();
  var playImg = cropImage(img,
      config.playOffsetX*config.resizeFactor,
      config.playOffsetY*config.resizeFactor,
      config.playWidth*config.resizeFactor,
      config.playHeight*config.resizeFactor);
  var srcImg = resizeImage(playImg, config.playResizeWidth,
      config.playResizeHeight);
  if (config.debug && (config.runTimes % config.snapCount)==0) {
    saveImage(img, config.storagePath + '/tmp/' + config.runTimes + '_page.png');
    saveImage(playImg, config.storagePath + '/tmp/' + config.runTimes + '_play.png');
    saveImage(srcImg, config.storagePath + '/tmp/' + config.runTimes + '_200.png');
  }
  releaseImage(playImg);

  var points = findTsums(srcImg);
  //  var points2 = findBubbles(srcImg);
  //  mylog('dbg: Tsums:', points.length, 'Bubbles:', points2.length);
  var tcs = classifyTsums(points);
  tcs.sort(function(a, b) {
    return a.points.length > b.points.length ? -1: 1;
  });
  if (config.debug) {
    for (var i in tcs) {
      mylog('dbg: i', i, 'path.len=', tcs[i].points.length);
    }
  }
  var board = [];
  for (var i in tcs) {
    if (i >= config.tsumCount) {
      break;
    }
    var tc = tcs[i];
    for (var j in tc.points) {
      var p = tc.points[j];
      board.push({tsumIdx: i, x: p.x - (config.tsumWidth / 2), y: p.y - (config.tsumWidth / 2)});
      if (config.debug && (config.runTimes % config.snapCount)==0) {
        drawCircle(srcImg, p.x, p.y, p.z, /* config.tsumWidth/2, */
            config.groupColors[i][0],
            config.groupColors[i][1], config.groupColors[i][2], 0);
      }
    }
  }
  if (config.debug && (config.runTimes % config.snapCount)==0) {
    saveImage(srcImg, config.storagePath + '/tmp/' + config.runTimes + '_board.png');
  }
  releaseImage(srcImg);
  mylog('dbg: board length', board.length, 'recognition Time',
      Date.now() - startTime);
  return board;
};

function genImgFileName(name, i) {
  var now=Date.now();
  var d=new Date(now);
  if (i === undefined) {
    return config.storagePath + '/tmp/' +
      ('0' + d.getMinutes()).slice(-2) + ('0' + d.getSeconds()).slice(-2) +
      '.' + ('000' + now % 1000).slice(-3) + '.' + name + '.png';
  }
  return config.storagePath + '/tmp/' +
    ('0' + d.getMinutes()).slice(-2) + ('0' + d.getSeconds()).slice(-2) +
    '.' + ('000' + now % 1000).slice(-3) + '.' + name + '.' + i + '.png';
}

/* exported saveImg */
function saveImg(srcLineNo, img, name) {
  var fileName = genImgFileName(name);
  mylog(srcLineNo, 'saveImg:', fileName);
  saveImage(img, fileName);
}

// keepImgLog keep count images per 0.5 seconds
// eg. keepImgLog('dbg:','f', 2) -> mmss.sss.name.1.png, mmss.sss.name.2.png
/* exported keepImgLog */
function keepImgLog(srcLineNo, name, count) {
  var startTime = Date.now();
  for (var i=1; i<=count; i++) {
    var filename = genImgFileName(name, i);
    var img = getScreenshotModify(0, 0, config.appWidth, config.appHeight,
        config.resizeAppWidth, config.resizeAppHeight, config.imageQuality);
    mylog(srcLineNo, 'keepImgLog:', filename);
    saveImage(img, filename);
    if (count > 1) {
      startTime = mySleep(500, startTime);
    }
  }
}

/* exported toTopFriendPage */
function toTopFriendPage() {
  mylog('dbg: to top friend page');
  var xy = mappingXY(config.points['HeartRed1']);
  tapDown(xy.x, xy.y, 100);
  moveTo(xy.x, xy.y, 100);
  moveTo(xy.x, 350000, 100);
  tapUp(xy.x, 350000, 100);
  longSleep(1500);
}

function toNextFriendPage() {
  mylog('dbg: move up 4 times grid height');
  var xy = mappingXY(config.points['HeartRed1']);
  var dy = config.friendGridHeight;
  var y = xy.y+dy*3;
  tapDown(xy.x, y, 100);
  moveTo(xy.x, y, 100);
  moveTo(xy.x, y-dy*3.2, 100);
  tapUp(xy.x, y-dy*3.2, 100);
  longSleep(config.animationMS);
}

// return offY if it is similar color from (x,y+dy)~(x,y+dy-offY)
// otherwise return -1
// if isMatch is true, then return first match point offset
// if isMatch is false, then return first NOT match point offset
// NOTE: dy, offY, return value are in original capture pixel unit
/* exported chkUpPoints */
function chkUpPoints(pointName, dy, offY, isMatch) {
  var pcolor = config.points[pointName];
  var rxy = mappingResizeXY(pcolor);
  offY *= config.resizeFactor;
  dy *= config.resizeFactor;
  for (var y=0; y<offY; y++) {
    var pxcolor = getImageColor(config.img, rxy.x, rxy.y+dy-y);
    var diff = myDiffColor(pcolor, pxcolor);
    // mylog('dbg: diff=', diff, 'x=', rxy.x, 'y=', rxy.y+dy-y);
    if (isMatch) {
      if (diff < 80) {
        return y/config.resizeFactor;
      }
    } else {
      if (diff >= 80) {
        return y/config.resizeFactor;
      }
    }
  }
  return -1;
}

// return offY if it is similar color from (x,y+dy)~(x,y+dy+offY)
// otherwise return -1
// if isMatch is true, then return first match point offset
// if isMatch is false, then return first NOT match point offset
// NOTE: dy, offY, return value are in original capture pixel unit
/* exported chkDownPoints */
function chkDownPoints(pointName, dy, offY, isMatch) {
  var pcolor = config.points[pointName];
  var rxy = mappingResizeXY(pcolor);
  offY *= config.resizeFactor;
  dy *= config.resizeFactor;
  for (var y=0; y<offY; y++) {
    var pxcolor = getImageColor(config.img, rxy.x, rxy.y+dy+y);
    var diff = myDiffColor(pcolor, pxcolor);
    // mylog('dbg: diff=', diff, 'x=', rxy.x, 'y=', rxy.y+dy+y);
    if (isMatch) {
      if (diff < 80) {
        // mylog('dbg: y=', y, 'config.resizeFactor=', config.resizeFactor);
        return y/config.resizeFactor;
      }
    } else {
      if (diff >= 80) {
        return y/config.resizeFactor;
      }
    }
  }
  return -1;
}

// return true, if it is similar color from (x+dx,y+dy)~(x+dx-offX,y+dy)
// NOTE: dy, offX, return value are in original capture pixel unit
/* exported chkLeftColorLine */
function chkLeftColorLine(pointName, dx, dy, offX) {
  var pcolor = config.points[pointName];
  var rxy = mappingResizeXY(pcolor);
  dx *= config.resizeFactor;
  dy *= config.resizeFactor;
  offX *= config.resizeFactor;
  for (var x=0; x<offX; x++) {
    // mylog('dbg: chkLeftColorLine', rxy.x+dx-x, rxy.y+dy, dx, dy);
    var pxcolor = getImageColor(config.img, rxy.x+dx-x, rxy.y+dy);
    var diff = myDiffColor(pcolor, pxcolor);
    if (diff > 80) {
      return false;
    }
  }
  return true;
}

// click at pointName with dx,dy offset
/* exported clickDeltaPoint */
function clickDeltaPoint(pointName, dx, dy) {
  var pcolor = config.points[pointName];
  var nx = Math.round((pcolor.x + dx) * config.appWidthRatio);
  var ny = Math.round((pcolor.y + dy) * config.appHeightRatio);
  tap(nx, ny, config.during);
}

function colorOf(pointName) {
  return {r: config.points[pointName].r, g: config.points[pointName].g,
    b: config.points[pointName].b};
}

// return true if end of send heart process
function sendHearts(now) { // use r2studio official algorithm
  var hfx = config.points['outSendHeartFrom'].x;
  var hfy = config.points['outSendHeartFrom'].y;
  var hty = config.points['outSendHeartTo'].y;
  var heartsPos = [];

  // scan red heart per 8 point vertically, if found shift vertial 140 points
  for (var y = hfy; y <= hty; y += 8) {
    var isHs = isSameColor(colorOf('outSendHeart0'),
        getColor(config.img, {x: hfx, y: y}), 40);
    if (isHs) {
      heartsPos.push({x: hfx, y: y});
      y += 140;
    }
  }
  // mylog('dbg:');
  // check if first heart is zero score
  var isZero = true;
  var fx = config.points['outFriendScoreFrom'].x;
  var tx = config.points['outFriendScoreTo'].x;
  // TODO: if first heart is on edge, use next heart to calculate score location
  var sy = (heartsPos.length == 0) ? config.points['outFriendScoreFrom'].y :
    (heartsPos[0].y + 35);
  for (var px = fx; px <= tx; px += 20) {
    isZero = isSameColor(colorOf('outFriendScoreFrom'),
        getColor(config.img, {x: px, y: sy}), 40);
    if (!isZero) {
      break;
    }
  }

  var isEnd = true;
  for (var i=1; i<=8; i++) {
    if (!isSameColor(colorOf('outSendHeartEnd'+i),
        getColor(config.img, config.points['outSendHeartEnd'+i]), 40)) {
      isEnd = false;
      break; ;
    }
  }
  // mylog('dbg: heartCount=', heartsPos.length, 'isEnd=', isEnd);

  // if (isOk && heartsPos.length == 0) {
  //  myClick(config.points['outReceiveOk']); // why ?
  // }
  // mylog('dbg:');
  if ((heartsPos.length == 0 && isEnd) || (isZero && heartsPos.length != 0)) {
    config.endSendCount++;
    if (config.endSendCount > 2) {
      // keepImgLog('dbg:', 'sendend', 1);
      mylog('dbg: end of send hearts');
      if (config.isRecvGift && config.sendHeartCount > 0) {
        mylog('dbg: force click recv mail');
        config.nextRecvTime = 0;
      }
      return true;
    }
    mylog('dbg: to next page, endSendCount=', config.endSendCount);
    toNextFriendPage();
    return false;
  }
  config.endSendCount = 0;
  // mylog('dbg:');
  if (heartsPos.length > 0) {
    myClick(heartsPos[0]);
    config.sendHeartCount++;
    longSleep(config.animationMS);
    // mylog('dbg: len', heartsPos.length);
    return false;
  }
  // mylog('dbg:');
  toNextFriendPage();
  return false;
}

// check app on focus window, if yes, return true
function chkAppOn(now) {
  if (now > config.nextChkAppOnTime) {
    var packageName='';
    while (true) {
      var result = execute('dumpsys window windows').split('mCurrentFocus');
      if (result.length >= 2) {
        result = result[1].split(' ');
        if (result.length >= 3) {
          result = result[2].split('/');
          if (result.length >= 2) {
            packageName = result[0];
            break;
          }
        }
      }
      break;
    }
    config.lastAppOnStatus = (packageName == config.packageName);
    if (config.lastAppOnStatus) {
      // mylog('dbg: in app', packageName);
      config.outOfGameCount = 0;
    } else {
      if (config.outOfGameCount == 0) {
        config.firstOutOfGameTime = now;
      }
      config.outOfGameCount++;
      if (now - config.firstOutOfGameTime > config.maxOutOfGameSec) {
        config.nextChkAppOnTime = now + config.hibernateSec*1000;
        mylog('dbg: outOfGameCount=', config.outOfGameCount, 'sleepSec=',
            config.hibernateSec, packageName);
        longSleep(config.hibernateSec*1000);
      } else {
        config.nextChkAppOnTime = now + config.appOnChkMS;
        mylog('dbg: outOfGameCount=', config.outOfGameCount, 'sleepMS=',
            config.appOnChkMS, packageName);
        longSleep(config.appOnChkMS);
      }
    }
  }
  return config.lastAppOnStatus;
}

function simpleClick(now) {
  switch (config.currentPage.actions.length) {
    case 0:
      if (config.currentPage.name === '') {
        clickUnknown();
      } else if (config.currentPage.name === 'Get30000Coins') {
        keycode('BACK', 10);
        longSleep(config.animationMS);
      }
      break;
    case 1:
      if (config.currentPage.name == 'MagicalTime') {
        longSleep(1000); // if manual want to press
      }
      myClick(config.currentPage.actions[0]);
      switch (config.currentPage.name) {
        case 'MagicalTime':
          mylog('dbg: click Cancel');
          break;
        case 'Received':
          mylog('dbg: click received');
          break;
        case 'MailBoxNoMessage':
          config.endRecvCount++;
          mylog('dbg: endRecvCount', config.endRecvCount);
          if (config.endRecvCount > 1) { // check twice
            if (config.initRecvTime > 0) {
              config.nextRecvTime = config.initRecvTime + config.autoRecvMin * 60 * 1000;
              var takeSec = (now - config.initRecvTime)/1000;
              if (takeSec == 0) {
                takeSec = 1;
              };
              mylog('dbg: click back gotCoins:', config.gotCoins,
                  'in clicks:', config.msgClicks,
                  'takes time(s):', takeSec,
                  'avg coins/min:', config.gotCoins * 60 / takeSec,
                  'nextRecvTime=', new Date(config.nextRecvTime));
            } else {
              config.nextRecvTime = now + config.autoRecvMin * 60 * 1000;
            }
            config.initRecvTime = 0;
            config.gotCoins = 0;
            config.msgClicks = 0;
            config.endRecvCount = 0;
          }
          break;
        case 'NotEnoughHearts':
          mylog('dbg: click Close for NotEnoughHearts');
          if (config.isPlay) {
            var delayTime = 15 * 60 * 1000; // 15 mins
            if (config.nextPlayTime - now < delayTime) {
              config.nextPlayTime = now + delayTime;
              mylog('dbg: extend nextPlayTime:', new Date(config.nextPlayTime));
            }
          }
          break;
        default:
          mylog('dbg: click on', config.currentPage.name);
          break;
      }
      longSleep(config.animationMS);
      break;
    case 2:
      switch (config.currentPage.name) {
        case 'RootDetection':
          if (config.isPermitRootScan) {
            mylog('dbg: click permit');
            myClick(config.currentPage.actions[1]);
            longSleep(config.animationMS);
          } else {
            mylog('dbg: wait human action');
            longSleep(config.hibernateSec*1000);
          }
          break;
        case 'MailBox':
        case 'MailBoxAd':
          myRecv(now);
          break;
        case 'ReceiveGiftOther':
        case 'PackagePage':
        case 'ReceiveGiftHeart':
          if (config.isRecvGift) {
            mylog('dbg: click OK');
            myClick(config.currentPage.actions[1]);
            longSleep(config.animationMS);
          } else {
            mylog('dbg: click Back');
            myClick(config.currentPage.actions[0]);
            longSleep(config.animationMS);
          }
          break;
        case 'GamePause':
          if (config.isPlay) {
            mylog('dbg: click continue');
            myClick(config.currentPage.actions[1]);
            longSleep(config.animationMS);
          } else {
            mylog('dbg: click Try again');
            myClick(config.currentPage.actions[0]);
            longSleep(config.animationMS);
          };
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }
  return true;
}

function userPlay(srcLine, now) {
  if (config.isPlay) {
    var delayTime = 3 * 60 * 1000; // 3 mins
    if (config.nextPlayTime - now < delayTime) {
      config.nextPlayTime = now + delayTime;
      mylog(srcLine, 'change Tsum, extend nextPlayTime:', new Date(config.nextPlayTime));
      longSleep(config.hibernateSec*1000);
    }
  }
}

/* exported start */
function start(params) {
  mylog('dbg: start() begin');
  if (!init(params)) {
    return;
  }

  if (config.isAutoLaunch) {
    mylog('dbg: startApp');
    var r = myStartApp(config.packageName, config.activityName);
    mylog('dbg: result', r);
    longSleep(3000);
  }

  if (config.testFile !== '') {
    mylog('dbg: begin of testFile');
    // config.prevImg = openImage(config.storagePath + config.testFile);
    config.img = openImage(config.storagePath + '/testdata/' + config.testFile);
    mylog('dbg:');
    mylog('dbg: img=', typeof config.img);
    mylog('dbg: img=', config.img);
    whyNotPage(config.img, 'FriendPage');
    whyNotPoint(config.img, 'HeartRed1');
    releaseImage(config.img);
    return;
  }

  var now = Date.now();
  if (!config.isRecvGift) {
    config.nextRecvTime = now + 365*24*60*60*1000;
  }
  if (!config.isSendHeart) {
    config.nextSendTime = now + 365*24*60*60*1000;
  }
  if (!config.isPlay) {
    config.nextPlayTime = now + 365*24*60*60*1000;
  }
  config.isPlaying = false;
  while (config.isRunning) {
    now = Date.now();
    if (!chkAppOn(now)) {
      continue;
    }
    if (config.prevImg !== 0) {
      releaseImage(config.prevImg);
    }
    if (config.img !== 0) {
      config.prevImg = config.img;
    }
    config.img = getScreenshotModify(0, 0, config.appWidth, config.appHeight,
        config.resizeAppWidth, config.resizeAppHeight, config.imageQuality);
    if (config.prevImg == 0) {
      longSleep(config.captureMS);
      continue;
    }
    if (!config.isPlaying) {
      var score = getIdentityScore(config.prevImg, config.img);
      mylog('dbg: score=', score);
      if (score < config.diffScore) {
        longSleep(config.captureMS);
        continue;
      }
    }
    config.prevPage = config.currentPage;
    config.currentPage = findPage();
    isRedMail = checkPoint(config.img, 'RedMail');
    mylog('dbg: page=', config.currentPage.name, 'isRedMail=', isRedMail);
    if (simpleClick(now)) {
      continue;
    }
    if (config.isRecvGift && (config.currentPage.name == 'FriendPage'||
       config.currentPage.name == 'ChooseBonusItem') &&
      (now > config.nextRecvTime || isRedMail)) {
      mylog('dbg: Recv, isRedMail', isRedMail);
      myClick(config.points['Mail']);
      longSleep(config.animationMS);
    } else if (now > config.nextSendTime && !config.isPlaying) {
      mySend(now);
    } else if (now > config.nextPlayTime) {
      myPlay(now);
    } else {
      switch (config.currentPage.name) {
        case 'TsumsMe':
        case 'TsumsOther':
          userPlay('dbg:', now);
          break;
        case 'GamePlay1':
        case 'GamePlay2':
        case 'GamePlay3':
        case 'GamePlay4':
          mylog('dbg: wait game over for manual play');
          longSleep(config.hibernateSec*1000);
          break;
        case 'ScorePage':
        case 'ChooseBonusItem':
          mylog('dbg: click back on', config.currentPage.name);
          myClick(config.currentPage.actions[0]); // back
          longSleep(config.animationMS);
          break;
        case 'FriendPage':
          mylog('dbg: nothing to do, wait nextSendTime=', new Date(config.nextSendTime),
              'nextPlayTime=', new Date(config.nextPlayTime));
          longSleep(config.hibernateSec*1000);
          break;
        default:
          mylog('dbg: invalid page:', config.currentPage.name);
          // keepImgLog('dbg:', 'start', 1);
          sleep(config.hibernateSec*1000);
          break;
      }
    }
    if (config.testFile !== '') {
      mylog('dbg: end of testFile');
      break;
    }
    mySleep(config.captureMS, now);
  }
  fini();
  mylog('dbg: start() end');
  return;
}

/* exported stop */
function stop() {
  mylog('dbg: stop()');
  config.isRunning = false;
  sleep(500); // wait other thread before release memory
  fini();
  mylog('dbg: stop() end');
}

// ---------------------
// test related function
// ---------------------

/* exported whyNotPoint */
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

/* exported whyNotPage */
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
  for (var i in page.colors) {
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

/* exported testMain */
function testMain() {
  start([
    false, // isLangZhTW: false,
    false, // isRecvGift: false,
    5, // autoRecvMin: 5, // recv gift period
    true, // isSendHeart: true,
    30, // autoSendMin: 30, // send heart period
    false, // isPlay: false,
    24*60, // autoPlayMin: 24*60, // auto play period
    1000, // skillPlayMS: 1000,
    false, // debug: false,

    false, // isBonusScore: false,
    false, // isBonusCoin: false,
    false, // isBonusExp: false,
    false, // isBonusTime: false,
    false, // isBonusBubble: false,
    false, // isBonus5to4: false,

    false, // isAutoLaunch: false,
    true, // isPermitRootScan: true,
    10, // hibernateSec: 10, // check app on per 10s
    3000, // maxOutOfGameSec: 3000, // if out of game for 3s, switch to hibernate mode
    500, // appOnChkMS: 500, // check per 0.5s
    100, // findPageMS: 100, // call findPage() per 0.1s
    1000, // waitUnknownMS: 1000, // wait 1 second before click on unknown page
    50, // captureMS: 50, // sleep per 0.05 second before capture screen
    // 'eventinfo.png',
    'friend.onlyone.png',
  ]);
}

// vim:et sw=2 ts=2 ai
