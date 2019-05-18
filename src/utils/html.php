<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: github.com/twoody/phpTests/utils/html.php
   Date:    20181118

USAGE:
   In php, put at the head of function:
      require('/path/here/html.php');

Purpose:
    General Util Library to ensure we have minimal errors while outputting HTML.

******************************************************************************/
if (php_sapi_name() === "cli"){
	if($CONFIG === Null){
		if ($ROOT === Null)
			$ROOT = ".";
		require_once($ROOT . '/config/paths.php');
		$PATHS = get_paths($ROOT);
		require_once($PATHS['SETTINGS_PATH']);
		$CONFIG = get_config();
	}
	else
		$PATHS = get_paths($CONFIG['ROOT']);
	$ROOT = $CONFIG['ROOT'];
}
echo "\n<!-- ".$PATHS['LIBPATH_HTML']." imported -->\n";
require_once($PATHS['LIBPATH_AUTH_USER']);
require_once($PATHS['LIBPATH_DB_HELPER']);

function alert($msg){
	$js	= "\n\t\t\talert(JSON.stringify(".$msg."));";
	$html = make_script('', '', '', $js);
	return $html;
}
function build_img($imgArr){
	$src    = $imgArr['src'] ?? "";
	$class  = $imgArr['class'] ?? "";
	$alt    = $imgArr['alt'] ?? "";
	$width  = $imgArr['width'] ?? "100%";
	$height = $imgArr['height'] ?? "100%";

	$img = "<img class=\"".$class."\" src=\"".$src."\""; 
	$img .= " alt=\"".$alt."\" width=\"".$width."\" height=\"".$height."\">";
	$img .= "</img>";
	return $img;
}
function clog($msg){
	$js	= "\n\t\t\tconsole.log(JSON.stringify(".$msg."));";
	$html = make_script('', '', '', $js);
	return $html;
}
function get_ad($CONFIG){
	//TODO: Condense with general libs and wrapping;
	$STRINGS			= get_config_strings($CONFIG);
	$ad_image_arr	= Array(
		'alt'=>'Card image cap',
		'class'=> 'card-img-top mx-auto',
		'height'=>'auto',
		'src'=>'./resources/images/Your-Logo-Here-Black-22.jpg',
		'width'=>'100px',
	);
	$ad_text_arr = Array(
		'class'=>'card-text',
		'content'=>$STRINGS['AD_TEXT'],
	);
	$ad_img			= build_img($ad_image_arr, $CONFIG);
	$ad_title		= "\n\t\t\t\t<h5 class=\"card-title\">".$STRINGS['AD_TITLE']."</h5>";
	$ad_text			= make_par($ad_text_arr, $CONFIG);
	$ad_button		= get_href_ad($CONFIG, $STRINGS);
	$ad_body_arr	= Array(
		'class'=>"card-body",
		'content'=>$ad_title . $ad_text . $ad_button,
		'style'=>"",
	);
	$ad_body	= make_div($ad_body_arr, $CONFIG);
	$ad_arr = Array(
		'class'=>"card",
		'content'=>$ad_img . $ad_body,
		'style'=>"width:100%",
	);
	$ad = make_div($ad_arr, $CONFIG);
	return $ad;
}
function get_ads_sm($CONFIG){
	//TODO: Condense with general libs and wrapping;
	$STRINGS		= get_config_strings($CONFIG);
	$ads			= '';
	$text2_arr 	= Array(
		'class'=>"text-center",
		'content'=>$STRINGS['AD_SMALL_TEXT_1'],
		'style'=>"",
	);
	$text1_arr 	= Array(
		'class'=>"text-center",
		'content'=>$STRINGS['AD_SMALL_TEXT_2'],
		'style'=>"",
	);
	$text1		= make_div($text1_arr, $CONFIG);
	$text2		= make_div($text2_arr, $CONFIG);
	$col0_arr	= Array(
		'class'=>"col-6 m-0 p-0 justify-content-center",
		'content'=>"\n\t\t\t<img src=\"./resources/images/Your-Logo-Here-Black-22.jpg\" class=\"rounded mx-auto d-block\" width=\"100px\">\n\t\t\t</img>",
		'style'=>"",
	);
	$col1_arr	= Array(
		'class'=>"col-6 m-0 p-0 justify-content-center",
		'content'=>"\n\t\t\t<img src=\"./resources/images/Your-Logo-Here-Black-22.jpg\" class=\"rounded mx-auto d-block\" width=\"100px\">\n\t\t\t</img>",
		'style'=>"",
	);
	$col2_arr	= Array(
		'class'=>"col-6 pl-3 pr-3 d-block bg-success",
		'content'=>$text1,
		'style'=>"",
	);
	$col3_arr	= Array(
		'class'=>"col-6 pl-3 pr-3 d-block bg-warning",
		'content'=>$text2,
		'style'=>"",
	);
	$col0 = make_div($col0_arr, $CONFIG). "<!-- END COL -->";
	$col1 = make_div($col1_arr, $CONFIG). "<!-- END COL -->";
	$row1_arr = Array(
		'class'=>" row pl-3 pr-3 m-0",
		'style'=>"",
		'content'=>$col0.$col1,
	);
	$col2	= make_div($col2_arr, $CONFIG). "<!-- END COL -->";
	$col3 = make_div($col3_arr, $CONFIG). "<!-- END COL -->";
	$row2_arr = Array(
		'class'=>" row pl-3 pr-3 m-0",
		'style'=>"",
		'content'=>$col2.$col3,
	);
	$row1	= make_div($row1_arr, $CONFIG). "<!-- END ROW -->";
	$row2	= make_div($row2_arr, $CONFIG). "<!-- END ROW -->";
	$ads	.= $row1 . $row2;
	return $ads;
}
function get_carousel($pics, $car_id, $CONFIG){
	$_car			= "";
	$_slideshow	= get_carousel_items($pics, $CONFIG);
	$controls	= get_carousel_controls($pics, $car_id, $CONFIG);
	$indicators	= get_carousel_indicators($pics, $car_id, $CONFIG);
	$style		= "height:100vh;overflow-y:auto;";
	$style		= "";
	$slideshow	=  Array(
				'class'=>"carousel-inner",
				'content'=>$_slideshow,
				'style'=>$style,
		);
	$slideshow	= make_div($slideshow, $CONFIG);
	$_car	.= $indicators . $slideshow . $controls;

	$car	=  Array(
				'class'=>"carousel slide carousel-fade",
				'content'=>$_car,
				'date-ride'=>"carousel",
				'id'=>$car_id,
				'style'=>$style,
		);
	$car	= make_div($car, $CONFIG);

	return $car;
}
function get_carousel_controls($pics, $id, $CONFIG){
	$conrols = '';
	$controls .= "\n\t\t<!-- Left and right controls -->";
	$controls .= "\n\t\t<a ";
	$controls .= " class=\"carousel-control-prev\"";
	$controls .= " href=\"#".$id."\"";
	$controls .= " role=\"button\"";
	$controls .= " data-slide=\"prev\">";
	$controls .= "\n\t\t\t<span class=\"carousel-control-prev-icon\"></span>";
	$controls .= "\n\t\t\t<span class=\"sr-only\">Previous</span>";
	$controls .= "\n\t\t</a>";
	$controls .= "\n\t\t<a";
	$controls .= " class=\"carousel-control-next\"";
	$controls .= " href=\"#".$id."\"";
	$controls .= " role=\"button\"";
	$controls .= " data-slide=\"next\">";
	$controls .= "\n\t\t\t<span class=\"carousel-control-next-icon\"></span>";
	$controls .= "\n\t\t\t<span class=\"sr-only\">Next</span>";
	$controls .= "\n\t\t</a>";
	$controls .= "\n\t\t<!-- END controls -->";

	return $controls;
}
function get_carousel_indicators($items, $id, $CONFIG){
	//The little buttons indicating what picture we are on;
	$indicators	= '';
	$indicators .= "\n\t\t\t\t\t\t<!-- Indicators -->";
	$indicators .= "\n\t\t\t\t\t\t<ul class=\"carousel-indicators\">";
	for($i=0; $i<count($items); $i++){
		$indicators .= "\n\t\t\t\t\t\t\t";
		$indicators .= "<li data-target=\"#".$id."\" ";
		$indicators .= "data-slide-to=\"".$i."\"";
		$indicators .= "class=\"";
		if($i === 0)
			$indicators .= " active ";
		$indicators .= "\">";
		$indicators	.= "</li>";
	}
	$indicators .= "\n\t\t\t\t\t\t</ul>";
	$indicators .= "\n\t\t\t\t\t\t<!-- END Indicators -->";

	return $indicators;
}
function get_carousel_items($items, $CONFIG){
	$html = "";
	$html	.= "\n\t\t<!-- The slideshow -->";
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
	$html	.= "\n\t\t<!-- END slideshow -->";
	return $html;
}
function get_checkout_table($cart, $CONFIG){
	$PATHS		= get_paths($CONFIG['ROOT']);
	$dbpath		= $PATHS['DB_INVENTORY'];
	$db			= new SQLite3($dbpath);
	$CUR_TABLE	= 'inventory';
	$table   	= "";
	$QUERY_PAGE	= $CONFIG['QUERY_PAGE'];
	$TABLE_ID	= $CONFIG['TABLE_ID'];
	$db->enableExceptions(TRUE);
	try{
		if($cart && $cart->fetchArray(SQLITE3_ASSOC)){
			$cart->reset();
			$header  = "";
			$footer	= "";
			$table .= "\n\t<table id=\"".$TABLE_ID."\" class=\"table table-striped table-bordered\" ";
			$table .= "cellspacing=\"\" width=\"100%\" role=\"grid\">";
			$table .= "\n\t\t<thead>";
			while ($row = $cart->fetchArray(SQLITE3_ASSOC)){
				$header .= "\n\t\t\t<tr role=\"row\">";
					$header .= "\n\t\t\t\t<th class=\"sorting\">";
					$header .= "\n\t\t\t\t\tProduct Name";
					$header .= "\n\t\t\t\t</th>";
					$header .= "\n\t\t\t\t<th class=\"sorting\">";
					$header .= "\n\t\t\t\t\tQuantity";
					$header .= "\n\t\t\t\t</th>";
				$header .= "\n\t\t\t\t<th class=\"sorting\">";
				$header .= "\n\t\t\t\t\tPrice per Each";
				$header .= "\n\t\t\t\t</th>";
				$header .= "\n\t\t\t\t<th class=\"sorting\">";
				$header .= "\n\t\t\t\t\tPrice * Quantity";
				$header .= "\n\t\t\t\t</th>";
				$header .= "\n\t\t\t</tr>";

				$footer .= "\n\t\t\t<tr>";
					$footer .= "\n\t\t\t\t<th>";
					$footer .= "\n\t\t\t\t\tProduct Name";
					$footer .= "\n\t\t\t\t</th>";
					$footer .= "\n\t\t\t\t<th>";
					$footer .= "\n\t\t\t\t\tQuantity";
					$footer .= "\n\t\t\t\t</th>";
				$footer .= "\n\t\t\t\t<th class=\"sorting\">";
				$footer .= "\n\t\t\t\t\tPrice per Each";
				$footer .= "\n\t\t\t\t</th>";
				$footer .= "\n\t\t\t\t<th class=\"sorting\">";
				$footer .= "\n\t\t\t\t\tPrice * Quantity";
				$footer .= "\n\t\t\t\t</th>";
				$footer .= "\n\t\t\t</tr>";
				break;
			}
			$table .= $header;
			$table .= "\n\t\t</thead>";
			$cart->reset();
			$table .= "\n\t\t<tbody>";
			$is_odd = TRUE;
			$is_first_row = TRUE;
			while ($row = $cart->fetchArray(SQLITE3_ASSOC)){
				$table .= "\n\t\t\t<tr role=\"row\" class=\"";
				if ($is_odd)
					$table .= "odd ";
				else
					$table .= "even ";
				if ($is_first_row)
					$table .= "first ";
				$table .= "\">"; //Closing `class`
			 	$MCONFIG			= $CONFIG['MCONFIG'];
				$productid		= $row['productid'];
				$quantity		= $row['quantity'];
				$product_name	= get_product_name($productid, $CONFIG);;
				$price			= get_product_price($productid, $CONFIG);
				$row_keys		= array_keys($row);

				$table .= "\n\t\t\t\t<td>";
			//TODO: Maybe do a modal to edit the amount of each when checking out;
			//	$table .= "\n<button type=\"button\" title=\"".$MCONFIG['TITLE']."\" ";
			//	$table .= "class=\"btn inventory-modal\" id=\"".$row['name']."\"data-toggle=\"modal\" ";
			//	$table .= "data-target=\"#".$MCONFIG['ID']."\" style=\"".$MCONFIG['STYLE']."\">";
			//	$table .= make_font_awesome_stack(Array(
			//		'backdrop-usd fas fa-circle',
			//		'fas fa-tw fa-usd'), $CONFIG);
			//	$table .= "\n</button>";
			//	$table .= get_inventory_modal($CONFIG);
				$table .= "".$product_name;
				$table .= "\n\t\t\t\t</td>";

				$table .= "\n\t\t\t\t<td>";
				$table .= "\n\t\t\t\t\t".$quantity;
				$table .= "\n\t\t\t\t</td>";

				$table .= "\n\t\t\t\t<td>";
				$table .= "\n\t\t\t\t\t".$price;
				$table .= "\n\t\t\t\t</td>";

				$table .= "\n\t\t\t\t<td>";
				$table .= "\n\t\t\t\t\t". ($price*$quantity);
				$table .= "\n\t\t\t\t</td>";

				$table .= "\n\t\t\t</tr>";
				$is_first_row = FALSE;
			}
			$table .= "\n\t\t</tbody>";
			$table .= "<tfoot>";
			$table .= $footer;
			$table .= "</tfoot>";
			$table .= "\n\t</table>";
		}
		else{
			$table .= "\n\t\t\t<div class=\"col-12 bg-warning\">";
			$table .= "\n\t\t\t\tNO RESULTS;";
			$table .= "\n\t</div>";
		}
		$db->close();
	}
	catch (Exception $exception) {
		$table .= "\n\t\t\t<div class=\"col-12 bg-warning\">";
		$table .= "\n\t\t\t\tBAD QUERY AND PREPARE;<br/>";
		$table .= "\n\t\t\t\tDB: `".$dbpath."`<br/>";
		$table .= "\n\t\t\t\tQUERY: `".$query."`<br/>";
		$table .= "\n\t\t\t</div>";
	}
	return $table;
}

