#!/bin/bash
set -ex
PACKAGE_NAME=com.linecorp.LGTMTMG
ACTIVITY_NAME=.TsumTsum
STORAGE_PATH=/sdcard/Robotmon
RUN_TIME=30
IP=$(ip r|grep default| cut -d' ' -f3)
PORT=8081

mystop() {
  if adb shell am force-stop $PACKAGE_NAME; then
    sleep 5
  fi
  true
}
mysleep() {
  set +x
  local n="$1" i=0
  while [[ $i -lt $n ]]; do
    sleep 1
    i=$((i+1))
    echo "sleep $i"
  done
  set -x
}

# stop & clean phone side
rbmcmd "$IP:$PORT" reset
mystop
adb shell mkdir -p $STORAGE_PATH/tmp
adb shell rm -rf $STORAGE_PATH/tmp/*

# start app
adb shell am start -n $PACKAGE_NAME/$ACTIVITY_NAME
sleep 5
rbmcmd "$IP:$PORT" runscript index2.js || true

mysleep $RUN_TIME

# stop & backup image
rm -rf tmp
adb pull -a $STORAGE_PATH/tmp .
sleep 5
adb shell rm -f $STORAGE_PATH/tmp/*
mystop

echo "done"
# vim:et sw=2 ts=2 ai nocp sta

