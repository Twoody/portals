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
	
function template_b($CONFIG=Null, $PATHS=Null){
	if ($PATHS === Null){
		if ($CONFIG !== Null)
			$ROOT = $CONFIG['ROOT'];
		else
			$ROOT = '.';
		require_once($ROOT . '/config/paths.php');
		$PATHS = get_paths($ROOT);
	}
	if ($CONFIG === Null)
		$CONFIG = get_config($ROOT);
	if ($ROOT === Null)
		$ROOT = $CONFIG['ROOT'];

	require_once($PATHS['DATATABLES_CSS_PATH']);
	require_once($PATHS['DATATABLES_JS_PATH']);
	require_once($PATHS['LIBPATH_FA']);


	echo "\n<!-- TEMPLATE: " . $PATHS['TEMPLATES_B'] . "-->\n";
	if ($CONFIG['TITLE'] === "")
		$CONFIG['TITLE'] = $PATHS['TEMPLATES_B'];
	/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
	$CONFIG['HAS_DATATABLES']		= TRUE;
	$CONFIG['HAS_FONT_AWESOME']	= TRUE;
	$CONFIG['FA_STACK_SIZE']		= 'fa-2x';
	//$CONFIG['FOOTER_IS_STICKY'] = False;
	
	$CONFIG['CUSTOM_STYLES'] .= get_font_awesome_style_guide($CONFIG);
	$CONFIG['CUSTOM_STYLES'] .= "\n<style>";
	//TODO: Move to $CONFIG and get_css()
	$CONFIG['CUSTOM_STYLES'] .= "\n\t.bg-primary { background-color: #000 !important; display:flex;}";
	$CONFIG['CUSTOM_STYLES'] .= "\n\t.bg-secondary { background-color: #000 !important;}";
	$CONFIG['CUSTOM_STYLES'] .= "\n\t.bg-faded { background-color:#ada316  !important;}";
	$CONFIG['CUSTOM_STYLES'] .= "\n</style>";
	

	$html = '';
	$html .= get_header($CONFIG);
	$html .= "\n";
	$html .= "\n<body>";
	$html .= get_nav($CONFIG, $PATHS);

	$html .= "\n\t<div class=\"container-fluid pt-3\">";
	$html .= "\n\t\t<div class=\"row justify-content-start\">";
	$html .= "\n\t\t\t<div class=\"col-12 pl-3 \">";
	$html .= "\n\t\t\t\t<h1>".$CONFIG['TITLE']."</h1>";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</div>";
	$html .= "\n\t</div>";
	$html .= $CONFIG['BODY'];
	$html .= get_js($CONFIG);
	$html .=	"\n\t<!-- Optional JavaScript -->\n";
	$html .= get_footer($CONFIG);
	$html .= "\n</body>";
	$html .= "\n</html>\n";
	return $html;
}

/***** Just for testing *****/
//echo template_b(html_login_or_signout($CONFIG, $PATHS)) . "\n";
?>

