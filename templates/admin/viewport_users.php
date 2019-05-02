<?php
session_start();
?>
<!doctype html>
<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: 
   Date:    2019-04-22

USAGE:
	First Check for compilation errors:
		php index.php
	Second, host:
		With PHP:
			clear & php -S localhost:8000 templates/login.php
		With APACHE:
			sudo apachectl start

Purpose:
    Fun way to show that page was not found;

Links:
	https://www.w3schools.com/bootstrap4/bootstrap_carousel.asp
******************************************************************************/

$ROOT = "../..";
require_once($ROOT.'/config/imports.php');
make_imports($ROOT);
$PATHS	= get_paths($ROOT);
$home		= $PATHS['NAV_HOME'];
require_once($PATHS['TEMPLATES_B']);

$CONFIG	= get_config($ROOT);
$STRINGS	= get_config_strings($CONFIG);
$body   = "";
	
/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE'] = "Logout";
$CONFIG['DISPLAY_HEADER'] = FALSE;
$CONFIG['RESPONSE_CONTAINER'] = "\n<div class=\"container-fluid pr-3 pl-3 m-0\">";
$CONFIG['RESPONSE_ROW']			= "\n\t<div class=\"row pl-3 pr-3 m-0\">";
$CONFIG['CUSTOM_STYLES'] .= "\n<style>";
$CONFIG['CUSTOM_STYLES'] .= "\n\t.sticky{position: sticky; top: 0;}"; 
$CONFIG['CUSTOM_STYLES'] .= "\n</style>";

echo '<!-- RUNNING '.$PATHS['USER_LOGOUT'].' -->';

if (!is_logged_in($CONFIG)){
	$CONFIG['BODY'] = $STRINGS['USER_NOT_LOGGED_IN'];
}
else if($_SESSIONS['alevel'] !== 'admin'){
	$CONFIG['BODY'] = $STRINGS['USER_INVALID_PERMISSION'];
}
else{
	//Admin level access
	$body .= $CONFIG['RESPONSE_CONTAINER'];
	$body .= $CONFIG['RESPONSE_ROW'];
	$body .= "\n\t\t\t\t<div class=\"col-12\">";
	$body .= "\n\t\t\t\t\tHowdy, Admin";
	$body .= "\n\t\t\t\t</div>";
	$body .= "\n\t\t\t</div><!-- END ROW -->";
	$body .= "\n\t\t</div><!-- End container -->";
}

$body .= "\n\t\t</div>";

$CONFIG['BODY'] .= $body;
echo template_b($CONFIG, $PATHS) . "\n";

?>
