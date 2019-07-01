#!/bin/bash
set -ex
RUN_TIME=$((30))
PACKAGE_NAME=com.linecorp.LGTMTMG
ACTIVITY_NAME=.TsumTsum
TEST_LOG=test.log
STORAGE_PATH=/sdcard/Robotmon
RUN_SCRIPT_TIME=${RUN_TIME}s
APP_START_TIME=5
IS_STOP=0 # 1 for stop, 0 for skiip stop app

if [[ -z "$IP" ]]; then
  IP=$(ip r|grep default| cut -d' ' -f3)
fi
PORT=8081

if ! nc -vz "$IP" $PORT; then
  echo "Err: $IP:$PORT not open, does robotmon service started?"
  exit 1
fi
if ! ping -c 1 "$IP"; then
  echo "Err: wrong IP=$IP, can not ping"
  exit 1
fi
mystop() {
  pkill rbmcmd || true
  if [[ $IS_STOP -eq 0 ]]; then
    return
  fi
  if adb shell am force-stop $PACKAGE_NAME; then
    sleep 1
  fi
  true
}
mysleep() {
  set +x
  local n="$1" i=0
  while [[ $i -lt $n ]]; do
    sleep 1
    i=$((i+1))
    echo "$(date): mysleep i=$i"
  done
  set -x
}
mystart() {
  echo "$(date) mystart"
  adb shell am start -n $PACKAGE_NAME/$ACTIVITY_NAME
  sleep "$APP_START_TIME"
  rbmcmd "$IP:$PORT" tap 200 200 1 100ms # skip Line animation
  sleep 0.1
  rbmcmd "$IP:$PORT" tap 200 200 1 100ms # skip Tsum animation
}

# stop & clean phone side
rbmcmd "$IP:$PORT" reset
mystop
adb shell mkdir -p $STORAGE_PATH/tmp
adb shell rm -rf $STORAGE_PATH/tmp/*

mystart
# start script
echo "$(date) runscript"
rbmcmd -t "$RUN_SCRIPT_TIME" "$IP:$PORT" runscript index2.js & bgcmd=$! || true
rbmcmd -t "$RUN_SCRIPT_TIME" -f "$TEST_LOG" "$IP:$PORT" logs & bglog=$!

mysleep $RUN_TIME

# stop & backup image
kill $bgcmd $bglog
rm -rf tmp/*
adb pull -a $STORAGE_PATH/tmp .
gthumb tmp&
mystop
pkill rbmcmd || true

echo "done"
# vim:et sw=2 ts=2 ai nocp sta

