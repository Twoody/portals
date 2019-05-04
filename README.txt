Author:
	Tanner.L.Woody@gmail.com 20181118
Date:	
	2019-04-09

Dependencies:
	1. SQLite3
	2. Php 7
	3. Bootstrap
	4. JQuery
	5. Data Tables
	6. Popper JS
	7. Font Awesome

Purpose:
	1. General Site Framework
	2. Proper Organization and Clean Code Principles
	3. Proper use of importing, config files, dbs, and loggers
	4. Proper use of utils, error mgmt, and string mgmt.
	5. Hopeful clean architecture for unit tests
	6. SESSION, POST, GET principals

Project Navigation:
	1. Everything is ran from root
	2. ./config/import.php and ./config/settings.php;
	3. All strings for error messages and html should be imported
		in order to keep a single place for translation services;

To Run:
	1. From command line:
		A.	Execute command from shell:
			clear & php -S localhost:8000 index.php
		B.	Open browser to localhost:8000;

	2. As `example.com`
		A. /etc/apache2/httpd.conf
			a. `LoadModule php7_module` uncommented to turn on;
			b. `Servername to www.exmaple.com:80` uncommented and turned on;
			b. Library/Webserver/Documents/ to Users/tannerleewoody/Workspace/portals/
				i. Did this twice; left old commented out;
		B. /etc/hosts
				```
				##
				# Host Database
				#
				# localhost is used to configure the loopback interface
				# when the system is booting.  Do not change this entry.
				##
				#127.0.0.1	localhost
				127.0.0.1	www.example.com
				255.255.255.255	broadcasthost
				::1             localhost
		C. For more information, see ~/Diary/20190419

Naming Conventions and Styling:
	snake_case naming convention;
	tabs, not spaces;
	tabstop = 3;

Glossary:
	Bootstrap:
		mt: Margin Top
		mb: margin bottom
		mr: margin right
		ml: margine left
		p*: padding *
		col-#: col-xs-#
	CLI:
		Comman Line Interface
