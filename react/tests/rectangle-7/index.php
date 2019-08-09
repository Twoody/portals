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
	Quickly copy this file over to start developing a new page.

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
$react_div		= "<div id=\"rectangle-7\"></div>";
$react_js		= "rectangle_7.js";

/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE']				= "CHANGE ME";;
$CONFIG['DISPLAY_HEADER']	= FALSE;
$CONFIG['DISPLAY_FOOTER']	= FALSE;

$CONFIG['ACTIVE_PAGE']		= __FILE__;
require_once($PATHS['LIBPATH_DB_PAGES']);
require_once($PATHS['TEMPLATES_B']);

//$CONFIG['CUSTOM_STYLES'] .= "\n<style>hireMeCanvas{touch-action:none}</style>";

$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t<script src=\"./Balls.js\"></script>";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t<script src=\"./ClickableBalls.js\"></script>";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t<script src=\"./initClickables.js\"></script>";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t<script src=\"./Rectangle.js\"></script>";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t<script src=\"./utils.js\"></script>";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t<script type=\"text/babel\" src=\"".$react_js."\"></script>";

$instructions_content	=	"Click on a ball to accelerate it;<br/>";
$instructions_content	.=	"Click on an empty space to init a new ball; <br/>";
$instructions_content	.=	"New balls will only be made if there is room (e.g. ";
$instructions_content	.=	"there are too many balls or new ball would be out of bounds)";
$instructions	= make_tag('p', Array('content'=>$instructions_content), $CONFIG);

$col0_content	= "<hr id=\"thickline0\" class=\"thick-line\">". $react_div . $instructions_content;
$page_views	= make_page_views($CONFIG['ACTIVE_PAGE'], $CONFIG);
$col0	= Array(
	'class'=>"col-12 m-0 p-0 fit-screen",
	'content'=>$col0_content,
);
$col_0	= make_tag("div", $col0, $CONFIG) . "<!-- END COL -->";

$row0	= Array(
	'class'=>" row pl-3 pr-3 m-0",
	'content'=>$col_0,
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
