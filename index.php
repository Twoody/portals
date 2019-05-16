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
$body .= "\n\t\t\t<div class=\"row p-0 justify-content-center\">";
$body .= "\n\t\t\t\t<div class=\"col-12 col-sm-7 col-md-8 col-lg-9 mt-2 p-0\">";

$body .= get_carousel($pics, $CONFIG);

$body .= "\n\t\t\t\t</div><!-- /.col -->";

$body .= "\n\t\t\t<span class=\"d-none d-sm-block\">";
$body .= "\n\t\t\t\t<div class=\"col-sm-3 col-md-2 col-lg-1 mt-2 mr-2\" style=\"\">";
$body .= "\n\t\t\t\t\t<div class=\"card\" style=\"width:10rem;\">";
$body .= "\n\t\t\t\t\t\t<img class=\"card-img-top\" src=\"./resources/images/Your-Logo-Here-Black-22.jpg\" alt=\"Card image cap\">";
$body .= "\n\t\t\t\t\t\t<div class=\"card-body\">";
$body .= "\n\t\t\t\t\t\t\t<h5 class=\"card-title\">Card title</h5>";
$body .= "\n\t\t\t\t\t\t\t<p class=\"card-text\">";
$body .= "\n\t\t\t\t\t\t\tSome quick example text to build on the card title and make up ";
$body .= "the bulk\t of the card's content.";
$body .= "\n\t\t\t\t\t\t</p>";
$body .= "\n\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-primary ad_button_link\">$$$</a>";
$body .= "\n\t\t\t\t\t\t</div>";
$body .= "\n\t\t\t\t\t</div>";
$body .= "\n\t\t\t\t</div>";
$body.= "\n\t\t\t\t</span>";

$body .= "\n\t\t\t\t<div class=\"w-100 d-sm-none\"></div>";

$body .= "\n\t\t\t\t<span class=\"d-sm-none\">";
$body .= "\n\t\t\t\t\t<div class=\"col-12 mx-auto\">";
$body .= "\n\t\t\t\t\t\t<img src=\"./resources/images/Your-Logo-Here-Black-22.jpg\" class=\"rounded float-right\" width=\"100px\">";
$body .= "\n\t\t\t\t\t\t</img>";
$body .= "\n\t\t\t\t\t\t<img src=\"./resources/images/Your-Logo-Here-Black-22.jpg\" class=\"rounded float-left\" width=\"100px\">";
$body .= "\n\t\t\t\t\t\t</img>";
$body .= "\n\t\t\t\t\t</div>";
$body .= "\n\t\t\t\t</span>";

$body .= "\n\t\t\t\t<div class=\"w-100\"></div>";

$body .= "\n\t\t\t\t<div class=\"col-3 d-sm-none bg-success\">";
$body .= "\n\t\t\t\t\t<div class=\"float-left text-center\">";
$body .= "\n\t\t\t\t\t\tButton 1 to Link 1";
$body .= "\n\t\t\t\t\t</div>";
$body .= "\n\t\t\t\t</div>";
$body .= "\n\t\t\t\t<div class=\"col-3 d-sm-none bg-warning\">";
$body .= "\n\t\t\t\t\t<div class=\"float-right text-center\">";
$body .= "\n\t\t\t\t\t\tButton 2 to Link 2";
$body .= "\n\t\t\t\t\t</div>";
$body .= "\n\t\t\t\t</div>";

$body .= "\n\t\t\t</div><!-- /.row -->";
$body .= "\n\t\t</div><!-- /.container -->";
$CONFIG['BODY'] = $body;
echo template_b($CONFIG) . "\n";

?>

