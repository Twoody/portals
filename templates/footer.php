<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: 
   Date:    2019-04-11

USAGE:
	First Check for compilation errors:
		php templates/footer.php
	Second, host:
		clear & php -S localhost:8000 templates/footer.php

Purpose:
    Display the general layout expected of a websites footer;
	 Certain elements are an area for RSS feeds, social media plugins,
	 	disclosures, contact information, etc.;

******************************************************************************/
require_once('./config/imports.php');
$PATHS = get_paths();
require_once($PATHS['FONT_AWESOME_CSS_PATH']);
require_once($PATHS['LIBPATH_FA']);

$CONFIG = get_config();
$CONFIG['TITLE'] = "TEMPLATE FOOTER";
$CONFIG['HAS_FONT_AWESOME'] = TRUE;
$CONFIG['FA_STACK_SIZE'] = 'fa-2x';
$CONFIG['CUSTOM_STYLES'] .= get_font_awesome_style_guide();
$CONFIG['CUSTOM_STYLES'] .= "<style>";
$CONFIG['CUSTOM_STYLES'] .= ".bg-primary { background-color: #000 !important;}";
$CONFIG['CUSTOM_STYLES'] .= "</style>";

$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t<script src=\"https://use.fontawesome.com/18fb4b0697.js\"></script>";

function make_bottom_cols($entries, $CONFIG=Null){
	//TODO: Make this customizable to make the icons bigger from xs to md screens;
	if($CONFIG === Null)
		$CONFIG = get_config();
	$html = "";
	$html .= "\n\t\t\t\t\t\t<div class=\"col-xs-4\">";
	$html .= "\n\t\t\t\t\t\t\t<div class=\"d-inline-block\">";
	foreach($entries as $entry){
		$href = $entry['href'];
		$icon = $entry['icon'];
		$html .= "\n\t\t\t\t\t\t\t\t<div class=\"d-inline-block text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t\t<a href=\"". $href . "\" class=\"text-white\">";
		$html .= "\n\t\t\t\t\t\t\t\t\t\t";
		$html .= $icon;
		$html .= "\n\t\t\t\t\t\t\t\t\t</a>";
		$html .= "\n\t\t\t\t\t\t\t\t</div>";
	}
	$html .= "\n\t\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t\t</div>";
	return $html;
}
$CONFIG['FA_STACK_SIZE'] = 'fa-md';
$col1 = Array(
	Array(	'href'=>$CONFIG['LINK_GMAIL'],
				'icon'=>make_font_awesome_stack(Array(
					'backdrop-google fas fa-circle',
					'fab fa-fw fa-google'
				),$CONFIG),
	),
	Array(	'href'=>$CONFIG['LINK_STACKOVERFLOW'],
				'icon'=>make_font_awesome_stack(Array(
					'backdrop-stack-overflow fas fa-circle',
					'fab fa-tw fa-stack-overflow'
				),$CONFIG),
	),
	Array(	'href'=>$CONFIG['LINK_ANDROID'],
				'icon'=>make_font_awesome_stack(Array(
					'backdrop-android fas fa-circle',
					'fab fa-tw fa-android'
				),$CONFIG),
	),
);
$col2 = Array(
	Array(	'href' => $CONFIG['LINK_INSTA'],
				'icon' => make_font_awesome_stack(Array(
					'backdrop-instagram fas fa-circle',
					'fab fa-fw fa-instagram'
				),$CONFIG),
	),
	Array(	'href' => $CONFIG['LINK_STRAVA'] ,
				'icon' => make_font_awesome_stack(Array(
					'backdrop-strava fas fa-circle',
					'fab fa-tw fa-strava'
				),$CONFIG),
	),
	Array(	'href' => $CONFIG['LINK_GITHUB'],
				'icon' => make_font_awesome_stack(Array(
					'backdrop-github fas fa-circle',
					'fab fa-tw fa-github'
				),$CONFIG),
	),
);
$col3 = Array(
	Array(	'href' => $CONFIG['LINK_FACEBOOK'] ,
				'icon' => make_font_awesome_stack(Array(
					'backdrop-facebook fas fa-circle',
					'fab fa-fw fa-facebook'
				),$CONFIG),
	),
	Array(	'href'=> $CONFIG['LINK_TWITTER'] ,
				'icon'=> make_font_awesome_stack(Array(
					'backdrop-twitter fas fa-circle',
					'fab fa-tw fa-twitter'
				),$CONFIG),
	),
	Array(	'href' => $CONFIG['LINK_LINKEDIN'],
				'icon' => make_font_awesome_stack(Array(
					'backdrop-linkedin fas fa-circle',
					'fab fa-tw fa-linkedin'
				),$CONFIG),
	),
);
$CONFIG['FA_STACK_SIZE'] = 'fa-2x';

