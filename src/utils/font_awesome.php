<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: 
   Date:    20181118

USAGE:
   In php, put at the head of function:
      require('/path/here/html.php');

Purpose:
    General Util Library to ensure we have minimal errors while outputting HTML.

******************************************************************************/


//if (!function_exists("__init_utils_FA__")){
//	function __init_utils_FA__($CONFIG=Null){
//		if($CONFIG === Null){
//			$ROOT = ".";
//			require_once($ROOT . '/config/paths.php');
//			$PATHS = get_paths($ROOT);
//			require_once($PATHS['SETTINGS_PATH']);
//			$CONFIG = get_config();
//		}
//		$ROOT = $CONFIG['ROOT'];
//		echo "\n<!-- ". $PATHS['LIBPATH_FA']." imported-->\n";
//	}
//	if ($CONFIG === Null)
//		__init_utils_FA__();
//	else
//		__init_utils_FA__($CONFIG);
//}

function get_footer_col0_icons($ICONS, $CONFIG){
	//Return d-block of href icons;
	$links0 = Array(
		Array(	'href'=>$CONFIG['LINK_GMAIL'],
					'icon'=>$ICONS['FOOTER_GMAIL'],
		),
		Array(	'href'=>$CONFIG['LINK_STACKOVERFLOW'],
					'icon'=>$ICONS['FOOTER_SO'],
		),
		Array(	'href'=>$CONFIG['LINK_ANDROID'],
					'icon'=>$ICONS['FOOTER_PLAY_STORE'],
		),
	);
	return $links0;
}
function get_footer_col1_icons($ICONS, $CONFIG){
	//Return d-block of href icons;
	$links1 = Array(
		Array(	'href'=>$CONFIG['LINK_INSTA'],
					'icon'=>$ICONS['FOOTER_INSTAGRAM'],
		),
		Array(	'href'=>$CONFIG['LINK_STRAVA'] ,
					'icon'=>$ICONS['FOOTER_STRAVA'],
		),
		Array(	'href'=>$CONFIG['LINK_GITHUB'],
					'icon'=>$ICONS['FOOTER_GITHUB'],
		),
	);
	return $links1;
}
function get_footer_col2_icons($ICONS, $CONFIG){
	//Return d-block of href icons;
	$links2 = Array(
		Array(	'href'=>$CONFIG['LINK_FACEBOOK'] ,
					'icon'=>$ICONS['FOOTER_FACEBOOK'],
		),
		Array(	'href'=>$CONFIG['LINK_TWITTER'] ,
					'icon'=>$ICONS['FOOTER_TWITTER'],
		),
		Array(	'href'=>$CONFIG['LINK_LINKEDIN'],
					'icon'=>$ICONS['FOOTER_LINKEDIN'],
		),
	);
	return $links2;
}
function get_font_awesome_style_guide($CONFIG=Null, $ROOT=Null){
	if ($ROOT === Null){
		if ($CONFIG !== Null)
			$ROOT = $CONFIG['ROOT'];
	}
	if($CONFIG === Null)
		$CONFIG	= get_config();
	$html = "";
	$html .= "\n\t\t<style>";
	$html .= "\n\t\t.html {";
	$html .= "\n\t\tposition: relative;";
	$html .= "\n\t\tmin-height: 100%;";
	$html .= "\n\t\t}";
	$html .= "\n\t\tbody {";
	$html .= "\n\t\tmargin-bottom: 60px; /* Margin bottom by footer height */";
	$html .= "\n\t\tpadding-top:60px; /* fixed navbar will overlay your other content */";
	$html .= "\n\t\t}";

	$html .= "\n\t\t.fab {";
	$html .= "\n\t\t  display: inline-block";
	$html .= "\n\t\t  width: 30px;";
	$html .= "\n\t\t  height: 30px;";
	$html .= "\n\t\t  display: inline-block";
	$html .= "\n\t\t}";
	$html .= "\n\t\t.fab:hover {";
	$html .= "\n\t\t    opacity: 0.7;";
	$html .= "\n\t\t}";
	$html .= "\n\t\t.fas {";
	$html .= "\n\t\t  display: inline-block";
	$html .= "\n\t\t  width: 30px;";
	$html .= "\n\t\t  height: 30px;";
	$html .= "\n\t\t  display: inline-block";
	$html .= "\n\t\t}";
	$html .= "\n\t\t.fas:hover {";
	$html .= "\n\t\t    opacity: 0.7;";
	$html .= "\n\t\t}";

	/**** **** **** FA GENERAL ICONS **** **** ****/
	$html .= "\n\t\t.fa-usd	{color: white;}";
	$html .= "\n\t\t.backdrop-usd	{color: #85bb65;}";

	/**** **** **** FA SOCIAL MEDIA ICONS **** **** ****/
	$html .= "\n\t\t.fa-android						{color: white;}";
	$html .= "\n\t\t.fa-dribbble						{color: white;}";
	$html .= "\n\t\t.fa-facebook						{color: white;}";
	$html .= "\n\t\t.fa-flickr 						{color: white;}";
	$html .= "\n\t\t.fa-foursquare 					{color: white;}";
	$html .= "\n\t\t.fa-github							{color: white;}";
	$html .= "\n\t\t.fa-google							{color: white;}";
	$html .= "\n\t\t.fa-instagram						{color: white;}";
	$html .= "\n\t\t.fa-linkedin						{color: white;}";
	$html .= "\n\t\t.fa-pinterest						{color: white;}";
	$html .= "\n\t\t.fa-reddit							{color: white;}";
	$html .= "\n\t\t.fa-rss								{color: white;}";
	$html .= "\n\t\t.fa-skype							{color: white;}";
	$html .= "\n\t\t.fa-snapchat-ghost				{color: white; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}";
	$html .= "\n\t\t.fa-soundcloud					{color: white;}";
	$html .= "\n\t\t.fa-stack-overflow				{color: white;}";
	$html .= "\n\t\t.fa-strava							{color: white;}";
	$html .= "\n\t\t.fa-stumbleupon					{color: white;}";
	$html .= "\n\t\t.fa-tumblr							{color: white;}";
	$html .= "\n\t\t.fa-twitter						{color: white;}";
	$html .= "\n\t\t.fa-vimeo							{color: white;}";
	$html .= "\n\t\t.fa-vine							{color: white;}";
	$html .= "\n\t\t.fa-youtube						{color: white;}";
	$html .= "\n\t\t.fa-yahoo							{color: white;}";

	/**** **** **** FA SOCIAL MEDIA ICONS **** **** ****/
	$html .= "\n\t\t.backdrop-android			{color:#a4c639; }";
	$html .= "\n\t\t.backdrop-dribbble			{color:#ea4c89; }";
	$html .= "\n\t\t.backdrop-facebook			{color:#3B5998; }";
	$html .= "\n\t\t.backdrop-fouresquare		{color:#45bbff; }";
	$html .= "\n\t\t.backdrop-flickr				{color:#f40083; }";
	$html .= "\n\t\t.backdrop-github				{color:#f40083; }";
	$html .= "\n\t\t.backdrop-google				{color:#dd4b39; }";
	$html .= "\n\t\t.backdrop-instagram			{color:#125688; }";
	$html .= "\n\t\t.backdrop-linkedin			{color:#007bb5; }";
	$html .= "\n\t\t.backdrop-pinterest			{color:#cb2027; }";
	$html .= "\n\t\t.backdrop-reddit				{color:#ff5700; }";
	$html .= "\n\t\t.backdrop-rss					{color:#ff6600; }";
	$html .= "\n\t\t.backdrop-skype				{color:#00aff0; }";
	$html .= "\n\t\t.backdrop-snapchat-ghost	{color:#fffc00; }";
	$html .= "\n\t\t.backdrop-soundcloud		{color:#ff5500; }";
	$html .= "\n\t\t.backdrop-stack-overflow	{color:#FF9900; }";
	$html .= "\n\t\t.backdrop-strava				{color:#fc4c02; }";
	$html .= "\n\t\t.backdrop-stumbleupon		{color:#eb4924; }";
	$html .= "\n\t\t.backdrop-tumblr				{color:#2c4762; }";
	$html .= "\n\t\t.backdrop-twitter			{color:#55ACEE; }";
	$html .= "\n\t\t.backdrop-vimeo				{color:#45bbff; }";
	$html .= "\n\t\t.backdrop-vine				{color:#00b489; }";
	$html .= "\n\t\t.backdrop-yahoo				{color:#430297; }";
	$html .= "\n\t\t.backdrop-youtube			{color:#bb0000; }";

	/**** **** **** FA FOOTER ICONS **** **** ****/
	$html .= "\n\t\t.backdrop-footer	{color:#646171; }"; //Smokey
	$html .= "\n\t\t.fa-footer			{color: tomato;}";
	$html .= "\n\t\t</style>";
	return $html;
}
function make_footer_bottom_cols($entries, $CONFIG=Null){
	//TODO: Make this customizable to make the icons bigger from xs to md screens;
	if($CONFIG === Null)
		$CONFIG = get_config();
	$html = "";
	$html .= "\n\t\t\t\t\t\t\t<div class=\"d-inline-block\">";
	foreach($entries as $entry){
		$href = $entry['href'];
		$icon = $entry['icon'];
		$html .= "\n\t\t\t\t\t\t\t\t\t<a href=\"". $href . "\" class=\"text-white\">";
		$html .= "\n\t\t\t\t\t\t\t\t\t\t" . $icon;
		$html .= "\n\t\t\t\t\t\t\t\t\t</a>";
	}
	$html .= "\n\t\t\t\t\t\t</div>";
	return $html;
}
function make_font_awesome_stack($icons, $CONFIG=Null){
	/* FA util function to easier init a stack of icons */
	if($CONFIG === Null)
		$CONFIG	= get_config();
	$stacksize = $CONFIG['FA_STACK_SIZE'];
	if($CONFIG['FA_STACK_SIZE'])
		$stacksize = $CONFIG['FA_STACK_SIZE'];
	$html = "\n\t\t<span class=\"fa-stack ".$stacksize."\">";
	$c    = count($icons);
	foreach ($icons as $icon){
		$icon = "fa-stack-".$c."x " . $icon;
		$html .= "\n\t\t\t<i class=\"" . $icon . "\"></i>";
		$c -=1;
	}
	$html .= "\n\t\t</span>";
	return $html;
}
?>
