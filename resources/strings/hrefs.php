<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: github.com/twoody/phpTests/utils/html.php
   Date:    20190511

USAGE:

Purpose:
	Organized place for parameter calls on the methods;

******************************************************************************/
echo "\n<!-- NEW ".$PATHS['STRINGS_HREF']." imported -->\n";
require_once($PATHS['STRINGS_PHP']);
		            //'STRINGS_PHP'

function get_href_admin_dash0($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$CONFIG['HREF_CLASS']	= "list-group-item active";
	$CONFIG['HREF_LINK']		= $PATHS['ADMIN_DASH'];
	$CONFIG['HREF_ROLE']		= "";
	$CONFIG['HREF_TEXT']		= $STRINGS["DASHBOARD"];
	$href = make_href($CONFIG);
	return $href;
}
function get_href_admin_dash1($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$CONFIG['HREF_CLASS']	= "list-group-item";
	$CONFIG['HREF_LINK']		= $PATHS['ADMIN_DASH'];
	$CONFIG['HREF_ROLE']		= "";
	$CONFIG['HREF_TEXT']		= "Admin: ". $STRINGS["DASHBOARD"];
	$href = make_href($CONFIG);
	return $href;
}
function get_href_admin_users_mgmt($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$CONFIG['HREF_CLASS']	= "list-group-item";
	$CONFIG['HREF_LINK']		= $PATHS['ADMIN_VIEWPORT'];
	$CONFIG['HREF_ROLE']		= "";
	$CONFIG['HREF_TEXT']		= $STRINGS['ADMIN_SQL_USERS'];
	$href = make_href($CONFIG);
	return $href;
}
function get_href_user_dash0($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$CONFIG['HREF_CLASS']	= "list-group-item active";
	$CONFIG['HREF_LINK']		= $PATHS['USER_DASHBOARD'];
	$CONFIG['HREF_ROLE']		= "";
	$CONFIG['HREF_TEXT']		= $STRINGS["DASHBOARD"];
	$href = make_href($CONFIG);
	return $href;
}
function get_href_user_go_shop($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$CONFIG['HREF_CLASS']	= "list-group-item";
	$CONFIG['HREF_LINK']		= $PATHS['USER_GET_INVENTORY'];
	$CONFIG['HREF_ROLE']		= "";
	$CONFIG['HREF_TEXT']		= $STRINGS['DASHBOARD_GO_SHOP'];
	$href = make_href($CONFIG);
	return $href;
}
function get_href_user_inv($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$CONFIG['HREF_CLASS']	= "list-group-item";
	$CONFIG['HREF_LINK']		= $PATHS['USER_VIEW_INVENTORY'];
	$CONFIG['HREF_ROLE']		= "";
	$CONFIG['HREF_TEXT']		= $STRINGS['DASHBOARD_VIEW_INV'];
	$href = make_href($CONFIG);
	return $href;
}
