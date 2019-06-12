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
	$js_arr					= [];
	$js_arr['content']	= "\n\t\t\talert(JSON.stringify(".$msg."));";
	$html						= make_tag('script', $js_arr, $CONFIG);
	return $html;
}
function build_img($imgArr){
	$alt    = $imgArr['alt']		?? "";
	$class  = $imgArr['class']		?? "";
	$height = $imgArr['height']	?? "100%";
	$src    = $imgArr['src']		?? "";
	$width  = $imgArr['width']		?? "100%";

	$img = "<img class=\"".$class."\" src=\"".$src."\""; 
	$img .= " alt=\"".$alt."\" width=\"".$width."\" height=\"".$height."\">";
	$img .= "</img>";
	return $img;
}
function clog($msg){
	$js_arr					= [];
	$js_arr['content']	= "\n\t\t\tconsole.log(JSON.stringify(".$msg."));";
	$html						= make_tag('script', $js_arr, $CONFIG);
	return $html;
}
function get_ad($CONFIG){
	//TODO: Condense with general libs and wrapping;
	$STRINGS			= get_config_strings($CONFIG);
	$PATHS			= get_paths($CONFIG['ROOT']);
	$ad_image_arr	= Array(
		'alt'=>'Example of what ad placement for desktop can look like on your site',
		'class'=> 'card-img-top mx-auto',
		'height'=>'auto',
		'src'=>$PATHS['IMAGE_AD_LOGO'],
		'width'=>'100px',
	);

	$ad_text_arr = Array(
		'class'=>'card-text',
		'content'=>$STRINGS['AD_TEXT'],
	);
	$ad_title_arr	= Array(
		'class'=> 'card-title',
		'content'=>$STRINGS['AD_TITLE'],
		'style'=>'text-align:center;',
	);
	$ad_img			= build_img($ad_image_arr, $CONFIG);
	$ad_title		= make_tag('h5', $ad_title_arr, $CONFIG);;
	$ad_text			= make_tag('p', $ad_text_arr, $CONFIG);
	$ad_button		= get_href_ad($CONFIG, $STRINGS);
	$ad_body_arr	= Array(
		'class'=>"card-body",
		'content'=>$ad_title . $ad_text . $ad_button,
		'style'=>"",
	);
	$ad_body	= make_tag("div",$ad_body_arr, $CONFIG);
	$ad_arr = Array(
		'class'=>"card",
		'content'=>$ad_img . $ad_body,
		'style'=>"width:100%",
	);
	$ad = make_tag("div",$ad_arr, $CONFIG);
	return $ad;
}
function get_ads_sm($CONFIG){
	//TODO: Condense with general libs and wrapping;
	$STRINGS		= get_config_strings($CONFIG);
	$PATHS		= get_paths($CONFIG['ROOT']);
	$ads			= '';
	$ad_sm_image_arr	= Array(
		'alt'=>'Example of what ad placement for mobile can look like on your site',
		'class'=> 'rounded mx-auto d-block',
		'height'=>'auto',
		'src'=>$PATHS['IMAGE_AD_LOGO'],
		'width'=>'100px',
	);
	$ad_sm_img	= build_img($ad_sm_image_arr, $CONFIG);
	$ad_href1	= $CONFIG['AD_SM_HREF1'];
	$ad_href2	= $CONFIG['AD_SM_HREF2'];
	$text1		= get_href_ad_sm($STRINGS['AD_SMALL_TEXT_1'], $ad_href1, $CONFIG);
	$text2		= get_href_ad_sm($STRINGS['AD_SMALL_TEXT_2'], $ad_href2, $CONFIG);
	$col0_arr	= Array(
		'class'=>"col-6 m-0 p-0",
		'content'=>$ad_sm_img,
		'style'=>"",
	);
	$col1_arr	= Array(
		'class'=>"col-6 m-0 p-0",
		'content'=>$ad_sm_img,
		'style'=>"",
	);
	$col2_arr	= Array(
		'class'=>"col-6 pl-3 pr-3 d-block",
		'content'=>$text1,
		'style'=>"",
	);
	$col3_arr	= Array(
		'class'=>"col-6 pl-3 pr-3 d-block",
		'content'=>$text2,
		'style'=>"",
	);
	$col0 = make_tag("div",$col0_arr, $CONFIG). "<!-- END COL -->";
	$col1 = make_tag("div",$col1_arr, $CONFIG). "<!-- END COL -->";
	$row1_arr = Array(
		'class'=>" row pl-3 pr-3 m-0 d-sm-none",
		'style'=>"",
		'content'=>$col0.$col1,
	);
	$col2	= make_tag("div",$col2_arr, $CONFIG). "<!-- END COL -->";
	$col3 = make_tag("div",$col3_arr, $CONFIG). "<!-- END COL -->";
	$row2_arr = Array(
		'class'=>" row pl-3 pr-3 m-0 d-sm-none",
		'style'=>"",
		'content'=>$col2.$col3,
	);
	$row1	= make_tag("div",$row1_arr, $CONFIG). "<!-- END ROW -->";
	$row2	= make_tag("div",$row2_arr, $CONFIG). "<!-- END ROW -->";
	$ads	.= $row1 . $row2;
	return $ads;
}
function get_carousel($pics, $car_id, $CONFIG){
	$_car			= "";
	$_slideshow	= get_carousel_items($pics, $CONFIG);
	$controls	= get_carousel_controls($car_id, $CONFIG);
	$indicators	= get_carousel_indicators($pics, $car_id, $CONFIG);
	$style		= "height:100vh;overflow-y:auto;";
	$style		= "";
	$slideshow	=  Array(
				'class'=>"carousel-inner",
				'content'=>$_slideshow,
				'style'=>$style,
		);
	$slideshow	= make_tag("div",$slideshow, $CONFIG);
	$_car	.= $indicators . $slideshow . $controls;

	$car	=  Array(
				'class'=>"carousel slide carousel-fade",
				'content'=>$_car,
				'date-ride'=>"carousel",
				'id'=>$car_id,
				'style'=>$style,
		);
	$car	= make_tag("div",$car, $CONFIG);
	return $car;
}
function get_carousel_controls($id, $CONFIG){
	$STRINGS		= get_config_strings($CONFIG);
	$controls	= '';
	$controls	.= get_href_carousel_prev($CONFIG, $id);
	$controls	.= get_href_carousel_next($CONFIG, $id);
	$controls	.= "\n\t\t<!-- END controls -->";
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
	//Go through the pictures and build into carousel slideshow;
	$html = "";
	$html	.= "\n\t\t<!-- The slideshow -->";
	for($i=0; $i<count($items); $i++){
		$item = $items[$i];
		$html .= "\n\t\t\t\t<div class=\"carousel-item ";
		if ($i === 0){
			$html .= "active";
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
	$PATHS			= get_paths($CONFIG['ROOT']);
	$table   		= "";
	$QUERY_PAGE		= $CONFIG['QUERY_PAGE'];
	$TABLE_ID		= $CONFIG['TABLE_ID'];
	$columns_items	= Array(
		'Product Name',
		'Quantity',
		'Price per Each',
		'Price * Quantity',
	);
	if($cart && $cart->fetchArray(SQLITE3_ASSOC)){
		$cart->reset();	//Reset after above fetchArray()
		$theader		= get_table_header($columns_items, $CONFIG);
		$tfooter		= get_table_footer($columns_items, $CONFIG);
		$tbody		= get_table_body($cart, $CONFIG);
		$table_arr	= Array(
			'cellspacing'=>'',
			'class'=>'table table-striped table-bordered',
			'content'=>$theader . $tbody . $tfooter,
			'id'=>$TABLE_ID,
			'role'=>'grid',
			'width'=>'100%',
		);
		$table .= make_tag("table", $table_arr, $CONFIG);
	}
	else{
		$table .= make_gen_warning("NO RESULTS;", $CONFIG);
	}
	return $table;
}
function get_comment_box($blog_id, $html_id, $CONFIG){
	//TODO: If blog_id has disabled comments, do not show;
	$STRINGS		= get_config_strings($CONFIG);
	$PATHS		= get_paths($CONFIG['ROOT']);
	$hidden_arr	= Array(
		'type'=>'hidden',
		'name'=>'blog_id',
		'value'=>$blog_id,
	);
	$label_arr	= Array(
		'for'=>$html_id,
		'content'=>$STRINGS['BLOG_COMMENTS'],
	);
	$text_arr	= Array(
		'class'=>'form-control',
		'rows'=>'3',
		'name'=>'input_comment',
		'id'=>"input_comment",
		'placeholder'=>"Write a comment...",//TODO
		'id'=>$html_id,
		'required'=>'',
		'ARGS'=>Array('SKIP_WHITESPACE'=>TRUE),
	);
	$invalid_comment_arr	= Array(
		'class'=>'invalid-feedback',
		'content'=>$STRINGS['NO_COMMENT'],
	);
	$submit_arr	= Array(
	//$button .= "\n\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary btn-block\" name=\"form_submit\">Submit</button>";
		'type'=>'submit',
		'class'=>'btn btn-primary btn-block',
		'name'=>'form_submit',
		'content'=>'Submit',
	);
	$hidden				= make_tag('input', $hidden_arr, $CONFIG);
	$label				= make_tag('label', $label_arr, $CONFIG);
	$textarea			= make_tag('textarea', $text_arr, $CONFIG);
	$invalid_comment	= make_tag('div', $invalid_comment_arr, $CONFIG);
	$form_group_arr	= Array(
		'class'=>'form-group',
		'content'=>$hidden . "\n\t" . $label . "\n\t" . $textarea,
	);
	$form_group	= make_tag('div', $form_group_arr, $CONFIG);
	$submit		= make_tag('button', $submit_arr, $CONFIG);
	$form_arr	= Array(
		'action'=>$PATHS['GET_BLOGS'],
		'method'=>'post',
		'content'=>$form_group . "\n\t" . $submit,
	);
	$form	= make_tag('form', $form_arr, $CONFIG);
	return $form;
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
	$s .= get_passtow_css($CONFIG);
	$s .= $CONFIG['CUSTOM_STYLES'];
	return $s;
}
function get_datatables_jquery($orderby, $CONFIG){
	$content	= "\n\t$(document).ready(function(){";
	$content	.= "\n\t\t$('#".$CONFIG['TABLE_ID']."').DataTable({";
	$content	.= "\n\t\t\t\"order\": [[ 1, \"".$orderby."\" ]]";
	$content	.= "\n\t\t});";
	$content	.= "\n\t\t$('.dataTables_length').addClass('bs-select');";
	$content	.= "\n\t});";
	$js_arr	= [];
	$js_arr['content'] = $content;
	return make_tag('script', $js_arr, $CONFIG);
}
function get_footer($CONFIG=Null){
	if ($CONFIG === Null)
		$CONFIG = get_config();
	$ROOT			= $CONFIG['ROOT'];
	$ICONS		= get_config_icons($CONFIG);
	$col0_links	= get_footer_col0_icons($ICONS, $CONFIG);
	$col1_links	= get_footer_col1_icons($ICONS, $CONFIG);
	$col2_links	= get_footer_col2_icons($ICONS, $CONFIG);

	$footer_class	= "m-0 mt-5";
	if ($CONFIG['FOOTER_IS_STICKY'] === TRUE)
		$footer_class .= " fixed-bottom ";
	$col0_arr	= Array(
		'class'=>"col-4 p-0 m-0",
		'content'=>make_footer_bottom_cols($col0_links, $CONFIG),
		'style'=>"color:white;text-align:center",
	);
	$col1_arr	= Array(
		'class'=>"col-4 p-0 m-0",
		'content'=>make_footer_bottom_cols($col1_links, $CONFIG),
		'style'=>"color:white;text-align:center",
	);
	$col2_arr	= Array(
		'class'=>"col-4 p-0 m-0",
		'content'=>make_footer_bottom_cols($col2_links, $CONFIG),
		'style'=>"color:white;text-align:center",
	);
	$col0	= make_tag("div",$col0_arr, $CONFIG) . "\n\t\t\t\t\t\t<!-- End Col 0 -->";
	$col1	= make_tag("div",$col1_arr, $CONFIG) . "\n\t\t\t\t\t\t<!-- End Col 1 -->";
	$col2	= make_tag("div",$col2_arr, $CONFIG) . "\n\t\t\t\t\t\t<!-- End Col 2 -->";
	$row0_arr	= Array(
		'class'=>"d-flex justify-content-around",
		'content'=>$col0.$col1.$col2,
		'style'=>"",
	);
	$row0	= make_tag("div",$row0_arr, $CONFIG) . "\n\t\t\t\t\t\t<!-- End ROW -->";
	$container_arr	= Array(
		'class'=>"container-fluid bg-black p-0 pl-3 pr-3",
		'content'=>$row0,
		'style'=>"",
	);
	$container	= make_tag("div",$container_arr, $CONFIG) . "\n\t\t\t\t\t\t<!-- End CONTAINER -->";
	$footer_arr	= Array(
		'class'=>$footer_class,
		'content'=>$container,
	);
	$footer		= make_tag('footer', $footer_arr, $CONFIG);;
	return $footer;
}
function get_form_nullifier($CONFIG){
	//This is a JS way to nullify the form and prevent duplicate form 
	//	resubmissions. The proper way to do this though is with POST, REDIRECT, GET;
	$js_arr					= Array();
	$js_arr['content']	= "\n\tif ( window.history.replaceState )";
	$js_arr['content']	.= " {window.history.replaceState( null, null, window.location.href );}";
	$ret	= make_tag('script', $js_arr, $CONFIG);;
	return $ret;
}
function get_google_analytics($CONFIG=Null){
	/*
	* Google Analytics has been replace with Google Tag Manager (GMT)
	* Should be injected into every page no matter what...
	*/
	$gtm_arr	= Array(
		"async"=>"",
		"src"=>$CONFIG["LINK_GTM"],
	);
	$gtm	= make_tag('script', $gtm_arr, $CONFIG);
	$gtag_content	= "";
	$gtag_content	.= "\n\t\twindow.dataLayer = window.dataLayer || [];";
	$gtag_content	.= "\n\t\tfunction gtag(){dataLayer.push(arguments);}";
	$gtag_content	.= "\n\t\tgtag('js', new Date());";
	$gtag_content	.= "\n\t\tgtag('config', 'UA-59999025-2');";
	$gtag_arr		= Array(
		'content'=>$gtag_content,
	);
	$gtag	= make_tag('script', $gtag_arr, $CONFIG);
	$js	= "\n\t<!-- Global site tag (gtag.js) - Google Analytics -->";
	$js	.= $gtm;
	$js	.= $gtag;
	return $js;
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
	$s .=	"\n\t<meta name=\"viewport\"		content=\"".$CONFIG['META_CONTENT']."\">";
	$s .=	"\n\t<meta name=\"keywords\"		content=\"".$CONFIG['META_KEYWORDS']."\">";
	$s .=	"\n\t<meta name=\"description\"	content=\"".$CONFIG['META_DESCRIPTION']."\">";
	$s	.= get_google_analytics($CONFIG);
	$s .= get_css($CONFIG); //<link> elements
	$s .= "";
	$s .=	"\n\t<title>".$CONFIG['TITLE']."</title>";
	$s .=	"\n</head>\n";
	return $s;
}
function get_inventory_modal($prod_id, $modal_id, $CONFIG){
	$product_name	= get_inventory_product_name($prod_id, $CONFIG);
	//$product_name	= "TEMPORARY";
	$PATHS			= get_paths($CONFIG['ROOT']);
	$STRINGS			= get_config_strings($CONFIG);
	require_once($PATHS['FORMS_INVENTORY']);
	$mtitle_arr		= Array(
		'class'=>'modal-title',
		'contnet'=>$STRINGS['MODAL_HEADER'],
	);
	$modal_title	.= make_tag('h4', $mtitle_arr, $CONFIG);
	$modal_X			.= get_href_close_x_modal($CONFIG, $STRINGS);
	$mheader_arr	= Array(
		'class'=>"modal-header",
		'content'=>$modal_title . $modal_X,
		'style'=>"",
	);
	$mbody_arr	= Array(
		'class'=>"modal-body",
		'content'=>display_inventory_form($product_name, $CONFIG),
		'style'=>"",
	);
	$mfooter_arr	= Array(
		'class'=>"modal-footer",
		'content'=>get_href_close_modal($CONFIG, $STRINGS),
		'style'=>"",
	);
	$mheader	= make_tag("div",$mheader_arr, $CONFIG);
	$mbody	= make_tag("div",$mbody_arr, $CONFIG);
	$mfooter	= make_tag("div",$mfooter_arr, $CONFIG);

	$mcontent_arr	= Array(
		'class'=>"modal-content",
		'content'=>$mheader . $mbody . $mfooter,
		'style'=>"",
	);
	$mcontent		= make_tag("div",$mcontent_arr, $CONFIG);
	$mdialog_arr	= Array(
		'class'=>"modal-dialog",
		'content'=>$mcontent,
		'style'=>"",
	);
	$mdialog		= make_tag("div",$mdialog_arr, $CONFIG);
	$modal_arr	= Array(
		'class'=>"modal fade",
		'content'=>$mdialog,
		'id'=>$modal_id,
		'role'=>'dialog',
		'style'=>"",
	);
	$modal	= "\n\t<!-- Modal -->";
	$modal	.= make_tag("div",$modal_arr, $CONFIG);
	$modal	.= "\n\t</div><!-- END MODAL -->";
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
function get_js_arr(){
	return Array(
		'content'=>'',
		'integrity'=>'',
		'crossorigin'=>'',
		'src'=>'',
	);
}
function get_js_inv($PATHS, $CONFIG){
	$js_inv_arr				= get_js_arr();
	$js_inv_arr['src']	= $PATHS['JS_INVENTORY'];
	return make_tag('script', $js_inv_arr, $CONFIG);
}
function get_nav($CONFIG=Null, $PATHS=Null){
	if($CONFIG === Null)
		$CONFIG = get_config();
	if($PATHS === Null)
		$PATHS = get_paths($CONFIG['ROOT']);
	$STRINGS		= get_config_strings($CONFIG);
	$ICONS		= get_config_icons($CONFIG);
	$toggle_arr	= Array(
		"aria-controls"=>"navbarText",
		"aria-expanded"=>"false",
		"aria-label"	=>"Toggle navigation",
		"class"			=>"navbar-toggler",
		"content"		=>$ICONS['NAV_TOGGLE'],
		"data-target"	=>"#navbarText",
		"data-toggle"	=>"collapse",
		"type"			=>"button",
	);
	$toggle			= make_tag('button', $toggle_arr, $CONFIG);
	$nav_items		= get_nav_items($CONFIG);
	$nav_text		= get_nav_text($CONFIG, $STRINGS);
	$collapse_arr	= Array(
		"class"=>"collapse navbar-collapse",
		"content"=>$nav_items . $nav_text,
		"id"=>"navbarText",
	);
	$collapse	= make_tag('div', $collapse_arr, $CONFIG);
	$nav_arr		= Array(
		"class"=>"navbar fixed-top navbar-expand-sm navbar-light bg-light pl-3 pr-3 pb-0 pt-0",
		"content"=>get_href_nav_brand($CONFIG, $STRINGS) . $toggle . $collapse,
		"id"=>"navbar_b",
	);
	$nav	= make_tag('nav', $nav_arr, $CONFIG);
	return $nav;
}
function get_nav_items($CONFIG){
	$CONFIG['FA_STACK_SIZE'] = "fa-md";
	$STRINGS			= get_config_strings($CONFIG);
	$is_logged_in	= is_logged_in($CONFIG);
	$access_level	= get_user_access_level($CONFIG);
	$nav_item_tag	= 'li';
	$nav_item_arr	= Array(
		'id'=>'',
		'class'=>'nav-item',
		'content'=>'',
		'style'=>'',
	);
	//TODO: Find out what active page is;
	//TODO: Wrap all of elements in an Arr;
	$home_arr					= $nav_item_arr;
	$home_arr['content'] 	= get_href_nav_home($CONFIG, $STRINGS);
	$home_arr['class']		.= ' active';
	$home							= make_tag($nav_item_tag, $home_arr, $CONFIG);
	$item2_arr					= $nav_item_arr;
	$item2_arr['content']	= get_href_nav_features($CONFIG, $STRINGS);
	$item2						= make_tag($nav_item_tag, $item2_arr, $CONFIG);
	$item3_arr					= $nav_item_arr;
	$item3_arr['content']	= get_href_nav_pricing($CONFIG, $STRINGS);
	$item3						= make_tag($nav_item_tag, $item3_arr, $CONFIG);
	$item4_arr					= $nav_item_arr;
	$item4_arr['content']	= get_href_nav_item4($CONFIG, $STRINGS);
	$item4						= make_tag($nav_item_tag, $item4_arr, $CONFIG);
	if($is_logged_in === TRUE && !$CONFIG['IS_LOGGING_OUT']){
		$userid			= get_user_id($CONFIG);
		$shopping_cart	=  make_font_awesome_stack(
										Array(
											'backdrop-usd fas fa-circle',
											'fas fa-tw fa-shopping-cart'
										), 
										$CONFIG
									);
		$shopping_cart 					.= "<span class=\"badge badge-primary\">";
		$shopping_cart 					.= get_cart_count($userid, $CONFIG);
		$shopping_cart 					.= "</span>";
		$shopping_cart_arr				= $nav_item_arr;
		$shopping_cart_arr['content']	= get_href_nav_shopping_cart(
														$shopping_cart, 
														$CONFIG, 
														$STRINGS
													);
		$shopping_cart_li					= make_tag(
														$nav_item_tag, 
														$shopping_cart_arr, 
														$CONFIG
													);
	}
	else
		$shopping_cart_li	= "<!-- NO SHOPPING CART TO SHOW -->";
	if($is_logged_in === TRUE && $access_level === 'admin' && !$CONFIG['IS_LOGGING_OUT']){
		$admin_arr					= $nav_item_arr;
		$admin_arr['content']	= get_href_nav_admin($CONFIG, $STRINGS);
		$admin_dash					= make_tag($nav_item_tag, $admin_arr, $CONFIG);
	}
	else
		$admin_dash	= "<!-- NOT ADMIN DASH -->";
	$nav_items_arr	= Array(
		'id'=>'',
		'class'=>'navbar-nav mr-auto',
		'content'=>$home.$item2.$item3.$item4.$shopping_cart_li.$admin_dash,
		'style'=>'',
	);
	$nav_items = make_tag('ul', $nav_items_arr, $CONFIG);
	return $nav_items;
}
function get_nav_text($CONFIG, $STRINGS){
	$content = "";
	if (is_logged_in($CONFIG) === FALSE || $CONFIG['IS_LOGGING_OUT'] === TRUE){
		$content .= get_href_nav_sign_in($CONFIG, $STRINGS);
		$content .= $STRINGS['GEN_OR'];;
		$content .= get_href_nav_register($CONFIG, $STRINGS);
	}
	else{
		//TODO: HREF to settings;
		$content .= $STRINGS['NAV_WELCOME'];;
		$content .= "\n<br/>";
		$content .= get_href_nav_logout($CONFIG, $STRINGS);
	}
	$nav_text_arr = Array(
		"class"=>"navbar-text",
		"content"=>$content,
	);
	$nav_text = make_tag('span', $nav_text_arr, $CONFIG);
	return $nav_text;
}
function get_passtow_css($CONFIG){
	if($CONFIG === Null)
		$CONFIG	= get_config($ROOT);
	$ROOT		= $CONFIG['ROOT'];
	$PATHS	= get_paths($ROOT);
	echo "\n<!-- LOCAL ".$PATHS['CSS_PASSTOW']." imported -->\n";
	$css_arr = Array(
		'rel'=>'stylesheet',
		'href'=>$PATHS['CSS_PASSTOW'], 
		'type'=>"text/css",
	);
	return make_tag("link", $css_arr, $CONFIG);
}
function get_table_from_inventory($MCONFIG, $CONFIG){
	$PATHS			= get_paths($CONFIG['ROOT']);
	$ICONS			= get_config_icons($CONFIG);
	$dbpath			= $PATHS['DB_INVENTORY'];
	$query			= "SELECT id, name, quantity, price FROM inventory";
	$db				= new SQLite3($dbpath);
	$table   		= "";	//To be returned;
	$TABLE_ID		= $CONFIG['TABLE_ID'];
	$columns_items	= Array(
		'Name',
		'Quantity',
		'Price',
	);
	$theader		= get_table_header($columns_items, $CONFIG);
	$tfooter		= get_table_footer($columns_items, $CONFIG);
	$db->enableExceptions(TRUE);
	try{
		$prepare = $db->prepare($query);
		if ($prepare){
			$result	= $prepare->execute();
			if($result && $result->fetchArray()){
				$result->reset();
				$row_cnt	= 1;
				while ($row = $result->fetchArray(SQLITE3_ASSOC)){
					$row_content = "";
					$row_class = "";
					if ($row_cnt % 2 === 1)
						$row_class .= "odd ";
					else
						$row_class .= "even ";
					if ($row_cnt === 1)
						$row_class .= "first ";
					$row_keys = array_keys($row);
					for($i=0; $i<count($row_keys); $i++){
						$row_key	= $row_keys[$i];
						if($row_key === 'id')
							continue;
						if($row_key === 'name'){
							//Modal formatting: id is productid
							$prod_id		= $row['id'];
							$modal_id	= $MCONFIG['ID'] . $row['id'];
							$button		= '';
							$button_arr	= Array(
								'class'=>'btn inventory-modal',
								'content'=>$ICONS['CURRENCY_CIRCLE'],
	//							'data-target'=>"#".$MCONFIG['ID'].$prod_id,
								'data-target'=>"#".$modal_id,
								'data-toggle'=>'modal',
								'id'=>$prod_id,
								'style'=>$MCONFIG['STYLE'],
								'title'=>$MCONFIG['TITLE'],
								'type'=>'button',
							);
							$button	= make_tag('button', $button_arr, $CONFIG);
							$cell_content = $button;
							$cell_content .= get_inventory_modal($prod_id, $modal_id, $CONFIG);
							$cell_content .= $row['name'];
						}
						else
							$cell_content = $row[$row_key];
						$cell_arr	= Array(
							'content'=>$cell_content,
						);
						$cell = make_tag('td', $cell_arr, $CONFIG);
						$row_content .= $cell;
					}//End for-loop
					$row_arr = Array(
						'class'=>$row_class,
						'content'=>$row_content,
						'role'=>'row',
					);
					$row = make_tag('tr', $row_arr, $CONFIG);
					$tbody_content .= $row;
					$row_cnt += 1;
				}//End While
				$tbody_arr	= Array(
					'content'=>$tbody_content,
				);
				$tbody	= make_tag('tbody', $tbody_arr, $CONFIG);
				$table_content .= $theader;
				$table_content .= $tbody;
				$table_content .= $tfooter;
				$table_arr	= Array(
					'cellspacing'=>'',
					'class'=>'table table-striped table-bordered',
					'content'=>$table_content,
					'id'=>$TABLE_ID,
					'role'=>'grid',
					'width'=>'100%',
				);
				$table	= make_tag('table', $table_arr, $CONFIG);
			}
			else{
				$table .= make_gen_warning("NO RESULTS;", $CONFIG);
			}
		}
		else{
			$table .= make_gen_warning("BAD QUERY;", $CONFIG);
		}
		$db->close();
	}
	catch (Exception $exception) {
		$msg		= "\n\t\t\t\tBAD QUERY AND PREPARE;<br/>";
		$msg		.= "\n\t\t\t\tDB: `".$dbpath."`<br/>";
		$msg		.= "\n\t\t\t\tQUERY: `".$query."`<br/>";
		$msg		.= "\n\t\t\t\tMSG: `".$exception."`<br/>";
		$table	.= make_gen_warning($msg, $CONFIG);
	}
	return $table;
}
function get_table_body($cart, $CONFIG){
	//TODO: IF adding modals, add a MCONFIG param instead of plugging into CONFIG
	$row_cnt		= 1;
	$ICONS		= get_config_icons($CONFIG);
	$QUERY_PAGE	= $PATHS['USER_VIEW_INVENTORY'];
	while ($row = $cart->fetchArray(SQLITE3_ASSOC)){
		$row_class = "";
		if ($row_cnt%2 === 1)
			$row_class .= "odd ";
		else
			$row_class .= "even ";
		if ($row_cnt === 1)
			$row_class .= "first ";
		$productid		= $row['productid'];
		$quantity		= $row['quantity'];
		$dHref			= $QUERY_PAGE."?";
		$dHref			.= "delete_id=".$productid;
		$dHref			.= "&is_deleting_product=TRUE";
		$trashcan_arr	= Array(
			'content'=> $ICONS['DELETE_TRASH'],
			'href'=>$dHref,
			'style'=>'color:black;',
			'title'=>$STRINGS['DELETE_ENTRY'],
		);
		$trashcan		= make_tag('a', $trashcan_arr, $CONFIG);
		$product_name	= get_product_name($productid, $CONFIG);;
		$price			= get_product_price($productid, $CONFIG);
		$cols 			= Array(
			 $trashcan . $product_name, 
			 $quantity, 
			 $price, 
			 ($price*$quantity),
		);
		$row_content = '';
		for($i=0; $i<count($cols); $i++){
			$col_arr	= Array(
				'content'=>$cols[$i],
			);
			$row_content .= make_tag('td', $col_arr, $CONFIG);
		}
		$row_arr = Array(
			'content'=>$row_content,
			'class'=>$row_class,
		);
		$row = make_tag('tr', $row_arr, $CONFIG);
		$tbody_content .= $row;
		$row_cnt += 1;
	}
	$tbody_arr	= Array(
		'content'=>$tbody_content,
	);
	$tbody	= make_tag('tbody', $tbody_arr, $CONFIG);
	return $tbody;
}
function get_table_footer($columns_items, $CONFIG){
	$footers_content	= '';
	for ($i=0; $i<count($columns_items); $i++){
		$th_arr = Array(
			'class'=>'',
			'content'=> $columns_items[$i],
		);
		$footers_content .= make_tag('th', $th_arr, $CONFIG);
	}
	$footer_row_arr	= Array(
		'content'=>$footers_content,
	);
	$footer_row	= make_tag('tr', $footer_row_arr, $CONFIG);
	$footer_arr	= Array(
		'content'=>$footer_row
	);
	$footer	= make_tag('tfoot', $footer_arr, $CONFIG);
	return $footer;
}
function get_table_from_owner_query($dbpath, $query, $CONFIG){
	//TODO: 	owner table to have delete and add items
	/* Return a dataTable table based off of query */
	$db			= new SQLite3($dbpath);
	$STRINGS		= get_config_strings($CONFIG);
	$ICONS		= get_config_icons($CONFIG);
	$CUR_TABLE	= parse_from($query);
	$table   	= "";
	$QUERY_PAGE	= $CONFIG['QUERY_PAGE'];
	$TABLE_ID	= $CONFIG['TABLE_ID'];		//TODO: MOVE TO A PARAM!
	$db->enableExceptions(true);
	try{
		$prepare = $db->prepare($query);
		if(!$CUR_TABLE)
			$CUR_TABLE = "users";
		if ($prepare){
			$result	= $prepare->execute();
			if($result && $result->fetchArray()){
				$result->reset();
				$row1			= $result->fetchArray(SQLITE3_ASSOC);
				$columns		= array_keys($row1);
				$result->reset();
				$theader			= get_table_header($columns, $CONFIG);
				$tfooter			= get_table_footer($columns, $CONFIG);
				$tbody_content	= '';;
				$table_content	= '';;

				$result->reset();
				$row_cnt	= 1;
				while ($row = $result->fetchArray(SQLITE3_ASSOC)){
					$row_class = '';
					if ($row_cnt%2 === 1)
						$row_class .= "odd ";
					else
						$row_class .= "even ";
					if ($row_cnt === 1)
						$row_class .= "first ";
					$row_keys = array_keys($row);
					$row_content = '';
					for($i=0; $i<count($row_keys); $i++){
						$row_key	= $row_keys[$i];
						$row_val	= $row[$row_key];
						if ($i === 0){
							$dHref		= $QUERY_PAGE."?delete_val=".$row_val;
							$dHref		.= "&delete_table=".$CUR_TABLE;
							$dHref		.= "&delete_key=".$row_key."&is_deleting=TRUE";
							$href_arr	= Array(
								'content'=> $ICONS['DELETE_TRASH'],
								'href'=>$dHref,
								'style'=>'color:black;',
								'title'=>$STRINGS['DELETE_ENTRY'],
							);
							$href = make_tag('a', $href_arr, $CONFIG);
							$cell_content	= $href;
							$cell_content	.= $row_val;
						}
						else
							$cell_content	= $row_val;
						$cell_arr = Array(
							'content'=>$cell_content,
						);
						$cell = make_tag('td', $cell_arr, $CONFIG);
						$row_content .= $cell;
					}//End for-loop
					$row_arr = Array(
						'content'=>$row_content,
						'class'=>$row_class,
					);
					$row	= make_tag('tr', $row_arr, $CONFIG);
					$tbody_content .= $row;
					$row_cnt	+= 1;
				}//End while loop
				$tbody_arr	= Array(
					'content'=>$tbody_content,
				);
				$tbody	= make_tag('tbody', $tbody_arr, $CONFIG);
				$table_content .= $theader;
				$table_content .= $tbody;
				$table_content .= $tfooter;
				$table_arr	= Array(
					'cellspacing'=>'',
					'class'=>'table table-striped table-bordered',
					'content'=>$theader . $tbody . $tfooter,
					'id'=>$TABLE_ID,
					'role'=>'grid',
					'width'=>'100%',
				);
				$table = make_tag("table", $table_arr, $CONFIG);;
			}
			else{
				$table .= make_gen_warning("NO RESULTS;", $CONFIG);
			}
		}
		else{
			$table .= make_gen_warning("BAD QUERY;", $CONFIG);
		}
		$db->close();
	}
	catch (Exception $exception) {
		$msg		= "\n\t\t\t\tBAD QUERY AND PREPARE;<br/>";
		$msg		.= "\n\t\t\t\tDB: `".$dbpath."`<br/>";
		$msg		.= "\n\t\t\t\tQUERY: `".$query."`<br/>";
		$msg		.= "\n\t\t\t\tMSG: `".$exception."`<br/>";
		$table	.= make_gen_warning($msg, $CONFIG);
	}
	return $table;
}

function get_table_header($columns_items, $CONFIG){
	$headers_content	= '';
	for ($i=0; $i<count($columns_items); $i++){
		$th_arr = Array(
			'class'=>'sorting',
			'content'=> $columns_items[$i],
		);
		$headers_content .= make_tag('th', $th_arr, $CONFIG);

		$th_arr['class']	= '';
	}
	$header_row_arr	= Array(
		'role'=>'row',
		'content'=>$headers_content,
	);
	$header_row	= make_tag('tr', $header_row_arr, $CONFIG);
	$header_arr	= Array(
		'content'=>$header_row
	);
	$header	= make_tag('thead', $header_arr, $CONFIG);
	return $header;
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
function make_comment_container($blog_id, $html_id, $CONFIG){
	$col_content	= "";
	if ($CONFIG['HAS_COMMENTS'] === TRUE){
		echo "\n<!-- INFO 629: BLOG ID: `".$blog_id."` -->";
		//Blog post or something where we are having feedback or conversation;
		if(is_logged_in($CONFIG)){
			// WYSIWIG for replying...
			$col_content	.= get_comment_box($blog_id, $html_id, $CONFIG);
		}
		else
			$col_content	.= "\n\t<p>Please login to leave a reply</p>";//TODO
		$col_content .= '<br/>'.make_comments($blog_id, $CONFIG);	// Already written comments
	}
	$col_arr	= Array(
		'class'=>"col-12 col-sm-8 col-md-9 col-lg-10 m-0 p-0 pb-5 fit-screen",
		'content'=>$col_content,
	);
	$col		= make_tag('div', $col_arr, $CONFIG);
	$row_arr	= Array(
				'class'=>" row pl-3 pr-3 m-0",
				'style'=>$style,
				'content'=>$col,
	);
	$row	= make_tag("div", $row_arr, $CONFIG) . "<!-- END ROW -->";
	$container_arr	= Array(
		'class'=>" container-fluid pl-3 pr-3 m-0",
		//'style'=>$style,
		'style'=>"",
		'content'=>$row,
	);
	$container	= make_tag('div', $container_arr, $CONFIG);
	return $container;
}
function make_comments($blog_id, $CONFIG){
	//Make the comment layer to the blogs;
	//Author, date, comment
	$html				= '';
	$comments		= get_comments($blog_id, $CONFIG);
	$comment_cards = '';
	$cnt				= 0;
	$ICONS			= get_config_icons($CONFIG);
	$PATHS			= get_paths($CONFIG['ROOT']);
	$CUR_TABLE		= 'comments';		//TODO: just pull table over from config
	$QUERY_PAGE		= $PATHS['GET_BLOGS'];		//TODO: check if this is right;
	if ($comments && $comments->fetchArray()){
		$comments->reset();
		while($comment	= $comments->fetchArray( SQLITE3_ASSOC)){
			//TODO: Authenticate if ADMIN or userid
			$blog_post		= get_blog_filepath($blog_id, $CONFIG);
			$dHref			= $QUERY_PAGE."?";
			$dHref			.= "blog_id=".$blog_id;
			$dHref			.= "&blog_post=".$blog_post;
			$dHref			.= "&delete_id=".$comment['id'];
			$dHref			.= "&is_deleting_comment=TRUE";
			$tashcan_arr	= Array(
				'content'=> $ICONS['DELETE_TRASH'],
				'href'=>$dHref,
				'style'=>'color:black;',
				'title'=>$STRINGS['DELETE_ENTRY'],
			);
			$trashcan				= make_tag('a', $tashcan_arr, $CONFIG);
			$date_posted			= "Posted: ".get_blog_date($comment['date_posted']);
			$comment_author_arr	= Array('content'=>$comment['author']);
			$date_posted_arr		= Array('content'=>$date_posted);
			$date_posted			= make_tag('small', $date_posted_arr, $CONFIG);
			$comment_author		= make_tag('small', $comment_author_arr, $CONFIG);
			$author_content		= $comment_author;
			if (is_admin($CONFIG) || is_users_comment($comment, $CONFIG))
				$author_content = $trashcan ."&nbsp;". $comment_author;
			$date_arr		= Array(
				'class'=> 'comment-date text-muted',
				'content'=> $date_posted,
			);
			$author_arr	= Array(
				'class'=> 'comment-author',
				'content'=> $author_content,
			);
			$text_arr	= Array(
				'class'=> 'comment-text',
				'content'=> $comment['content'],
			);
			$date				= make_tag('span', $date_arr, $CONFIG);
			$author			= make_tag('span', $author_arr, $CONFIG);
			$text				= make_tag('div', $text_arr, $CONFIG);
			$header_id		= "card-header-".$cnt;
			$collapse_id	= "collapse-".$cnt;
			$aria_expanded	= 'true';
			$aria_controls	= $collapse_id;
			$card_header_content	= $author . $date;
			if ($cnt !== 0)
				$aria_expanded	= 'false';
			$toggle_btn_arr	= Array(
				'class'=>'btn btn-link btn-block p-1 m-0',
				'type'=>'button',
				'data-toggle'=>'collapse',
				'data-target'=>'#'.$collapse_id,
				'content'=> $card_header_content,
				'aria-expanded'=>$aria_expanded,
				'aria-controls'=>$aria_controls,
			);
			$toggle_btn	= make_tag('button', $toggle_btn_arr, $CONFIG);
			$card_header_arr	= Array(
				'class'=>"card-header p-0 m-0",
				'id'=>$header_id,
				'content'=>make_tag(
					'h5', 
					Array('content'=>$toggle_btn, 'class'=>'p-0 m-0'), 
					$CONFIG
				),
			);
			$card_header	= make_tag('div', $card_header_arr, $CONFIG);
			$card_body_arr	= Array(
				'class'=>'card-body',
				'content'=>$text,
			);
			$card_body				= make_tag('div', $card_body_arr, $CONFIG);
			$card_collapse_arr	= Array(
				'id'=>$collapse_id,
				'class'=>'collapse show',
				'aria-labelledby'=>$header_id,
				'data-parent'=>$accordion_id,
				'content'=>$card_body,
				//'aria-expanded'=>$aria_expanded,
			);
			$card_collapse	= make_tag('div', $card_collapse_arr, $CONFIG);
			$comment_card_arr	= Array(
				'class'=>'card',
				'content'=>$card_header . $card_collapse,
			);
			$comment_cards .= make_tag('div', $comment_card_arr, $CONFIG);
			$cnt +=1;
		}//end while
	}
	else{
		$comment_cards .= "Be the first to comment!";
	}
	$accordion_arr	= Array(
		'class'=>'accordion',
		'id'=>$accordion_id,
		'content'=>$comment_cards,
	);
	$accordion	= "<hr class=\"thick-line\">";
	$accordion	.= make_tag('h3', Array('content'=>"Comments"), $CONFIG);	//TODO
	$accordion	.= make_tag('div', $accordion_arr, $CONFIG);
	return $accordion;
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
function make_lorem_ipsum($cnt=1){
	$LI			= new LoremIpsum();
	$ret			= '';
	$ipsum_arr	= Array(
		'content'=>'',
		'syle'=>'',
	);
	for($i=0; $i<$cnt; $i++){
		$content	= "";
		$ipsum_arr['content'] = tab() . $LI->paragraph();
		$ret	.= make_tag('p', $ipsum_arr, $CONFIG);
	}
	return $ret;
}
function make_blog_views($blog_id, $CONFIG){
	//Make a container for page-views on a page;
	$blog_views	= process_blog_views($blog_id, $CONFIG) . " total views";
	$col_blog_views_arr	= Array(
		'class'=>'pr-3 pl-3 m-0',
		'content'=>$blog_views,
	);
	$flex_blog_views_arr	= Array(
		'class'=>" d-flex pl-3 pr-3 m-0 justify-content-end",
		'content'=>make_tag('div', $col_blog_views_arr, $CONFIG),
	);
	$flex_blog_views	= make_tag('div', $flex_blog_views_arr, $CONFIG);
	$container_blog_views_arr	=  Array(
		'class'=>" container pl-3 pr-3 m-0",
		'content'=>$flex_blog_views,
	);
	$container_blog_views	= make_tag('div', $container_blog_views_arr, $CONFIG);
	return $container_blog_views;
}

function make_page_views($page_path, $CONFIG){
	//Make a container for page-views on a page;
	$page_views	= process_page_views($page_path, $CONFIG) . " total views";
	$col_page_views_arr	= Array(
		'class'=>'pr-3 pl-3 m-0',
		'content'=>$page_views,
	);
	$flex_page_views_arr	= Array(
		'class'=>" d-flex pl-3 pr-3 m-0 justify-content-end",
		'content'=>make_tag('div', $col_page_views_arr, $CONFIG),
	);
	$flex_page_views	= make_tag('div', $flex_page_views_arr, $CONFIG);
	$container_page_views_arr	=  Array(
		'class'=>" container pl-3 pr-3 m-0",
		'content'=>$flex_page_views,
	);
	$container_page_views	= make_tag('div', $container_page_views_arr, $CONFIG);
	return $container_page_views;
}
function make_recent_blogs($limit=5, $CONFIG=Null){
	//Return html rows of most recent blogs
	$blogs		= get_recent_blogs($limit, $CONFIG);
	$html			= "";
	$ul_content	= "";
	if ($blogs	=== [])
		echo "\n<!-- WARNING 789: `REQUEST WAS NULL` -->";
	else
		echo "\n<!-- INFO 788: `".count($blogs)."` -->";
	if ($blogs && $blogs->fetchArray()){
		$blogs->reset();
		$PATHS	= get_paths($CONFIG['ROOT']);
		while($blog	= $blogs->fetchArray( SQLITE3_ASSOC)){
			$href			= $PATHS['GET_BLOGS']."?blog_post=".$blog['filepath'];
			$href			.= "&blog_id=".$blog['id'];;
			$a_arr		= Array(
				'content'=> $blog['title'],
				'href'	=> $href,
			);
			$li_content	= make_tag('a', $a_arr, $CONFIG);
			$li	= make_tag('li', Array('content'=>$li_content), $CONFIG);
			echo "\n<!-- MEAT443: `".$li."` -->";
			$ul_content	.= $li;
		}//end i-for
		$ul_arr	= Array('content'=>$ul_content);
		$ul		= make_tag('ul', $ul_arr, $CONFIG);
		$html		.= $ul;
	}
	else
		$html	.= "\n<p>No blogs found...</p>";
	return $html;
}
function make_tag($tag, $arr, $CONFIG){
	$keys	= array_keys($arr);
	$ret	= "\n\t\t<".$tag." ";
	$skip_whitespace	= FALSE;
	if ($arr['ARGS'] && gettype($arr['ARGS'])===gettype(Array())){
		$args	= $arr['ARGS'];
		if($args['SKIP_WHITESPACE'] === TRUE)
			$skip_whitespace	= TRUE;
	}
	foreach($keys as $key){
		if ($key==='content')
			continue;
		$ret .= " ".$key."=\"" .$arr[$key]. "\"";
	}
	$ret .= ">";
	if($arr['content'] !== Null)
		$ret .= "\n\t\t\t" . $arr['content'];
	if($skip_whitespace === FALSE)
		$ret .= "\n\t\t";
	$ret .= "</".$tag.">";
	return $ret;
}
function tab(){
	//Return HTML tab; TODO: param for length of tab;
	return "&nbsp;&nbsp;&nbsp;&nbsp;";
}

?>

