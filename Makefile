basedir:=scripts/com.twpda.Tsum

all:
	for f in libs/*.js; do node_modules/.bin/eslint --fix $$f ; done
	for f in index.js settings.js; do \
	  node_modules/.bin/eslint --fix $(basedir)/$$f ; \
	  patchdbg $(basedir)/$$f ; \
	done
	echo Done
