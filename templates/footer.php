<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: 
   Date:    2019-04-11

USAGE:
	First Check for compilation errors:
		php templates/footer.php
	Second, host:
		clear & php -S localhost:8000 templates/footer.php

Purpose:
    Display the general layout expected of a websites footer;
	 Certain elements are an area for RSS feeds, social media plugins,
	 	disclosures, contact information, etc.;

******************************************************************************/
require_once('./config/imports.php');
$PATHS = get_paths();
$CONFIG = get_config();
$CONFIG['TITLE'] = "TEMPLATE FOOTER";

echo "\n<!-- RUNNING: " . $PATHS['TEMPLATES_FOOTER'] . "-->\n";

$html = '';
$html .= get_header($CONFIG);
$html .= "\n";
$html .= "\n<body>";
$html .= get_nav($CONFIG);
$html .= "\n\t<h1>Footer Template</h1>";
$html .= get_js($CONFIG);
$html .=	"\n\t<!-- Optional JavaScript -->\n";

$html .= "\n</body>";
$html .= "\n</html>\n";
echo $html;

?>
