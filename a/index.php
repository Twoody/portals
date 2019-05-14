<?php
session_start();
?>
<!doctype html>
<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: 
   Date:    2019-05-01

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

$ROOT = "..";
require_once($ROOT.'/config/imports.php');
make_imports($ROOT);
$PATHS	= get_paths($ROOT);
$home		= $PATHS['NAV_HOME'];
require_once($PATHS['TEMPLATES_B']);

$CONFIG	= get_config($ROOT);
$STRINGS	= get_config_strings($CONFIG);
$body  	= "";
	
/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE'] = "Logout";
$CONFIG['DISPLAY_HEADER'] = FALSE;
$CONFIG['CUSTOM_STYLES'] .= "\n<style>";
$CONFIG['CUSTOM_STYLES'] .= "\n\t.sticky{position: sticky; top: 0;}"; 
$CONFIG['CUSTOM_STYLES'] .= "\n</style>";

echo '<!-- RUNNING '.$PATHS['ADMIN_DASH'].' -->';

if (!is_logged_in($CONFIG)){
	$col_0			= make_gen_warning($STRINGS['USER_NOT_LOGGED_IN'], $CONFIG);
	$container_0	= make_gen_container(make_gen_row($col_0, $CONFIG), $CONFIG);
	$body .= $container_0;
}
else if($_SESSION['alevel'] !== 'admin'){
	$col_0			= make_gen_warning($STRINGS['USER_INVALID_PERMISSION'], $CONFIG);
	$container_0	= make_gen_container(make_gen_row($col_0, $CONFIG), $CONFIG);
	$col_1			= make_gen_info($STRINGS['USER_ACCESS_LEVEL'], $CONFIG);
	$container_1	= make_gen_container(make_gen_row($col_1, $CONFIG), $CONFIG);
	$body .= $container_0;
	$body .= $container_1;

}
else{
	//Admin level access
	$fname		= get_user_fname($CONFIG);
	$col_0		= make_gen_col($STRINGS["DASHBOARD_GREETING"], $CONFIG);
	$col_1		= make_gen_col($STRINGS["HELPFUL_LINKS"], $CONFIG);
	$cols_0		= $col_0 . $col_1;
	$row0			= make_gen_row($cols_0, $CONFIG);
	$list_items = Array(
		get_href_admin_dash0($CONFIG, $STRINGS),
		get_href_admin_users_mgmt($CONFIG, $STRINGS),
		make_list_item("More"),
		make_list_item("to"),
		make_list_item("Come"),
	);
	$list			= make_list_group($list_items);
	$container	= make_gen_container($row0 . $list, $CONFIG);
	$body .= $container;
}

$CONFIG['BODY'] .= $body;
echo template_b($CONFIG, $PATHS) . "\n";

?>
