<?
//TODO:
//	If user is logged in, do not display screen;
//TODO: Configure to run standalone and in production;
//$ROOT = '.';
//require_once('./config/paths.php');
//$PATHS = get_paths($ROOT);
//require_once($PATHS['SETTINGS_PATH']);
//$CONFIG = get_config($ROOT);
////require_once($PATHS['FORMS_USER_REGISTRATION']);
//require_once($PATHS['LIBPATH_AUTH_USER']);
//require_once($PATHS['LIBPATH_DB_HELPER']);

echo "\n<!-- ".$PATHS['HTML_REGISTER_USER']." imported -->\n";

function html_register_user($CONFIG=Null, $PATHS=Null){
	$html = "";
	$html .= "\n\t\t<!------ Include the above in your HEAD tag ---------->";
	$html .= "\n\t\t<form class=\"form-horizontal\" action='' method=\"POST\">";
	$html .= "\n\t\t\t<fieldset>";
	$html .= "\n\t\t\t\t<div id=\"legend\">";
	$html .= "\n\t\t\t\t\t<legend class=\"\">Register</legend>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t\t<div class=\"control-group\">";
	$html .= "\n\t\t\t\t\t<!-- Username -->";
	$html .= "\n\t\t\t\t\t<label class=\"control-label\"\tfor=\"username\">Username</label>";
	$html .= "\n\t\t\t\t\t<div class=\"controls\">";
	$html .= "\n\t\t\t\t\t\t<input type=\"text\" id=\"username\" name=\"username\" placeholder=\"\" class=\"input-xlarge\">";
	$html .= "\n\t\t\t\t\t\t<p class=\"help-block\">Username can contain any letters or numbers, without spaces</p>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t\t<div class=\"control-group\">";
	$html .= "\n\t\t\t\t\t<!-- E-mail -->";
	$html .= "\n\t\t\t\t\t<label class=\"control-label\" for=\"email\">E-mail</label>";
	$html .= "\n\t\t\t\t\t<div class=\"controls\">";
	$html .= "\n\t\t\t\t\t\t<input type=\"text\" id=\"email\" name=\"email\" placeholder=\"\" class=\"input-xlarge\">";
	$html .= "\n\t\t\t\t\t\t<p class=\"help-block\">Please provide your E-mail</p>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t ";
	$html .= "\n\t\t\t\t<div class=\"control-group\">";
	$html .= "\n\t\t\t\t\t<!-- Password-->";
	$html .= "\n\t\t\t\t\t<label class=\"control-label\" for=\"password\">Password</label>";
	$html .= "\n\t\t\t\t\t<div class=\"controls\">";
	$html .= "\n\t\t\t\t\t\t<input type=\"password\" id=\"password\" name=\"password\" placeholder=\"\" class=\"input-xlarge\">";
	$html .= "\n\t\t\t\t\t\t<p class=\"help-block\">Password should be at least 4 characters</p>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t\t<div class=\"control-group\">";
	$html .= "\n\t\t\t\t\t<!-- Password -->";
	$html .= "\n\t\t\t\t\t<label class=\"control-label\"\tfor=\"password_confirm\">Password (Confirm)</label>";
	$html .= "\n\t\t\t\t\t<div class=\"controls\">";
	$html .= "\n\t\t\t\t\t\t<input type=\"password\" id=\"password_confirm\" name=\"password_confirm\" placeholder=\"\" class=\"input-xlarge\">";
	$html .= "\n\t\t\t\t\t\t<p class=\"help-block\">Please confirm password</p>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t\t<div class=\"control-group\">";
	$html .= "\n\t\t\t\t\t<!-- Button -->";
	$html .= "\n\t\t\t\t\t<div class=\"controls\">";
	$html .= "\n\t\t\t\t\t\t<button class=\"btn btn-success\">Register</button>";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t</fieldset>";
	$html .= "\n\t\t</form>";
	return  $html;
}

//$html .= get_registration_form($CONFIG);
?>
