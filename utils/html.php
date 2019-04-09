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
echo "\n\t<!-- /utils/html.php imported -->\n";
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
function make_css($REL, $LINK, $INTEGRITY="", $ORIGIN=""){
	/* Make a CSS stylesheet to be imported into HTML page */
	$css .= "\t<link";
	$css .= "\n\t\trel=\"".$REL."\"";
	$css .= "\n\t\thref=\"".$LINK."\"";
	$css .= "\n\t\tintegrity=\"".$INTEGRITY."\"";
	$css .= "\n\t\tcrossorigin=\"".$ORIGIN."\">";
	$css .= "\n\t</link>";
	return css;
}
function make_script($src, $integrity, $origin){
	/* Make a JS script to be imported into HTML page */
	$s = "";
	$s .= "\t<script";
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

