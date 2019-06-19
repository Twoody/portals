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

Purpose:
    Display the general layout expected of a login page;
	 Display the locations where possible params and configs can take place;

Links:
	https://www.w3schools.com/bootstrap4/bootstrap_carousel.asp
	https://stackoverflow.com/questions/12172177/set-div-height-equal-to-screen-size
******************************************************************************/
$ROOT = '../../..';
require_once($ROOT.'/config/imports.php');
make_imports($ROOT);

$CONFIG			= get_config($ROOT);
$PATHS			= get_paths($ROOT);
$STRINGS			= get_config_strings($CONFIG);
$body				= "";

/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE']				= "A List Example";;
$CONFIG['DISPLAY_HEADER']	= TRUE;
$CONFIG['ACTIVE_PAGE']		= $PATHS['NAV_HOME'];
$CONFIG['HAS_REACT']			= TRUE;
require_once($PATHS['LIBPATH_DB_PAGES']);
require_once($PATHS['TEMPLATES_B']);

//$CONFIG['CUSTOM_STYLES'] .= "\n<style></style>";
//$CONFIG['CUSTOM_SCRIPTS'] .= "\n<script></script>";

$ad_not_sm	= "";	//Show WHEN NOT X-SMALL
$ad_not_sm	.= "\n\t\t\t\t\t<span class=\"d-none d-sm-block\">";
$ad_not_sm	.= get_ad($CONFIG);
$ad_not_sm	.= "\n\t\t\t\t\t</span>";

$page_views	= make_page_views($CONFIG['ACTIVE_PAGE'], $CONFIG);
$col0	= Array(
	'class'=>"col-12 col-sm-8 col-md-9 col-lg-10 m-0 p-0 fit-screen",
	'content'=>"<hr class=\"thick-line\">". $div_react,
);
$col1	= Array(
	'class'=>" col-sm-4 col-md-3 col-lg-2 pr-3 m-0",
	'content'=>$ad_not_sm,
);
$col_0	= make_tag("div", $col0, $CONFIG) . "<!-- END COL -->";
$col_1	= make_tag("div", $col1, $CONFIG) . "<!-- END COL -->";

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
$container_1	= make_gen_container(get_ads_sm($CONFIG), $CONFIG);
$body .= $page_views;
$body .= $container_0;
$body .= $container_1;

$CONFIG['BODY'] = $body;
echo template_b($CONFIG) . "\n";
?>
