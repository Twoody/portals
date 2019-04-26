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

$ROOT = "..";
require_once($ROOT.'/config/imports.php');
make_imports($ROOT);
$PATHS  = get_paths($ROOT);
require_once($PATHS['TEMPLATES_B']);

$CONFIG = get_config($ROOT);
$body   = "";
	
/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE'] = "Logout";
$CONFIG['DISPLAY_HEADER'] = FALSE;
$CONFIG['CUSTOM_STYLES'] .= "\n<style>";
$CONFIG['CUSTOM_STYLES'] .= "\n\t.sticky{position: sticky; top: 0;}"; 
$CONFIG['CUSTOM_STYLES'] .= "\n</style>";

echo '<!-- RUNNING '.$PATHS['USER_LOGOUT'].' -->';
$body .= "\n\t\t<div class=\"container fixed-width m-5 sticky\">";
$body .= "\n\t\t\t<div class=\"row justify-content-center\">";
if (is_logged_in($CONFIG)){
	$_SESSIONS['username'] = Null;
	$_SESSIONS['loggedin'] = Null;
	$_SESSIONS['alevel'] = Null;
	$_SESSIONS['email'] = Null;
	session_destroy();
	$body .= "\n\t\t\t\t<div class=\"col-12\">";
	$body .= "\n\t\t\t\t\tSuccessfully logged out";
	$body .= "\n\t\t\t\t</div>";
	$body .= "\n\t\t\t\t<div class=\"col-12\">";
	$body .= "<button type=\"button\" class=\"btn btn-primary btn-block btn-lg\">";
	$body .= "\n\t\t\t\t\t<a style=\"color:white;\" href=\"".$PATHS['NAV_HOME']."\">Return home</a>";
	$body .= "</button>";
	$body .= "\n\t\t\t\t</div>";
}
else{
	//user not logged in
	$body .= "\n\t\t\t\t<div class=\"col-12 bg-warning\">";
	$body .= "\n\t\t\t\t\tWarning, not logged in;";
	$body .= "\n\t\t\t\t</div>";
}
$body .= "\n\t\t\t</div>";
$body .= "\n\t\t</div>";
echo template_b($body, $CONFIG, $PATHS) . "\n";

?>
