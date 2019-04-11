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
	return $s;
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
	$s .=	"\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">";
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

