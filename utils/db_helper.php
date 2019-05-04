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
function get_users_tables(){
	$TABLES = Array(
		'users'=>Array(
			'id'=>			'INTEGER PRIMARY KEY',
			'email'=>		'TEXT',
			'handle'=>		'TEXT',
			'salt'=>			'TEXT',
			'password'=>	'TEXT',
			'accessLevel'=>'TEXT'
		),
		'userinfo'=> Array(
			'id'=>						'INTEGER PRIMARY KEY',
			'email'=>					'TEXT',
			'handle'=>					'TEXT',
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
function get_table_from_query($dbpath, $query, $CONFIG){
	/* Return a dataTable table based off of query */
	$db			= new SQLite3($dbpath);
	$CUR_TABLE	= parse_from($query);
	$table   	= "";
	$QUERY_PAGE	= $CONFIG['QUERY_PAGE'];
	$TABLE_ID	= $CONFIG['TABLE_ID'];
	$db->enableExceptions(true);
	try{
		$prepare = $db->prepare($query);
		if(!$CUR_TABLE)
			$CUR_TABLE = "users";
		if ($prepare){
			$result	= $prepare->execute();
			$headers	= Array();
			if($result && $result->fetchArray()){
				$result->reset();
				$header  = "";
				$footer	= "";
				$table .= "\n\t<table id=\"".$TABLE_ID."\" class=\"table table-striped table-bordered\" ";
				$table .= "cellspacing=\"\" width=\"100%\" role=\"grid\">";
				$table .= "\n\t\t<thead>";
				while ($row = $result->fetchArray(SQLITE3_ASSOC)){
					$header .= "\n\t\t\t<tr role=\"row\">";
					$footer .= "\n\t\t\t<tr>";
					$row_keys = array_keys($row);
					for($i=0; $i<count($row_keys); $i++){
						 $row_key = $row_keys[$i];;
						array_push($headers, $row_key);
						$header .= "\n\t\t\t\t<th class=\"sorting\">";
						$header .= "\n\t\t\t\t\t".$row_key;
						$header .= "\n\t\t\t\t</th>";
						$footer .= "\n\t\t\t\t<th>";
						$footer .= "\n\t\t\t\t\t".$row_key;
						$footer .= "\n\t\t\t\t</th>";
					}
					$header .= "\n\t\t\t</tr>";
					$footer .= "\n\t\t\t</tr>";
					break;
				}
				$table .= $header;
				$table .= "\n\t\t</thead>";
				$result->reset();
				$table .= "\n\t\t<tbody>";
				$is_odd = TRUE;
				$is_first_row = TRUE;
				while ($row = $result->fetchArray(SQLITE3_ASSOC)){
					$table .= "\n\t\t\t<tr role=\"row\" class=\"";
					if ($is_odd)
						$table .= "odd ";
					else
						$table .= "even ";
					if ($is_first_row)
						$table .= "first ";
					$table .= "\">"; //Closing `class`
					$row_keys = array_keys($row);
					$is_first_col = TRUE;
					foreach($row_keys as $row_key){
						$table .= "\n\t\t\t\t<td>";
						if ($is_first_col){
							$dHref = $QUERY_PAGE."?delete_val=".$row[$row_key]."&delete_table=".$CUR_TABLE;
							$dHref .= "&delete_key=".$row_key."&is_deleting=TRUE";
							$table .= "\n<a href=\"".$dHref."\" title=\"Delete Entry\" style=\"color:black\">";
							$table .= make_font_awesome_stack(Array(
								'backdrop-google fas fa-square',
								'fas fa-tw fa-trash'), $CONFIG);
							$table .= "\n</a>";
						}
						$table .= "".$row[$row_key];
						$table .= "</td>";
						$is_first_col = FALSE;
					}
					$table .= "\n\t\t\t</tr>";
					$is_first_row = FALSE;
				}
				$table .= "\n\t\t</tbody>";
		 		$table .= "<tfoot>";
				$table .= $footer;
		 		$table .= "</tfoot>";
				$table .= "\n\t</table>";
			}
			else{
				$table .= "\n\t\t\t<div class=\"col-12 bg-warning\">";
				$table .= "\n\t\t\t\tNO RESULTS;";
				$table .= "\n\t</div>";
			}
		}
		else{
			$table .= "\n\t\t\t<div class=\"col-12 bg-warning\">";
			$table .= "\n\t\t\t\tBAD QUERY;";
			$table .= "\n\t</div>";
		}
		$db->close();
	}
	catch (Exception $exception) {
		$table .= "\n\t\t\t<div class=\"col-12 bg-warning\">";
		$table .= "\n\t\t\t\tBAD QUERY AND PREPARE;";
		$table .= "\n\t</div>";
	}
	return $table;
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
function parse_from($query){
	/* Take in a query string and return table name if exists & is parsable */
	/* Return empty string if table name DNE */
	//TODO: All of it...
	//SEE: https://stackoverflow.com/questions/3694276/what-are-valid-table-names-in-sqlite
	return "";
}
?>
