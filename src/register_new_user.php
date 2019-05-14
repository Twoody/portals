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
		$CONFIG = get_config($ROOT);
		require_once($PATHS['LIBPATH_HTML']);
	}
	require_once($PATHS['FORMS_USER_REGISTRATION']);
	require_once($PATHS['USER_REGISTER_DOES_EXIST']);
	require_once($PATHS['USER_REGISTER_SUCCESS']);

	$ROOT = $CONFIG['ROOT'];
	$CONFIG['ACTION_REGISTER']					= $PATHS["USER_REGISTER"];	
	if($PATHS === Null)
		$PATHS	= get_paths($ROOT);
	echo "\n<!-- ".$PATHS['HTML_REGISTER_USER']." imported -->\n";

	require_once($PATHS['FORMS_USER_REGISTRATION']);
	require_once($PATHS['LIBPATH_AUTH_USER']);
	require_once($PATHS['LIBPATH_DB_HELPER']);
	$display_registration_form		= TRUE;
	$display_already_registered	= FALSE;
	$display_success_screen			= FALSE;
	$dbpath	= $PATHS['DB_USERS'];

	if($_SESSION['loggedin'] && $_SESSION['loggedin'] === TRUE)
		$display_registration_form = FALSE;
	else if(isset($_POST['form_submit'])){
		//Process form with userinfo table
		$email				= $_POST["email"];
		$handle				= $_POST["username"];
		$pw					= $_POST["password"];
		$pw_confirmation	= $_POST["password_confirm"];
		$is_valid_email	= is_valid_email($email, $CONFIG);
		$is_valid_pw		= is_valid_password($pw, $CONFIG);
		$is_valid_handle	= is_valid_handle($handle, $CONFIG);
		$is_good_register = TRUE;
		if(users_has_email($email, $CONFIG)){
			$CONFIG['BODY'] .=  alert('"Email already registered;"');
			$display_registration_form		= FALSE;
			$display_already_registered	= TRUE;
			$is_good_register					= FALSE;
		}
		else if(users_has_handle($handle, $CONFIG)){
			$CONFIG['BODY'] .= alert('"Username already registered;"');
			$CONFIG['REGISTRATION_BAD_HANDLE']	= TRUE;
			$display_registration_form				= TRUE;
			$is_good_register							= FALSE;
		}
		else if (!$is_valid_email){
			$CONFIG['BODY'] .=  alert('"Email does not meet requirements."');
			$CONFIG['REGISTRATION_BAD_EMAIL']	= TRUE;
			$display_registration_form				= TRUE;
			$is_good_register							= FALSE;
		}
		else if (!$is_valid_handle){
			$CONFIG['BODY'] .= alert('"Username does not meet requirements."');
			$CONFIG['REGISTRATION_BAD_HANDLE']	= TRUE;
			$display_registration_form				= TRUE;
			$is_good_register							= FALSE;
		}
		else if (!$is_valid_pw){
			$CONFIG['BODY'] .= alert("'Bad Password'");
			$CONFIG['REGISTRATION_BAD_PASSWORD']	= TRUE;
			$display_registration_form					= TRUE;
			$is_good_register								= FALSE;
		}
		else if($pw !== $pw_confirmation){
			$CONFIG['BODY'] .= alert("'Passwords do not match.'");
			$CONFIG['REGISTRATION_BAD_PASSWORD']	= TRUE;
			$display_registration_form					= TRUE;
			$is_good_register								= FALSE;
		}
		if($is_good_register){
			//Show success screen;
			$display_registration_form	= FALSE;
			$display_success_screen		= TRUE;

			//Update DB with new user information;
			$db	= new SQLite3($dbpath);
			$salt	= make_salt($CONFIG);
			$hash = password_hash($pw.$salt, PASSWORD_DEFAULT);
			$sql 	= "INSERT INTO users(email, accessLevel, salt, password, handle) ";
			$sql	.= "VALUES (:email, :aLevel, :salt, :hash, :handle);";
			//$db->exec('BEGIN;');
			$prepare	= $db->prepare($sql);
			$prepare->bindValue(':email',		$email);
			$prepare->bindValue(':aLevel',	"member");
			$prepare->bindValue(':salt',		$salt);
			$prepare->bindValue(':hash',		$hash);
			$prepare->bindValue(':handle',	$handle);
			$result = $prepare->execute();
			//$db->exec('COMMIT;');
			$db->close();

			//Log user in;
			$user = strstr($email, '@', true); //strip everything after `@`
			$_SESSION['username']	= $user;
			$_SESSION['loggedin']	= TRUE;
			$_SESSION['alevel']		= "member";
			$_SESSION['email']		= $email;
			$_SESSION['userid']		= get_user_id($email, $CONFIG);
		}
	}
	if($display_registration_form){
		$CONFIG = display_registration_form($CONFIG);
	}
	else if($display_success_screen){
		$CONFIG = display_registration_success($CONFIG);
	}
	else if($display_already_registered){
		$CONFIG = display_already_registered($CONFIG);
	}
	return  $CONFIG;
}

//$html .= get_registration_form($CONFIG);
?>
