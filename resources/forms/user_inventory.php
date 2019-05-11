<?php
function display_inventory_form($CONFIG=Null){
	//aka display_inventory_modal() ...
	if ($CONFIG === Null){
		$ROOT = ".";
		require_once($ROOT . '/config/paths.php');
		$PATHS	= get_paths($ROOT);
		require_once($PATHS['SETTINGS_PATH']);
		require_once($PATHS['LIBPATH_HTML']);
		require_once($PATHS['STRINGS_PHP']);
		$CONFIG	= get_config();
	}
	$ROOT = $CONFIG['ROOT'];
	if($PATHS === Null)
		$PATHS	= get_paths($ROOT);
	$STRINGS = get_config_strings($CONFIG);
	echo "\n<!-- USING FORM: ".$PATHS['FORMS_INVENTORY']." -->\n";

	$CONFIG['INPUT_DIV']			= "col-9 pr-3";
	$CONFIG['LABEL_DIV']			= "col-3 pl-3";
	$CONFIG['ROW_DIV']			= "form-group row justify-content-center pl-3 pr-3";
	$CONFIG['ROW_BUTTON_DIV']	= "form-group row pl-5";
	$html = "";

	$html .= $CONFIG['RESPONSE_CONTAINER'];
	$html .= "\n\t\t<form class=\"form-horizontal\" role=\"form\" action=\"".$CONFIG['ACTION_INVENTORY']."\" method=\"POST\">";
	$html .= "\n\t\t\t<fieldset>";
	$html .= "\n\t\t\t\t<div id=\"legend\">";
	$html .= "\n\t\t\t\t\t<legend class=\"\">Spend that cash</legend>";
	$html .= "\n\t\t\t\t</div>";

	$html .= "\n\t\t\t\t<div class=\"".$CONFIG['ROW_DIV']."\">";
	$html .= "<input class=\"form-control\" type=\"hidden\" name=\"productid\" id=\"productid\" value=\"DOES NOT EXIST\" readonly>";
	$html .= "\n\t\t\t\t</div><!-- END ROW -->";

	$html .= "\n\t\t\t\t<div class=\"".$CONFIG['ROW_DIV']."\">";
	$html .= "<input class=\"form-control text-center\" type=\"text\" name=\"product_name\" id=\"product_name\" value=\"".$CONFIG['PRODUCT_NAME']."\" readonly>";
	$html .= "<small class=\"form-check-label text-muted\" for=\"product_name\">";
	$html .= "Product Name";
	$html .= "</small>";
	$html .= "\n\t\t\t\t</div><!-- END ROW -->";

	$html .= "\n\t\t\t\t<div class=\"".$CONFIG['ROW_DIV']."\">";
	$html .= "\n\t\t\t\t\t<div class=\"input-group\">";
	$html .= "\n\t\t\t\t\t\t<div class=\"input-group-prepend\">";
	$html .= "<button type=\"button\" data-type=\"minus\" ";
	$html .=  "data-field=\"quantity\" class=\"btn btn-default btn-number\">";
	$html .= "-";
	$html .= "</button>";
	$html .= "\n\t\t\t\t\t\t</div><!-- END INPUT GROUP PREPEND -->";
	$html .= "<input type=\"text\" name=\"quantity\" class=\"form-control input-number text-center\" value=\"10\" min=\"1\" max=\"100\">";
	$html .= "\n\t\t\t\t\t\t<div class=\"input-group-append\">";
	$html .= "<button type=\"button\" data-type=\"plus\" ";
	$html .=  "data-field=\"quantity\" class=\"btn btn-default btn-number\">";
	$html .= "+";
	$html .= "</button>";
	$html .= "\n\t\t\t\t\t\t</div><!-- END INPUT GROUP APPPEND -->";
	$html .= "\n\t\t\t\t\t</div><!-- END INPUT GROUP -->";
	$html .= "<small class=\"form-check-label text-muted\" for=\"product_name\">";
	$html .= "Quantity";
	$html .= "</small>";
	$html .= "\n\t\t\t\t</div><!-- END ROW -->";

	$html .= "\n\t\t\t\t<div class=\"".$CONFIG['ROW_BUTTON_DIV']."\">";
	$html .= "\n\t\t\t\t\t<div class=\"col pr-4\">";
	$html .= "\n\t\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary\" name=\"form_submit\">Add to Cart</button>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t</div><!-- END ROW -->";

	$html .= "\n\t\t\t</fieldset>";
	$html .= "\n\t\t</form>";
	$html .= "\n\t</div><!-- END CONTAINER -->\n";
	return $html;
}

/***** Just for testing *****/
//echo display_admin_viewport_form() . "\n";
?>
