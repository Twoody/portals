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

TODO:
	Maybe show a maintenance screen if tables and dbs are missing;
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
	$STRINGS	= get_config_strings($CONFIG);
	$CONFIG['ACTION_LOGIN']	= $PATHS["USER_LOGIN"];
	if($PATHS === Null)
		$PATHS	= get_paths($ROOT);
	require_once($PATHS['FORMS_LOGIN']);
	require_once($PATHS['LIBPATH_AUTH_USER']);
	require_once($PATHS['LIBPATH_DB_HELPER']);
	echo "\n<!-- RUNNING: ".$PATHS['HTML_LOGIN_OR_SIGNOUT']." -->\n";

	$html 					= '';
	$dbpath					= $PATHS['DB_USERS'];
	$show_login				= true;
	$already_logged_in	= is_logged_in($CONFIG);
	if($already_logged_in === TRUE){
		$show_login = FALSE;
	}
	else if(isset($_POST['form_submit'])){
		$show_login			= FALSE;
		$email				= sanitize_input( $_POST["inputEmail"] );
		$user					= strstr($email, '@', true); //strip everything after `@`
		$pw					= sanitize_input( $_POST["inputPassword"] );
		$access				= sanitize_input( $_POST["userLevel"] );
		$is_valid_email	= users_has_email($email, $CONFIG);	//If email already exists in table;
		if ($access === "isMember")
			$access = "member";
		else if ($access === "isOwner")
			$access = "owner";
		else if ($access === "isAdmin")
			$access = "admin";
		else{
			$access = "error";
			//WARNING: This has not been tested yet;
			update_errors_db('unknown access level', $CONFIG);
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
				if (!$has_access)
					echo alert('"Bad Access Level"');
				else if (!$is_valid_pw)
					echo alert("'Bad Password'");
				else
					echo alert('"Bad Login"');
				$show_login = TRUE;
			}
			else{
				//set user id
				$userdb_path	= $CONFIG['DBPATH_USERS'];
				$userid_sql		= 'SELECT id FROM ' . $CONFIG['DBTABLE_USERS'];
				$userid_sql		.= " WHERE email=:email";
				$userdb			= new SQLite3($userdb_path);
				$prepare			= $userdb->prepare($userid_sql);
				$prepare->bindValue(':email', $email);
				$rows		= $prepare->execute();
				$row		= $rows->fetchArray(SQLITE3_ASSOC);
				$userid	= $row['id'];
				$userdb->close();
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
		$username		= get_username($CONFIG);
		$logout_button	= get_href_logout_button($CONFIG, $STRINGS);
		$col0_arr	= Array(
			'class'=>"col-12 pl-4 pr-4 pb-0 pt-0",
			'content'=>$STRINGS['NAV_WELCOME'],
		);
		$col1_arr	= Array(
			'class'=>"col-12 pl-4 pr-4 pb-0 pt-0",
			'content'=>$STRINGS['ALREADY_LOGGED_IN'],
		);
		$col2_arr	= Array(
			'class'=>"col-12 pl-4 pr-4 pb-0 pt-0 mt-4",
			'content'=>$logout_button,
		);
		$col0					= make_tag('div', $col0_arr, $CONFIG);
		$col1					= make_tag('div', $col1_arr, $CONFIG);
		$col2					= make_tag('div', $col2_arr, $CONFIG);
		$row0_arr			= Array(
			'class'=>"row pl-3 pr-3 m-0",
			'content'=> $col0 . $col1 . $col2,
		);
		$row0					= make_tag('div', $row0_arr, $CONFIG);
		$container0_arr	= Array(
			'class'=>"container-fluid pr-3 pl-3 m-0",
			'content'=> $row0,
		);
		$container0			= make_tag('div', $container0_arr, $CONFIG);
		$html .= $container0;
	}
	else{
		//Good Login
		$access_token					= make_salt($CONFIG);
		$_SESSION['ACCESS_TOKEN']	= $access_token;
		$suc			= update_users_token( $access_token, $userid, $CONFIG);
		$username	= get_username($CONFIG);
		$STRINGS		= get_config_strings($CONFIG); //Strings use SESSIONS
		$html .= $CONFIG['GEN_CONTAINER'];
		$html .= $CONFIG['GEN_ROW'];
		$html .= "\n\t\t<div class=\"col-12 pl-4 pr-4 pb-0 pt-0\">";
		$html .= $STRINGS['NAV_WELCOME'];
		$html .= "\n\t\t</div>";
		$html .= "\n\t</div><!-- END ROW -->";
		$html .= $CONFIG['GEN_ROW'];
		$html .= "\n\t\t<div class=\"col-12 pl-4 pr-4 pb-0 pt-0\">";
		$html .= $STRINGS['USER_ACCESS_LEVEL'];
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
