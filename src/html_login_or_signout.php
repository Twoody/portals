<?
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: github.com/twoody/phpTests/utils/html.php
   Date:    20190424

USAGE:
	Import, make call;
	Testing env below;

Purpose:
    Find whether to display login form or signout form;

******************************************************************************/
function html_login_or_signout($CONFIG=Null, $PATHS=Null){
	if($CONFIG === Null){
		$ROOT = ".";
		require_once($ROOT . '/config/paths.php');
		$PATHS	= get_paths($ROOT);
		require_once($PATHS['SETTINGS_PATH']);
		$CONFIG = get_configt($ROOT);
		require_once($PATHS['LIBPATH_HTML']);
	}
	$ROOT = $CONFIG['ROOT'];
	$CONFIG['ACTION_LOGIN']					= $PATHS["USER_LOGIN"];
	if($PATHS === Null)
		$PATHS	= get_paths($ROOT);
	require_once($PATHS['FORMS_LOGIN']);
	require_once($PATHS['LIBPATH_AUTH_USER']);
	require_once($PATHS['LIBPATH_DB_HELPER']);
	echo "\n<!-- RUNNING: ".$PATHS['HTML_LOGIN_OR_SIGNOUT']." -->\n";

	$html 		= '';
	$dbpath		= $PATHS['DB_USERS'];
	$show_login	= true;
	if(!is_db($dbpath, $CONFIG)){
		//TODO: Alert site is in maintenance;
		//			Make tables; Populate Users; Ask for user to refresh;
		echo clog('"No DB"');	//TODO: Error messages from .../strings/errors.json
	}
	else if(!has_table("users", $dbpath, $CONFIG)){
		//TODO: Alert site is in maintenance;
		//			Make tables; Populate Users; Ask for user to refresh;
		echo clog('"No tables"');	//TODO: Error messages from .../strings/errors.json
	}
	/*
	TODO:
	else if (!has_users()){
		//TODO: Alert site is in maintenance;
		//			Populate Users; Ask for user to refresh;
	}
	*/
	else if($_SESSION['loggedin'] && $_SESSION['loggedin'] === TRUE){
		$show_login = FALSE;
		$already_logged_in = TRUE;
	}
	else if(isset($_POST['form_submit'])){
		//TODO: Authenticate user...
		$show_login			= FALSE;
		$email				= sanitize_input( $_POST["inputEmail"] );
		$user					= strstr($email, '@', true); //strip everything after `@`
		$pw					= sanitize_input( $_POST["inputPassword"] );
		$access				= sanitize_input( $_POST["userLevel"] );
		$is_valid_email	= users_has_email($email, $CONFIG);
		if ($access === "isMember")
			$access = "member";
		else if ($access === "isOwner")
			$access = "owner";
		else if ($access === "isAdmin")
			$access = "admin";
		else{
			$access = "error";
			//TODO: Get error pulled from $ERRORS parsed obj of errors.json file;
			$html.= clog("ERROR 234234: BAD ACCESS LEVEL");
			$show_login = TRUE;
		}
		if ($access !== 'error' && $is_valid_email){
			$db				= new SQLite3($dbpath);
			$salt				= get_salt($email, $access, $CONFIG);
			$user_hash		= get_hash($email, $access, $CONFIG);
			$is_valid_pw	= password_verify($pw.$salt, $user_hash);
			$has_access		= is_valid_access($email, $access, $CONFIG);
			$db->close();														// CLOSING DB;
			if (!$has_access || !$is_valid_pw){
				if (!$is_valid_pw)
					echo alert("'Bad Password'");
				else if (!$has_access)
					echo alert('"Bad Access Level"');
				else
					echo alert('"Bad Login"');
				$show_login = TRUE;
			}
		}
		else{
			echo alert("\"Bad Email\"");
			$show_login = TRUE;
		}
	}
	if ($show_login){
		$html .= get_login_form($CONFIG);
	}
	else if($already_logged_in === TRUE){
		//TODO: Offer logout button;
		$html .= $CONFIG['GEN_CONTAINER'];
		$html .= $CONFIG['GEN_ROW'];
		$html .= "\n\t\t<div class=\"col-12 pl-4 pr-4 pb-0 pt-0\">";
		$html .= "\n\t\t\tWelcome, ".$_SESSION['username'].".";
		$html .= "\n\t\t</div>";
		$html .= "\n\t</div><!-- END ROW -->";
		$html .= $CONFIG['GEN_ROW'];
		$html .= "\n\t\t<div class=\"col-12 pl-4 pr-4 pb-0 pt-0\">";
		$html .= "You are ALREADY logged in.";
		$html .= "\n\t\t</div>";
		$html .= "\n\t</div><!-- END ROW -->";
		$html .= "\n</div><!-- END CONTAINER -->";
		$html .= clog("\"USER: \" + JSON.stringify(\"".$_SESSION['username']. "\")");
	}
	else{
		//Good Login
		$_SESSION['username']	= $user;
		$_SESSION['loggedin']	= TRUE;
		$_SESSION['alevel']		= $access;
		$_SESSION['email']		= $email;
		$_SESSION['userid']		= get_user_id($CONFIG);
		$html .= $CONFIG['GEN_CONTAINER'];
		$html .= $CONFIG['GEN_ROW'];
		$html .= "\n\t\t<div class=\"col-12 pl-4 pr-4 pb-0 pt-0\">";
		$html .= "Welcome, ".$_SESSION['username'].".";
		$html .= "\n\t\t</div>";
		$html .= "\n\t</div><!-- END ROW -->";
		$html .= $CONFIG['GEN_ROW'];
		$html .= "\n\t\t<div class=\"col-12 pl-4 pr-4 pb-0 pt-0\">";
		$html .= "You are logged in as a ".$_SESSION['alevel'].".";
		$html .= "\n\t\t</div>";
	}
	$CONFIG['BODY'] .= $html;
	return $CONFIG;
}

/****** FOR TESTING ******/
//$ROOT = '.';
//require_once($ROOT . '/config/paths.php');
//$PATHS	= get_paths($ROOT);
//require_once($PATHS['SETTINGS_PATH']);
//$CONFIG = get_config($ROOT);
//echo  html_login_or_signout($CONFIG);
?>
