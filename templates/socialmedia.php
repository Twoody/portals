<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: 
   Date:    2019-04-11

USAGE:
	First Check for compilation errors:
		php templates/socialmedia.php
	Second, host:
		clear & php -S localhost:8000 templates/socialmedia.php

Purpose:
    Build up to displaying the general layout expected of a websites footer;
	 Certain elements are an area for RSS feeds, social media plugins,
	 	disclosures, contact information, etc.;

******************************************************************************/
require_once('./config/imports.php');
$PATHS = get_paths();
require_once($PATHS['FONT_AWESOME_CSS_PATH']);

$CONFIG = get_config();
$CONFIG['META_CONTENT'] = "width=device-width, initial-scale=1";
$CONFIG['TITLE'] = "TEMPLATE SOCIAL MEDIA";
//$CONFIG['HAS_BOOTSTRAP'] = FALSE;
$CONFIG['HAS_FONT_AWESOME'] = TRUE;
$CONFIG['CUSTOM_STYLES'] .= get_font_awesome_style_guide();
$CONFIG['CUSTOM_SCRIPTS'] .= "<script src=\"https://use.fontawesome.com/18fb4b0697.js\"></script>";

echo "\n<!-- RUNNING: " . $PATHS['TEMPLATES_SOCIAL_MEDIA'] . "-->\n";
$CONFIG['FA_STACK_SIZE'] = 'fa-3x';
$icons_circles = Array(
	make_font_awesome_stack(Array(
		'backdrop-twitter fas fa-circle',
		'fab fa-twitter'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-facebook fas fa-circle',
		'fab fa-facebook'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-google fas fa-circle',
		'fab fa-google'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-linkedin fas fa-circle',
		'fab fa-linkedin'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-youtube fas fa-circle',
		'fab fa-youtube'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-instagram fas fa-circle',
		'fab fa-instagram'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-pinterest fas fa-circle',
		'fab fa-pinterest'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-snapchat-ghost fas fa-circle',
		'fab fa-snapchat-ghost'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-skype fas fa-circle',
		'fab fa-skype'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-android fas fa-circle',
		'fab fa-android'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-dribbble fas fa-circle',
		'fab fa-dribbble'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-foursquare fas fa-circle',
		'fab fa-foursquare'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-stumbleupon fas fa-circle',
		'fab fa-stumbleupon'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-flickr fas fa-circle',
		'fab fa-flickr'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-yahoo fas fa-circle',
		'fab fa-yahoo'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-soundcloud fas fa-circle',
		'fab fa-soundcloud'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-vine fas fa-circle',
		'fab fa-vine'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-reddit fas fa-circle',
		'fab fa-reddit'
	),$CONFIG),
	make_font_awesome_stack(Array(
		'backdrop-vimeo fas fa-circle',
		'fab fa-vimeo'
	),$CONFIG),
);
$html = '';
$html .= get_header($CONFIG);
$html .= "\n";
$html .= "\n<body>";
$html .= get_nav($CONFIG);
$html .= "\n\t<h1>Social Media Template</h1>";


	$html .= "\n\t\t<h2>Style Social Media Buttons</h2>";
	$html .= "\n\t\t<!-- Add font awesome icons -->";
	$html .= "\n\t\t<div class=\"row\">";

	foreach($icons_circles as $icon){
		$html .= $icon;
	}

	$html .= "\n\t\t</div>";

$html .= get_js($CONFIG);
$html .=	"\n\t<!-- Optional JavaScript -->\n";
$html .= "\n</body>";
$html .= "\n</html>\n";
echo $html;

?>
