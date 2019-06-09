<?php
/********************************************************************************
Author:
	Tanner.L.Woody@gmail.com	20181119

Purpose:
	Do some arithmetic, math, and general processing to avoid rewriting code;
********************************************************************************/
echo "\n<!-- /utils/dates.php imported -->\n";
function date_to_text($d){
	//Input any format of YYYYMMDD; Does not support time;
	//return date in years, months, days;
	$d    = (string)$d;	//`d` is `date`; Make sure we have a string;
	$r    =	'/[^\d]/';	//`r` is (r)egex; Pattern set to match everything but digits;
	$rep  = '';				//(rep)lace pattern;
	$d    = preg_replace($r, $rep, $d);
	$ret  = '';
	$dd   = substr($d, -2);		//Start at -2 index, return to EOS;
	$mm   = substr($d, -4, 2); //Start at -4 index, return only 2;
	$yyyy = substr($d, 0, -4);	//Start at 0, return all but last 4;
	$dd   = preg_replace('/^0/', '', $dd);
	$mm   = preg_replace('/^0/', '', $mm);
	$ret .= $yyyy . " years, " . $mm . " months, and " . $dd . " days old";
	return $ret;
}//end date_to_text()
function get_todays_date(){
	//$date = date('Y-m-d H:i:s')
	$date = date('Y-m-d');
	return $date;
}
function get_todays_time(){
	//$date = date('Y-m-d H:i:s')
	$time = date('H:i:s');
	return $time;
}

function get_blog_date($date){
	$date_arr	= date_to_arr($date);
	$y				= $date_arr[0];
	$m				= $date_arr[1];
	$d				= $date_arr[2];
	return $m .'-'. $d .'-'. $y;
}
function date_to_arr($date){
	return explode('-', $date);
}
?>
