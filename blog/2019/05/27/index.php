<?php
session_start();
?>
<!doctype html>
<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: 
   Date:    2019-05-26

USAGE:
	First Check for compilation errors:
		php index.php
	Second, host:
		With PHP:
			clear & php -S localhost:8000 templates/login.php
		With APACHE:
			sudo apachectl start

Purpose:
    Display the general layout expected of a login page;
	 Display the locations where possible params and configs can take place;

Links:
	https://1stwebdesigner.com/css-snippets-blockquotes/
******************************************************************************/
$ROOT = '../../../..';
require_once($ROOT.'/config/imports.php');
make_imports($ROOT);

$CONFIG	= get_config($ROOT);
$PATHS	= get_paths($ROOT);
$STRINGS	= get_config_strings($CONFIG);
$car_id	= "demo-carousel";
require_once($PATHS['TEMPLATES_B']);

$CONFIG['CUSTOM_STYLES'] .= "\n<style>";
$CONFIG['CUSTOM_STYLES'] .= "\n@import url(https://fonts.googleapis.com/css?family=PT+Sans|Ubuntu:300,400,700);"; 
//$CONFIG['CUSTOM_STYLES'] .= "\n\t.carousel-inner img {max-height: 100%;display:block;}"; 
$CONFIG['CUSTOM_STYLES'] .= "\n\t.content-slider{display:flex; justify-content:center;}"; 
$CONFIG['CUSTOM_STYLES'] .= "\n\t.ad_button_link{display:flex; justify-content:center;}"; 
$CONFIG['CUSTOM_STYLES']	.= "\n\tblockquote {";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  display: block;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  border-width: 2px 0;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  border-style: solid;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  border-color: #eee;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  padding: 1.5em 0 0.5em;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  margin: 1.5em 0;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  position: relative;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t}";
$CONFIG['CUSTOM_STYLES']	.= "\n\tblockquote:before {";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  content: '\\201C';";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  position: absolute;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  top: 0em;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  left: 50%;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  transform: translate(-50%, -50%);";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  background: #fff;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  width: 3rem;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  height: 2rem;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  font: 6em/1.08em 'PT Sans', sans-serif;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  color: #666;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  text-align: center;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t}";
$CONFIG['CUSTOM_STYLES']	.= "\n\tblockquote:after {";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  content: \"\\2013 \\2003\" attr(cite);";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  display: block;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  text-align: right;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  font-size: 0.875em;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t  color: #e74c3c;";
$CONFIG['CUSTOM_STYLES']	.= "\n\t}";
$CONFIG['CUSTOM_STYLES'] .= "\n</style>";

$body		= "";
$style	= "";
	
/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE']				= $STRINGS['FEATURES_TITLE'];;
$CONFIG['DISPLAY_HEADER']	= FALSE;

echo "<!-- LANDED ON: Features Index-->";

$ad_not_sm_content	= get_ad($CONFIG);	//Show WHEN NOT X-SMALL

$ad_not_sm_arr	= Array(
	'class'=>"d-none d-sm-block",
	'content'=>$ad_not_sm_content,
);
$ad_not_sm		= make_tag('span', $ad_not_sm_arr, $CONFIG);
$quote_top_arr		= Array(
	'content'=> $STRINGS['QUOTE_OSHO'],
	'cite'=>'Osho',
);
$quote_bottom_arr		= Array(
	'content'=> $STRINGS['QUOTE_TIM_BERNER'],
	'cite'=>'Tim Berner',
);
$quote_top			= make_tag('blockquote', $quote_top_arr, $CONFIG);
$quote_bottom		= make_tag('blockquote', $quote_bottom_arr, $CONFIG);
$disclaimer_txt	= '<b>This page is in the works. </b>';
$disclaimer_txt	.= 'To start it off, I decided to work with a blog-esque platform first and do two birds with one stone. What you are seeing here is a quote followed by all randomly generated lorem ispum text followed by a block quote at the end. My next step is to plug in some jQuery so that different MVVM features work in reference to a drop-down navigation menu. This menu will reset the text on the page and work as a navigator for all of the fun and interesting aspects that exist on this site. Each text will explain how the features are helpful in both the computer science and professional industries.';
$disclaimer_arr	= Array('content'=>$disclaimer_txt,);
$disclaimer			= make_tag('p', $disclaimer_arr, $CONFIG);
$disclaimer .= "\n<hr style=\"height:5px;border:none;color:#333;background-color:#333;\">";
$col0_arr	= Array(
				'class'=>"col-12 col-sm-8 col-md-9 col-lg-10 m-0 p-0 fit-screen",
				'style'=>$style,
				'content'=>$disclaimer . $quote_top . make_lorem_ipsum(5),
		);
$col1_arr	= Array(
				'class'=>" col-sm-4 col-md-3 col-lg-2 pr-3 m-0",
				'content'=>$ad_not_sm,
		);
$col2_arr				= $col0_arr;
$col2_arr['content']	= $quote_bottom;
$col0	= make_tag("div", $col0_arr, $CONFIG) . "<!-- END COL -->";
$col1	= make_tag("div", $col1_arr, $CONFIG) . "<!-- END COL -->";
$col2	= make_tag("div", $col2_arr, $CONFIG) . "<!-- END COL -->";

$row0_arr	= Array(
				'class'=>" row pl-3 pr-3 m-0",
				'style'=>$style,
				'content'=>$col0.$col1,
		);
$row1_arr	= $row0_arr;
$row1_arr['content']	= $col2;

$row0	= make_tag("div", $row0_arr, $CONFIG) . "<!-- END ROW -->";
$row1	= make_tag("div", $row1_arr, $CONFIG) . "<!-- END ROW -->";
$container0_arr =  Array(
				'class'=>" container-fluid pl-3 pr-3 m-0",
				'style'=>$style,
				'content'=>$row0.$row1,
		);
$container0	= make_tag("div", $container0_arr, $CONFIG);
$container1	= make_gen_container(get_ads_sm($CONFIG), $CONFIG);
$body .= $container0;
$body .= $container1;

$CONFIG['BODY'] = $body;
echo template_b($CONFIG) . "\n";
?>
