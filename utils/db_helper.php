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
if (php_sapi_name() === "cli"){
		if($CONFIG === Null){
			$ROOT = '.';
			require_once('./config/paths.php');
			$PATHS = get_paths($ROOT);
			require_once($PATHS['SETTINGS_PATH']);
			$CONFIG = get_config($ROOT);
		}
		$ROOT = $CONFIG['ROOT'];
}
$PATHS = get_paths($ROOT);
require_once($PATHS['LIBPATH_HTML']);
echo "\n<!-- " . $PATHS['LIBPATH_DB_HELPER'] . " imported -->\n";

function get_users_tables(){
	$TABLES = Array(
		'users'=>Array(
			'id'=>			'INTEGER PRIMARY KEY',
			'email'=>		'TEXT',
			'salt'=>			'TEXT',
			'password'=>	'TEXT',
			'accessLevel'=>'TEXT'
		),
		'userinfo'=> Array(
			'id'=>						'INTEGER PRIMARY KEY',
			'fname'=>					'TEXT',
			'lname'=>					'TEXT',
			'joindate'=>				'INTEGER',		// Cake day
			'isActive'=>				'BOOL',			// Did user delete account
			'lastActive'=>				'INTEGER',		// Date user was last active
			'isSubscribed'=>			'BOOL',			// Send subscriptions or not
			'notificationLevel'=>	'INTEGER'		// Best rate of notifications for cont. interaction
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
function make_users_tables($CONFIG){
	if($CONFIG === Null){
		$ROOT = '.';
		$CONFIG = get_config($ROOT);
	}
	$ret    = 0;
	$TABLES = get_users_tables();
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
?>
