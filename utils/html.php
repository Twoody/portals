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
echo "<!-- /utils/html.php imported -->";
function makeP( $s, $args=null ){
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
}//end makeP()
function tab(){
	//Return HTML tab; TODO: param for length of tab;
	return "&nbsp;&nbsp;&nbsp;&nbsp;";
}//end tab()

?>

