<?php
/********************************************************************************
Author:
	Tanner.L.Woody@gmail.com	20181119

Purpose:
	Do some arithmetic, math, and general processing to avoid rewriting code;
********************************************************************************/
echo "<!-- /utils/dates.php imported -->";
function dateToText($d){
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
}//end dateToText()

?>
