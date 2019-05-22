<?php
session_start();
?>
<!doctype html>
<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: 
   Date:    2019-04-22

USAGE:
	First Check for compilation errors:
		php index.php
	Second, host:
		With PHP:
			clear & php -S localhost:8000 templates/login.php
		With APACHE:
			sudo apachectl start

Purpose:
    Logout information;

Links:
******************************************************************************/

$ROOT = "../../..";
require_once($ROOT.'/config/imports.php');
make_imports($ROOT);
$PATHS	= get_paths($ROOT);
$CONFIG	= get_config($ROOT);
$STRINGS	= get_config_strings($CONFIG);
$home		= $PATHS['NAV_HOME'];
$singin	= $PATHS['NAV_'];
require_once($PATHS['TEMPLATES_B']);

$body   = "";
	
/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE']				= $STRINGS["LOGOUT"];
$CONFIG['DISPLAY_HEADER']	= FALSE;

echo '<!-- RUNNING '.$PATHS['USER_LOGOUT'].' -->';

if (is_logged_in($CONFIG)){
	$_SESSIONS['username']		= Null;
	$_SESSIONS['loggedin']		= Null;
	$_SESSIONS['alevel']			= Null;
	$_SESSIONS['email']			= Null;
	$CONFIG['IS_LOGGING_OUT']	= TRUE;
	session_destroy();

	$col0			= make_gen_col($STRINGS['LOGOUT_SUCCESS'], $CONFIG);
	$row0			= make_gen_row($col0, $CONFIG);
	$button_arr	= Array(
		'class'=>'btn btn-primary btn-block btn-lg',
		'content'=>$STRINGS['RET_HOME'],
		'href'=>$home,
		'role'=>'button',
	);
	$button		= make_tag('a', $button_arr, $CONFIG);
	$col1			= make_gen_col($button, $CONFIG);
	$row1			= make_gen_row($col1, $CONFIG);
	$container0	= make_gen_container($row0.$row1, $CONFIG);
	$body .= $container0;
}
else{
	//user not logged in
	$col0			= make_gen_warning($STRINGS['LOGOUT_WARNING'], $CONFIG);
	$col1			= make_gen_col(get_nav_text($CONFIG, $STRINGS), $CONFIG);
	$row0			= make_gen_row($col0.$col1, $CONFIG);
	$container0	= make_gen_container($row0, $CONFIG);
	$body .= $container0;
}

$CONFIG['BODY'] .= $body;
echo template_b($CONFIG, $PATHS) . "\n";
?>
