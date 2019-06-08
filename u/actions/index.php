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
    Display options to user, owners, and admin;

Links:
******************************************************************************/

$ROOT = "../..";
require_once($ROOT.'/config/imports.php');
make_imports($ROOT);
$PATHS	= get_paths($ROOT);
require_once($PATHS['TEMPLATES_B']);

$CONFIG	= get_config($ROOT);
$STRINGS	= get_config_strings($CONFIG);
$body		= "";
	
/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE'] = $STRINGS['DASHBOARD'];
$CONFIG['DISPLAY_HEADER'] = FALSE;

echo '<!-- RUNNING '.$PATHS['USER_DASH'].' -->';

if (!is_logged_in($CONFIG)){
	$col_0			= make_gen_warning($STRINGS['USER_NOT_LOGGED_IN'], $CONFIG);
	$container_0	= make_gen_container(make_gen_row($col_0, $CONFIG), $CONFIG);
	$body .= $container_0;
}
else{
	$fname		= get_user_fname($CONFIG);
	$is_admin	= is_admin($CONFIG);
	$is_owner	= is_owner($CONFIG);
	$is_member	= is_member($CONFIG);
	if($is_admin || $is_owner || $is_member){
		$list_items = Array();
		array_push($list_items, get_href_user_dash0($CONFIG, $STRINGS));
		array_push($list_items, get_href_user_inv($CONFIG, $STRINGS));
		array_push($list_items, get_href_user_go_shop($CONFIG, $STRINGS));
		if($is_owner || $is_admin){
			$shop_construction = "Shop Management: ".$STRINGS["UNDER_CONSTRUCTION"];
			array_push($list_items,	make_list_item($shop_construction));
		}
		if($is_admin){
			array_push($list_items,	get_href_admin_dash1($CONFIG, $STRINGS));
			array_push($list_items,	get_href_admin_users_mgmt($CONFIG, $STRINGS));
		}
		$list				= make_list_group($list_items);
		$col_0			= make_gen_col($STRINGS["DASHBOARD_GREETING"], $CONFIG);
		$col_1			= make_gen_col($STRINGS["GET_PURPOSE"], $CONFIG);
		$row_0			= make_gen_row($col_0.$col_1, $CONFIG);

		$col_2			= make_gen_col($list, $CONFIG);
		$row_1			= make_gen_row($col_2, $CONFIG);
		$container_0	= make_gen_container($row_0 . $row_1 . $row_2, $CONFIG);

		$col_3			= make_gen_col($STRINGS['CONTACT_ADMIN'], $CONFIG);
		$row_2			= make_gen_row($col_3, $CONFIG);
		$container_1	= make_gen_container($row_2, $CONFIG);
	
		$body .= $container_0;
		$body .= "<hr>";
		$body .= $container_1;
		$body .= "<hr>";
	}
}

$CONFIG['BODY'] .= $body;
echo template_b($CONFIG, $PATHS) . "\n";
?>
