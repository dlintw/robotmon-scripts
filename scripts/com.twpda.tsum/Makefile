JSSRC=settings.js main.js
HTMLSRC=head.html settings.js tail.html

ESLINT=../../node_modules/.bin/eslint
RBM=../../libs/RBM-0.0.3.js
COLORLIB=../../libs/framework/colors.js

all:  lint index.html index.js
lint: $(ESLINT) $(JSSRC)
	$(ESLINT) --fix $(JSSRC)
zip: index.zip
index.html: $(HTMLSRC)
	echo $(HTMLSRC)
	cat $(HTMLSRC) > $@
	! which patchdbg || patchdbg $@
index.js: main.js $(RBM) $(COLORLIB)
	cat $< $(RBM) $(COLORLIB) > $@
	! which patchdbg || patchdbg $@
index.zip: index.html index.js
	zip $@ index.html index.js
clean:
	rm -f index.html index.js
cp: all
	adb shell mkdir -p /sdcard/Robotmon/scripts/com.twpda.tsum
	adb push index.html index.js /sdcard/Robotmon/scripts/com.twpda.tsum
log:
	adb logcat | grep GoLog
cpimg:
	adb pull /sdcard/Robotmon/scripts/com.twpda.tsum/images/tsum.png .
