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
require_once('./config/paths.php');
$PATHS = get_paths();
require_once($PATHS['SETTINGS_PATH']);

echo "\n<!-- " . $PATHS['LIBPATH_DB_HELPER'] . " imported -->\n";

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

function has_table($table, $dbpath=Null, $CONFIG=Null, $PATHS=Null){
	/*
	* Verifies whether or not a table exists; 
	* Defaults to DBPATH_USERS if $dbpath not offered;
	*/
	if($CONFIG === Null)
		$CONFIG = get_config();
	if($PATHS === Null)
		$PATHS = get_paths();
	if ($dbpath === Null)
		$dbpath = $PATHS['DBPATH_USERS'];
	$FLAGS	= $CONFIG['FLAGS'];
	$ret		= TRUE;
	try{
		$db = new SQLite3($dbpath);
		$sql = "SELECT name FROM sqlite_master WHERE type='table' AND name=:table";
		$prepare = $db->prepare($sql);
		$prepare->bindValue(':table', $table);
		$result = $prepare->execute();
		$rows = $result->fetchArray();
		if (!$rows)
			$ret = FALSE;
		else if ($rows->numRows() <= 0)
			$ret = FALSE;
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
		$ret = FALSE;
	}
	return $ret;
}
?>
