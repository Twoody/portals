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
	$CONFIG['HREF_CLASS']	= "btn btn-primary ad-button-link";
	$CONFIG['HREF_LINK']		= "#";
	$CONFIG['HREF_ROLE']		= "";
	$CONFIG['HREF_TEXT']		= $STRINGS["CURRENCY"];
	$href = make_href($CONFIG);
	return $href;
}
function get_href_ad_sm($content, $href, $CONFIG){
	$text_arr 	= Array(
		'class'=>"text-center btn btn-primary ad-button-link",
		'class'=>"ad-button-link btn btn-primary",
		'content'=>$content,
		'href'=>$href,
		//'style'=>"",
	);
	$text	= make_tag("a",$text_arr, $CONFIG);
	return $text;

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
function get_href_nav_admin($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$CONFIG['HREF_CLASS']	= "nav-link";
	$CONFIG['HREF_LINK']		= $PATHS['NAV_ADMIN_PANEL'];
	$CONFIG['HREF_TEXT']		= $STRINGS["NAV_ADMIN"];
	$href = make_href($CONFIG);
	return $href;
}
function get_href_nav_brand($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$CONFIG['HREF_CLASS']			= "navbar-brand";
	$CONFIG['HREF_LINK']				= $PATHS['NAV_HOME'];
	$CONFIG['HREF_TEXT']				= $STRINGS["BRAND"];
	$href = make_href($CONFIG);
	return $href;
}
function get_href_nav_features($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$CONFIG['HREF_CLASS']			= "nav-link";
	$CONFIG['HREF_LINK']				= $PATHS['NAV_ITEM2'];
	$CONFIG['HREF_TEXT']				= $STRINGS["NAV_ITEM2"];
	$href = make_href($CONFIG);
	return $href;
}
function get_href_nav_home($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$CONFIG['HREF_CLASS']			= "nav-link";
	$CONFIG['HREF_LINK']				= $PATHS['NAV_HOME'];
	$CONFIG['HREF_TEXT']				= $STRINGS["NAV_HOME"];
	$href = make_href($CONFIG);
	return $href;
}
function get_href_nav_logout($CONFIG, $STRINGS){
	//$html .= "\n<a class=\"mute\" href=\"".$PATHS['USER_LOGOUT']."\">Logout\n</a>\n";
	$PATHS = get_paths($CONFIG['ROOT']);
	$CONFIG['HREF_CLASS']			= "mute";
	$CONFIG['HREF_LINK']				= $PATHS['USER_LOGOUT'];
	$CONFIG['HREF_TEXT']				= $STRINGS["LOGOUT"];
	$href = make_href($CONFIG);
	return $href;
}
function get_href_nav_pricing($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$CONFIG['HREF_CLASS']			= "nav-link";
	$CONFIG['HREF_LINK']				= $PATHS['NAV_ITEM3'];
	$CONFIG['HREF_TEXT']				= $STRINGS["NAV_ITEM3"];
	$href = make_href($CONFIG);
	return $href;
}
function get_href_nav_register($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$CONFIG['HREF_CLASS']	= "";
	$CONFIG['HREF_LINK']		= $PATHS['USER_REGISTER'];
	$CONFIG['HREF_TEXT']		= $STRINGS["NAV_REGISTER"];
	$href = make_href($CONFIG);
	return $href;
}
function get_href_nav_shopping_cart($shopping_cart, $CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$CONFIG['HREF_CLASS']			= "nav-link";
	$CONFIG['HREF_TITLE']			= $STRINGS['NAV_SHOPPING_CART'];;
	$CONFIG['HREF_LINK']				= $PATHS['USER_DASH'];
	$CONFIG['HREF_TEXT']				= $shopping_cart;
	$href = make_href($CONFIG);
	return $href;
}
function get_href_nav_sign_in($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$CONFIG['HREF_CLASS']	= "";
	$CONFIG['HREF_LINK']		= $PATHS['USER_LOGIN'];
	$CONFIG['HREF_TEXT']		= $STRINGS["NAV_SIGN_IN"];
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
