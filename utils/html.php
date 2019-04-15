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

echo "\n<!-- /utils/html.php imported -->\n";

function alert($msg){
	$html =  "\n\t\t<script>";
	$html .= "\n\t\t\talert(JSON.stringify(".$msg."));";
	$html .= "\n\t\t</script>";
	return $html;
}
function clog($msg){
	$html =  "\n\t\t<script>";
	$html .= "\n\t\t\tconsole.log(";
	$html .= "JSON.stringify(";
	$html .= $msg."));";
	$html .= "\n\t\t</script>";
	return $html;
}
function get_css($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	$s = "";
	if($CONFIG['HAS_BOOTSTRAP'] || $CONFIG['HAS_POPPER'] || $CONFIG['HAS_JQUERY'] )
		$s .= get_bootstrap_css($CONFIG);
	if($CONFIG['HAS_DATATABLES'] || $CONFIG['HAS_DATATABLES_JQUERY'] )
		$s .= get_datatables_css($CONFIG);
	if($CONFIG['HAS_FONT_AWESOME'])
		$s .= get_font_awesome_css($CONFIG);
	$s .= $CONFIG['CUSTOM_STYLES'];
	return $s;
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

function get_footer(){
	$s = "";
	$s .= "\n</body>";
	$s .= "\n</html>";
	return $s;
}
function get_header($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	$s = "";
	$s .= "\n<html lang=\"".$CONFIG['LANG']."\">";
	$s .=	"\n<head>";
	$s .=	"\n\t<!-- Required meta tags -->";
	$s .=	"\n\t<meta charset=\"".$CONFIG['CHAR_SET']."\">";
	$s .=	"\n\t<meta name=\"viewport\" content=\"".$CONFIG['META_CONTENT']."\">";
	$s .= get_css($CONFIG); //<link> elements
	$s .= "";
	$s .=	"\n\t<title>".$CONFIG['TITLE']."</title>";
	$s .=	"\n</head>\n";
	return $s;
}
function get_js($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	$s = "";
	if($CONFIG['HAS_BOOTSTRAP'] || $CONFIG['HAS_POPPER'] || $CONFIG['HAS_JQUERY'] )
		$s .= get_bootstrap_scripts($CONFIG);
	if($CONFIG['HAS_DATATABLES'] || $CONFIG['HAS_DATATABLES_JQUERY'] )
		$s .= get_datatables_scripts($CONFIG);
	return $s;
}
function get_nav($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	$html = "";
	$html .= "\n\t\t<nav class=\"navbar navbar-expand-sm navbar-light bg-light\">";
	$html .= "\n\t\t\t<a class=\"navbar-brand\" href=\"#\">Portals</a>";
	$html .= "\n\t\t\t<button ";
	$html .= "\n\t\t\t\tclass=\"navbar-toggler\"";
	$html .= "\n\t\t\t\ttype=\"button\"";
	$html .= "\n\t\t\t\tdata-toggle=\"collapse\"";
	$html .= "\n\t\t\t\tdata-target=\"#navbarText\"";
	$html .= "\n\t\t\t\taria-controls=\"navbarText\"";
	$html .= "\n\t\t\t\taria-expanded=\"false\"";
	$html .= "\n\t\t\t\taria-label=\"Toggle navigation\"";
	$html .= "\n\t\t\t>";
	$html .= "\n\t\t\t\t<span class=\"navbar-toggler-icon\"></span>";
	$html .= "\n\t\t\t</button>";
	$html .= "\n\t\t\t<div class=\"collapse navbar-collapse\" id=\"navbarText\">";
	//TODO: Build list of nav elements from $CONFIG;
	$html .= "\n\t\t\t\t<ul class=\"navbar-nav mr-auto\">";
	//TODO: Get current page from $CONFIG or $SESSIONS;
	$html .= "\n\t\t\t\t\t<li class=\"nav-item active\">";
	$html .= "\n\t\t\t\t\t\t<a class=\"nav-link\" href=\"#\">Home <span class=\"sr-only\">(current)</span></a>";
	$html .= "\n\t\t\t\t\t</li>";
	$html .= "\n\t\t\t\t\t<li class=\"nav-item\">";
	$html .= "\n\t\t\t\t\t\t<a class=\"nav-link\" href=\"#\">Features</a>";
	$html .= "\n\t\t\t\t\t</li>";
	$html .= "\n\t\t\t\t\t<li class=\"nav-item\">";
	$html .= "\n\t\t\t\t\t\t<a class=\"nav-link\" href=\"#\">Pricing</a>";
	$html .= "\n\t\t\t\t\t</li>";
	$html .= "\n\t\t\t\t</ul>";
	$html .= "\n\t\t\t\t<span class=\"navbar-text\">";
	//$html .= "\n\t\t\tWelcome ".$fname; //Maybe pull from $SESSIONS?
	$html .= "\n\t\t\t\t\tWelcome back";
	$html .= "\n\t\t\t\t</span>";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</nav>";
	$html .= "\n";
	return $html;
}
function make_css($REL, $LINK, $INTEGRITY="", $ORIGIN=""){
	/* Make a CSS stylesheet to be imported into HTML page */
	$css .= "\n\t<link";
	$css .= "\n\t\trel=\"".$REL."\"";
	$css .= "\n\t\thref=\"".$LINK."\"";
	$css .= "\n\t\tintegrity=\"".$INTEGRITY."\"";
	$css .= "\n\t\tcrossorigin=\"".$ORIGIN."\">";
	$css .= "\n\t</link>";
	return $css;
}
function make_font_awesome_stack($icons, $CONFIG=Null){
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
function make_par( $s, $args=null ){
	//Take string `s` and be sure string is properly encapsulated as HTML paragraph
	/*
	if ($args === null)
		$args = new \stdClass;
	$isclass = var_dump(isset($args->{'class'}));
	*/
	$ret = '<p';
	/*
   if ($isclass === true){
		ret .= ' class='.$args->class;
	*/
	$ret .= ">\n";
	$ret .= $s."</p>\n";
	return $ret;
}

function make_script($src, $integrity, $origin){
	/* Make a JS script to be imported into HTML page */
	$s = "";
	$s .= "\n\t<script";
	$s .= "\n\t\tsrc=\"".$src."\"";
	$s .= "\n\t\tintegrity=\"".$integrity."\"";
	$s .= "\n\t\tcrossorigin=\"".$origin."\">";
	$s .= "\n\t</script>";
	return $s;
}
function tab(){
	//Return HTML tab; TODO: param for length of tab;
	return "&nbsp;&nbsp;&nbsp;&nbsp;";
}

?>

