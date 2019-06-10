<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink:
   Date:    2019-04-10

USAGE:
   In php, put at the head of function:
      require('/path/here/html.php');
	If registering: Take user $pw, add $salt, hash;
		Store $salt and $hash;
	If user,
		check db, verify $pw by adding salt and using a password verification;
		Check db if user exists;
		Check db if access level is correct;

Purpose:
    Authenticate that user exists and is logging in correctly;

TODO:
	1. Sesions...

******************************************************************************/


if (php_sapi_name() === "cli"){
	function __init_auth_user__($CONFIG=Null){
		if($CONFIG === Null){
			$ROOT = '.';
			require_once($ROOT . '/config/paths.php');
			$PATHS = get_paths($ROOT);
			require_once($PATHS['SETTINGS_PATH']);
			$CONFIG = get_config();
		}
		$ROOT = $CONFIG['ROOT'];
	}
	__init_auth_user__();
}
echo "\n<!-- " . $PATHS['LIBPATH_AUTH_USER'] . " imported -->\n";
function add_comment($comment, $blog_id, $CONFIG){
	if (!is_logged_in($CONFIG))
		return False;
	$comment	= sanitize_input($comment);
	$dbpath	= $CONFIG['DBPATH_RESOURCES'];
	$table	= $CONFIG['DBTABLE_COMMENTS'];
	$ret		= FALSE;
	$insert	= 'INSERT INTO '.$table. '(';
	$insert	.= "blog_id, author, content, date_posted, last_edited, ";
	$insert	.= "claps, rocks, edits, flags, is_deleted";
	$insert	.=") VALUES(";
	$insert	.= ":blog_id, :author, :content, :date_posted, :last_edited, ";
	$insert	.= ":claps, :rocks, :edits, :flags, :is_deleted";
	$insert	.= ")";
	$author	= get_user_fname($CONFIG);	//TODO: Href author to a user profile...
	$curdate	= get_todays_date();
	try{
		$db		= new SQLite3($dbpath);
		$prepare	= $db->prepare($insert);
		$prepare->bindValue(':blog_id'		, $blog_id);
		$prepare->bindValue(':author'			, $author );
		$prepare->bindValue(':content'		, $comment );
		$prepare->bindValue(':date_posted'	, $curdate );
		$prepare->bindValue(':last_edited'	, $curdate );
		$prepare->bindValue(':claps'			, 0 );
		$prepare->bindValue(':rocks'			, 0 );
		$prepare->bindValue(':edits'			, 0 );
		$prepare->bindValue(':flags'			, 0 );
		$prepare->bindValue(':is_deleted'	, FALSE);
		$result	= $prepare->execute();
		if($result)
			$ret = TRUE;
		$db->close();
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
	}
	return $ret;
}
function delete_comment($commentid, $CONFIG=Null){
	//TODO: Do not delete comment, but provide support for is_deleting and not showing comments that are deleted...
	$dbpath	= $CONFIG['DBPATH_RESOURCES'];
	$table	= $CONFIG['DBTABLE_COMMENTS'];
	$ret		= FALSE;
	$delete	= 'DELETE FROM '.$table. ' WHERE id = :commentid';
	try{
		$db		= new SQLite3($dbpath);
		$prepare	= $db->prepare($delete);
		$prepare->bindValue(':commentid', $commentid);
		$result	= $prepare->execute();
		if($result)
			$ret = TRUE;
		$db->close();
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
	}
	return $ret;
}