function get_css($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	$ROOT = $CONFIG['ROOT'];
	$s = "";
	if($CONFIG['HAS_BOOTSTRAP'] || $CONFIG['HAS_POPPER'] || $CONFIG['HAS_JQUERY'] )
		$s .= get_bootstrap_css($CONFIG);
	if($CONFIG['HAS_DATATABLES'] || $CONFIG['HAS_DATATABLES_JQUERY'] )
		$s .= get_datatables_css($CONFIG);
	if($CONFIG['HAS_FONT_AWESOME'])
		$s .= get_font_awesome_css($CONFIG);
	$s .= $CONFIG['CUSTOM_STYLES'];
	return $s;
}
function get_datatables_jquery($orderby, $CONFIG){
	$ret	= "";
	$ret	.= "\n<script>";
	$ret	.= "\n\t$(document).ready(function(){";
	$ret	.= "\n\t\t$('#".$CONFIG['TABLE_ID']."').DataTable({";
	$ret	.= "\n\t\t\t\"order\": [[ 1, \"".$orderby."\" ]]";
	$ret	.= "\n\t\t});";
	$ret	.= "\n\t\t$('.dataTables_length').addClass('bs-select');";
	$ret	.= "\n\t});";
	$ret	.= "\n</script>";
	return $ret;
}
function get_footer($CONFIG=Null){
	if ($CONFIG === Null)
		$CONFIG = get_config();
	$ROOT = $CONFIG['ROOT'];
	$CONFIG['FA_STACK_SIZE'] = 'fa-md';
	$col1 = Array(
		Array(	'href'=>$CONFIG['LINK_GMAIL'],
					'icon'=>make_font_awesome_stack(Array(
						'backdrop-google fas fa-circle',
						'fab fa-fw fa-google'
					),$CONFIG),
		),
		Array(	'href'=>$CONFIG['LINK_STACKOVERFLOW'],
					'icon'=>make_font_awesome_stack(Array(
						'backdrop-stack-overflow fas fa-circle',
						'fab fa-tw fa-stack-overflow'
					),$CONFIG),
		),
		Array(	'href'=>$CONFIG['LINK_ANDROID'],
					'icon'=>make_font_awesome_stack(Array(
						'backdrop-android fas fa-circle',
						'fab fa-tw fa-android'
					),$CONFIG),
		),
	);
	$col2 = Array(
		Array(	'href' => $CONFIG['LINK_INSTA'],
					'icon' => make_font_awesome_stack(Array(
						'backdrop-instagram fas fa-circle',
						'fab fa-fw fa-instagram'
					),$CONFIG),
		),
		Array(	'href' => $CONFIG['LINK_STRAVA'] ,
					'icon' => make_font_awesome_stack(Array(
						'backdrop-strava fas fa-circle',
						'fab fa-tw fa-strava'
					),$CONFIG),
		),
		Array(	'href' => $CONFIG['LINK_GITHUB'],
					'icon' => make_font_awesome_stack(Array(
						'backdrop-github fas fa-circle',
						'fab fa-tw fa-github'
					),$CONFIG),
		),
	);
	$col3 = Array(
		Array(	'href' => $CONFIG['LINK_FACEBOOK'] ,
					'icon' => make_font_awesome_stack(Array(
						'backdrop-facebook fas fa-circle',
						'fab fa-fw fa-facebook'
					),$CONFIG),
		),
		Array(	'href'=> $CONFIG['LINK_TWITTER'] ,
					'icon'=> make_font_awesome_stack(Array(
						'backdrop-twitter fas fa-circle',
						'fab fa-tw fa-twitter'
					),$CONFIG),
		),
		Array(	'href' => $CONFIG['LINK_LINKEDIN'],
					'icon' => make_font_awesome_stack(Array(
						'backdrop-linkedin fas fa-circle',
						'fab fa-tw fa-linkedin'
					),$CONFIG),
		),
	);
	$CONFIG['FA_STACK_SIZE'] = 'fa-2x';

	$html = "";
	$html .= "\n\t\t<footer class=\"mt-5 ";
	if ($CONFIG['FOOTER_IS_STICKY'] === TRUE)
		$html .= " fixed-bottom ";
	$html .= "\">";
	if ($CONFIG['FOOTER_IS_STICKY'] === False){
		//$html .= "\n\t\t\t<div class=\"container-fluid bg-faded mt-5\">";
		$html .= "\n\t\t\t<div class=\"container-fluid bg-faded mt-4\">";
		$html .= "\n\t\t\t\t<div class=\"container\">";
		$html .= "\n\t\t\t\t\t<div class=\"row py-3 justify-content-between align-items-center\">";
		$html .= "\n\t\t\t\t\t<!-- footer column 1 start -->";
		$html .= "\n\t\t\t\t\t\t<div class=\"col-md-4\">";
		$html .= "\n\t\t\t\t\t\t<!-- row start -->";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"row py-3  d-none d-md-block\">";
		$html .= "\n\t\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t\t<a href=\"" . $CONFIG['LINK_TWITTER'] . "\">";
		$html .= "\n\t\t\t\t\t\t\t\t\t\t";
		$html .= make_font_awesome_stack(Array(
					'backdrop-footer fas fa-circle',
					'fab fa-footer fa-twitter'
					),$CONFIG);
		$html .= "\n\t\t\t\t\t\t\t\t\t</a>";
		$html .= "\n\t\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t\t<h4>Tweets</h4>";
		$html .= "\n\t\t\t\t\t\t\t\t\tEmbed here";
		$html .= "\n\t\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t\t<!-- row end -->";
		$html .= "\n\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t<!-- footer column 1 end -->";			//End footer col 1
		$html .= "\n\t\t\t\t\t\t<!-- footer column 2 start -->";
		$html .= "\n\t\t\t\t\t\t<div class=\"col-md-4\">";
		$html .= "\n\t\t\t\t\t\t<!-- row start -->";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"row py-2  d-none d-md-block\">";
		$html .= "\n\t\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t\t<a href=\"#\">";
		$html .= "\n\t\t\t\t\t\t\t\t\t";
		$html .= make_font_awesome_stack(Array(
					'backdrop-footer fas fa-circle',
					'fas fa-fw fa-footer fa-address-card',
					),$CONFIG);
		$html .= "\n\t\t\t\t\t\t\t\t</a>";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t<h4>Contact us</h4>";
		$html .= "\n\t\t\t\t\t\t\t\t<p>Why not?</p>";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t<!-- row end -->";
		$html .= "\n\t\t\t\t\t\t<!-- row start -->";
		$html .= "\n\t\t\t\t\t\t<div class=\"row py-2 d-none d-md-block\">";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"col text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t<a href=\"#\">";
		$html .= "\n\t\t\t\t\t\t\t\t\t";
		$html .= make_font_awesome_stack(Array(
					'backdrop-footer fas fa-circle',
					'fas fa-fw fa-footer fa-laptop',
					),$CONFIG);
		$html .= "\n\t\t\t\t\t\t\t\t</a>";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t<h4>Cookie policy</h4>";
		$html .= "\n\t\t\t\t\t\t\t\t<p class=\" \">We use <a class=\" \" href=\"/# \">cookies </a></p>";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t<!-- row end -->";
		$html .= "\n\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t<!-- footer column 2 end -->";
		$html .= "\n\t\t\t\t\t<!-- footer column 3 start -->";
		$html .= "\n\t\t\t\t\t<div class=\"col-md-4\">";
		$html .= "\n\t\t\t\t\t\t<!-- row starting  -->";
		$html .= "\n\t\t\t\t\t\t<div class=\"row py-2 d-none d-md-block\">";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t<a href=\"# \">";
		$html .= make_font_awesome_stack(Array(
					'backdrop-footer fas fa-circle',
					'fas fa-fw fa-footer fa-file-pdf-o',
					),$CONFIG);
		$html .= "\n\t\t\t\t\t\t\t\t</a>";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t<h4>Download pdf</h4>";
		$html .= "\n\t\t\t\t\t\t\t\t<p> You like print?</a></p>";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t<!-- row ended -->";
		$html .= "\n\t\t\t\t\t\t<!-- row starting  -->";
		$html .= "\n\t\t\t\t\t\t<div class=\"row py-2 d-none d-md-block\">";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t<a href=\"". $CONFIG['LINK_TWITTER'] . "\">";
		$html .= make_font_awesome_stack(Array(
					'backdrop-footer fas fa-circle',
					'fas fa-fw fa-footer fa-info',
					),$CONFIG);
		$html .= "\n\t\t\t\t\t\t\t\t</a>";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t<h4>Info</h4>";
		$html .= "\n\t\t\t\t\t\t\t\tAbout us.";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t<!-- row ended -->";
		$html .= "\n\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t<!-- footer column 3 end -->";
		$html .= "\n\t\t\t\t</div>";
		$html .= "\n\t\t\t</div>";
		$html .= "\n\t\t</div>";
	}
	$html .= "\n\t\t\t<div class=\"container-fluid bg-primary p-0 pl-3 pr-3\">";
	$html .= "\n\t\t\t\t<div class=\"container bg-secondary p-0\">";
	$html .= "\n\t\t\t\t\t<div class=\"row py-3 justify-content-between\">";
	$html .= make_footer_bottom_cols($col1, $CONFIG);
	$html .= "\n\t\t\t\t\t\t<!-- End Col 1 -->";
	$html .= make_footer_bottom_cols($col2, $CONFIG);
	$html .= "\n\t\t\t\t\t\t<!-- End Col 2 -->";
	$html .= make_footer_bottom_cols($col3, $CONFIG);
	$html .= "\n\t\t\t\t\t\t<!-- End Col 3 -->";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</footer>";
	return $html;
}
function get_form_nullifier($CONFIG){
	//This is a JS way to nullify the form and prevent duplicate form 
	//	resubmissions. The proper way to do this though is with POST, REDIRECT, GET;
	$ret = '';
	$ret .= "\n\tif ( window.history.replaceState )";
	$ret .= " {window.history.replaceState( null, null, window.location.href );}";
	$ret = make_script('', '', '', $ret);
	//function make_script($src, $integrity="", $origin="", $content=""){
	return $ret;
}
function get_header($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	$ROOT = $CONFIG['ROOT'];
	$s = "";
	$s .= "\n<html lang=\"".$CONFIG['LANG']."\">";
	$s .=	"\n<head>";
	$s .=	"\n\t<!-- Required meta tags -->";
	$s .=	"\n\t<meta charset=\"".$CONFIG['CHAR_SET']."\">";
	$s .=	"\n\t<meta name=\"viewport\" content=\"".$CONFIG['META_CONTENT']."\">";
	$s .= get_css($CONFIG); //<link> elements
	$s .= "";
	$s .=	"\n\t<title>".$CONFIG['TITLE']."</title>";
	$s .=	"\n</head>\n";
	return $s;
}
function get_inventory_modal($CONFIG){
	$MCONFIG = $CONFIG['MCONFIG'];
	$PATHS	= get_paths($CONFIG['ROOT']);
	require_once($PATHS['FORMS_INVENTORY']);
	$modal = "";
	$modal .= "\n\t<!-- Modal -->";
	$modal .= "\n\t<div class=\"modal fade\" id=\"".$MCONFIG['ID']."\" role=\"dialog\">";
	$modal .= "\n\t\t<div class=\"modal-dialog\">";
	$modal .= "\n\t\t\t<!-- Modal content-->";
	$modal .= "\n\t\t\t<div class=\"modal-content\">";
	$modal .= "\n\t\t\t\t<div class=\"modal-header\">";
	$modal .= "\n\t\t\t\t\t<h4 class=\"modal-title\">Modal Header</h4>";
	$modal .= "\n\t\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
	$modal .= "\n\t\t\t\t</div>";
	$modal .= "\n\t\t\t\t<div class=\"modal-body\">";
	$modal .= display_inventory_form($CONFIG);
	$modal .= "\n\t\t\t\t</div>";
	$modal .= "\n\t\t\t\t<div class=\"modal-footer\">";
	$modal .= "\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>";
	$modal .= "\n\t\t\t\t</div>";
	$modal .= "\n\t\t\t</div>";
	$modal .= "\n\t\t</div>";
	$modal .= "\n\t</div><!-- END MODAL -->";
	return $modal;
}
function get_js($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	$ROOT = $CONFIG['ROOT'];
	$s = "";
	if($CONFIG['HAS_BOOTSTRAP'] || $CONFIG['HAS_POPPER'] || $CONFIG['HAS_JQUERY'] )
		$s .= get_bootstrap_scripts($CONFIG);
	if($CONFIG['HAS_DATATABLES'] || $CONFIG['HAS_DATATABLES_JQUERY'] )
		$s .= get_datatables_scripts($CONFIG);
	if($CONFIG['HAS_FONT_AWESOME'])
		$s .= get_font_awesome_scripts($CONFIG);
	if($CONFIG['CUSTOM_SCRIPTS']){
		$s .= "\n\t<!-- Optional JavaScript -->\n";
		$s .= $CONFIG['CUSTOM_SCRIPTS'];
	}
	return $s;
}
function get_nav($CONFIG=Null, $PATHS=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	if($PATHS === Null)
		$PATHS	= get_paths($CONFIG['ROOT']);
	$home			= $PATHS['NAV_HOME'];
	$features	= $PATHS['NAV_DISPLAY_FEATURES'];
	$pricing		= $PATHS['NAV_DISPLAY_PRICING'];
	$settings	= $PATHS['NAV_USER_SETTINGS'];
	$aDash		= $PATHS['NAV_ADMIN_PANEL'];
	$cart			= $PATHS['NAV_CART'];
	$CONFIG['FA_STACK_SIZE'] = "fa-md";
	$html = "";
	$html .= "\n\t\t<nav class=\"navbar fixed-top navbar-expand-sm navbar-light bg-light pl-3 pr-3 pb-0 pt-0\">";
	$html .= "\n\t\t\t<a class=\"navbar-brand\" href=\"" .$home. "\">";
	$html .= "Portals</a>";
	$html .= "\n\t\t\t<button ";
	$html .= "\n\t\t\t\tclass=\"navbar-toggler\"";
	$html .= "\n\t\t\t\ttype=\"button\"";
	$html .= "\n\t\t\t\tdata-toggle=\"collapse\"";
	$html .= "\n\t\t\t\tdata-target=\"#navbarText\"";
	$html .= "\n\t\t\t\taria-controls=\"navbarText\"";
	$html .= "\n\t\t\t\taria-expanded=\"false\"";
	$html .= "\n\t\t\t\taria-label=\"Toggle navigation\"";
	$html .= "\n\t\t\t>";
	$html .= "\n\t\t\t\t<span class=\"navbar-toggler-icon\"></span>";
	$html .= "\n\t\t\t</button>";
	$html .= "\n\t\t\t<div class=\"collapse navbar-collapse\" id=\"navbarText\">";
	$html .= "\n\t\t\t\t<ul class=\"navbar-nav mr-auto\">";
	$html .= "\n\t\t\t\t\t<li class=\"nav-item active\">";
	$html .= "\n\t\t\t\t\t\t<a class=\"nav-link\" href=\"".$home."\">Home <span class=\"sr-only\">(current)</span></a>";
	$html .= "\n\t\t\t\t\t</li>";
	$html .= "\n\t\t\t\t\t<li class=\"nav-item\">";
	$html .= "\n\t\t\t\t\t\t<a class=\"nav-link\" href=\"".$features."\">Features</a>";
	$html .= "\n\t\t\t\t\t</li>";
	$html .= "\n\t\t\t\t\t<li class=\"nav-item\">";
	$html .= "\n\t\t\t\t\t\t<a class=\"nav-link\" href=\"".$pricing."\">Pricing</a>";
	$html .= "\n\t\t\t\t\t</li>";
	if(is_logged_in($CONFIG) === TRUE && !$CONFIG['IS_LOGGING_OUT']){
		$html .= "\n\t\t\t\t\t<li class=\"nav-item\">";
		$html .= "\n\t\t\t\t\t\t<a class=\"nav-link\" title=\"Shopping Cart\"href=\"".$cart."\">";
		$html .= make_font_awesome_stack(Array(
			'backdrop-usd fas fa-circle',
			'fas fa-tw fa-shopping-cart'), $CONFIG);
		$html .= "<span class=\"badge badge-primary\">".get_cart_count($_SESSION['userid'], $CONFIG)."</span>";
		$html .= "</a>";
		$html .= "\n\t\t\t\t\t</li>";
	}
	if(is_logged_in($CONFIG) === TRUE && $_SESSION['alevel'] === 'admin' && !$CONFIG['IS_LOGGING_OUT']){
		//Give link to Admin dashboard
		$html .= "\n\t\t\t\t\t<li class=\"nav-item\">";
		$html .= "\n\t\t\t\t\t\t<a class=\"nav-link\" href=\"".$aDash."\">Admin</a>";
		$html .= "\n\t\t\t\t\t</li>";
	}
	$html .= "\n\t\t\t\t</ul>";
	$html .= "\n\t\t\t\t<span class=\"navbar-text\">";
	if (is_logged_in($CONFIG) === False || $CONFIG['IS_LOGGING_OUT'] === TRUE){
		$html .= "<a href=\"".$PATHS['USER_LOGIN']."\">";
		$html .= "Sign in";
		$html .= "</a>";
		$html .= " or ";
		$html .= "<a href=\"".$PATHS['USER_REGISTER']."\">";
		$html .= "Register now";
		$html .= "</a>";
	}
	else{
		//TODO: HREF to settings;
		$html .= "\n\t\t\t\t\tWelcome, ";
		$html .= get_user_fname($CONFIG);
		$html .= "\n<br/>\n<a class=\"mute\" href=\"".$PATHS['USER_LOGOUT']."\">Logout\n</a>\n";
	}
	$html .= "\n\t\t\t\t</span>";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</nav>";
	$html .= "\n";
	return $html;
}
function get_table_from_inventory($CONFIG){
	$PATHS		= get_paths($CONFIG['ROOT']);
	$dbpath		= $PATHS['DB_INVENTORY'];
	$query		= "SELECT id, name, quantity, price FROM inventory";
	$db			= new SQLite3($dbpath);
	$CUR_TABLE	= 'inventory';
	$table   	= "";
	$QUERY_PAGE	= $CONFIG['QUERY_PAGE'];
	$TABLE_ID	= $CONFIG['TABLE_ID'];
	$db->enableExceptions(TRUE);
	try{
		$prepare = $db->prepare($query);
		if(!$CUR_TABLE)
			$CUR_TABLE = "users";
		if ($prepare){
			$result	= $prepare->execute();
			if($result && $result->fetchArray()){
				$result->reset();
				$header  = "";
				$footer	= "";
				$table .= "\n\t<table id=\"".$TABLE_ID."\" class=\"table table-striped table-bordered\" ";
				$table .= "cellspacing=\"\" width=\"100%\" role=\"grid\">";
				$table .= "\n\t\t<thead>";

				$header .= "\n\t\t\t<tr role=\"row\">";
				$header .= "\n\t\t\t\t<th class=\"sorting\">";
				$header .= "\n\t\t\t\t\tName";
				$header .= "\n\t\t\t\t</th>";
				$header .= "\n\t\t\t\t<th class=\"sorting\">";
				$header .= "\n\t\t\t\t\tQuantity";
				$header .= "\n\t\t\t\t</th>";
				$header .= "\n\t\t\t\t<th class=\"sorting\">";
				$header .= "\n\t\t\t\t\tPrice";
				$header .= "\n\t\t\t\t</th>";
				$header .= "\n\t\t\t</tr>";

				$footer .= "\n\t\t\t<tr>";
				$footer .= "\n\t\t\t\t<th>";
				$footer .= "\n\t\t\t\t\tName";
				$footer .= "\n\t\t\t\t</th>";
				$footer .= "\n\t\t\t\t<th>";
				$footer .= "\n\t\t\t\t\tQuntity";
				$footer .= "\n\t\t\t\t</th>";
				$footer .= "\n\t\t\t\t<th>";
				$footer .= "\n\t\t\t\t\tPrice";
				$footer .= "\n\t\t\t\t</th>";
				$footer .= "\n\t\t\t</tr>";

				$table .= $header;
				$table .= "\n\t\t</thead>";
				$table .= "\n\t\t<tbody>";
				$is_odd			= TRUE;
				$is_first_row	= TRUE;
				while ($row = $result->fetchArray(SQLITE3_ASSOC)){
					$table .= "\n\t\t\t<tr role=\"row\" class=\"";
					if ($is_odd)
						$table .= "odd ";
					else
						$table .= "even ";
					if ($is_first_row)
						$table .= "first ";
					$table .= "\">"; //Closing `class`
					$row_keys = array_keys($row);
					$is_first_col = TRUE;
					foreach($row_keys as $row_key){
						if($row_key === 'name')
							continue;
						$table .= "\n\t\t\t\t<td>";
						if ($is_first_col){
							//Modal formatting: id is productid
						 	$MCONFIG	= $CONFIG['MCONFIG'];
							$table .= "\n<button type=\"button\" title=\"".$MCONFIG['TITLE']."\" ";
							$table .= "class=\"btn inventory-modal\" id=\"".$row['id']."\"data-toggle=\"modal\" ";
							$table .= "data-target=\"#".$MCONFIG['ID']."\" style=\"".$MCONFIG['STYLE']."\">";
							$table .= make_font_awesome_stack(Array(
								'backdrop-usd fas fa-circle',
								'fas fa-tw fa-usd'), $CONFIG);
							$table .= "\n</button>";
							$CONFIG['PRODUCT_NAME'] = $row['name'];
							$table .= get_inventory_modal($CONFIG);
							$table .= "".$row['name'];
						}
						else
							$table .= "".$row[$row_key];
						$table .= "</td>";
						$is_first_col = FALSE;
					}
					$table .= "\n\t\t\t</tr>";
					$is_first_row = FALSE;
				}
				$table .= "\n\t\t</tbody>";
		 		$table .= "<tfoot>";
				$table .= $footer;
		 		$table .= "</tfoot>";
				$table .= "\n\t</table>";
			}
			else{
				$table .= "\n\t\t\t<div class=\"col-12 bg-warning\">";
				$table .= "\n\t\t\t\tNO RESULTS;";
				$table .= "\n\t</div>";
			}
		}
		else{
			$table .= "\n\t\t\t<div class=\"col-12 bg-warning\">";
			$table .= "\n\t\t\t\tBAD QUERY;";
			$table .= "\n\t</div>";
		}
		$db->close();
	}
	catch (Exception $exception) {
		$table .= "\n\t\t\t<div class=\"col-12 bg-warning\">";
		$table .= "\n\t\t\t\tBAD QUERY AND PREPARE;<br/>";
		$table .= "\n\t\t\t\tDB: `".$dbpath."`<br/>";
		$table .= "\n\t\t\t\tQUERY: `".$query."`<br/>";
		$table .= "\n\t\t\t</div>";
	}
	return $table;
}
function get_table_from_member_query($dbpath, $query, $CONFIG){
	//TODO:	members to have a counter and submit;
	/* Return a dataTable table based off of query */
	$db			= new SQLite3($dbpath);
	$CUR_TABLE	= parse_from($query);
	$table   	= "";
	$QUERY_PAGE	= $CONFIG['QUERY_PAGE'];
	$TABLE_ID	= $CONFIG['TABLE_ID'];
	$db->enableExceptions(true);
	try{
		$prepare = $db->prepare($query);
		if(!$CUR_TABLE)
			$CUR_TABLE = "users";
		if ($prepare){
			$result	= $prepare->execute();
			if($result && $result->fetchArray()){
				$result->reset();
				$header  = "";
				$footer	= "";
				$table .= "\n\t<table id=\"".$TABLE_ID."\" class=\"table table-striped table-bordered\" ";
				$table .= "cellspacing=\"\" width=\"100%\" role=\"grid\">";
				$table .= "\n\t\t<thead>";
				while ($row = $result->fetchArray(SQLITE3_ASSOC)){
					$header .= "\n\t\t\t<tr role=\"row\">";
					$footer .= "\n\t\t\t<tr>";
					$row_keys = array_keys($row);
					for($i=0; $i<count($row_keys); $i++){
						 $row_key = $row_keys[$i];;
						$header .= "\n\t\t\t\t<th class=\"sorting\">";
						$header .= "\n\t\t\t\t\t".$row_key;
						$header .= "\n\t\t\t\t</th>";
						$footer .= "\n\t\t\t\t<th>";
						$footer .= "\n\t\t\t\t\t".$row_key;
						$footer .= "\n\t\t\t\t</th>";
					}
					$header .= "\n\t\t\t</tr>";
					$footer .= "\n\t\t\t</tr>";
					break;
				}
				$table .= $header;
				$table .= "\n\t\t</thead>";
				$result->reset();
				$table .= "\n\t\t<tbody>";
				$is_odd = TRUE;
				$is_first_row = TRUE;
				while ($row = $result->fetchArray(SQLITE3_ASSOC)){
					$table .= "\n\t\t\t<tr role=\"row\" class=\"";
					if ($is_odd)
						$table .= "odd ";
					else
						$table .= "even ";
					if ($is_first_row)
						$table .= "first ";
					$table .= "\">"; //Closing `class`
					$row_keys = array_keys($row);
					$is_first_col = TRUE;
					foreach($row_keys as $row_key){
						$table .= "\n\t\t\t\t<td>";
						if ($is_first_col){
							/*
							$dHref = $QUERY_PAGE."?delete_val=".$row[$row_key]."&delete_table=".$CUR_TABLE;
							$dHref .= "&delete_key=".$row_key."&is_deleting=TRUE";
							$table .= "\n<a href=\"".$dHref."\" title=\"Delete Entry\" style=\"color:black\">";
							$table .= make_font_awesome_stack(Array(
								'backdrop-google fas fa-square',
								'fas fa-tw fa-trash'), $CONFIG);
							$table .= "\n</a>";
							*/
							//TODO: Add a counter plut +/- options;
							//Add a submit;
						}
						$table .= "".$row[$row_key];
						$table .= "</td>";
						$is_first_col = FALSE;
					}
					$table .= "\n\t\t\t</tr>";
					$is_first_row = FALSE;
				}
				$table .= "\n\t\t</tbody>";
		 		$table .= "<tfoot>";
				$table .= $footer;
		 		$table .= "</tfoot>";
				$table .= "\n\t</table>";
			}
			else{
				$table .= "\n\t\t\t<div class=\"col-12 bg-warning\">";
				$table .= "\n\t\t\t\tNO RESULTS;";
				$table .= "\n\t</div>";
			}
		}
		else{
			$table .= "\n\t\t\t<div class=\"col-12 bg-warning\">";
			$table .= "\n\t\t\t\tBAD QUERY;";
			$table .= "\n\t</div>";
		}
		$db->close();
	}
	catch (Exception $exception) {
		$table .= "\n\t\t\t<div class=\"col-12 bg-warning\">";
		$table .= "\n\t\t\t\tBAD QUERY AND PREPARE;";
		$table .= "\n\t</div>";
	}
	return $table;
}
function get_table_from_owner_query($dbpath, $query, $CONFIG){
	//TODO: 	owner table to have delete and add items
	/* Return a dataTable table based off of query */
	$db			= new SQLite3($dbpath);
	$CUR_TABLE	= parse_from($query);
	$table   	= "";
	$QUERY_PAGE	= $CONFIG['QUERY_PAGE'];
	$TABLE_ID	= $CONFIG['TABLE_ID'];
	$db->enableExceptions(true);
	try{
		$prepare = $db->prepare($query);
		if(!$CUR_TABLE)
			$CUR_TABLE = "users";
		if ($prepare){
			$result	= $prepare->execute();
			if($result && $result->fetchArray()){
				$result->reset();
				$header  = "";
				$footer	= "";
				$table .= "\n\t<table id=\"".$TABLE_ID."\" class=\"table table-striped table-bordered\" ";
				$table .= "cellspacing=\"\" width=\"100%\" role=\"grid\">";
				$table .= "\n\t\t<thead>";
				while ($row = $result->fetchArray(SQLITE3_ASSOC)){
					$header .= "\n\t\t\t<tr role=\"row\">";
					$footer .= "\n\t\t\t<tr>";
					$row_keys = array_keys($row);
					for($i=0; $i<count($row_keys); $i++){
						 $row_key = $row_keys[$i];;
						$header .= "\n\t\t\t\t<th class=\"sorting\">";
						$header .= "\n\t\t\t\t\t".$row_key;
						$header .= "\n\t\t\t\t</th>";
						$footer .= "\n\t\t\t\t<th>";
						$footer .= "\n\t\t\t\t\t".$row_key;
						$footer .= "\n\t\t\t\t</th>";
					}
					$header .= "\n\t\t\t</tr>";
					$footer .= "\n\t\t\t</tr>";
					break;
				}
				$table .= $header;
				$table .= "\n\t\t</thead>";
				$result->reset();
				$table .= "\n\t\t<tbody>";
				$is_odd = TRUE;
				$is_first_row = TRUE;
				while ($row = $result->fetchArray(SQLITE3_ASSOC)){
					$table .= "\n\t\t\t<tr role=\"row\" class=\"";
					if ($is_odd)
						$table .= "odd ";
					else
						$table .= "even ";
					if ($is_first_row)
						$table .= "first ";
					$table .= "\">"; //Closing `class`
					$row_keys = array_keys($row);
					$is_first_col = TRUE;
					foreach($row_keys as $row_key){
						$table .= "\n\t\t\t\t<td>";
						if ($is_first_col){
							$dHref = $QUERY_PAGE."?delete_val=".$row[$row_key]."&delete_table=".$CUR_TABLE;
							$dHref .= "&delete_key=".$row_key."&is_deleting=TRUE";
							$table .= "\n<a href=\"".$dHref."\" title=\"Delete Entry\" style=\"color:black\">";
							$table .= make_font_awesome_stack(Array(
								'backdrop-google fas fa-square',
								'fas fa-tw fa-trash'), $CONFIG);
							$table .= "\n</a>";
						}
						$table .= "".$row[$row_key];
						$table .= "</td>";
						$is_first_col = FALSE;
					}
					$table .= "\n\t\t\t</tr>";
					$is_first_row = FALSE;
				}
				$table .= "\n\t\t</tbody>";
		 		$table .= "<tfoot>";
				$table .= $footer;
		 		$table .= "</tfoot>";
				$table .= "\n\t</table>";
			}
			else{
				$table .= "\n\t\t\t<div class=\"col-12 bg-warning\">";
				$table .= "\n\t\t\t\tNO RESULTS;";
				$table .= "\n\t</div>";
			}
		}
		else{
			$table .= "\n\t\t\t<div class=\"col-12 bg-warning\">";
			$table .= "\n\t\t\t\tBAD QUERY;";
			$table .= "\n\t</div>";
		}
		$db->close();
	}
	catch (Exception $exception) {
		$table .= "\n\t\t\t<div class=\"col-12 bg-warning\">";
		$table .= "\n\t\t\t\tBAD QUERY AND PREPARE;";
		$table .= "\n\t</div>";
	}
	return $table;
}
function make_div($col, $CONFIG){
	//TODO: Key-Value listings for below instead of hardcoding?;
	$ret = "\n\t\t<div ";
	if ($col['id'] && $col['id'] !== "")
		$ret .= " id=\"".$col['id']."\"";
	if ($col['class'])
		$ret .= " class=\"".$col['class']."\"";
	if ($col['style'])
		$ret .= " style=\"".$col['style']."\"";
	if ($col['data-ride'])
		$ret .= " date-ride=\"". $col['data-ride'] ."\"";
	if ($col['foo'])
		$ret .= " foo=\"".$col['foo']."\"";
	$ret .= ">";
	$ret .= "\n\t\t\t" . $col['content'];
	$ret .= "\n\t\t</div>";
	return $ret;
}
function make_css($REL, $LINK, $INTEGRITY="", $ORIGIN=""){
	/* Make a CSS stylesheet to be imported into HTML page */
	$css .= "\n\t<link";
	$css .= "\n\t\trel=\"".$REL."\"";
	$css .= "\n\t\thref=\"".$LINK."\"";
	$css .= "\n\t\tintegrity=\"".$INTEGRITY."\"";
	$css .= "\n\t\tcrossorigin=\"".$ORIGIN."\">";
	$css .= "\n\t</link>";
	return $css;
}
function make_gen_col($c, $CONFIG){
	$col = "";
	$col .= "\n\t\t\t\t" . $CONFIG['GEN_COL'];
	$col .= $c;
	$col .= "\n\t\t\t\t</div><!-- END COL -->";
	return $col;
}
function make_gen_container($c, $CONFIG){
	$ret = "";
	$ret .= "\n\t\t" . $CONFIG['GEN_CONTAINER'];
	$ret .= $c;
	$ret .= "\n\t\t</div><!-- END CONTAINER -->";
	return $ret;
}
function make_gen_info($c, $CONFIG){
	$col = "";
	$col .= "\n\t\t\t\t" . $CONFIG['GEN_INFO'];
	$col .= $c;
	$col .= "\n\t\t\t\t</div><!-- END COL -->";
	return $col;
}
function make_gen_row($c, $CONFIG){
	$col = "";
	$col .= "\n\t\t\t" . $CONFIG['GEN_ROW'];
	$col .= $c;
	$col .= "\n\t\t\t</div><!-- END ROW -->";
	return $col;
}
function make_gen_warning($c, $CONFIG){
	$col = "";
	$col .= "\n\t\t\t\t" . $CONFIG['GEN_WARNING'];
	$col .= $c;
	$col .= "\n\t\t\t\t</div><!-- END COL -->";
	return $col;
}
function make_href($CONFIG=Null){
	if ($CONFIG === Null){
		//TODO: ERROR MGMT;
		return 'ERROR 234';
	}
	$ret		= "";
	$class	= " class=\""		. $CONFIG['HREF_CLASS']		. "\" ";
	$link		= " href=\""		. $CONFIG['HREF_LINK']		. "\" ";
	$role		= " role=\""		. $CONFIG['HREF_ROLE']		. "\" ";
	$text		= $CONFIG['HREF_TEXT'];

	$ret .= "\n\t\t<a " . $class . $link . $role;
	$ret .= ">\n\t\t" . $text . "\n\t\t</a>";
	return $ret;
}
function make_list_group($entries){
	$ret = "";
	$ret .= "\n\t\t<ul class=\"list-group\">";
	for ($i=0; $i<count($entries); $i++){
		$ret .= $entries[$i];
	}
	$ret .= "\n\t\t</ul>";
	return $ret;
}
function make_list_item($text){
	$ret = '';
	$ret .= "\n\t\t<li class=\"list-group-item\">";
	$ret .= $text;
	$ret .= "\n\t\t</li>";
	return $ret;
}
function make_par( $par, $CONFIG=Null ){
	//Take string `s` and be sure string is properly encapsulated as HTML paragraph
	$ret = "\n\t\t<p";
	if ($par['class'])
		$ret .= " class=\"". $par['class'] ."\"";
	$ret .= ">";
	if ($par['content'])
		$ret .= $par['content'];
	$ret .= "\n\t\t</p>";
	return $ret;
}
function make_script($src, $integrity="", $origin="", $content=""){
	/* Make a JS script to be imported into HTML page */
	$s = "";
	$s .= "\n\t<script";
	if ($src)
		$s .= "\n\t\tsrc=\"".$src."\"";
	if ($integrity)
		$s .= "\n\t\tintegrity=\"".$integrity."\"";
	if ($origin)
		$s .= "\n\t\tcrossorigin=\"".$origin."\"";
	$s .= "\n\t>";
	if ($content)
		$s .= "\n\t\t" . $content;
	$s .= "\n\t</script>";
	return $s;
}
function tab(){
	//Return HTML tab; TODO: param for length of tab;
	return "&nbsp;&nbsp;&nbsp;&nbsp;";
}

?>

