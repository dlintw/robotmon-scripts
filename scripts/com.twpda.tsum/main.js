// main.js
'use strict;';

var config = { // ref: DEFAULT_CONFIG in RBM-<version>.js
  appName: 'com.twpda.tsum',
  // global for this game
  isRunning: false,
  appOnChkPeriod: 500, // check per 0.5 s
  maxAppOffCount: 3, // continue 3 times off will trigger stop()
  packageName: 'com.linecorp.LGTMTMG',
  chkPagePeriod: 100, // check per 0.1 second
  loopSleepMS: 100, // sleep per 0.1 second in main loop
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
RBM.prototype.log = function() {
  // sleep(10);
  for (var i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] == 'object') {
      arguments[i] = JSON.stringify(arguments[i]);
    }
  }
  console.log.apply(console, arguments);
};

function findPage() {
  return 'test';
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
  // rbm.startApp('com.linecorp.LGTMTM', '.TsumTsum'); // isJP
  console.log('dbg: startApp');
  rbm.startApp(config.packageName, '.TsumTsum');
  console.log('dbg: sleep 3 seconds');
  rbm.sleep(3000);
  var r = rbm.currentApp();
  rbm.log('dbg: currentApp()=', r);

  var lastChkAppTime = 0;
  var outOfGameCount = 0;
  var prevPage = undefined;
  var currentPage = undefined;
  var lastChkPageTime = 0;

  while (config.isRunning) {
    // check if out of game
    var now = Date.now();
    if (now - lastChkAppTime > config.appOnChkPeriod) {
      r = rbm.currentApp();
      if (r.packageName !== config.packageName) {
        outOfGameCount++;
        if (outOfGameCount >= config.maxAppOffCount) {
          config.isRunning = false;
          break;
        }
      }
      lastChkAppTime = now;
    }

    // check current page
    if (now - lastChkPageTime > config.chkPagePeriod) {
      prevPage = currentPage;
      currentPage = findPage();
      lastChkPageTime = now;
    }
    console.log('p:', prevPage.name, 'c:', currentPage.name);

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
