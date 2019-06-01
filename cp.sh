#!/bin/bash
set -ex
from_dir=scripts/com.twpda.Tsum
to_dir=/sdcard/Robotmon/scripts/com.twpda.Tsum
cd "$from_dir"
adb shell "mkdir -p $to_dir"
adb push index.html index.js settings.js "$to_dir"
echo Done
adb pull /sdcard/Robotmon/robotmon.log robotmon.$(date +'%Y%m%d%H%M%S').log

adb shell 'echo | tee /sdcard/Robotmon/robotmon.log'
# vim:et sw=2 ts=2 ai nocp sta
