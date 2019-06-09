<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: github.com/twoody/phpTests/utils/html.php
   Date:    20190511

USAGE:

Purpose:
	Organized place for parameter calls on the methods;

******************************************************************************/
require_once($PATHS['STRINGS_PHP']);
		            //'STRINGS_PHP'
function get_href_ad($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$href_arr	= Array(
		'class'=>    "btn btn-primary ad-button-link",
		'href'=>"#",
		'content'=>$STRINGS["CURRENCY"],
	);
	$href = make_tag('a', $href_arr, $CONFIG);
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
	$href_arr	= Array(
		'class'	=> "list-group-item active",
		'href'	=> $PATHS['ADMIN_DASH'],
		'content'=> $STRINGS["DASHBOARD"],
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_admin_dash1($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$href_arr	= Array(
		'class'	=> "list-group-item",
		'href'	=> $PATHS['ADMIN_DASH'],
		'content'=> "Admin: ". $STRINGS["DASHBOARD"],
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_admin_users_mgmt($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$href_arr	= Array(
		'class'	=> "list-group-item",
		'href'	=> $PATHS['ADMIN_VIEWPORT'],
		'content'=> $STRINGS['ADMIN_SQL_USERS'],
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_carousel_next($CONFIG, $car_id){
	//TODO: This definitely needs to be moved for S.R. purposes...
	$text			= "";
	$text			.= "\n\t\t\t<span class=\"carousel-control-next-icon\"></span>";
	$text			.= "\n\t\t\t<span class=\"sr-only\">Next</span>";
	$href_arr	= Array(
		'class'			=> "carousel-control-next",
		'href'			=> "#".$car_id,
		'role'			=> "button",
		'data-slide'	=> "next",
		'content'		=> $text,
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_carousel_prev($CONFIG, $car_id){
	//TODO: This definitely needs to be moved for S.R. purposes...
	$text = "";
	$text .= "\n\t\t\t<span class=\"carousel-control-prev-icon\"></span>";
	$text .= "\n\t\t\t<span class=\"sr-only\">Previous</span>";
	$href_arr	= Array(
		'class'			=> "carousel-control-prev",
		'href'			=> "#".$car_id,
		'role'			=> "button",
		'data-slide'	=> "prev",
		'content'		=> $text,
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_close_modal($CONFIG, $STRINGS){
	$href_arr	= Array(
		'class'			=> "btn btn-default close",
		'href'			=> "",
		'data-dismiss'	=> "",
		'content'		=> $STRINGS["CLOSE"],
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_close_x_modal($CONFIG, $STRINGS){
	$href_arr	= Array(
		'class'			=> "btn btn-default close",
		'href'			=> "",
		'data-dismiss'	=> "",
		'content'		=> $STRINGS["CLOSE_X"],
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_logout_button($CONFIG, $STRINGS){
	$PATHS		= get_paths($CONFIG['ROOT']);
	$button_arr	= Array(
		'class'=>'btn btn-primary btn-block btn-lg',
		'content'=>$STRINGS['LOGOUT'],
		'href'=>$PATHS['USER_LOGOUT'],
		'role'=>'button',
	);
	$button		= make_tag('a', $button_arr, $CONFIG);
	return $button;

}
function get_href_nav_admin($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$href_arr	= Array(
		'class'	=> "nav-link",
		'href'	=> $PATHS['NAV_ADMIN_PANEL'],
		'content'=> $STRINGS["NAV_ADMIN"],
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_nav_item4($CONFIG, $STRINGS){
	$PATHS 		= get_paths($CONFIG['ROOT']);
	$text_arr 	= Array(
		'class'=>"nav-link",
		'content'=>$STRINGS['NAV_ITEM4'],
		'href'=>$PATHS['NAV_ITEM4'],
	);
	$text	= make_tag("a",$text_arr, $CONFIG);
	return $text;
}
function get_href_nav_brand($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$href_arr	= Array(
		'class'	=> "navbar-brand",
		'href'	=> $PATHS['NAV_HOME'], 
		'content'=> $STRINGS["BRAND"],
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_nav_features($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$href_arr	= Array(
		'class'	=> "nav-link",
		'href'	=> $PATHS['NAV_ITEM2'],
		'content'=> $STRINGS["NAV_ITEM2"],
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_nav_home($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$href_arr	= Array(
		'class'	=> "nav-link",
		'href'	=> $PATHS['NAV_HOME'],
		'content'=> $STRINGS["NAV_HOME"],
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_nav_logout($CONFIG, $STRINGS){
	//$html .= "\n<a class=\"mute\" href=\"".$PATHS['USER_LOGOUT']."\">Logout\n</a>\n";
	$PATHS = get_paths($CONFIG['ROOT']);
	$href_arr	= Array(
		'class'	=> "mute",
		'href'	=> $PATHS['USER_LOGOUT'],
		'content'=> $STRINGS["LOGOUT"],
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_nav_pricing($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$href_arr	= Array(
		'class'	=> "nav-link",
		'href'	=> $PATHS['NAV_ITEM3'],
		'content'=> $STRINGS["NAV_ITEM3"],
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_nav_register($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$href_arr	= Array(
		'class'	=> "",
		'href'	=> $PATHS['USER_REGISTER'],
		'content'=> $STRINGS["NAV_REGISTER"],
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_nav_shopping_cart($shopping_cart, $CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$href_arr	= Array(
		'class'	=> "nav-link",
		'title'	=> $STRINGS['NAV_SHOPPING_CART'], 
		'href'	=> $PATHS['USER_DASH'],
		'content'=> $shopping_cart,
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_nav_sign_in($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$href_arr	= Array(
		'class'	=> "",
		'href'	=> $PATHS['USER_LOGIN'],
		'content'=> $STRINGS["NAV_SIGN_IN"],
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_user_dash0($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$href_arr	= Array(
		'class'	=>  "list-group-item active",
		'href'	=>  $PATHS['USER_DASHBOARD'],
		'content'=>  $STRINGS["DASHBOARD"],
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_user_go_shop($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$href_arr	= Array(
		'class'	=> "list-group-item",
		'href'	=> $PATHS['USER_GET_INVENTORY'],
		'content'=> $STRINGS['DASHBOARD_GO_SHOP'],
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
function get_href_user_inv($CONFIG, $STRINGS){
	$PATHS = get_paths($CONFIG['ROOT']);
	$href_arr	= Array(
		'class'	=> "list-group-item",
		'href'	=> $PATHS['USER_VIEW_INVENTORY'],
		'content'=> $STRINGS['DASHBOARD_VIEW_INV'],
	);
	$href = make_tag('a', $href_arr, $CONFIG);
	return $href;
}
