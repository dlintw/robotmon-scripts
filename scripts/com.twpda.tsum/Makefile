JSSRC=settings.js main.js

ESLINT=../../node_modules/.bin/eslint
RBM=../../libs/RBM-0.0.3.js
COLORLIB=../../libs/framework/colors.js

all:  lint index.html index2.js
lint: $(ESLINT) $(JSSRC)
	$(ESLINT) --fix $(JSSRC)
zip: index.zip
index.html: head.html settings.js tail.html
	cp head.html $@
	if which patchdbg; then \
	  patchdbg - < settings.js >> $@ ;\
	else \
	  cat settings.js >> $@ ;\
	fi
	cat tail.html >> $@
#index.js: main.js $(RBM) $(COLORLIB)
#	cat $< $(RBM) $(COLORLIB) > $@
#	! which patchdbg || patchdbg $@
index.js: main.js
	cp $< $@
	! which patchdbg || patchdbg $@
index2.js: index.js
	cp $< $@
	echo "start();" >> $@
index.zip: index.html index.js
	zip $@ index.html index.js
clean:
	rm -f index.html index.js
cp: all
	adb shell mkdir -p /sdcard/Robotmon/scripts/com.twpda.tsum
	adb push index.html index.js /sdcard/Robotmon/scripts/com.twpda.tsum
log: # this won't buffer, because the adb logcat output much more lines
	adb logcat | grep -P '.*GoLog(?!.*GrpcService)'
log2: # this will buffer output, but brief format
	adb logcat | grep -P '.*GoLog(?!.*GrpcService)' \
		| cut -d ' ' -f 2,8,9,10,11,12,13,14,15 | tr -s ' '
cpimg:
	rm -rf tmp
	adb pull -a /sdcard/Robotmon/tmp .
	adb shell rm -f /sdcard/Robotmon/tmp/*
