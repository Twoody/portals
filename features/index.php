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
$ROOT = '..';
require_once($ROOT.'/config/imports.php');
make_imports($ROOT);

$CONFIG	= get_config($ROOT);
$PATHS	= get_paths($ROOT);
$STRINGS	= get_config_strings($CONFIG);
$car_id	= "demo-carousel";
require_once($PATHS['TEMPLATES_B']);

$CONFIG['CUSTOM_STYLES'] .= "\n<style>";
$CONFIG['CUSTOM_STYLES'] .= "\n\t.scrollable-menu{ height: auto; max-height: 200px; overflow-x: hidden; }";
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
$dropdown_items_arr	= Array( //These are the items in specifics to making this website;
	'Cloud Computing',
	'Cookies',
	'Database Management',
	'Demos and Pilots',
	'Dev Tools',
	'Image and File Uploading',
	'Image Manipulation and Processing (Aspect Ratio & Mores)',
	'ISO Formatting',
	'jQuery',
	'Java',
	'Javascript',
	'Many-to-Many Relationships',
	'Minimum Viable Product',
	'Multi-Lingual Support',
	'OWASP Security Standards',
	'PHP',
	'Post, Redirect, Get + JS Form Nullifier',
	'Templates',
	'Test Driven Development',
	'User Experience (UX)',
	'User Management',
	'User Workflow',
	'Version Control (GIT)',
	'VIM',
	'Wordpress',
);
$goodReq = False;

$main_content	= make_lorem_ipsum(1);
$dropdown_items	= "";
for ($i=0; $i<count($dropdown_items_arr); $i++){
	$item	= $dropdown_items_arr[$i];
	$getReq	= strtolower($item);
	$getReq	= str_replace(' ', '_', $getReq);
	$dropdown_item_arr	= Array(
		'class'=>"dropdown-item",
		'href'=>$PATHS['FEATUERS']."?display=".$getReq ,
		'content'=>$item,
	);
	$dropdown_items	.= "\n\t" . make_tag('a', $dropdown_item_arr, $CONFIG);
}//end i-for
$dropdown_menu_arr	= Array(
	'class'=>"dropdown-menu scrollable-menu",
	'content'=>$dropdown_items,
);
$dropdown_menu	= make_tag('div', $dropdown_menu_arr, $CONFIG);
$dd_desc_arr	= Array(
	'type'=>'button',
	'class'=>'btn btn-danger',
	'content'=>'Make UR Own Site',
);
//$dd_toggle	= make_tag('button', $dd_toggle_arr, $CONFIG);
$dd_desc		= make_tag('button', $dd_desc_arr, $CONFIG);

$dd_toggle_arr	= Array(
	'type'=>'button',
	'class'=>'btn btn-danger dropdown-toggle dropdown-toggle-split',
	'data-toggle'=>"dropdown",
	'aria-haspopup'=>"true",
	'aria-expanded'=>"false",
);
$dd_toggle	= make_tag('button', $dd_toggle_arr, $CONFIG);
$dropdown_arr	= Array(
	'class'=>'btn-group',
	'content'=>$dd_desc . $dd_toggle . $dropdown_menu,
);
$dropdown	= make_tag('div', $dropdown_arr, $CONFIG);
$col0_arr	= Array(
				'class'=>"col-12 col-sm-8 col-md-9 col-lg-10 m-0 p-0 fit-screen",
				'style'=>"display:flex;justify-content:center;",
				'content'=> $dropdown,
		);
$thickline_arr = Array(
				'class'=>"col-12 col-sm-8 col-md-9 col-lg-10 m-0 p-0 fit-screen",
				'content'=> "<hr class=\"thick-line\">",
);
$thickline	= make_tag('div', $thickline_arr, $CONFIG);
$col0	= make_tag('div', $col0_arr, $CONFIG);
$row0_arr = Array(
				'class'=>" row-fluid pl-3 pr-3 m-0",
				'style'=>$style,
				'content'=>$col0 . $thickline ,
		);
$row0	= make_tag("div", $row0_arr, $CONFIG) . "<!-- END ROW -->";
$col1_arr	= Array(
				'class'=>"col-12 col-sm-8 col-md-9 col-lg-10 m-0 p-0 fit-screen",
				'style'=>$style,
				'content'=> $main_content,
		);
$col2_arr	= Array(
				'class'=>" col-sm-4 col-md-3 col-lg-2 pr-3 m-0",
				'content'=>$ad_not_sm,
		);
$col1	= make_tag("div", $col1_arr, $CONFIG) . "<!-- END COL -->";
$col2	= make_tag("div", $col2_arr, $CONFIG) . "<!-- END COL -->";

$row1_arr	= Array(
				'class'=>" row pl-3 pr-3 m-0",
				'style'=>$style,
				'content'=>$col1.$col2,
		);
$row1	= make_tag("div", $row1_arr, $CONFIG) . "<!-- END ROW -->";
$container0_arr =  Array(
				'class'=>" container-fluid pl-3 pr-3 m-0",
				'style'=>$style,
				'content'=>$row0 . $row1,
		);
$container0	= make_tag("div", $container0_arr, $CONFIG);
$container1	= make_gen_container(get_ads_sm($CONFIG), $CONFIG);
$body .= $container0;
$body .= $container1;

$CONFIG['BODY'] = $body;
echo template_b($CONFIG) . "\n";
?>
