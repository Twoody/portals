<?
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: github.com/twoody/portals/
   Date:    20190428

USAGE:
	Import, make call;
	Testing env below;

Purpose:
    Find whether to display registration;
	 Process user registration request;

******************************************************************************/

function html_register_user($CONFIG=Null, $PATHS=Null){
	if($CONFIG === Null){
		$ROOT = ".";
		require_once($ROOT . '/config/paths.php');
		$PATHS	= get_paths($ROOT);
		require_once($PATHS['SETTINGS_PATH']);
		$CONFIG = get_configt($ROOT);
		require_once($PATHS['LIBPATH_HTML']);
	}
	$ROOT = $CONFIG['ROOT'];
	$CONFIG['ACTION_REGISTER'] = $PATHS["USER_REGISTER"];
	if($PATHS === Null)
		$PATHS	= get_paths($ROOT);
	echo "\n<!-- ".$PATHS['HTML_REGISTER_USER']." imported -->\n";

	require_once($PATHS['FORMS_USER_REGISTRATION']);
	require_once($PATHS['LIBPATH_AUTH_USER']);
	require_once($PATHS['LIBPATH_DB_HELPER']);
	//TODO: If user is logged in, do not display screen;
	$display_registration_form = TRUE;
	$html 	= '';
	$dbpath	= $PATHS['DB_USERS'];

	if($display_registration_form){
		$html = get_registration_form($CONFIG);
	}
	return  $html;
}

//$html .= get_registration_form($CONFIG);
?>
