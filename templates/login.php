<!doctype html>
<?
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: 
   Date:    2019-04-10

USAGE:
	First Check for compilation errors:
		php templates/login.php
	Second, host:
		clear & php -S localhost:8000 templates/login.php
Purpose:
    Display the general layout expected of a login page;
	 Display the locations where possible params and configs can take place;

******************************************************************************/

require_once('./config/imports.php');
$PATHS = get_paths();

require_once($PATHS['DATATABLES_CSS_PATH']);
require_once($PATHS['DATATABLES_JS_PATH']);
require_once($PATHS['HTML_LOGIN_OR_SIGNOUT']);
require_once($PATHS['LIBPATH_FA']);
$CONFIG = get_config();

/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE'] = "TEMPLATE LOGIN";
$CONFIG['HAS_DATATABLES'] = TRUE;
$CONFIG['HAS_FONT_AWESOME'] = TRUE;
$CONFIG['FA_STACK_SIZE'] = 'fa-2x';
//$CONFIG['FOOTER_IS_STICKY'] = False;

$CONFIG['CUSTOM_STYLES'] .= get_font_awesome_style_guide();
$CONFIG['CUSTOM_STYLES'] .= "<style>";
//TODO: Move to $CONFIG and get_css()
$CONFIG['CUSTOM_STYLES'] .= "\n.bg-primary { background-color: #000 !important;}";
$CONFIG['CUSTOM_STYLES'] .= "\n.bg-faded { background-color:#ada316  !important;}";
$CONFIG['CUSTOM_STYLES'] .= "</style>";


echo "\n<!-- RUNNING: " . $PATHS['TEMPLATES_LOGIN'] . "-->\n";
	

$html = '';
$html .= get_header($CONFIG);
$html .= "\n";
$html .= "\n<body>";
$html .= get_nav($CONFIG);
$html .= "\n\t<h1>Login Template</h1>";
$html .= get_js($CONFIG);
$html .=	"\n\t<!-- Optional JavaScript -->\n";

$html .= html_login_or_signout($CONFIG, $PATHS);
$html .= get_footer($CONFIG);
$html .= "\n</body>";
$html .= "\n</html>\n";
echo $html;
?>
