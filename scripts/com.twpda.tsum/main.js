'use strict;';

var config = {
  // UI options NOTE: keep the same order with settings.js and setupUIOptions()
  isLangZhTW: false,
  isRecvGift: false,
  isSendHeart: false,
  sendHeartMin: 30, // send heart period
  isPlay: true,
  autoPlayMin: 24*60, // auto play period
  skillPlayMS: 1000,
  debug: true,

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

  uiOptionCount: 22, // count of UI options

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
  snapCount: 6,
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


  lastFindPageTime: 0,
  samePageCount: 0,
  prevCaptureTime: 0,
  nextSendHeartTime: 0,
  nextPlayTime: 0,
  initPlayTime: 0,
  initSendHeartTime: 0,
  // state could be:
  //   init(0) ->send0(21)->send1(22)->send2(23)->maybe 0,11,31
  //           ->play0(31)->play1(32)->play2(33)->maybe 0,11,22
  state: 0,
  prevBonusState: -1,
  bonusState: undefined,
  waitUnknownCount: 0,
  minSamePageCount: 0,
  gotCoins: 0,
  msgClicks: 0,
  prevImg: 0,
  img: 0,

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
    'SkillOn1': {x: 137, y: 1555, r: 255, g: 255, b: 247}, // white MyTsum button 11 clock part
    'SkillOn2': {x: 137, y: 1555, r: 247, g: 219, b: 25}, // light yellow to dark MyTsum button 11 clock part
    'HeartRed1': {x: 910, y: 689, r: 255, g: 105, b: 140}, // red first heart on friend page
    'HeartRed2': {x: 910, y: 689+196, r: 255, g: 105, b: 140}, // red 2nd heart on friend page
    'HeartRed3': {x: 910, y: 689+196*2, r: 255, g: 105, b: 140}, // red 3rd heart on friend page
    'HeartRed4': {x: 910, y: 689+196*3, r: 255, g: 105, b: 140}, // red 4th heart on friend page
    'HeartBlue1': {x: 910, y: 689, r: 3, g: 69, b: 148}, // blue first heart on friend page
    'HeartBlue2': {x: 910, y: 689+196, r: 3, g: 69, b: 148}, // blue 2nd heart on friend page
    'HeartBlue3': {x: 910, y: 689+196*2, r: 3, g: 69, b: 148}, // blue 3rd heart on friend page
    'HeartBlue4': {x: 910, y: 689+196*3, r: 3, g: 69, b: 148}, // blue 4th heart on friend page
    'ZeroScore1': {x: 550, y: 700, r: 55, g: 93, b: 140}, // blue zero score of 1st
    'ZeroScore2': {x: 550, y: 700+196, r: 55, g: 93, b: 140}, // blue zero score of 2nd
    'ZeroScore3': {x: 550, y: 700+196*2, r: 55, g: 93, b: 140}, // blue zero score of 3rd
    'ZeroScore4': {x: 550, y: 700+196*3, r: 55, g: 93, b: 140}, // blue zero score of 4th
    'HeartEnd1': {x: 550, y: 720, r: 33, g: 117, b: 197}, // 1st light blue frame of heart
    'HeartEnd2': {x: 550, y: 720+196, r: 33, g: 117, b: 197}, // 2nd light blue frame of heart
    'HeartEnd3': {x: 550, y: 720+196*2, r: 33, g: 117, b: 197}, // 3rd light blue frame of heart
    'HeartEnd4': {x: 550, y: 720+196*3, r: 33, g: 117, b: 197}, // 4th light blue frame of heart
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
      {x: 698, y: 464, r: 244, g: 249, b: 243, match: true, threshold: 60}, // left top of the ranking time
      {x: 187, y: 1599, r: 240, g: 218, b: 72, match: true, threshold: 60}, // top of the card button
      {x: 540, y: 1592, r: 246, g: 135, b: 17, match: true, threshold: 60}, // top of the start button
      {x: 799, y: 1653, r: 232, g: 170, b: 7, match: true, threshold: 60}, // left of the myTsum button
    ],
    actions: [{x: 187, y: 1599}, {x: 540, y: 1592}, {x: 799, y: 1653}], // Card, Play, MyTsum
    /*
  }, {
    name: 'FriendPage2+',
    colors: [
      {x: 698, y: 464, r: 244, g: 249, b: 243, match: true, threshold: 60}, // left top of the ranking time
      {x: 187, y: 1599, r: 240, g: 218, b: 72, match: true, threshold: 60}, // top of the card button
      {x: 540, y: 1649, r: 175, g: 188, b: 197, match: true, threshold: 60}, // center of the Tsum Hades
      {x: 799, y: 1653, r: 232, g: 170, b: 7, match: true, threshold: 60}, // left of the myTsum button
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
    */
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