echo "\n<!-- RUNNING: " . $PATHS['TEMPLATES_FOOTER'] . "-->\n";

$html = '';
$html .= get_header($CONFIG);
$html .= "\n";
$html .= "\n<body>";
$html .= get_nav($CONFIG);
$html .= "\n\t<h1>Footer Template</h1>";
$html .= get_js($CONFIG);

$html .= "\n\t\t<footer class=\"mt-5\">";
$html .= "\n\t\t\t<div class=\"container-fluid bg-faded mt-5\">";
$html .= "\n\t\t\t\t<div class=\"container\">";
$html .= "\n\t\t\t\t\t<div class=\"row py-3 d-none d-md-block\">";
$html .= "\n\t\t\t\t\t<!-- footer column 1 start -->";
$html .= "\n\t\t\t\t\t\t<div class=\"col-md-4\">";
$html .= "\n\t\t\t\t\t\t<!-- row start -->";
$html .= "\n\t\t\t\t\t\t\t<div class=\"row py-2\">";
$html .= "\n\t\t\t\t\t\t\t\t<div class=\"col-sm-3\">";
$html .= "\n\t\t\t\t\t\t\t\t\t<a href=\"" . $CONFIG['LINK_TWITTER'] . "\">";
$html .= "\n\t\t\t\t\t\t\t\t\t\t";
$html .= make_font_awesome_stack(Array(
			'backdrop-footer fas fa-circle',
			'fab fa-footer fa-twitter'
			),$CONFIG);
$html .= "\n\t\t\t\t\t\t\t\t\t</a>";
$html .= "\n\t\t\t\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t\t\t\t<div class=\"col-sm-9\">";
$html .= "\n\t\t\t\t\t\t\t\t\t<h4>Tweets</h4>";
$html .= "\n\t\t\t\t\t\t\t\t\tEmbed here?";
$html .= "\n\t\t\t\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t\t\t<!-- row end -->";
$html .= "\n\t\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t\t<!-- footer column 1 end -->";
$html .= "\n\t\t\t\t\t<!-- footer column 2 start -->";
$html .= "\n\t\t\t\t\t<div class=\"col-md-4\">";
$html .= "\n\t\t\t\t\t<!-- row start -->";
$html .= "\n\t\t\t\t\t\t<div class=\"row py-2\">";
$html .= "\n\t\t\t\t\t\t\t<div class=\"col-sm-3\">";
$html .= "\n\t\t\t\t\t\t\t\t<a href=\"#\">";
$html .= "\n\t\t\t\t\t\t\t\t\t";
$html .= make_font_awesome_stack(Array(
			'backdrop-footer fas fa-circle',
			'fas fa-fw fa-footer fa-address-card',
			),$CONFIG);
$html .= "\n\t\t\t\t\t\t\t\t</a>";
$html .= "\n\t\t\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t\t\t<div class=\"col-sm-9\">";
$html .= "\n\t\t\t\t\t\t\t\t<h4>Contact us</h4>";
$html .= "\n\t\t\t\t\t\t\t\t<p>Why not?</p>";
$html .= "\n\t\t\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t\t<!-- row end -->";
$html .= "\n\t\t\t\t\t\t<!-- row start -->";
$html .= "\n\t\t\t\t\t\t<div class=\"row py-2\">";
$html .= "\n\t\t\t\t\t\t\t<div class=\"col-sm-3\">";
$html .= "\n\t\t\t\t\t\t\t\t<a href=\"#\">";
$html .= "\n\t\t\t\t\t\t\t\t\t";
$html .= make_font_awesome_stack(Array(
			'backdrop-footer fas fa-circle',
			'fas fa-fw fa-footer fa-laptop',
			),$CONFIG);
