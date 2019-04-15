<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: github.com/twoody/phpTests/utils/html.php
   Date:    20181118

USAGE:
   In php, put at the head of function:
      require('/path/here/html.php');

Purpose:
    General Util Library to ensure we have minimal errors while outputting HTML.

******************************************************************************/
require_once('./config/paths.php');
$PATHS = get_paths();
require_once($PATHS['SETTINGS_PATH']);

echo "\n<!-- ". $CONFIG['LIBPATH_FA']." imported -->\n";

function get_FA_contact_us(){
	
}
function get_font_awesome_style_guide($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	$html = "";
	$html .= "\n\t\t<style>";
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

	$html .= "\n\t\t.fa-facebook {color: white;}";
	$html .= "\n\t\t.fa-twitter {color: white;}";
	$html .= "\n\t\t.fa-google { color: white;}";
	$html .= "\n\t\t.fa-linkedin {color: white;}";
	$html .= "\n\t\t.fa-youtube {color: white;}";
	$html .= "\n\t\t.fa-instagram {color: white;}";
	$html .= "\n\t\t.fa-pinterest {color: white;}";
	$html .= "\n\t\t.fa-snapchat-ghost {color: white;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}";
	$html .= "\n\t\t.fa-skype {color: white;}";
	$html .= "\n\t\t.fa-android {color: white;}";
	$html .= "\n\t\t.fa-dribbble {color: white;}";
	$html .= "\n\t\t.fa-vimeo {color: white;}";
	$html .= "\n\t\t.fa-tumblr {color: white;}";
	$html .= "\n\t\t.fa-vine {color: white;}";
	$html .= "\n\t\t.fa-foursquare {color: white;}";
	$html .= "\n\t\t.fa-stumbleupon {color: white;}";
	$html .= "\n\t\t.fa-flickr {color: white;}";
	$html .= "\n\t\t.fa-yahoo {color: white;}";
	$html .= "\n\t\t.fa-soundcloud {color: white;}";
	$html .= "\n\t\t.fa-reddit {color: white;}";
	$html .= "\n\t\t.fa-rss {color: white;}";
	$html .= "\n\t\t.backdrop-facebook			{color:#3B5998; }";
	$html .= "\n\t\t.backdrop-twitter			{color:#55ACEE; }";
	$html .= "\n\t\t.backdrop-linkedin			{color:#007bb5; }";
	$html .= "\n\t\t.backdrop-google				{color:#dd4b39; }";
	$html .= "\n\t\t.backdrop-youtube			{color:#bb0000; }";
	$html .= "\n\t\t.backdrop-instagram			{color:#125688; }";
	$html .= "\n\t\t.backdrop-pinterest			{color:#cb2027; }";
	$html .= "\n\t\t.backdrop-snapchat-ghost	{color:#fffc00; }";
	$html .= "\n\t\t.backdrop-skype				{color:#00aff0; }";
	$html .= "\n\t\t.backdrop-android			{color:#a4c639; }";
	$html .= "\n\t\t.backdrop-dribbble			{color:#ea4c89; }";
	$html .= "\n\t\t.backdrop-vimeo				{color:#45bbff; }";
	$html .= "\n\t\t.backdrop-tumblr				{color:#2c4762; }";
	$html .= "\n\t\t.backdrop-vine				{color:#00b489; }";
	$html .= "\n\t\t.backdrop-fouresquare		{color:#45bbff; }";
	$html .= "\n\t\t.backdrop-stumbleupon		{color:#eb4924; }";
	$html .= "\n\t\t.backdrop-flickr				{color:#f40083; }";
	$html .= "\n\t\t.backdrop-yahoo				{color:#430297; }";
	$html .= "\n\t\t.backdrop-soundcloud		{color:#ff5500; }";
	$html .= "\n\t\t.backdrop-reddit				{color:#ff5700; }";
	$html .= "\n\t\t.backdrop-rss					{color:#ff6600; }";
	$html .= "\n\t\t</style>";
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
