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

	$userid			= get_user_id($CONFIG);
	$is_logged_in	= is_logged_in($CONFIG);
	$cart_count		= get_cart_count($userid, $CONFIG);
	$fname			= get_user_fname($CONFIG);
	$is_admin		= is_admin($CONFIG);
	$path_react_js	= $ROOT . "/resources/react";		//TODO: main_nav in CONFIG;
	$nav_react_id	= "main_nav";
	$nav_react_js	= $path_react_js. "/main_nav.js";
	$nav_react_arr	= Array(
		'id'=>$nav_react_id,
		'data-root'=>$ROOT,
		'data-fname'=>$fname,
		'data-is_logged_in'=>$is_logged_in,
		'data-cart_count'=>$cart_count,
		'data-is_admin'=>$is_admin,
	);
	$nav_react		= make_tag('div', $nav_react_arr, $CONFIG);

	if ($CONFIG['TITLE'] === "")
		$CONFIG['TITLE'] = $PATHS['TEMPLATES_B'];
	/* ----- ----- GENERAL CHANGES AFTER MAIN IMPORT ----- ----- */
	$CONFIG['HAS_DATATABLES']		= TRUE;
	$CONFIG['HAS_FONT_AWESOME']	= TRUE;
	$CONFIG['FA_STACK_SIZE']		= 'fa-2x';
	$CONFIG['HAS_REACT']				= TRUE;
	$CONFIG['CUSTOM_STYLES']		.= get_font_awesome_style_guide($CONFIG);
	$CONFIG['CUSTOM_SCRIPTS']		.= "\n\t<!-- Load our React component. -->";
	$CONFIG['CUSTOM_SCRIPTS']		.= "\n\t<script type=\"text/babel\" src=\"".$nav_react_js."\"></script>";

	$html = '';
	$html .= get_header($CONFIG);
	$html .= "\n";
	$html .= "\n<body>";
	//$html .= get_nav($CONFIG, $PATHS);
//TODO: Col + row + container make_tag() calls;
	$html	.= $nav_react;
	$html .= "\n\t<div class=\"container-fluid pt-3\">";
	$html .= "\n\t\t<div class=\"row justify-content-start\">";
	$html .= "\n\t\t\t<div class=\"col-12 pl-3 \">";
	if($CONFIG['DISPLAY_HEADER'] === TRUE)
		$html .= make_tag("h1", Array('content'=>$CONFIG['TITLE']), $CONFIG);
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</div>";
	$html .= "\n\t</div>";
	$html .= $CONFIG['BODY'];
	$html .= get_js($CONFIG);
	if($CONFIG['DISPLAY_FOOTER'] && $CONFIG['DISPLAY_FOOTER'] === FALSE)
		$html .= get_footer($CONFIG);	//Icons and the such;
	$html .= "\n</body>";
	$html .= "\n</html>\n";
	return $html;
}

/***** Just for testing *****/
//echo template_b(html_login_or_signout($CONFIG, $PATHS)) . "\n";
?>

