<!doctype html>
<?
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
$PATHS  = get_paths($ROOT);
require_once($PATHS['TEMPLATES_B']);

$CONFIG = get_config($ROOT);
$CONFIG['CUSTOM_STYLES'] .= "\n<style>";
$CONFIG['CUSTOM_STYLES'] .= "\n\t.carousel-inner img { width: 50%; height: 50%; margin:auto;}"; 
$CONFIG['CUSTOM_STYLES'] .= "\n\t.content-slider{display:flex; justify-content:center;}"; 
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
			"width"=>	"100%",
			"height"=>	"100%",
			"width"=>	"240px",
			"height"=>	"240px",
			"width"=>	"110",
			"height"=>	"50",
		);
$pic3 = Array(
			"src"=>		"./resources/images/landscapes/newport_beach_velo",
			"class"=>	"d-block w-100",
			"alt"=>		"foobar",
			"width"=>	"100%",
			"height"=>	"100%",
			"width"=>	"110",
			"height"=>	"50",
		);
$pics = Array($pic1, $pic2, $pic3);
$body .= "\n\t\t";
$body .= "\n\t\t<div class=\"container content-slider\">";
//$body .= "\n\t\t<div class=\"row jstify-content-between\">";
$body .= "\n\t\t<div class=\"row justify-content-between\">";
$body .= "\n\t\t\t<div class=\"col-sm-2 m-0\"></div>";
	$body .= "\n\t\t\t<div class=\"col-sm-8 m-0\">";

	$body .= "\n\t\t<div id=\"demo\" class=\"carousel slide\" data-ride=\"carousel\">";
	$body .= "\n\t\t\t<!-- Indicators -->";
	$body .= "\n\t\t\t<ul class=\"carousel-indicators\">";
	$body .= "\n\t\t\t\t<li data-target=\"#demo\" data-slide-to=\"0\" class=\"active\"></li>";
	$body .= "\n\t\t\t\t<li data-target=\"#demo\" data-slide-to=\"1\"></li>";
	$body .= "\n\t\t\t\t<li data-target=\"#demo\" data-slide-to=\"2\"></li>";
	$body .= "\n\t\t\t</ul>";
	$body .= "\n\t\t\t<!-- The slideshow -->";
	$body .= "\n\t\t\t<div class=\"carousel-inner\">";
	$body .= get_carousel_items($pics);

	$body .= "\n\t\t</div>";

	$body .= "\n\t\t\t<!-- Left and right controls -->";
	$body .= "\n\t\t\t<a class=\"carousel-control-prev\" href=\"#demo\" role=\"button\" data-slide=\"prev\">";
	$body .= "\n\t\t\t\t<span class=\"carousel-control-prev-icon\"></span>";
	$body .= "\n\t\t\t\t<span class=\"sr-only\">Previous</span>";
	$body .= "\n\t\t\t</a>";
	$body .= "\n\t\t\t<a class=\"carousel-control-next\" href=\"#demo\" role=\"button\" data-slide=\"next\">";
	$body .= "\n\t\t\t\t<span class=\"carousel-control-next-icon\"></span>";
	$body .= "\n\t\t\t\t<span class=\"sr-only\">Next</span>";
	$body .= "\n\t\t\t</a>";
	$body .= "\n\t\t</div>";

$body .= "\n\t\t</div>";
//Maybe hide this when so small and add a horizontal ad instead?
	$body .= "\n\t\t\t<div class=\"col-sm-2 m-0\" style=\"\">";
	$body .= "\n\t\t\t\t<div class=\"card\" style=\"width:10rem;\">";
	$body .= "\n\t\t\t\t\t<img class=\"card-img-top\" src=\"./resources/images/Your-Logo-Here-Black-22.jpg\" alt=\"Card image cap\">";
	$body .= "\n\t\t\t\t\t<div class=\"card-body\">";
	$body .= "\n\t\t\t\t\t\t<h5 class=\"card-title\">Card title</h5>";
	$body .= "\n\t\t\t\t\t\t<p class=\"card-text\">";
	$body .= "\n\t\t\t\t\t\tSome quick example text to build on the card title and make up ";
	$body .= "the bulk of the card's content.";
	$body .= "\n\t\t\t\t\t</p>";
	$body .= "\n\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>";
	$body .= "\n\t\t\t\t\t</div>";
	$body .= "\n\t\t\t\t</div>";
	$body .= "\n\t\t\t</div>";

$body .= "\n\t\t</div>";//end carousel row


$body .= "\n\t\t</div>"; //End container

echo template_b($body, $CONFIG) . "\n";


function get_carousel_items($items){
	$html = "";
	$has_active = FALSE;
	foreach($items as $item){
		$html .= "\n\t\t\t\t<div class=\"carousel-item ";
		if ($has_active === FALSE){
			$html .= "active";
			$has_active = TRUE;
		}
		$html .= "\">";
		$html .= "\n\t\t\t\t\t";
		$html .= build_img($item);
		$html .= "\n\t\t\t\t</div>";
	}
	return $html;
}
function build_img($imgArr){
	$src    = $imgArr['src'];
	$class  = $imgArr['class'];
	$alt    = $imgArr['alt'];
	$width  = $imgArr['width'] ?? "100";
	$height = $imgArr['height'] ?? "100";
	$html = "<img class=\"".$class."\" src=\"".$src."\""; 
	$html .= " alt=\"".$alt."\" width=\"".$width."\" height=\"".$height."\">";
	$html .= "</img>";
	return $html;
}
?>

