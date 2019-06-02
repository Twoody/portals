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

Supported Query Vars:
	`blog_post`

Links:
	https://1stwebdesigner.com/css-snippets-blockquotes/
******************************************************************************/
$ROOT = '../../..';
require_once($ROOT.'/config/imports.php');
make_imports($ROOT);

$CONFIG	= get_config($ROOT);
$PATHS	= get_paths($ROOT);
$STRINGS	= get_config_strings($CONFIG);
$car_id	= "demo-carousel";
require_once($PATHS['TEMPLATES_B']);

$CONFIG['CUSTOM_STYLES'] .= "\n<style>";
$CONFIG['CUSTOM_STYLES'] .= "\n</style>";
$CONFIG['CUSTOM_SCRIPTS'] .= "<script src=\"./get_blog.js"."\"></script>";//TODO

$body		= "";
$style	= "";
	
/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE']				= $STRINGS['BLOGS_TITLE'];;
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
$quote_bottom		= make_tag('blockquote', $quote_bottom_arr, $CONFIG);
$quote_top			= make_tag('blockquote', $quote_top_arr, $CONFIG);
$collapse_blog		= "";
if(isset($_GET['blog_post'])){
	$blog_post	= $_GET['blog_post'];
	$blogpath	= $PATHS['BLOG_DIR'] ."/".$blog_post;
	if(file_exists($blogpath)){
		$blog_content	= file_get_contents($blogpath);
		$good_req		= True;
		$blog_arr		= Array(
			'id'=>"blog",
			'class'=>'collapse show',
			'aria-labelledby'=>"Main Blog Content",
			'content'=>$blog_content,
		);
		$main_content			= make_tag('div', $blog_arr, $CONFIG);
		$collapse_blog_arr	= Array(
			'class'=>'btn btn-info',
			'id'=>'blog-collapser',
			'data-toggle'=>'collapse',
			'data-target'=>'#blog',
			'aria-expanded'=>'true',
			'aria-controls'=>'blog',
			'content'=>'Collapse Blog',	//TODO
		);
		$collapse_blog	= make_tag('button', $collapse_blog_arr, $CONFIG);
		$collapse_blog .="\n\t<br/>";
	}
	else{
		//File not found
		$disclaimer_txt	= $STRINGS["BLOG_404"];
		$disclaimer_arr	= Array('content'=>$disclaimer_txt,);
		$disclaimer			= make_tag('p', $disclaimer_arr, $CONFIG);
		$disclaimer			.= "\n<hr class=\"thick-line\">";
		$main_content		= $disclaimer . $quote_top;
	}
}
else{
	//No request was made;
	$main_content	= "\n<!-- Start to recent Blogs -->";
	$recent_blogs	= make_recent_blogs(5, $CONFIG);
	if ($recent_blogs === "")
		$main_content	= "<p>Sorry, nothing found.</p>";	//TODO
	else
		$main_content	.= $recent_blogs;
	$main_content	.= "\n<!-- End to recent Blogs -->";
	//$main_content	= $quote_top . make_lorem_ipsum(5);
}


$col0_arr	= Array(
				'class'=>"col-12 col-sm-8 col-md-9 col-lg-10 m-0 p-0 fit-screen",
				'style'=>$style,
				'content'=>$collapse_blog . $main_content,
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
