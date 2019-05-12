<?php
session_start();
?>
<!doctype html>
<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: 
   Date:    2019-05-09

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

echo '<!-- RUNNING '.$PATHS['USER_DASH'].' -->';

if (!is_logged_in($CONFIG))
	$body .= $STRINGS['USER_NOT_LOGGED_IN'];
else{
	$fname = get_user_fname($CONFIG);
	if($_SESSION['alevel'] === 'member' || $_SESSION['alevel'] === 'owner' || $_SESSION['alevel'] === 'admin'){
		$body .= $CONFIG['RESPONSE_CONTAINER'];
		$body .= $CONFIG['RESPONSE_ROW'];
		$body .= "\n\t\t\t\t<div class=\"col-12\">";
		$body .= "\n\t\t\t\t\tHowdy, ".$fname."";
		$body .= "\n\t\t\t\t</div>";
		$body .= "\n\t\t\t\t<div class=\"col-12\">";
		$body .= "\n\t\t\t\t\t" . $STRINGS["GET_PURPOSE"];
		$body .= "\n\t\t\t\t</div>";
		$body .= "\n\t\t\t</div><!-- END ROW -->";
	//
		$body .= "\n<ul class=\"list-group\">";
		$body .= "\n\t<a href=\"".$PATHS['USER_DASHBOARD']."\" ";
		$body .= "class=\"list-group-item active\">";
		$body .= "\n\t\tDashboard";
		$body .= "\n\t</a>";
	
		$body .= "\n\t<a href=\"".$PATHS['USER_VIEW_INVENTORY']."\" ";
		$body .= "class=\"list-group-item\">";
		$body .= "\n\t\tView Current Inventory";
		$body .= "\n\t</a>";
	
		$body .= "\n\t<a href=\"".$PATHS['USER_GET_INVENTORY']."\" ";
		$body .= "class=\"list-group-item\">";
		$body .= "\n\t\tBuy More Stuff";
		$body .= "\n\t</a>";

		if($_SESSION['alevel'] === 'owner'){
			$body .= "\n\t<li class=\"list-group-item\">Manage Members: Under Construction</li>";
		}
		if($_SESSION['alevel'] === 'admin'){
			$body .= "\n\t<a href=\"".$PATHS['ADMIN_DASH']."\" ";
			$body .= "class=\"list-group-item\">";
			$body .= "\n\t\tAdmin Dashboard";
			$body .= "\n\t</a>";
			$body .= "\n\t<a href=\"" . $PATHS['ADMIN_VIEWPORT'] . "\" ";
			$body .= "class=\"list-group-item\">";
			$body .= "\n\t\t" . $STRINGS['ADMIN_SQL_USERS'];
			$body .= "\n\t</a>";
		}
	}
}

$body .= "\n\t\t</div>";

$CONFIG['BODY'] .= $body;
echo template_b($CONFIG, $PATHS) . "\n";

?>
