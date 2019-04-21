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
require_once($PATHS['LIBPATH_DB_HELPER']);
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
function make_table($sql, $CONFIG=Null){
	$PATHS = get_paths();
	$db = new SQLIte3($PATHS['DB_USERS']);
	$db->exec($sql);
	$db->close();
}
function make_users_tables($CONFIG){
	$ret = 0;
	$TABLES = get_users_tables();
	$PATHS  = get_paths();
	if($CONFIG === Null)
		$CONFIG = get_config();
	echo $PATHS['DB_USERS'] . "\n";
	echo $CONFIG['DBPATH_USERS'] . "\n";
	foreach($TABLES as $TNAME=>$TABLE){
		if (has_table($TNAME))
			continue;
		echo "\nMAKING TABLE\n";
		$sql = get_create_table($TNAME, $TABLE);
		$suc = make_table($sql);
		$ret +=1;
	}
	return $ret;
}

/***** Just for testing *****/
$CONFIG = get_config();
echo  make_users_tables($CONFIG). "\n";
?>
