<?
function get_login_form($CONFIG=Null, $PATHS=Null){
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
	echo "\n<!-- USING FORM: ".$PATHS['FORMS_LOGIN']." -->\n";

	$html = "";
	$html .= "\n<div class=\"container-fluid p-3\">";
	$html .= "\n\t<div class=\"row p-3\">";
	$html .= "\n\t\t<h1>Better dust off that Post-It</h1>";
	$html .= "\n\t</div>";
	$html .= "\n\t<form action=\"".$CONFIG['ACTION_LOGIN']."\" method=\"post\">";
	$html .= "\n\t\t<div class=\"form-group row justify-content-center\">";
	$html .= "\n\t\t\t<label for=\"inputEmail\"class=\"col-sm-2 col-form-label pl-5\">Email:</label>";
	$html .= "\n\t\t\t<div class=\"col-sm-8 pl-5\">";
	$html .= "\n\t\t\t\t<input type=\"email\" class=\"form-control\" name=\"inputEmail\" id=\"inputEmail\" placeholder=\"Email\">";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</div>";
	$html .= "\n\t\t<div class=\"form-group row justify-content-center\">";
	$html .= "\n\t\t\t<label for=\"inputPassword\" class=\"col-sm-2 col-form-label pl-5\">Password:</label>";
	$html .= "\n\t\t\t<div class=\"col-sm-8 pl-5\">";
	$html .= "\n\t\t\t\t<input type=\"password\" class=\"form-control\" name=\"inputPassword\" id=\"inputPassword\" placeholder=\"Password\">";
	$html .= "\n\t\t\t\t".$STRINGS['USER_PW_REQS']; //CONTAINS HTML
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</div>";
	$html .= "\n\t\t<fieldset class=\"form-group\">";
	$html .= "\n\t\t\t<div class=\"row justify-content-center\">";
	$html .= "\n\t\t\t\t<legend class=\"col-form-label col-sm-2 pt-0 pl-5\">User Level</legend>";
	$html .= "\n\t\t\t\t<div class=\"col-sm-8 pl-5\">";
	$html .= "\n\t\t\t\t\t<div class=\"form-check\">";
	$html .= "\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"userLevel\" id=\"userLevel\" value=\"isMember\" checked>";
	$html .= "\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"userLevel\">";
	$html .= "\n\t\t\t\t\t\t\tMember";
	$html .= "\n\t\t\t\t\t\t</label>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t\t<div class=\"form-check\">";
	$html .= "\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"userLevel\" id=\"userLevel2\" value=\"isOwner\">";
	$html .= "\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"userLevel2\">";
	$html .= "\n\t\t\t\t\t\t\tOwner";
	$html .= "\n\t\t\t\t\t\t</label>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t\t<div class=\"form-check disabled\">";
	//$html .= "\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"userLevel\" id=\"userLevel3\" value=\"isAdmin\" disabled>";
	$html .= "\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"userLevel\" id=\"userLevel3\" value=\"isAdmin\">";
	$html .= "\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"userLevel3\">";
	$html .= "\n\t\t\t\t\t\t\tAdministrator";
	$html .= "\n\t\t\t\t\t\t</label>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</fieldset>";

	$html .= "\n\t\t<div class=\"form-group row justify-content-center\">";
	$html .= "\n\t\t\t<div class=\"col-sm-2\"></div>";
	$html .= "\n\t\t\t<div class=\"col-sm-8 pl-5\">";
	$html .= "\n\t\t\t\t<div class=\"form-check\">";
	$html .= "\n\t\t\t\t\t<input class=\"form-check-input\" type=\"checkbox\" id=\"isRemembered\">";
	$html .= "\n\t\t\t\t\t<label class=\"form-check-label\" for=\"gridCheck1\">";
	$html .= "\n\t\t\t\t\t\tRemember Me";
	$html .= "\n\t\t\t\t\t</label>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</div>";

	$html .= "\n\t\t<div class=\"row justify-content-center\">";
	$html .= "\n\t\t\t<div class=\"form-group row justify-content-center\">";
	$html .= "\n\t\t\t\t<div class=\"col-sm-6 pl-4 mb-5\">";
	$html .= "\n\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary\" name=\"form_submit\">Sign in</button>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</div>";

	$html .= "\n\t\t<div class=\"row justify-content-center\">";
	$html .= "\n\t\t\t<div class=\"col-sm-2\"></div>";
	$html .= "\n\t\t\t<div class=\"col-sm-8 pl-5 mb-5\">";
	$html .= "\n\t\t\t\tNew User? <a href=\"".$PATHS["USER_REGISTER"]."\">Sign up here.</a>";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</div>";
	$html .= "\n\t</form>\n";
	$html .= "\n</div>";

	return $html;
}

/***** Just for testing *****/
//echo get_login_form() . "\n";
?>