function get_access_token($CONFIG){
	//Return the current author or user logged in;
	if(isset($_SESSION['ACCESS_TOKEN']) && $_SESSION['ACCESS_TOKEN'] !== "")
		return $_SESSION['ACCESS_TOKEN'];
	return "";
}
function get_author($CONFIG){
	//Return the current author or user logged in;

}
function get_salt($email, $aLevel, $CONFIG=Null){
	/* Get preexisting salt from users db */
	/* Different from make_salt() */
	if($CONFIG === Null)
		$CONFIG = get_config();
	$dbpath	= $CONFIG['DBPATH_USERS'];
	$db = new SQLite3($dbpath);
	$salt_sql = $db->prepare("SELECT salt FROM users WHERE email = :email and accessLevel = :accessLevel");
	$salt_sql->bindValue(':email', $email);
	$salt_sql->bindValue(':accessLevel', $aLevel);
	$salt_res = $salt_sql->execute();
	$salt_row = $salt_res->fetchArray();
	$salt     = $salt_row["salt"];

	$db->close();
	return $salt;
}
function get_hash($email, $aLevel, $CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG = get_config();
	$dbpath		= $CONFIG['DBPATH_USERS'];
	$db			= new SQLite3($dbpath);
	$hash_sql	= $db->prepare("SELECT password FROM users WHERE email = :email and accessLevel = :accessLevel");
	$hash_sql->bindValue(':email', $email);
	$hash_sql->bindValue(':accessLevel', $aLevel);
	$hash_res = $hash_sql->execute();
	$hash_row = $hash_res->fetchArray();
	$hash     = $hash_row["password"];

	$db->close();
	return $hash;
}
function get_user_id($CONFIG){
	$dbpath	= $CONFIG['DBPATH_USERS'];
	$table	= $CONFIG['DBTABLE_USERS'];
	$sql		= "SELECT id FROM ".$table." WHERE token=:token;";
	$token	= get_access_token($CONFIG);
	$ret		= -1;
	try{
		$db		= new SQLite3($dbpath);
		$prepare = $db->prepare($sql);
		$prepare->bindValue(':token', $token);
		$result	= $prepare->execute();
		$row		= $result->fetchArray();
		if ($row && $row["id"] !== "")
			$ret = $row[0];
		else{	
			$msg	= "BAD QUERY OR CODE WHILE EXTRACTING USER ID";
			$msg .= " TOKEN:`".$token."`";
			update_errors_db($msg, $CONFIG, -1);
			$msg2	= "SQL: `".$sql."`";
			update_errors_db($msg2, $CONFIG, -1);
			
		}
		$db->close();

	}
	catch(Exception $exception){
		$msg	= "NO USER ID FOUND FOR TOKEN `".$token."`";
		update_errors_db($msg, $CONFIG);
		$ret = -1;
	}
	return $ret;
}
function get_user_fname($CONFIG){
	if (!is_logged_in($CONFIG))
		return "";
	$dbpath		= $CONFIG['DBPATH_USERS'];
	$table		= $CONFIG['DBTABLE_USERINFO'];
	$userid		= get_user_id($CONFIG);
	$sql			= "SELECT fname FROM ".$table." WHERE userid=:userid";
	$ret			= "";
	$userid		= "";
	try{
		$db	= new SQLite3($dbpath);
		$prepare = $db->prepare($sql);
		$prepare->bindValue(':userid', $userid);
		$result	= $prepare->execute();
		$row		= $result->fetchArray();
		$ret = $row[0];
		if (!$ret){
			$ret	= get_user_access_level($CONFIG);
		}
		$db->close();
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
		$ret = "";
	}
	return $ret;
}