$html .= "\n\t\t\t\t\t\t\t\t</a>";
$html .= "\n\t\t\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t\t\t<div class=\"col-sm-9\">";
$html .= "\n\t\t\t\t\t\t\t\t<h4>Cookie policy</h4>";
$html .= "\n\t\t\t\t\t\t\t\t<p class=\" \">We use <a class=\" \" href=\"/# \">cookies </a></p>";
$html .= "\n\t\t\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t\t<!-- row end -->";
$html .= "\n\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t<!-- footer column 2 end -->";
$html .= "\n\t\t\t\t\t<!-- footer column 3 start -->";
$html .= "\n\t\t\t\t\t<div class=\"col-md-4\">";
$html .= "\n\t\t\t\t\t\t<!-- row starting  -->";
$html .= "\n\t\t\t\t\t\t<div class=\"row py-2\">";
$html .= "\n\t\t\t\t\t\t\t<div class=\"col-sm-3\">";
$html .= "\n\t\t\t\t\t\t\t\t<a href=\"# \">";
$html .= make_font_awesome_stack(Array(
			'backdrop-footer fas fa-circle',
			'fas fa-fw fa-footer fa-file-pdf-o',
			),$CONFIG);
$html .= "\n\t\t\t\t\t\t\t\t</a>";
$html .= "\n\t\t\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t\t\t<div class=\"col-sm-9\">";
$html .= "\n\t\t\t\t\t\t\t\t<h4>Download pdf</h4>";
$html .= "\n\t\t\t\t\t\t\t\t<p> You like print?</a></p>";
$html .= "\n\t\t\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t\t<!-- row ended -->";
$html .= "\n\t\t\t\t\t\t<!-- row starting  -->";
$html .= "\n\t\t\t\t\t\t<div class=\"row py-2\">";
$html .= "\n\t\t\t\t\t\t\t<div class=\"col-sm-3\">";
$html .= "\n\t\t\t\t\t\t\t\t<a href=\"". $CONFIG['LINK_TWITTER'] . "\">";
$html .= make_font_awesome_stack(Array(
			'backdrop-footer fas fa-circle',
			'fas fa-fw fa-footer fa-info',
			),$CONFIG);
$html .= "\n\t\t\t\t\t\t\t\t</a>";
$html .= "\n\t\t\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t\t\t<div class=\"col-sm-9\">";
$html .= "\n\t\t\t\t\t\t\t\t<h4>Info</h4>";
$html .= "\n\t\t\t\t\t\t\t\tAbout us.";
$html .= "\n\t\t\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t\t<!-- row ended -->";
$html .= "\n\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t\t<!-- footer column 3 end -->";
$html .= "\n\t\t\t\t</div>";
$html .= "\n\t\t\t</div>";
$html .= "\n\t\t</div>";

$html .= "\n\t\t\t<div class=\"container-fluid bg-primary py-3\">";
$html .= "\n\t\t\t\t<div class=\"container\">";
$html .= "\n\t\t\t\t\t<div class=\"row py-3 justify-content-between\">";
$html .= make_bottom_cols($col1);
$html .= "\n\t\t\t\t\t\t<!-- End Col 1 -->";
$html .= make_bottom_cols($col2);
$html .= "\n\t\t\t\t\t\t<!-- End Col 2 -->";
$html .= make_bottom_cols($col3);
$html .= "\n\t\t\t\t\t\t<!-- End Col 3 -->";
$html .= "\n\t\t\t\t\t</div>";
$html .= "\n\t\t\t\t</div>";
$html .= "\n\t\t\t</div>";
$html .= "\n\t\t</footer>";

$html .= "\n</body>";
$html .= "\n</html>\n";
echo $html;

?>
