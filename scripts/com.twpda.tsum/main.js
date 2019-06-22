'use strict;';

var config = { // ref: DEFAULT_CONFIG in RBM-<version>.js
  appName: 'com.twpda.tsum',
  // global for this game
  isRunning: false,
  bonusState: 0,
  packageName: 'com.linecorp.LGTMTMG',
  activityName: '.TsumTsum',
  animationMS: 500,

  // UI options in settings.js order
  isLangZhTW: false,
  isPlay: true,
  isRecvGift: true,
  isSendHeart: false,

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

  uiOptionCount: 19, // count of UI options

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
    name: 'NetworkDisable+',
    colors: [
      {x: 540, y: 825, r: 90, g: 57, b: 25, match: false, threshold: 60}, // yellow gift conflict with PackagePage
      {x: 932, y: 1077, r: 232, g: 171, b: 5, match: true, threshold: 80},
      {x: 478, y: 1080, r: 236, g: 94, b: 116, match: true, threshold: 80},
    ],
    actions: [], // just sleep
  }, {

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
    name: 'GamePlaying',
    colors: [
      // {x: 980, y: 258, r: 244, g: 197, b: 5, match: true, threshold: 60}, // right of pause
      {x: 916, y: 318, r: 230, g: 150, b: 6, match: true, threshold: 60}, // below pause
      {x: 916, y: 1688, r: 230, g: 150, b: 6, match: true, threshold: 60}, // below fan
      {x: 287, y: 1662, r: 0, g: 182, b: 230, match: true, threshold: 60}, // between mytsum and fever
    ],
    actions: [{x: 986, y: 273},, {x: 986, y: 273}, {x: 986, y: 273}], // TODO:
  }],
};

var rbm;

