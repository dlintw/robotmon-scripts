JSSRC=settings.js main.js
HTMLSRC=head.html settings.js tail.html

ESLINT=../../node_modules/.bin/eslint
RPM=../../libs/RBM-0.0.3.js

all:  lint index.html index.js
lint: $(ESLINT) $(JSSRC)
	$(ESLINT) --fix $(JSSRC)
zip: index.zip
index.html: $(HTMLSRC)
	echo $(HTMLSRC)
	cat $(HTMLSRC) > $@
	! which patchdbg || patchdbg $@
index.js: main.js $(RPM)
	cat $(RPM) $< > $@
	! which patchdbg || patchdbg $@
index.zip: index.html index.js
	zip $@ index.html index.js
clean:
	rm -f index.html index.js
cp:
	adb shell push index.html index.js sdcard/RobotMon/com.twpda.tsum
