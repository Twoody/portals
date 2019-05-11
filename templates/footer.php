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

CONFIG:
	FOOTER_IS_STICKY:
		Boolean;
		Will offer more menu options if false:
			Twitter feed,
			PDF
			Contact Card
			Info
			Cookie Policy

Purpose:
    Display the general layout expected of a websites footer;
	 Certain elements are an area for RSS feeds, social media plugins,
	 	disclosures, contact information, etc.;

******************************************************************************/
require_once('./config/imports.php');
$PATHS = get_paths();
require_once($PATHS['FONT_AWESOME_CSS_PATH']);
require_once($PATHS['LIBPATH_FA']);

$CONFIG = get_config();
$CONFIG['TITLE'] = "TEMPLATE FOOTER";
$CONFIG['HAS_FONT_AWESOME'] = TRUE;
$CONFIG['FA_STACK_SIZE'] = 'fa-2x';
//$CONFIG['FOOTER_IS_STICKY'] = False;
$CONFIG['CUSTOM_STYLES'] .= get_font_awesome_style_guide();
$CONFIG['CUSTOM_STYLES'] .= "<style>";
//TODO: Move to $CONFIG and get_css()
$CONFIG['CUSTOM_STYLES'] .= "\n.bg-primary { background-color: #000 !important;}";
$CONFIG['CUSTOM_STYLES'] .= "\n.bg-faded { background-color:#ada316  !important;}";
$CONFIG['CUSTOM_STYLES'] .= "</style>";

echo "\n<!-- RUNNING: " . $PATHS['TEMPLATES_FOOTER'] . "-->\n";
	

$html = '';
$html .= get_header($CONFIG);
$html .= "\n";
$html .= "\n<body>";
$html .= get_nav($CONFIG);
$html .= "\n\t<h1>Footer Template</h1>";
$html .= get_js($CONFIG);
$html .= get_footer($CONFIG);
$html .= "\n</body>";
$html .= "\n</html>\n";
echo $html;

?>
