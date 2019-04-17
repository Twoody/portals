<?
require_once('./config/imports.php');
$PATHS = get_paths();
require_once($PATHS['FORMS_LOGIN']);
require_once($PATHS['LIBPATH_AUTH_USER']);
require_once($PATHS['LIBPATH_DB_HELPER']);

function html_login_or_signout($CONFIG=Null, $PATHS=Null){
	if ($PATHS === Null)
		$PATHS = get_paths();
	if ($CONFIG === Null)
		$CONFIG = get_config();
	$html 		= '';
	$dbpath		= $PATHS['DB_USERS'];
	$show_login	= true;
	if(!is_db($dbpath)){
		//TODO: Alert site is in maintenance;
		//			Make tables; Populate Users; Ask for user to refresh;
		echo clog('"No DB"');	//TODO: Error messages from .../strings/errors.json
	}
	else if(!has_table("users", $dbpath)){
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
	else if(isset($_POST['form_submit'])){
		//TODO: Authenticate user...
		$show_login			= FALSE;
		$email				= $_POST["inputEmail"];
		$user					= strstr($email, '@', true); //strip everything after `@`
		$pw					= $_POST["inputPassword"];
		$access				= $_POST["userLevel"];
		$is_valid_email	= is_valid_email($email);
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
			$db			= new SQLite3($dbpath);
			$salt			= get_salt($email);
			$user_hash	= get_hash($email);
			$is_validPW	= password_verify($pw.$salt, $user_hash);
			$has_access	= is_valid_access($email, $access);
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
	else{
		$html .= "<p>Welcome, ".$user.".</p>";
		$html .= "<p>You are logged in as a ".$access.".</p>";
		$html .= clog("\"USER: \" + JSON.stringify(" .$user. ")");
	}
	return $html;
}
?>
