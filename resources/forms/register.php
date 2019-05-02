<?php
function display_registration_form($CONFIG=Null){
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
	echo "\n<!-- USING FORM: ".$PATHS['FORMS_USER_REGISTRATION']." -->\n";

	//TODO: Pull out CONFIG elements for red asterisk items that need fixed;
	//TODO: Refill data if failed registration;
	$CONFIG['INPUT_DIV']			= "col-9 pr-3";
	$CONFIG['LABEL_DIV']			= "col-3 pl-3";
	$CONFIG['ROW_DIV']			= "control-group row justify-content-center mb-3";
	$CONFIG['ROW_BUTTON_DIV']	= "control-group row mb-3 pl-5";
	$html = "";
	$html .= $CONFIG['REGISTER_RESPONSE_CONTAINER'];
	$html .= $CONFIG['REGISTER_RESPONSE_ROW'];
	$html .= "\n\t\t\t<div class=\"col-12 pl-0 pr-0 m-0\">";
	$html .= "\n\t\t\t\t<h1>Get Your Post-It's Ready</h1>";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</div><!-- END ROW -->";
	$html .= $CONFIG['REGISTER_RESPONSE_ROW'];

	$html .= "\n\t\t<form class=\"form-horizontal\" action=\"".$CONFIG['ACTION_REGISTER']."\" method=\"POST\">";
	$html .= "\n\t\t\t<fieldset>";
	$html .= "\n\t\t\t\t<div id=\"legend\">";
	$html .= "\n\t\t\t\t\t<legend class=\"\">Register</legend>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t\t<div class=\"".$CONFIG['ROW_DIV']."\">";
	$html .= "\n\t\t\t\t\t<!-- Username -->";
	$html .= "\n\t\t\t\t\t<div class=\"".$CONFIG['LABEL_DIV']."\">";
	$html .= "\n\t\t\t\t\t\t<label class=\"control-label\"\tfor=\"username\">Username</label>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t\t<div class=\"".$CONFIG['INPUT_DIV']."\">";
	$html .= "\n\t\t\t\t\t\t<div class=\"controls\">";
	$html .= "\n\t\t\t\t\t\t\t<input type=\"text\" id=\"username\" name=\"username\" placeholder=\"Username\" class=\"form-control\">";
	$html .= "\n\t\t\t\t\t\t\t<p class=\"help-block\">Username can contain any letters or numbers, without spaces</p>";
	$html .= "\n\t\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t\t<div class=\"".$CONFIG['ROW_DIV']."\">";
	$html .= "\n\t\t\t\t\t<!-- E-mail -->";
	$html .= "\n\t\t\t\t\t<div class=\"".$CONFIG['LABEL_DIV']."\">";
	$html .= "\n\t\t\t\t\t\t<label class=\"control-label\" for=\"email\">E-mail</label>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t\t<div class=\"".$CONFIG['INPUT_DIV']."\">";
	$html .= "\n\t\t\t\t\t\t<div class=\"controls\">";
	$html .= "\n\t\t\t\t\t\t\t<input type=\"text\" id=\"email\" name=\"email\" placeholder=\"Email\" class=\"form-control\">";
	$html .= "\n\t\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t ";
	$html .= "\n\t\t\t\t<div class=\"".$CONFIG['ROW_DIV']."\">";
	$html .= "\n\t\t\t\t\t<!-- Password-->";
	$html .= "\n\t\t\t\t\t<div class=\"".$CONFIG['LABEL_DIV']."\">";
	$html .= "\n\t\t\t\t\t\t<label class=\"control-label\" for=\"password\">Password</label>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t\t<div class=\"".$CONFIG['INPUT_DIV']."\">";
	$html .= "\n\t\t\t\t\t\t<div class=\"controls\">";
	$html .= "\n\t\t\t\t\t\t\t<input type=\"password\" id=\"password\" name=\"password\" placeholder=\"Password\" class=\"form-control\">";
	$html .= "\n\t\t\t\t\t\t\t". $STRINGS['USER_PW_REQS'];
	$html .= "\n\t\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t\t<div class=\"".$CONFIG['ROW_DIV']."\">";
	$html .= "\n\t\t\t\t\t<!-- Password -->";
	$html .= "\n\t\t\t\t\t<div class=\"".$CONFIG['LABEL_DIV']."\">";
	$html .= "\n\t\t\t\t\t\t<label class=\"control-label\"\tfor=\"password_confirm\">Password (Confirm)</label>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t\t<div class=\"".$CONFIG['INPUT_DIV']."\">";
	$html .= "\n\t\t\t\t\t\t<div class=\"controls\">";
	$html .= "\n\t\t\t\t\t\t\t<input type=\"password\" id=\"password_confirm\" name=\"password_confirm\" placeholder=\"Password\" class=\"form-control\">";
	$html .= "\n\t\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t</div>";

	$html .= "\n\t\t<div class=\"".$CONFIG['ROW_BUTTON_DIV']."\">";
	$html .= "\n\t\t\t<div class=\"form-group row justify-content-center\">";
	$html .= "\n\t\t\t\t<div class=\"col-sm-6 ml-4 mb-5\">";
	$html .= "\n\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary\" name=\"form_submit\">Register</button>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</div>";
	$html .= "\n\t\t</div><!-- END ROW -->";

	$html .= "\n\t\t\t</fieldset>";
	$html .= "\n\t\t</form>";
	$html .= "\n\t</div><!-- END CONTAINER -->\n";
	return $html;
}

/***** Just for testing *****/
//echo get_login_form() . "\n";
?>