function get_user_access_level($CONFIG){
	$dbpath	= $CONFIG['DBPATH_USERS'];
	$table	= $CONFIG['DBTABLE_USERS'];
	$sql		= "SELECT accessLevel FROM ".$table." WHERE token=:token;";
	$ret		= "";
	$token	= get_access_token($CONFIG);
	try{
		$db	= new SQLite3($dbpath);
		$prepare = $db->prepare($sql);
		$prepare->bindValue(':token', $token);
		$result	= $prepare->execute();
		$row		= $result->fetchArray();
		$ret = $row[0];
		$db->close();
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
		$ret = '';
	}
	return $ret;

}
function get_username($CONFIG){
	$dbpath	= $CONFIG['DBPATH_USERS'];
	$table	= $CONFIG['DBTABLE_USERS'];
	$sql		= "SELECT id FROM ".$table." WHERE token=:token;";
	$ret		= "";
	$token	= get_access_token($CONFIG);
	try{
		$db	= new SQLite3($dbpath);
		$prepare = $db->prepare($sql);
		$prepare->bindValue(':token', $token);
		$result	= $prepare->execute();
		$row		= $result->fetchArray();
		$ret = $row[0];
		$db->close();
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
		$ret = -1;
	}
	return $ret;
}
function is_admin($CONFIG=Null){
	$access_level	= get_user_access_level($CONFIG);
	if ($access_level === 'admin')
		return True;
	return False;
}
function is_owner($CONFIG=Null){
	$access_level	= get_user_access_level($CONFIG);
	if ($access_level === 'owner')
		return True;
	return False;
}
function is_member($CONFIG=Null){
	$access_level	= get_user_access_level($CONFIG);
	if ($access_level === 'member')
		return True;
	return False;
}
function is_logged_in($CONFIG=Null){
	if ($CONFIG === Null)
		$CONFIG = get_config();
	$token	= get_access_token($CONFIG);
	if($token !== ""){
		$dbpath	= $CONFIG['DBPATH_USERS'];
		$table	= $CONFIG['DBTABLE_USERS'];
		$query	= 'SELECT id FROM '.$table.' WHERE token=:token';
		$db		= new SQLite3($dbpath);
		$prepare	= $db->prepare($query);
		$prepare->bindValue(':token', $token);
		$result	= $prepare->execute();
		$row		= $result->fetchArray();
		if ($row && $row['token'] !== "")
			return TRUE;
	}
	return FALSE;
}
function is_users_comment($commentObj, $CONFIG){
	//TODO: Add authorid to comment table;
	$userid	= get_user_id($CONFIG);
	if($commentObj['authorid'] === $userid)
		return True;
	return False;
}
function is_valid_access($email, $access, $CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG = get_config();
	$dbpath		= $CONFIG['DBPATH_USERS'];
	$db			= new SQLite3($dbpath);
	$sql			= 'SELECT * FROM users WHERE  email = :email and accessLevel = :access';
	$statement	= $db->prepare($sql);
	$statement->bindValue(':email', 			$email);
	$statement->bindValue(':access', 		$access);
	$result = $statement->execute();
	$foo = $result->fetchArray();

	$db->close();
	if ($foo === false)
		$ret = false;
	else
		$ret = true;
	return $ret;
}
function is_valid_email($email, $CONFIG=Null){
	/*
	*SEE:
	*	https://www.w3schools.com/php/filter_validate_email.asp
	*/
	//Remove all illegal characters from email
	$email = filter_var($email, FILTER_SANITIZE_EMAIL);
	
	//Validate e-mail
	if (filter_var($email, FILTER_VALIDATE_EMAIL)) 
		return TRUE;
	else
		return FALSE;
}
function is_valid_handle($handle, $CONFIG=Null){
	//TODO: Change this into a parse check on handle;
	//			Dis-allow certain items like swear words;
	if (!$handle)
		return FALSE;
	return TRUE;
}
function is_valid_password($pw, $CONFIG){
	if (!$pw)
		return FALSE;
	return TRUE;
}
function make_salt($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG = get_config();
	$charset       = $CONFIG['SALT_CHARSET'];
	$randStringLen = $CONFIG['SALT_LENGTH'];
	$randString    = "";
	for ($i = 0; $i < $randStringLen; $i++) {
		$randString .= $charset[mt_rand(0, strlen($charset) - 1)];
	}
	return $randString;
}
function users_has_email($email, $CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG = get_config();
	$dbpath		= $CONFIG['DBPATH_USERS'];
	$db 			= new SQLite3($dbpath);
	$statement	= $db->prepare('SELECT * FROM users WHERE  email = :email');
	$statement->bindValue(':email',$email);
	$result = $statement->execute();
	$foo = $result->fetchArray();
	if ($foo === FALSE)
		$ret = FALSE;
	else
		$ret = TRUE;
	$db->close();
	return $ret;
}
function update_users_token($access_token, $userid, $CONFIG){
	$dbpath			= $CONFIG['DBPATH_USERS'];
	$table			= $CONFIG['DBTABLE_USERS'];
	$db				= new SQLite3($dbpath);
	$update			= "UPDATE " . $table . " SET token=:token WHERE id=:userid";
	$prepare 		= $db->prepare($update);
	$prepare->bindValue(':token', $access_token);
	$prepare->bindValue(':userid', $userid);
	$result	= $prepare->execute();
}
function users_has_handle($handle, $CONFIG=Null){
	//"Does username exist in db already";
	if (!$handle || $handle === "")
		return FALSE;
	if($CONFIG === Null)
		$CONFIG = get_config();
	$dbpath		= $CONFIG['DBPATH_USERS'];
	$db			= new SQLite3($dbpath);
	$sql			= 'SELECT * FROM users WHERE  handle = :handle';
	$statement	= $db->prepare($sql);
	$statement->bindValue(':handle', $handle);
	$result = $statement->execute();
	$foo = $result->fetchArray();

	$db->close();
	if ($foo === false)
		$ret = false;
	else
		$ret = true;
	return $ret;
}
?>
