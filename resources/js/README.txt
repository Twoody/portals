Author:
	Tanner.L.Woody@gmail.com 20181118
Date:	
	2019-05-11

SEE:
	First, see whether support is being handled for online or offline.
	This flag is found withing ./config/settings.php and $CONFIG['IS_ONLINE'];

	If user is online, then we will call CDN's;
	Else, we will use local and offline copies.

	Local copies of files can be found within:
		.../js/offline/
		.../css/offline/
	
	Finally, the path names for these files being installed can be found within
	$PATHS['LOCAL_JS_*'] and $PATHS['LOCAL_CSS_*'] in ./config/paths.php;