function setupUIOptions(args) {
  if (args.length != config.uiOptionCount) {
    mylog('dbg: setupUIOptions length invalid', args.length);
    return false;
  }
  var i=0;
  config.isLangZhTW = args[i++];
  config.isRecvGift = args[i++];
  config.isSendHeart = args[i++];
  config.sendHeartMin = args[i++];
  config.isPlay = args[i++];
  config.autoPlayMin = args[i++];
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
    1.5*config.tsumWidth;
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

/* exported isSameColor TODO:remove */
function isSameColor(c1, c2, diff) {
  if (diff == undefined) {
    diff = 20;
  }
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

function findPage(img, pagePixels) {
  var result = [];
  var names = [];
  var page;
  for (var p = 0; p < pagePixels.length; p++) {
    page = pagePixels[p];
    var i;
    for (i=0; i<page.colors.length; i++) {
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
  // whyNotPage(img, 'FriendPage');
  // whyNotPage(img, 'ChooseBonusItem');
  var buttons = ['Close1', 'Close2', 'Close3'];
  for (var i in buttons) {
    if (checkPoint(img, buttons[i])) {
      mylog('dbg: click', buttons[i], r.packageName);
      myclick(config.points[buttons[i]]);
      return;
    }
  }
  longSleep(config.hibernateSec);
  mylog('dbg: click center of screen', r.packageName);
  myclick({x: config.oriScreenWidth/2, y: config.oriScreenHeight/2});
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
  var result = false;
  if (checkPoint(img, 'SkillOn1') || checkPoint(img, 'SkillOn2')) {
    config.skillOnCount++;
    if (config.skillOnCount > 2) {
      result = true;
    }
  } else {
    config.skillOnCount= 0;
  }
  return result;
};

function myPlay(img, currentPage) {
  config.runTimes++;
  // longSleep(config.hibernateSec); // wait animation finished
  // if (!config.debug || config.runTimes == 1) {
  if (checkSkillON(img)) {
    myclick(currentPage.actions[1]); // click MyTsum to use skill
    longSleep(config.skillPlayMS);
  } else {
    board = scanBoard(img);
    var paths = calculatePaths(board);
    if (paths.length > 3) {
      clickLinks(paths);
    } else {
      // TODO: find bubbles, click bubbles, keep at most 2 bubbles.
      myclick(currentPage.actions[2]); // click Fan
      sleep(200);
      myclick(currentPage.actions[2]); // click Fan
      sleep(200);
    }
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

  /*
  // H<80 or H>120,  S<160 or S>255, V<20 or V>210
  var filter1 = outRange(hsvImg, 80, 160, 20, 0, 120, 255, 210, 255);
  saveImage(filter1, config.storagePath + '/tmp/f2_filter1.png');
  // H<80 or H>130,  S<100 or S>170, V<90 or V>190
  var filter2 = outRange(filter1, 80, 100, 90, 0, 130, 170, 190, 255);
  saveImage(filter2, config.storagePath + '/tmp/f3_filter2.png');
  releaseImage(filter1);
  */
  var filter2 = outRange(hsvImg, 80, 100, 20, 0, 120, 255, 210, 255);
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
  var points = houghCircles(mask, 3, 1, config.tsumWidth, 4, 7,
      config.tsumWidth/2, config.tsumWidth);
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

function findBubbles(img) {
  var grayImg = clone(img);
  smooth(grayImg, 2, 7); // CV_GAUSSIAN with size 7 filter
  var hsvImg = clone(grayImg);
  convertColor(grayImg, 6); // CV_BGR2GRAY
  convertColor(hsvImg, 40); // CV_BGR2HSV
  var points = houghCircles(mask, 3, 1, config.tsumWidth, 4, 7,
      config.tsumWidth/2, config.tsumWidth);
  var circleImg = 0;
  if (config.debug && (config.runTimes % config.snapCount)==0) {
    circleImg = clone(img);
  }
  var results = [];
  for (var k in points) {
    var p = points[k];
    if (config.debug && (config.runTimes % config.snapCount)==0) {
      drawCircle(circleImg, p.x, p.y, p.r, 255, 0, 0, 0); // draw red circle
    }
    // get 5 point avg color as
    var rgb0 = getImageColor(img, p.x, p.y);
    var hsv0 = getImageColor(hsvImg, p.x, p.y);
    var rgbU = rgb0; var rgbD = rbg0; var rgbL = rgb0; var rgbR = rgb0;
    var hsvU = hsv0; var hsvD = rbg0; var hsvL = hsv0; var hsvR = hsv0;
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
    var result = {x: p.x, y: p.y, z: p.r,
      r: (rgb0.r + rgbU.r + rgbD.r + rgbL.r + rgbR.r)/5,
      g: (rgb0.g + rgbU.g + rgbD.g + rgbL.g + rgbR.g)/5,
      b: (rgb0.b + rgbU.b + rgbD.b + rgbL.b + rgbR.b)/5,
      r: (hsv0.r + hsvU.r + hsvD.r + hsvL.r + hsvR.r)/5,
      g: (hsv0.g + hsvU.g + hsvD.g + hsvL.g + hsvR.g)/5,
      b: (hsv0.b + hsvU.b + hsvD.b + hsvL.b + hsvR.b)/5};
    mylog('dbg:', i, result);
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
  var tcs = [];
  if (points.length === 0) {
    return tcs;
  }
  var p = points[0];
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
  var points2 = findBubbles(srcImg);
  mylog('dbg: Tsums:', points.length, 'Bubbles:', points2.length);
  var tcs = classifyTsums(points);
  tcs.sort(function(a, b) {
    return a.points.length > b.points.length ? -1: 1;
  });
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
    saveImage(srcImg, config.storagePath + '/tmp/' + config.runTimes + '_click.png');
  }
  releaseImage(srcImg);
  mylog('dbg: board length', board.length);
  mylog('dbg: recognition Time', Date.now() - startTime);
  return board;
};

// keepImgLog keep count images per 0.5 seconds
// eg. keepImgLog('dbg:','f', 2) -> mmss.sss.name.1.png, mmss.sss.name.2.png
/* exported keepImgLog */
function keepImgLog(srcLineNo, name, count) {
  for (var i=1; i<=count; i++) {
    var now=Date.now();
    var d=new Date(now);
    var filename= config.storagePath + '/tmp/' +
      ('0' + d.getMinutes()).slice(-2) + ('0' + d.getSeconds()).slice(-2) +
      '.' + ('000' + now % 1000).slice(-3) + '.' + name + '.' + i + '.png';
    var img = getScreenshotModify(0, 0, config.appWidth, config.appHeight,
        config.resizeAppWidth, config.resizeAppHeight, config.imageQuality);
    saveImage(img, filename);
    mylog(srcLineNo, 'keepImgLog:', filename);
    if (count > 1) {
      sleep(500);
    }
  }
}

function toTopFriendPage() {
  mylog('dbg: to top friend page');
  var xy = mappingXY(config.points['HeartRed1']);
  tapDown(xy.x, xy.y, 100);
  moveTo(xy.x, xy.y, 100);
  moveTo(xy.x, 350000, 100);
  tapUp(xy.x, 350000, 100);
  longSleep(1500);
  mylog('dbg: adjust 1/4 grid height');
  tapDown(xy.x, xy.y, 100);
  var xy2 = mappingXY(config.points['HeartRed2']);
  var y2 = xy.y-(xy2.y - xy.y)/4;
  moveTo(xy.x, y2, 100);
  tapUp(xy.x, y2, 100);
  sleep(500);
  keepImgLog('dbg:', 'f', 5);
  mylog(time); // for stop
}

function toNextFriendPage() {
  mylog('dbg: move up 4 times grid height');
  var xy = mappingXY(config.points['HeartRed4']);
  tapDown(xy.x, xy.y, 100);
  var xy2 = mappingXY(config.points['HeartRed3']);
  var dy = (xy.y-xy2.y);
  moveTo(xy.x, xy.y-dy, 100);
  moveTo(xy.x, xy.y-dy*2, 100);
  moveTo(xy.x, xy.y-dy*3, 100);
  moveTo(xy.x, xy.y-dy*3.85, 100);
  tapUp(xy.x, xy.y-dy*3.85, 100);
  longSleep(1000);
}

function sendHearts(img) { // return isEnd
  var zeroCount = 0;
  for (var i=4; i >= 1; i--) {
    if (checkPoint(img, 'HeartEnd'+i)) {
      mylog('dbg: zero, i=', i);
      zeroCount++;
    // } else if (checkPoint(img, 'ZeroScore'+i)) {
    //  zeroCount++;
    } else if (checkPoint(img, 'HeartRed'+i)) {
      mylog('dbg: HeartRed, i=', i);
      myclick(config.points['HeartRed'+i]);
      sleep(1000);
      config.sendHeartCount++;
      return false;
    } else {
      mylog('dbg: HeartBlue, i=', i);
    }
  }
  if (zeroCount == 0) {
    mylog('dbg: toNextFriendPage');
    toNextFriendPage();
    return false;
  }
  mylog('dbg: zeroCount', zeroCount);
  return true;
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
    }
    config.lastAppOnStatus = (packageName == config.packageName);
    if (config.lastAppOnStatus) {
      config.outOfGameCount = 0;
    } else {
      if (config.outOfGameCount == 0) {
        config.firstOutOfGameTime = now;
      }
      config.outOfGameCount++;
      mylog('dbg: outOfGameCount', outOfGameCount, packageName);
      if (now - config.firstOutOfGameTime > config.maxOutOfGameSec) {
        config.nextChkAppOnTime = now + config.hibernateSec*1000;
        longSleep(config.hibernateSec*1000);
      } else {
        config.nextChkAppOnTime = now + config.appOnChkMS;
        longSleep(config.appOnChkMS);
      }
    }
  }
  return config.lastAppOnStatus;
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

  waitUnknownCount = config.waitUnknownMS/config.captureMS;
  minSamePageCount = 2 * config.findPageMS / config.captureMS;
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

  while (config.isRunning) {
    now = Date.now();
    if (chkAppOn(now)) {
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
    var score = getIdentityScore(img1, img2);
    mylog('dbg: score=', score);
    if (score < config.diffScore) {
      longSleep(config.captureMS);
      continue;
    }
    config.prevPage = config.currentPage;
    config.currentPage = findPage(img, config.pagePixels);
    isRedMail = checkPoint(img, 'RedMail');
    // var action;
    if (now > nextRecvTime) {
      if (isRedMail) {
        mylog('dbg: Recv');
      } else if (now > nextSendTime) {
        mylog('dbg: Send');
      } else if (now > nextPlayTime) {
        mylog('dbg: Play');
      }
    } else if (now > nextSendTime) {
      mylog('dbg: Send');
    } else if (now > nextPlayTime) {
      mylog('dbg: Play');
    }
    mySleep(config.captureMS);
  }
  fini();
  mylog('dbg: start() end');
  return;
  switch (currentPage.actions.length) {
    case 0:
      if (currentPage.name === '') {
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
        keepImgLog('dbg:', 'r', 4);
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
            longSleep(config.hibernateSec);
          }
          break;
        case 'ScorePage':
          if (state == 32) {
            mylog('dbg: play time(s):', (Date.now() - initPlayTime)/1000);
            state = 33;
            nextPlayTime = initPlayTime + config.autoPlayMin * 60 * 1000;
          }
          if (config.isRecvGift) {
            if (checkPoint(img, 'RedMail')) {
              mylog('dbg: click Mail button');
              myclick(config.points['Mail']);
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
          keepImgLog('dbg:', 'r2', 4);
          if (config.isRecvGift || config.isSendHeart) {
            myclick(currentPage.actions[1]); // OK/delete
          } else {
            myclick(currentPage.actions[0]); // Close/Cancel
          }
          sleep(1000); // skip animation
          break;
        case 'ChooseBonusItem':
          if (config.isRecvGift) {
            if (checkPoint(img, 'RedMail')) {
              mylog('dbg: click Mail button');
              myclick(config.points['Mail']);
              break;
            }
          }
          if (now > nextSendHeartTime) {
            myclick(currentPage.actions[0]); // back
          } else if (now > nextPlayTime) {
            bonusState = getBonusState(img);
            if (prevBonusState == bonusState) { // check two times
              prevBonusState = -1;
              if (clickBonus(bonusState) == 0) {
                mylog('dbg: bonus OK, click Start');
                myclick(currentPage.actions[1]);
                initPlayTime = now;
                state = 31;
              } else {
                sleep(config.findPageMS);
                lastFindPageTime = 0;
                samePageCount = 0;
              }
            } else {
              prevBonusState = bonusState;
            }
          } else {
            myclick(currentPage.actions[0]); // back
          }
          break;
        case 'GamePause':
          if (now > nextSendHeartTime) {
            myclick(currentPage.actions[0]); // back
          } else if (now > nextPlayTime) {
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
          myPlay(img, currentPage);
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
          if (now > nextSendHeartTime) {
            if (state != 21 && state != 22) {
              mylog('dbg: send heart begin', Date());
              state = 21;
              config.sendHeartCount = 0;
              initSendHeartTime = now;
              toTopFriendPage();
            } else if (sendHearts(img)) { // end
              state = 23;
              var s = (Date.now() - initSendHeartTime)/1000;
              mylog('dbg:send heart time(s):', s, 'hearts:',
                  config.sendHeartCount, 'avg/min=',
                  config.sendHeartCount / s * 60);
              nextSendHeartTime = initSendHeartTime +
                      config.sendHeartMin * 60* 1000;
            }
          } else if (now > nextPlayTime) {
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

/* exported stop */
function stop() {
  mylog('dbg: stop()');
  config.isRunning = false;
  sleep(500); // wait other thread before release memory
  fini();
  mylog('dbg: stop() end');
}
// vim:et sw=2 ts=2 ai
