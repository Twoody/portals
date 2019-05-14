<?php
function display_admin_viewport_form($CONFIG=Null){
	if ($CONFIG === Null){
		$ROOT = ".";
		$CONFIG	= get_config($ROOT);
		require_once($ROOT . '/config/paths.php');
		$PATHS	= get_paths($ROOT);
		require_once($PATHS['SETTINGS_PATH']);
		require_once($PATHS['LIBPATH_HTML']);
		require_once($PATHS['STRINGS_PHP']);
	}
	$ROOT = $CONFIG['ROOT'];
	if($PATHS === Null)
		$PATHS	= get_paths($ROOT);
	$STRINGS = get_config_strings($CONFIG);
	echo "\n<!-- USING FORM: ".$PATHS['FORMS_ADMIN_VIEWPORT']." -->\n";

	//TODO: Pull out CONFIG elements for red asterisk items that need fixed;
	//TODO: Refill data if failed registration;
	$CONFIG['INPUT_DIV']			= "col-9 pr-3";
	$CONFIG['LABEL_DIV']			= "col-3 pl-3";
	$CONFIG['ROW_DIV']			= "form-group row justify-content-center pl-3 pr-3";
	$CONFIG['ROW_BUTTON_DIV']	= "form-group row pl-5";
	$html = "";

	$html .= $CONFIG['RESPONSE_CONTAINER'];
	$html .= "\n\t\t<form class=\"form-horizontal\" role=\"form\" action=\"".$CONFIG['ACTION_ADMIN_VIEWPORT']."\" method=\"POST\">";
	$html .= "\n\t\t\t<fieldset>";
	$html .= "\n\t\t\t\t<div id=\"legend\">";
	$html .= "\n\t\t\t\t\t<legend class=\"\">SQL Fun</legend>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t\t<div class=\"".$CONFIG['ROW_DIV']."\">";
	$html .= "\n\t\t\t\t\t<!-- Query -->";
	$html .= "\n\t\t\t\t\t<input type=\"text\" id=\"query\" name=\"query\" placeholder=\"Enter query here...\" class=\"form-control\">";
	$html .= "\n\t\t\t\t</div><!-- END ROW -->";

	$html .= "\n\t\t\t\t<div class=\"".$CONFIG['ROW_BUTTON_DIV']."\">";
	$html .= "\n\t\t\t\t\t<div class=\"col pr-4\">";
	$html .= "\n\t\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary\" name=\"form_submit\">Submit</button>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t</div><!-- END ROW -->";

	$html .= "\n\t\t\t</fieldset>";
	$html .= "\n\t\t</form>";
	$html .= "\n\t</div><!-- END CONTAINER -->\n";
	$CONFIG['BODY'] .= $html;
	return $CONFIG;
}

/***** Just for testing *****/
//echo display_admin_viewport_form() . "\n";
?>
