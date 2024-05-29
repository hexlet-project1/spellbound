setup:
	npm ci
lint:
	npx eslint .
lint-fix:
	npx eslint . --fix
prettier:
	npx prettier . --check