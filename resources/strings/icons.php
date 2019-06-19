<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: github.com/twoody/phpTests/utils/html.php
   Date:    20190519

USAGE:
   In php, put at the head of function:
      require('/path/here/html.php');

Purpose:
	Isolate the icons that we use to avoid duplication and SOLID;

Links:
******************************************************************************/
function get_icon_nav_toggle($CONFIG){
	$i_arr	= Array(
		'class'=>'navbar-toggler-icon',
	);
	return make_tag('span', $i_arr, $CONFIG);
}
function get_icon_shopping_cart($CONFIG, $STRINGS){
	$shopping_cart	= '';
	$is_logged_in	= is_logged_in($CONFIG);
	if($is_logged_in === TRUE && !$CONFIG['IS_LOGGING_OUT']){
		$userid			= get_user_id($CONFIG);
		$shopping_cart	.=  make_font_awesome_stack(
										Array(
											'backdrop-usd fas fa-circle',
											'fas fa-tw fa-shopping-cart'
										), 
										$CONFIG
									);
		$shopping_cart 					.= "<span class=\"badge badge-primary\">";
		$shopping_cart 					.= get_cart_count($userid, $CONFIG);
		$shopping_cart 					.= "</span>";
		$shopping_cart_arr				= $nav_item_arr;
	}
	return $shopping_cart;
}

function get_config_icons($CONFIG){
	$CONFIG['FA_STACK_SIZE'] = 'fa-md';
	return Array(
		"NAV_TOGGLE"=>get_icon_nav_toggle($CONFIG),
		'CURRENCY_CIRCLE'=>make_font_awesome_stack(
			Array(
				'backdrop-usd fas fa-circle',
				'fas fa-tw fa-usd'
			), 
			$CONFIG
		),
		'DELETE_TRASH'=>make_font_awesome_stack(
			Array(
				'backdrop-google fas fa-square',
				'fas fa-tw fa-trash'
			), 
			$CONFIG
		),
		'FOOTER_GMAIL'=>make_font_awesome_stack(
			Array(
				'backdrop-google fas fa-circle',
				'fab fa-tw fa-google'
			), 
			$CONFIG
		),
		'FOOTER_SO'=>make_font_awesome_stack(
			Array(
				'backdrop-stack-overflow fas fa-circle',
				'fab fa-tw fa-stack-overflow'
			), 
			$CONFIG
		),
		'FOOTER_PLAY_STORE'=>make_font_awesome_stack(
			Array(
				'backdrop-android fas fa-circle',
				'fab fa-tw fa-android'
			), 
			$CONFIG
		),
		'FOOTER_INSTAGRAM'=>make_font_awesome_stack(
			Array(
				'backdrop-instagram fas fa-circle',
				'fab fa-tw fa-instagram'
			), 
			$CONFIG
		),
		'FOOTER_STRAVA'=>make_font_awesome_stack(
			Array(
				'backdrop-strava fas fa-circle',
				'fab fa-tw fa-strava'
			), 
			$CONFIG
		),
		'FOOTER_GITHUB'=>make_font_awesome_stack(
			Array(
				'backdrop-github fas fa-circle',
				'fab fa-tw fa-github'
			), 
			$CONFIG
		),
		'FOOTER_FACEBOOK'=>make_font_awesome_stack(
			Array(
				'backdrop-facebook fas fa-circle',
				'fab fa-tw fa-facebook'
			), 
			$CONFIG
		),
		'FOOTER_TWITTER'=>make_font_awesome_stack(
			Array(
				'backdrop-twitter fas fa-circle',
				'fab fa-tw fa-twitter'
			), 
			$CONFIG
		),
		'FOOTER_LINKEDIN'=>make_font_awesome_stack(
			Array(
				'backdrop-linkedin fas fa-circle',
				'fab fa-tw fa-linkedin'
			), 
			$CONFIG
		),
	);
}
