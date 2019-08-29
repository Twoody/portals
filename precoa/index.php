<?php
session_start();
?>
<!doctype html>
<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: 
   Date:    2019-04-20

USAGE:
	First Check for compilation errors:
		php index.php
	Second, host:
		With PHP:
			clear & php -S localhost:8000 templates/login.php
		With APACHE:
			sudo apachectl start
	Third, change ROOT to corresponding dir path;

Purpose:
	Demonstrate int to text coding question;

Links:
	https://www.w3schools.com/bootstrap4/bootstrap_carousel.asp
	https://stackoverflow.com/questions/12172177/set-div-height-equal-to-screen-size
******************************************************************************/
$INT_WORD_MAP = Array(
	0 => "zero",
	1 => "one",
	2 => "two",
	3 => "three",
	4 => "four",
	5 => "five",
	6 => "six",
	7 => "seven",
	8 => "eight",
	9 => "nine",
	10 => "ten",
	11 => "eleven",
	12 => "twelve",
	13 => "thirteen",
	14 => "fourteen",
	15 => "fifteen",
	16 => "sixteen",
	17 => "seventeen",
	18 => "eighteen",
	19 => "nineteen",
	20 => "twenty",
	30 => "thirty",
	40 => "forty",
	50 => "fifty",
	60 => "sixty",
	70 => "seventy",
	80 => "eighty",
	90 => "ninety",
);
function intToText($n){
	/*
		Print number to English
		Input:
			int n s.t. 0 < n < 9,999
		Output:
			String of text
	*/
	global $INT_WORD_MAP;
	$t = "";
	if ($n === 0){
		$t .= $INT_WORD_MAP[0];
		return $t;
	}
	$thousands	= floor( $n / 1000 );
	$hundreds	= floor( $n / 100 ) % 10;
	$teens		= $n % 100;
	$tens			= floor( $n / 10 ) % 10 * 10;
	$ones			= $n % 10;
	if ($thousands > 0){
		//$t .= $thousands . "<br/>";
		$t .= $INT_WORD_MAP[$thousands] . " thousand";
	}
	if ($hundreds > 0){
		if (count($t) > 0)
			$t .= " ";
		$t .= $INT_WORD_MAP[$hundreds] . " hundred";
	}
	if ($teens > 0){
		if (count($t) > 0)
			$t .= " ";
		if ($teens < 20 || $ones === 0){
			$t .= $INT_WORD_MAP[$teens];
		}
		else{
			if( $tens > 0 )
				$t .= $INT_WORD_MAP[$tens];
				$t .= " ";
			$t .= $INT_WORD_MAP[$ones];
		}
	}
	return $t;
}//end intToText()

$ROOT = '..';
require_once($ROOT.'/config/imports.php');
make_imports($ROOT);

$CONFIG			= get_config($ROOT);
$PATHS			= get_paths($ROOT);
$STRINGS			= get_config_strings($CONFIG);
$body				= "";

/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE']				= "CHANGE ME";;
$CONFIG['DISPLAY_HEADER']	= TRUE;
$CONFIG['ACTIVE_PAGE']		= __FILE__;
require_once($PATHS['LIBPATH_DB_PAGES']);
require_once($PATHS['TEMPLATES_B']);

//$CONFIG['CUSTOM_STYLES'] .= "\n<style></style>";
//$CONFIG['CUSTOM_SCRIPTS'] .= "\n<script></script>";

$page_views	= make_page_views($CONFIG['ACTIVE_PAGE'], $CONFIG);
$onclick = "var query = document.getElementById(\"qquery\");";
$onclick .= "document.location.href = '" . $ROOT . "/precoa/index.php?' + query;";
$input = "<input id=\"qquery\" type=\"text\" class=\"form-control\">";
$button_arr	= Array(
	'class' => "btn btn-default",
	'type' => "button",
	'onClick' => "vardocument.location.href = '" . $ROOT . "/precoa/index.php?'",
	"content" => "Wordify"
);
$button = make_tag("button", $button_arr, $config);
$span_arr = Array(
	"class" => "input-group-btn",
	"content" => $button,
);
$span_button = make_tag("span", $span_arr, $CONFIG);
$input_content = $input . $span_button;
$q_arr	= Array(
	'class' => 'input-group',
	'content'=> $input_content
);

$q_content = make_tag("div", $q_arr, $CONFIG);

$col0	= Array(
	'class'=>"col-12 m-0 p-0 fit-screen",
	'content'=>"<hr class=\"thick-line\">" . $q_content,
);
$col_0	= make_tag("div", $col0, $CONFIG) . "<!-- END COL -->";

$row0	= Array(
	'class'=>" row pl-3 pr-3 m-0",
	'content'=>$col_0.$col_1,
);
$row_0	= make_tag("div", $row0, $CONFIG) . "<!-- END ROW -->";
$container0 =  Array(
	'class'=>" container-fluid pl-3 pr-3 m-0",
	'content'=>$row_0,
);
$container_0	= make_tag("div", $container0, $CONFIG);
$body .= $page_views;
$body .= $container_0;

$CONFIG['BODY'] = $body;
echo template_b($CONFIG) . "\n";
?>
