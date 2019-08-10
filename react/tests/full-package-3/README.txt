This directory showcases how we can have our react development in the same dir
as the pages that we hope to run via `apachectl` on your unix/linux setup;

This is assuming that we are running `example.com` in our /etc/apache2/httpd.conf
See .../portals/README.txt for help on setting up `example.com`.

We are going to accomplish this by:
	mkdir my-facing-page/
	cd my-facing-page
	create-react-app ./src
	cd ./src
	vim package.json						<-- Will want to add `"homepage": "https://example.com/.../my-facing-page/",
	npm run build
	cd ../
	sudo cp -r ./src/build/* ./
, at this point, open the page declared in "homepage" and your app should be running;

The only possible issue with this is going to be the custom hashes that are
created each time that we run `npm run build`. If we are going to run 
multiple tests and try to script this out, we will have to remove these custom 
hashed files, as the `sudo cp` will not overwrite them.

