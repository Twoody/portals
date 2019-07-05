<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink:
   Date:    2019-06-10

USAGE:
	Import via:
		require_once($PATHS['LIBPATH_DB_PAGES']);
Purpose:
    Simplify some of the db processing for blogs in resources.db;

TODO:
	1. ...

******************************************************************************/
function add_page_to_pages($page_path, $CONFIG){
	$dbpath		= $CONFIG['DBPATH_RESOURCES'];
	$table		= $CONFIG['DBTABLE_PAGES'];
	$cur_views	= get_page_views($page_path, $CONFIG);
	$insert		= "INSERT INTO " . $table . " (views, title, path)";
	$insert		.= " VALUES(:views, :title, :path);";
	$ret			= FALSE;
	try{
		$db		= new SQLite3($dbpath);
		$prepare = $db->prepare($insert);
		$prepare->bindValue(':views'	,0);
		$prepare->bindValue(':title'	,$CONFIG['TITLE']);
		$prepare->bindValue(':path'	,$page_path);
		$result	= $prepare->execute();
		if(!$result){
			$msg	= "FAILED TO INSERT PAGE INTO PAGES TABLE `".$page_path."`";
			update_errors_db($msg, $CONFIG);
		}
		else
			$ret = TRUE;
		$db->close();
	}
	catch(Exception $exception){
		$msg	= "BAD SQL WHILE INSERTING PAGE INTO PAGES TABLE `".$page_path."`";
		update_errors_db($msg, $CONFIG);
	}
	return $ret;
}
function process_page_views($page_path, $CONFIG){
	if(is_dir($page_path)){
		if(substr($page_path, -1) !== "/") //if path ends in slash
			$page_path	.= "/";
		$page_path	.= "index.php";
	}
	$cur_views	= get_page_views($page_path, $CONFIG);
	if ($cur_views === -1){
		$msg	= "*** PAGE NOT FOUND AT `".$page_path."`: ";
		$msg	.= "WILL CREATE ENTRY IN DB;";
		update_errors_db($msg, $CONFIG);
		if (add_page_to_pages($page_path, $CONFIG) === FALSE)
			return -1;
		return 1;
	}
	add_page_view($page_path, $CONFIG);
	return $cur_views+1;
	
}
function get_page_views($page_path, $CONFIG){
	$dbpath		= $CONFIG['DBPATH_RESOURCES'];
	$table		= $CONFIG['DBTABLE_PAGES'];
	$select		= "SELECT views FROM " . $table . " WHERE path = :path";
	$ret			= -1;
	$error_msg	= "";
	try{
		$db		= new SQLite3($dbpath);
		$prepare	= $db->prepare($select);
		$prepare->bindValue(':path'	, $page_path );
		$result	= $prepare->execute();
		if($result){
			$row	= $result->fetchArray(SQLITE3_ASSOC);
			if ($row){
				$ret 			= $row['views'];
			}
			else{
				$error_msg	.= "FAILED TO GET ROW for get_page_views AT PATH `";
				$error_msg	.= $page_path . "`; ";
			}
		}
		else{
			$error_msg	.= "FAILED TO GET  PAGEVIEW AT PATH `".$page_path."`";
		}
		$db->close();
		if($error_msg !== '')
			update_errors_db($error_msg, $CONFIG);
	}
	catch(Exception $exception){
		$msg	= "BAD SELECT TO  FIND PAGEVIEWS AT PATH `".$page_path."`";
		update_errors_db($msg, $CONFIG);
	}
	return $ret;
}
function add_page_view($page_path, $CONFIG){
	$dbpath		= $CONFIG['DBPATH_RESOURCES'];
	$table		= $CONFIG['DBTABLE_PAGES'];
	$cur_views	= get_page_views($page_path, $CONFIG);
	$update		= "UPDATE " . $table . " SET views = :views WHERE path = :path";

	//$insert		= 'INSERT INTO ' . $table . " (message, userid, date_reported)";
	//$insert		.= " VALUES(:msg, :userid, :date)";
	try{
		$db		= new SQLite3($dbpath);
		$prepare	= $db->prepare($update);
		$prepare->bindValue(':views'	,$cur_views+1 );
		$prepare->bindValue(':path'	, $page_path );
		$result	= $prepare->execute();
		if($result)
			$ret = TRUE;
		else{
			$msg	= "CANNOT ADD TO PAGEVIEW AT PATH `".$page_path."`";
			update_errors_db($msg, $CONFIG);
		}
		$db->close();
	}
	catch(Exception $exception){
		$msg	= "BAD UPDATE TO  ADD TO PAGEVIEW AT PATH `".$page_path."`";
		update_errors_db($msg, $CONFIG);
	}
	return $ret;
}
?>