function init(args) {
  rbm = new RBM(config);
  rbm.init();
  if (args !== undefined) {
    if (args.length != config.uiOptionCount) {
      rbm.log('dbg: parameter length invalid', args.length);
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
    rbm.log('dbg: no arguments of start(), use default');
  }
  config.isRunning = true;
  return true;
};

function fini() {
  rbm = undefined;
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

function checkPoint(img, pointName) {
  var pcolor = config.points[pointName];
  var pxcolor = getColor(img, pcolor);
  var diff = Colors.diffColor(pcolor, pxcolor);
  return (diff < 60);
};

function whyNotPoint(img, pointName) {
  var pcolor = config.points[pointName];
  var pxcolor = getColor(img, pcolor);
  var diff = Colors.diffColor(pcolor, pxcolor);
  if (diff < 60) {
    rbm.log('dbg: v', diff, pointName, pcolor, pxcolor);
  } else {
    rbm.log('dbg: x', diff, pointName, pcolor, pxcolor);
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
    var diff = Colors.diffColor(pcolor, pxcolor);
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

function clickBonus(bonusState) {
  var clickCount = 0;
  if ((bonusState & 1) == (config.bonusState & 1)) {
    rbm.log('dbg: click BonusScore');
    rbm.click(config.points['BonusScore']);
    clickCount++;
  };
  if ((bonusState & 2) == (config.bonusState & 2)) {
    rbm.log('dbg: click BonusCoin');
    rbm.click(config.points['BonusCoin']);
    clickCount++;
  };
  if ((bonusState & 4) == (config.bonusState & 4)) {
    rbm.log('dbg: click BonusExp');
    rbm.click(config.points['BonusExp']);
    clickCount++;
  };
  if ((bonusState & 8) == (config.bonusState & 8)) {
    rbm.log('dbg: click BonusTime');
    rbm.click(config.points['BonusTime']);
    clickCount++;
  };
  if ((bonusState & 16) == (config.bonusState & 16)) {
    rbm.log('dbg: click BonusBubble');
    rbm.click(config.points['BonusBubble']);
    clickCount++;
  };
  if ((bonusState & 32) == (config.bonusState & 32)) {
    rbm.log('dbg: click Bonus5to4');
    rbm.click(config.points['Bonus5to4']);
    clickCount++;
  };
  return clickCount;
};

function clickUnknown(img) {
  var r = rbm.currentApp();
  if (r.packageName !== config.packageName) {
    rbm.log('dbg: not in currentApp', r.packageName);
    return;
  }
  // whyNotPage(img, 'ChooseBonusItem');
  // whyNotPage(img, 'RootDetection');
  // whyNotPage(img, 'ClosePage');
  // whyNotPage(img, 'ClosePage2');
  var buttons = ['Close1', 'Close2', 'Close3'];
  for (var i=0; i< buttons.length; i++) {
    if (checkPoint(img, buttons[i])) {
      rbm.log('dbg: click', buttons[i], r.packageName);
      rbm.click(config.points[buttons[i]]);
      return;
    }
  }
  rbm.log('dbg: click center of screen', r.packageName);
  rbm.click({x: rbm.oriScreenWidth/2, y: rbm.oriScreenHeight/2});
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

/* eslint no-unused-vars: ["error", { "vars": "local" }]*/
function start(params) { // exported start()
  if (!init(params)) {
    return;
  }

  if (config.isAutoLaunch) {
    // rbm.startApp('com.linecorp.LGTMTM', '.TsumTsum'); // isJP
    console.log('dbg: startApp');
    rbm.startApp(config.packageName, config.activityName); // test failed 2019/06/16
    // var r = startApp(config.packageName, config.activityName);
    // console.log('dbg:', r);
    rbm.sleep(3000);
  }
  var lastChkAppTime = 0;
  var outOfGameCount = 0;
  var prevPage = {name: '', actions: []};
  var currentPage = prevPage;
  var lastFindPageTime = 0;
  var samePageCount = 0;
  var prevCaptureTime = Date.now();
  // var state = 0; // 0:init, 1:recvGift, 2:sendHeart, 3:play
  var prevBonusState = -1;
  var bonusState;
  var waitUnknownCount = config.waitUnknownMS/config.captureMS; ;
  var autoPlayCount = 0;
  var maxAppOffCount = config.maxAppOffMS / config.appOnChkMS;
  var minSamePageCount = 2 * config.findPageMS / config.captureMS;
  var gotCoins = 0;
  var msgClicks = 0;
  // var shotnum = 0;
  while (config.isRunning) {
    // if focus window not in game and continue for config.maxAppOffMS
    // wait config.hibernateMS before check again
    var now = Date.now();
    if (now - lastChkAppTime > config.appOnChkMS) {
      var r = rbm.currentApp();
      // rbm.log('dbg: currentApp()=', r);
      if (r.packageName !== config.packageName) {
        outOfGameCount++;
        console.log('dbg: outOfGameCount', outOfGameCount, r.packageName);
        if (outOfGameCount >= maxAppOffCount) {
          console.log('dbg: hibernate', Date());
          longSleep(config.hibernateMS);
          continue;
        }
      } else {
        outOfGameCount = 0;
      }
      lastChkAppTime = now;
    }

    // rbm.screenshot('tsum'+shotnum.toString()+'.png');
    // shotnum = (shotnum + 1) % 10;
    var img = getScreenshotModify(0, 0, rbm.appWidth, rbm.appHeight,
        rbm.resizeAppWidth, rbm.resizeAppHeight, rbm.imageQuality);

    // check current page
    if (now - lastFindPageTime > config.findPageMS) {
      prevPage = currentPage;
      currentPage = findPage(img, config.pagePixels);
      // rbm.log('dbg: page=', currentPage);
      lastFindPageTime = now;
    }
    if (prevPage.name != currentPage.name) {
      console.log('dbg: prevPage:', prevPage.name, 'currentPage:', currentPage.name);
      if (prevPage.name === "GamePlaying" && currentPage.name === "") {
        whyNotPage(img, "GamePlaying");
      }
      samePageCount = 1;
    } else {
      samePageCount++;
      if (samePageCount >= minSamePageCount) {
        // console.log('dbg: Page:', currentPage.name, 'samePageCount=', samePageCount);
        switch (currentPage.actions.length) {
          case 0:
            if (currentPage.name == '') {
              // console.log('dbg: sleep 1 second for unknown page');
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
            rbm.click(currentPage.actions[0]);
            if (currentPage.name == 'Received') {
              rbm.sleep(animationMS);
            } else if (currentPage.name == 'MailBoxNoMessage') {
              rbm.log('dbg: gotCoins:', gotCoins, 'in clicks:', msgClicks);
            }
            break;
          case 2:
            switch (currentPage.name) {
              case 'RootDetection':
                if (config.isPermitRootScan) {
                  console.log('dbg: click next');
                  rbm.click(currentPage.actions[1]);
                } else {
                  console.log('dbg: wait human action');
                  longSleep(config.hibernateMS);
                }
                break;
              case 'ScorePage':
                // TODO: if isRecvGift and got mail then recv
                // TODO: if isSendHeart and in sendHeart state  then send
                // TODO: if isPlay and not in sendHeart then play
                rbm.click(currentPage.actions[0]);
                break;
              case 'MailBox':
              case 'MailBoxAd':
                if (config.isRecvGift) {
                  if (checkPoint(img, 'RecvFirstMail')) {
                    if (checkPoint(img, 'FirstMailGet')) {
                      gotCoins++;
                    }
                    msgClicks++;
                    console.log('dbg: click First Mail button');
                    rbm.click(config.points['RecvFirstMail']);
                    rbm.sleep(animationMS);
                  } else {
                    whyNotPoint(img, 'RecvFirstMail');
                    whyNotPoint(img, 'FirstMailGet');
                    console.log('dbg: click Back, got coins', gotCoins, 'in clicks:', msgClicks);
                    gotCoins = 0;
                    msgClicks = 0;
                    rbm.click(currentPage.actions[0]);
                  }
                } else {
                  console.log('dbg: click Back');
                  rbm.click(currentPage.actions[0]);
                }
                break;
              case 'ReceiveGiftHeart':
              case 'PackagePage':
              case 'ReceiveGiftOther':
                if (config.isRecvGift) {
                  rbm.click(currentPage.actions[1]);
                } else {
                  rbm.click(currentPage.actions[0]);
                }
                break;
              case 'ChooseBonusItem':
                if (config.isRecvGift) {
                  if (checkPoint(img, 'RedMail')) {
                    console.log('dbg: click Mail button');
                    rbm.click(config.points['Mail']);
                    break;
                  }
                }
                if (config.isPlay) {
                  bonusState = getBonusState(img);
                  if (prevBonusState == bonusState) { // check two times
                    prevBonusState = -1;
                    if (clickBonus(bonusState) == 0) {
                      if (config.autoPlayCount == 0 ||
                          config.autoPlayCount > autoPlayCount) {
                        rbm.log('dbg: bonus OK, click Play ', autoPlayCount);
                        rbm.click(currentPage.actions[1]);
                        autoPlayCount++;
                      } else {
                        rbm.log('dbg: hibernate');
                        longSleep(config.hibernateMS);
                      }
                    } else {
                      rbm.sleep(config.findPageMS);
                      lastFindPageTime = 0;
                      samePageCount = 0;
                    }
                  } else {
                    prevBonusState = bonusState;
                  }
                } else {
                  rbm.click(currentPage.actions[0]);
                }
                break;
              case 'GamePause':
                if (config.isPlay) {
                  rbm.click(currentPage.actions[1]);
                } else {
                  rbm.click(currentPage.actions[0]);
                }
                break;
              case 'TsumsMe':
              case 'TsumsOther':
                rbm.click(currentPage.actions[0]);
                break;
              default:
                rbm.log('dbg: unknown page');
                break;
            }
            break;
          default: // more than 2 actions
            switch (currentPage.name) {
              case 'GamePlaying':
                rbm.log('dbg: playing TODO');
                longSleep(config.hibernateMS);
                break;
              case 'FriendPage':
              case 'FriendPage2':
                if (config.isRecvGift) {
                  if (checkPoint(img, 'RedMail')) {
                    console.log('dbg: click Mail button');
                    rbm.click(config.points['Mail']);
                    break;
                  }
                }
                if (config.isPlay) {
                  console.log('dbg: click play button');
                  rbm.click(currentPage.actions[1]);
                }
                break;
              default:
                rbm.log('dbg: unknown page');
                break;
            }
            break;
        }
      }
    }
    releaseImage(img);
    prevCaptureTime = mySleep(config.captureMS, prevCaptureTime);
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
// vim:et sw=2 ts=2 ai
