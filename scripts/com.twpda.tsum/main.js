'use strict;';

var isRunning = false;

/* eslint no-unused-vars: ["error", { "vars": "local" }]*/
function start( // exported start()
    isLocaleTW, autoLaunch, detectAppOnPeriod, autoPlay, isPause,
    clearBubbles, useFan, isFourTsum, coinItem, bubbleItem,
    enableAllItems, skillInterval, skillLevel, skillType, receiveItem,
    receiveItemInterval, receiveOneItem, keepRuby, receiveCheckLimit,
    receiveOneItemInterval,
    recordReceive, largeImage, sendHearts, sentToZero, sendFromFirst,
    sendHeartMaxDuring, sendHeartsInterval, numParams) {
  if (numParams != 27) {
    log('dbg: invalid numParams=', numParams);
    return;
  }
  log('dbg:start() begin');
  while (isRunning) {
    sleep(1000);
  }
  ;og('dbg:start() end');
}

function stop() { // exported stop()
  isRunning = true;
  log('dbg:stop()');
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
