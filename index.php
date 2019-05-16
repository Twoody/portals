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
******************************************************************************/
$ROOT = '.';
require_once($ROOT.'/config/imports.php');
make_imports($ROOT);

$CONFIG	= get_config($ROOT);
$PATHS	= get_paths($ROOT);
$STRINGS	= get_config_strings($CONFIG);
require_once($PATHS['TEMPLATES_B']);

$CONFIG['CUSTOM_STYLES'] .= "\n<style>";
$CONFIG['CUSTOM_STYLES'] .= "\n\t.carousel-inner img { width: 50%; height: 50%; margin:auto;}"; 
$CONFIG['CUSTOM_STYLES'] .= "\n\t.content-slider{display:flex; justify-content:center;}"; 
$CONFIG['CUSTOM_STYLES'] .= "\n\t.ad_button_link{display:flex; justify-content:center;}"; 
$CONFIG['CUSTOM_STYLES'] .= "\n</style>";
$body   = "";
	
/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE'] = "Home At Last";
$pic1 = Array(
			//"src"=>		"./resources/images/Your-Logo-Here-Black-22.jpg",
			"src"=>		"./resources/images/landscapes/joshua_tree_wedding.jpg",
			"class"=>	"d-block w-100",
			"alt"=>		"Joshua Tree Wedding",
			"width"=>	"110",
			"height"=>	"50",
		);
$pic2 = Array(
			"src"=>		"./resources/images/landscapes/yosemite_cooper_brodee.jpg",
			"class"=>	"d-block w-100",
			"alt"=>		"nyc",
			"width"=>	"110",
			"height"=>	"50",
		);
$pic3 = Array(
			"src"=>		"./resources/images/landscapes/newport_beach_velo",
			"class"=>	"d-block w-100",
			"alt"=>		"Bianchi on the Beach",
			"width"=>	"110",
			"height"=>	"50",
		);
$pics = Array($pic1, $pic2, $pic3);

echo "<!-- LANDED ON: HOME PAGE-->";

$body .= "\n\t\t";
//$body .= "\n\t\t<div class=\"container fixed-width content-slider p-0\">";
$body .= $CONFIG['GEN_CONTAINER'];
$body .= $CONFIG['GEN_ROW'];
$body .= "\n\t\t\t\t<div class=\"col-12 col-sm-8 col-md-9 col-lg-10 m-0 p-0\">";
$body .= get_carousel($pics, $CONFIG);
$body .= "\n\t\t\t\t</div><!-- END COL -->";

$body .= "\t\n\t\t\t<div class=\"col-sm-4 col-md-3 col-lg-2 pr-3 m-0\" style=\"\">";
$body .= "\n\t\t\t\t\t<span class=\"d-none d-sm-block\">";		// Show when NOT small
$body .= get_ad($CONFIG);
$body.= "\n\t\t\t\t\t</span>";
$body .= "\n\t\t\t\t</div>";
$body .= "\n\t\t\t</div><!-- END ROW -->";
$body .= "\n\t\t</div><!-- END CONTAINER -->";

$body .= $CONFIG['GEN_CONTAINER'];

$body .= "\n\t<div class=\"row d-sm-none pl-3 pr-3 m-0\">";	// Show WHEN SMALL
$body .= get_ads_sm($CONFIG);
$body .= "\n\t\t\t</div><!-- END ROW -->";

$body .= "\n\t\t</div><!-- END CONTAINER -->";
$CONFIG['BODY'] = $body;
echo template_b($CONFIG) . "\n";

?>

