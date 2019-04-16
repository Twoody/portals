<?
require_once('./config/paths.php');
$PATHS = get_paths();
require_once($PATHS['SETTINGS_PATH']);
require_once($PATHS['LIBPATH_HTML']);

echo "\n<!-- ".$PATHS['FORMS_LOGIN']." -->\n";
function get_login_form($CONFIG=Null, $PATHS=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	if($PATHS === Null)
		$PATHS	= get_paths();
	$html  = "\n\t<form action=\"".$PATHS['TEMPLATES_LOGIN']."\" method=\"post\">";
	$html .= "\n\t\t<div class=\"form-group row justify-content-center\">";
	$html .= "\n\t\t\t<label for=\"inputEmail\"class=\"col-sm-2 col-form-label ml-5\">Email:</label>";
	$html .= "\n\t\t\t<div class=\"col-sm-4 ml-5\">";
	$html .= "\n\t\t\t\t<input type=\"email\" class=\"form-control\" name=\"inputEmail\" id=\"inputEmail\" placeholder=\"Email\">";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</div>";
	$html .= "\n\t\t<div class=\"form-group row justify-content-center\">";
	$html .= "\n\t\t\t<label for=\"inputPassword\" class=\"col-sm-2 col-form-label ml-5\">Password:</label>";
	$html .= "\n\t\t\t<div class=\"col-sm-4 ml-5\">";
	$html .= "\n\t\t\t\t<input type=\"password\" class=\"form-control\" name=\"inputPassword\" id=\"inputPassword\" placeholder=\"Password\">";
	$html .= "\n\t\t\t\t<small id=\"passwordHelpBlock\" class=\"form-text text-muted\">";
	$html .= "\n\t\t\t\t\tYour password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.";
	$html .= "\n\t\t\t\t</small>";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</div>";
	$html .= "\n\t\t<fieldset class=\"form-group\">";
	$html .= "\n\t\t\t<div class=\"row justify-content-center\">";
	$html .= "\n\t\t\t\t<legend class=\"col-form-label col-sm-2 pt-0 ml-5\">User Level</legend>";
	$html .= "\n\t\t\t\t<div class=\"col-sm-4 ml-5\">";
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
	$html .= "\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"userLevel\" id=\"userLevel3\" value=\"isAdmin\" disabled>";
	$html .= "\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"userLevel3\">";
	$html .= "\n\t\t\t\t\t\t\tAdministrator";
	$html .= "\n\t\t\t\t\t\t</label>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</fieldset>";
	$html .= "\n\t\t<div class=\"form-group row justify-content-center\">";
	$html .= "\n\t\t\t<div class=\"col-sm-2\"></div>";
	$html .= "\n\t\t\t\t<div class=\"col-sm-4 ml-5\">";
	$html .= "\n\t\t\t\t\t<div class=\"form-check\">";
	$html .= "\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"checkbox\" id=\"isRemembered\">";
	$html .= "\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"gridCheck1\">";
	$html .= "\n\t\t\t\t\t\t\tRemember Me";
	$html .= "\n\t\t\t\t\t\t</label>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t\t<div class=\"form-group row justify-content-center\">";
	$html .= "\n\t\t\t\t<div class=\"col-sm-6 ml-4\">";
	$html .= "\n\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary\" name=\"form_submit\">Sign in</button>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t</form>\n";
	return $html;
}

/***** Just for testing *****/
//echo get_login_form() . "\n";
?>
