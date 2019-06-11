ESLINT=../../node_modules/.bin/eslint
JSSRC=settings.js main.js
HTMLSRC=head.html settings.js tail.html

all:  lint index.html index.js
lint: $(ESLINT) $(JSSRC)
	$(ESLINT) --fix $(JSSRC)
zip: index.zip
index.html: $(HTMLSRC)
	echo $(HTMLSRC)
	cat $(HTMLSRC) > $@
	which patchdbg && patchdbg $@
index.js: main.js lint
	cat $< > $@
	which patchdbg && patchdbg $@
index.zip: index.html index.js
	zip $@ index.html index.js
clean:
	rm -f index.html index.js
