<?
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink:
   Date:    2019-04-10

USAGE:
	Import via:
		require_once($PATHS['LIBPATH_DB_HELPER']);
Purpose:
    Simplify some of the db processing;

TODO:
	1. ...

******************************************************************************/
//if (php_sapi_name() === "cli"){
//		if($CONFIG === Null){
//			$ROOT = '.';
//			require_once('./config/paths.php');
//			$PATHS = get_paths($ROOT);
//			require_once($PATHS['SETTINGS_PATH']);
//			$CONFIG = get_config($ROOT);
//		}
//		$ROOT = $CONFIG['ROOT'];
//}
//$PATHS = get_paths($ROOT);
require_once($PATHS['LIBPATH_HTML']);
require_once($PATHS['LIBPATH_FA']);
echo "\n<!-- " . $PATHS['LIBPATH_DB_HELPER'] . " imported -->\n";

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
	$author	= get_user_id($CONFIG);	//TODO: Href author to a user profile...
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
function delete_row($table, $where, $CONFIG=Null){
	if ($CONFIG===Null){
		$ROOT = '.';
		$CONFIG = get_config($ROOT);
		$dbpath = $CONFIG['DBPATH_USERS'];
	}
	$dbpath = $CONFIG['CUR_DB'];
	$db	= new SQLIte3($dbpath);
	$sql	= "DELETE FROM ".$table. " WHERE 1=1 AND ".$where;
	$db->exec($sql);
	$db->close();
}
function get_author($CONFIG){
	//Return the current author or user logged in;

}
function get_blog_filepath($blog_id, $CONFIG){
	//Return the blog filepath based of the blog id;
	$dbpath	= $CONFIG['DBPATH_RESOURCES'];
	$sql		= "SELECT filepath FROM blogs WHERE id = :blogid";
	$result	= Array();
	$blogpath	= '';
	try{
		$db		= new SQLite3($dbpath);
		$prepare	= $db->prepare($sql);
		$prepare->bindValue(':blogid', $blog_id);
		$result	= $prepare->execute();
		if ($result && $result->fetchArray(SQLITE3_ASSOC)){
			$result->reset();
			$row = $result->fetchArray(SQLITE3_ASSOC);
			$blogpath	= $row['filepath'];
		}
		else{
			echo "\n<!-- MEAT 423: NO BLOG -->\n";
			echo "\n<!-- MEAT 424: BLOG ID: ".$blog_id." -->\n";
		}
		$db->close();
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
	}
	return $blogpath;

}
function get_inventory_tables(){
	$TABLES = Array(
		'inventory'=>Array(
			'id'				=>'INTEGER PRIMARY KEY',
			'name'			=>'TEXT',
			'quantity'		=>'INTEGER',
			'price'			=>'TEXT',
			'imageid'		=>'TEXT',
			'categories'	=>'TEXT'
		),
		'carts'=>Array(
			'id'				=>'INTEGER PRIMARY KEY',
			'userid'			=>'TEXT',
			'productid'		=>'TEXT',
			'quantity'		=>'INTEGER',
		),

	);
	return $TABLES;
}
function get_cart($userid, $CONFIG){
	$dbpath	= $CONFIG['DBPATH_INVENTORY'];
	$sql		= "SELECT productid, quantity FROM carts WHERE userid = :userid";
	$result	= Array();
	try{
		$db		= new SQLite3($dbpath);
		$prepare	= $db->prepare($sql);
		$prepare->bindValue(':userid', $userid);
		$result	= $prepare->execute();
		if ($result && $result->fetchArray(SQLITE3_ASSOC)){
			$result->reset();
			$row = $result->fetchArray(SQLITE3_ASSOC);
			$result->reset();
		}
		//$db->close();
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
	}
	return $result;
}
function get_cart_count($userid, $CONFIG){
	$dbpath	= $CONFIG['DBPATH_INVENTORY'];
	$sql		= "SELECT quantity FROM carts WHERE userid = :userid";
	$ret		= -1;
	try{
		$db		= new SQLite3($dbpath);
		$prepare	= $db->prepare($sql);
		$prepare->bindValue(':userid', $userid);
		$result	= $prepare->execute();
		$total	= 0;
		if ($result && $result->fetchArray()){
			$result->reset();
			while ($row = $result->fetchArray(SQLITE3_ASSOC)){
				$quantity = $row['quantity'];
				$total += $quantity;
			}
		}
		else
			$total = 0;
		$ret = $total;
		$db->close();
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
		$ret = -1;
	}
	return $ret;
}
function get_cart_total($userid, $CONFIG){
	$dbpath	= $CONFIG['DBPATH_INVENTORY'];
	$sql		= "SELECT productid, quantity FROM carts WHERE userid = :userid";
	$total	= 0;
	try{
		$db		= new SQLite3($dbpath);
		$prepare	= $db->prepare($sql);
		$prepare->bindValue(':userid', $userid);
		$result	= $prepare->execute();
		if ($result && $result->fetchArray()){
			$result->reset();
			while ($row = $result->fetchArray(SQLITE3_ASSOC)){
				$quantity	= $row['quantity'];
				$productid	= $row['productid'];
				$price		= get_price($productid, $CONFIG);
				$total += ($quantity*$price);
			}
		}
		else
			$total = 0;
		$db->close();
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
	}
	return $total;

}
function get_comments($blog_id, $CONFIG){
	//TODO
	$dbpath	= $CONFIG['DBPATH_RESOURCES'];
	$table	= $CONFIG['DBTABLE_COMMENTS'];
	$sql		= 'SELECT * FROM '.$table.' WHERE blog_id = :blog_id';
	try{
		$db		= new SQLite3($dbpath);
		$prepare = $db->prepare($sql);
		$prepare->bindValue(':blog_id', $blog_id);
		$comments	= $prepare->execute();
		if ($comments && $comments->fetchArray()){
			$comments->reset();
			$comment	= $comments->fetchArray(SQLITE3_ASSOC);
			$comments->reset();
		}
		else
			echo "\n<!-- INFO 633: `NO RESULTS` -->";
		//Did you know that you cannot just close the db
		//while working with the sql results?
		//Closing the db will nuke all results tied to it!
		//$db->close();
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
		$comments = Array();
	}
	return $comments;
}
function get_notification_count($userid){
	//TODO: IDT this works yet...
	//TODO: We do not have notifications setup at this point;
	$dbpath	= $CONFIG['DBPATH_USERS'];
	$sql		= "SELECT COUNT(notifications) FROM userinfo WHERE userid = :userid";
	$ret		= -1;
	try{
		$db	= new SQLite3($dbpath);
		$prepare = $db->prepare($sql);
		$prepare->bindValue(':userid', $userid);
		$result = $prepare->execute();
		$rows = $result->fetchArray();
		if (!$rows)
			$ret = -1;
		else if (!$rows || count($rows) <= 0)
			$ret = -1;
		else if(!$rows[0])
			$ret = -1;
		else
			$ret = $rows[0];
		$db->close();
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
		$ret = -1;
	}
	return $ret;
}
function get_price($productid, $CONFIG){
	$dbpath	= $CONFIG['DBPATH_INVENTORY'];
	$sql		= "SELECT price FROM inventory WHERE id = :productid";
	$price	= 0;
	try{
		$db		= new SQLite3($dbpath);
		$prepare	= $db->prepare($sql);
		$prepare->bindValue(':productid', $productid);
		$result	= $prepare->execute();
		if ($result && $result->fetchArray(SQLITE3_ASSOC)){
			$result->reset();
			$row = $result->fetchArray(SQLITE3_ASSOC);
			$price = $row['price'];
		}
		$db->close();
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
	}
	return $price;
}
function get_product_name($productid, $CONFIG){
	$dbpath	= $CONFIG['DBPATH_INVENTORY'];
	$sql		= "SELECT name FROM inventory WHERE id = :productid";
	$name		= "";
	try{
		$db		= new SQLite3($dbpath);
		$prepare	= $db->prepare($sql);
		$prepare->bindValue(':productid', $productid);
		$result	= $prepare->execute();
		if ($result && $result->fetchArray(SQLITE3_ASSOC)){
			$result->reset();
			$row = $result->fetchArray(SQLITE3_ASSOC);
			$name = $row['name'];
		}
		$db->close();
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
	}
	return $name;
}
function get_product_price($productid, $CONFIG){
	$dbpath	= $CONFIG['DBPATH_INVENTORY'];
	$sql		= "SELECT price FROM inventory WHERE id = :productid";
	$price	= -1;
	try{
		$db		= new SQLite3($dbpath);
		$prepare	= $db->prepare($sql);
		$prepare->bindValue(':productid', $productid);
		$result	= $prepare->execute();
		if ($result && $result->fetchArray(SQLITE3_ASSOC)){
			$result->reset();
			$row = $result->fetchArray(SQLITE3_ASSOC);
			$price = $row['price'];
		}
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
	}
	return $price;
}
function get_recent_blogs($limit=5, $CONFIG){
	//Return $limit blog post items from blog table in resources.db;
	//$limit cannot be bigger than 10;
	if ($limit < 5)
		$limit = 1;
	else if ($limit > 10)
		$limit = 10;
	$dbpath	= $CONFIG['DBPATH_RESOURCES'];
	$table	= $CONFIG['DBTABLE_BLOG'];
	$sql		= "SELECT * FROM " . $table . " LIMIT " . $limit;
	try{
		$db		= new SQLite3($dbpath);
		$prepare = $db->prepare($sql);
		$blogs	= $prepare->execute();
		if ($blogs && $blogs->fetchArray())
			$blogs->reset();
		else
			$blogs = Array();
		//Did you know that you cannot just close the db
		//while working with the sql results?
		//Closing the db will nuke all results tied to it!
		//$db->close();
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
		$blogs = Array();
	}
	return $blogs;
}
function get_user_fname($CONFIG){
	if (!is_logged_in($CONFIG))
		return "";
	$dbpath	= $CONFIG['DBPATH_USERS'];
	$sql		= "SELECT fname FROM userinfo WHERE userid=:userid";
	$ret		= "";
	//$userid	= $_SESSION['userid'];
	$userid	= "";
	try{
		$db	= new SQLite3($dbpath);
		$prepare = $db->prepare($sql);
		$prepare->bindValue(':userid', $userid);
		$result	= $prepare->execute();
		$row		= $result->fetchArray();
		$ret = $row[0];
		if (!$ret){
			if ($_SESSION['alevel'] === 'member')
				$ret = "Member";
			else if ($_SESSION['alevel'] === 'owner')
				$ret = "Owner";
			else if ($_SESSION['alevel'] === 'admin')
				$ret = "Admin";
			else
				$ret = "HACKER";
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
function get_user_id($CONFIG){
	$dbpath	= $CONFIG['DBPATH_USERS'];
	$table	= $CONFIG['DBTABLE_USERS'];
	$sql		= "SELECT id FROM ".$table." WHERE token=:token;";
	$ret		= 0;
	try{
		$db	= new SQLite3($dbpath);
		$prepare = $db->prepare($sql);
		$prepare->bindValue(':email', $email);
		$result	= $prepare->execute();
		$row		= $result->fetchArray();
		$ret = $row[0];
		if (!$ret){
			if ($_SESSION['alevel'] === 'member')
				$ret = "Member";
			else if ($_SESSION['alevel'] === 'owner')
				$ret = "Owner";
			else if ($_SESSION['alevel'] === 'admin')
				$ret = "Admin";
			else
				$ret = "HACKER";
		}
		$db->close();
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
		$ret = -1;
	}
	return $ret;
}
function get_users_tables($CONFIG){
	$user_table			= $CONFIG['DBTABLE_USERS'];
	$userinfo_table	= $CONFIG['DBTABLE_USERINFO'];
	$TABLES = Array(
		$user_table=>Array(
			'id'=>			'INTEGER PRIMARY KEY',
			'token'=>		'TEXT',
			'email'=>		'TEXT',
			'handle'=>		'TEXT',
			'salt'=>			'TEXT',
			'password'=>	'TEXT',
			'accessLevel'=>'TEXT'
		),
		$userinfo_table=> Array(
			'id'=>						'INTEGER PRIMARY KEY',
			'userid'=>					'INTEGER',
			'email'=>					'TEXT',
			'handle'=>					'TEXT',
			'fname'=>					'TEXT',
			'lname'=>					'TEXT',
			'join_date'=>				'INTEGER',		// Cake day
			'is_active'=>				'BOOL',			// Did user delete account
			'last_active'=>			'INTEGER',		// Date user was last active
			'is_subscribed'=>			'BOOL',			// Send subscriptions or not
			'notifications'=>			'INTEGER',		// Current notifications;
			'notification_level'=>	'INTEGER',		// Best rate of notifications for cont. interaction
		),
	);
	return $TABLES;
}
function get_create_table($TNAME, $TABLE){
	$i      = 0;
	$fcount = count($TABLE);
	$sql    = "CREATE TABLE IF NOT EXISTS \"". $TNAME . "\"(";
	foreach ($TABLE as $FIELD=>$FTYPE){
		$sql .= " \"" . $FIELD . "\"";
		$sql .=  " " . $FTYPE;
		if ($i < $fcount-1)
			$sql .= ', ';
		$i +=1;
	}
	$sql .= ')';
	return $sql;
}
function is_db($dbpath, $CONFIG=Null){
	$ret = TRUE;
	if($CONFIG === Null)
		$CONFIG = get_config();
	$FLAGS = $CONFIG['FLAGS'];
	try {
		if (!$FLAGS['is_quite'])
			clog('"connected"');
		$sqlite = new SQLite3($dbpath);
	}
	catch (Exception $exception) {
		if (!$FLAGS['is_quite']){
			echo clog('"There was an error connecting to the database"');
			echo clog("\"". $exception->getMessage() ."\"");
		}
		$ret = FALSE;
	}
	return $ret;
}
function has_notifications($userid){
	//TODO: Setup a last viewed variable to toggle whether the 
	//TODO:  notifications have been viewed yet or not;
	//TODO:  Would compare last viewed time of notificaitons to time of latest notification;
	return TRUE;
}
function has_table($table, $dbpath=Null, $CONFIG=Null){
	/*
	* Verifies whether or not a table exists; 
	* Defaults to DBPATH_USERS if $dbpath not offered;
	*/
	if($CONFIG === Null){
		$ROOT = '.';
		$CONFIG = get_config($ROOT);
	}
	$PATHS   = get_paths($CONFIG['ROOT']);
	if($dbpath===Null)
		$dbpath = $PATHS['DB_USERS'];
	$FLAGS	= $CONFIG['FLAGS'];
	$ret		= TRUE;
	try{
		$db	= new SQLite3($dbpath);
		$sql	= "SELECT name FROM sqlite_master WHERE type='table' AND name=:table";
		$prepare = $db->prepare($sql);
		$prepare->bindValue(':table', $table);
		$result = $prepare->execute();
		$rows = $result->fetchArray();
		if (!$rows)
			$ret = FALSE;
		else if ($rows && count($rows) <= 0)
			$ret = FALSE;
		$db->close();
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
		$ret = FALSE;
	}
	return $ret;
}
function make_table($sql, $dbpath=Null, $CONFIG=Null){
	if ($CONFIG===Null){
		$ROOT = '.';
		$CONFIG = get_config($ROOT);
	}
	if($dbpath === Null)
		$dbpath = $CONFIG['DBPATH_USERS'];
	$db = new SQLIte3($dbpath);
	$db->exec($sql);
	$db->close();
}
function make_inv_tables($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG = get_config();
	$ret    = 0;
	$TABLES = get_inventory_tables();
	$PATHS  = get_paths($CONFIG['ROOT']);
	$dbpath = $CONFIG['DBPATH_INVENTORY'];
	foreach($TABLES as $TNAME=>$TABLE){
		if (has_table($TNAME, $dbpath, $CONFIG))
			continue;
		echo "\n\tMAKING TABLE";
		echo "\n\t\tDBPATH: `".$dbpath."`\n";
		$sql = get_create_table($TNAME, $TABLE);
		$suc = make_table($sql, $dbpath, $CONFIG);
		$ret +=1;
	}
	return $ret;
}
function make_users_tables($CONFIG=Null){
	if($CONFIG === Null){
		$ROOT = '.';
		$CONFIG = get_config($ROOT);
	}
	$ret    = 0;
	$TABLES = get_users_tables($CONFIG);
	$PATHS  = get_paths($CONFIG['ROOT']);
	$dbpath = $CONFIG['DBPATH_USERS'];
	foreach($TABLES as $TNAME=>$TABLE){
		if (has_table($TNAME, $dbpath, $CONFIG))
			continue;
		echo "\nMAKING TABLE\n";
		$sql = get_create_table($TNAME, $TABLE);
		$suc = make_table($sql, $dbpath, $CONFIG);
		$ret +=1;
	}
	return $ret;
}
function parse_from($query){
	/* Take in a query string and return table name if exists & is parsable */
	/* Return empty string if table name DNE */
	//TODO: All of it...
	//SEE: https://stackoverflow.com/questions/3694276/what-are-valid-table-names-in-sqlite
	return "";
}
function sanitize_input($unsafe){
	$unsafe		= filter_var($unsafe, FILTER_SANITIZE_STRING);	// HTML Sanitize
	$sanitized	= SQLite3::escapeString($unsafe);						// SQL sanitize
	//$sanitized	= $unsafe;
	return $sanitized;
}
function update_cart($userid, $productid, $quantity, $CONFIG){
	$prev_quantity = -1;
	$ret				= TRUE;
	$dbpath			= $CONFIG['DBPATH_INVENTORY'];
	$db				= new SQLite3($dbpath);
	$sql				= "SELECT quantity FROM carts WHERE userid = :userid AND productid = :productid";
	$prepare 		= $db->prepare($sql);
	$prepare->bindValue(':userid', $userid);
	$prepare->bindValue(':productid', $productid);
	$result	= $prepare->execute();
	$rows		= $result->fetchArray();
	if (!$rows)
		$prev_quantity = 0;
	else if (!$rows || count($rows) <= 0)
		$prev_quantity = 0;
	else if(!$rows[0])
		$prev_quantity = 0;
	else
		$prev_quantity = $rows[0];

	$new_quantity = $prev_quantity + $quantity;
	$dSql		= "DELETE FROM carts WHERE userid = :userid AND productid=:productid;";
	$prepare = $db->prepare($dSql);
	$prepare->bindValue(':userid', $userid);
	$prepare->bindValue(':productid', $productid);
	$result	= $prepare->execute();

	$sql = "INSERT INTO carts(userid, productid, quantity) VALUES(:userid, :productid, :quantity);";
	$prepare = $db->prepare($sql);
	$prepare->bindValue(':userid',		$userid);
	$prepare->bindValue(':productid',	$productid);
	$prepare->bindValue(':quantity',		$new_quantity);
	$result	= $prepare->execute();

	$db->close();
	return $ret;
}
?>
