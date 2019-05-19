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
function get_href_ad($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$CONFIG['HREF_CLASS']	= "btn btn-primary ad_button_link";
	$CONFIG['HREF_LINK']		= "#";
	$CONFIG['HREF_ROLE']		= "";
	$CONFIG['HREF_TEXT']		= $STRINGS["CURRENCY"];
	$href = make_href($CONFIG);
	return $href;
}
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
function get_href_carousel_next($CONFIG, $car_id){
	//TODO: This definitely needs to be moved for S.R. purposes...
	$text = "";
	$text .= "\n\t\t\t<span class=\"carousel-control-next-icon\"></span>";
	$text .= "\n\t\t\t<span class=\"sr-only\">Next</span>";
	$CONFIG['HREF_CLASS']		= "carousel-control-next";
	$CONFIG['HREF_LINK']			= "#".$car_id;
	$CONFIG['HREF_ROLE']			= "button";
	$CONFIG['HREF_DATA_SLIDE']	= "next";
	$CONFIG['HREF_TEXT']			= $text;

	$href = make_href($CONFIG);
	return $href;
}
function get_href_carousel_prev($CONFIG, $car_id){
	//TODO: This definitely needs to be moved for S.R. purposes...
	$text = "";
	$text .= "\n\t\t\t<span class=\"carousel-control-prev-icon\"></span>";
	$text .= "\n\t\t\t<span class=\"sr-only\">Previous</span>";
	$CONFIG['HREF_CLASS']		= "carousel-control-prev";
	$CONFIG['HREF_LINK']			= "#".$car_id;
	$CONFIG['HREF_ROLE']			= "button";
	$CONFIG['HREF_DATA_SLIDE']	= "prev";
	$CONFIG['HREF_TEXT']			= $text;

	$href = make_href($CONFIG);
	return $href;
}
function get_href_close_modal($CONFIG, $STRINGS){
	$CONFIG['HREF_CLASS']			= "btn btn-default close";
	$CONFIG['HREF_LINK']				= "";
	$CONFIG['HREF_ROLE']				= "";
	$CONFIG['HREF_DATA_DISMISS']	= "";
	$CONFIG['HREF_TEXT']				= $STRINGS["CLOSE"];
	$href = make_href($CONFIG);
	return $href;
}
function get_href_close_x_modal($CONFIG, $STRINGS){
	$CONFIG['HREF_CLASS']			= "btn btn-default close";
	$CONFIG['HREF_LINK']				= "";
	$CONFIG['HREF_ROLE']				= "";
	$CONFIG['HREF_DATA_DISMISS']	= "";
	$CONFIG['HREF_TEXT']				= $STRINGS["CLOSE_X"];
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
