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
function get_config_icons($CONFIG){
	return Array(
		"NAV_TOGGLE"=>"\n\t\t\t\t<span class=\"navbar-toggler-icon\"></span>",
		'CURRENCY_CIRCLE'=>make_font_awesome_stack(Array(
								'backdrop-usd fas fa-circle',
								'fas fa-tw fa-usd'), $CONFIG
								),
	);
}
