<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink:
   Date:    2019-06-10

USAGE:
	Import via:
		require_once($PATHS['LIBPATH_DB_BLOGS']);
Purpose:
    Simplify some of the db processing for blogs in resources.db;

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

function process_blog_views($blog_id, $CONFIG){
	$cur_views	= get_blog_views($blog_id, $CONFIG);
	if ($cur_views === -1){
		$msg	= "*** BLOG NOT FOUND AT ID `".$blog_id."`: ";
		update_errors_db($msg, $CONFIG);
		return 1;
	}
	/*
	else{
		$msg	= "*** BLOG FOUND AT ID `".$blog_id."`: ";
		update_errors_db($msg, $CONFIG);
	}
	*/
	add_blog_view($blog_id, $CONFIG);
	return $cur_views+1;
}
function get_blog_views($blog_id, $CONFIG){
	$dbpath		= $CONFIG['DBPATH_RESOURCES'];
	$table		= $CONFIG['DBTABLE_BLOG'];
	$select		= "SELECT views FROM " . $table . " WHERE id = :blog_id";
	$ret			= -1;
	$error_msg	= "";
	try{
		$db		= new SQLite3($dbpath);
		$prepare	= $db->prepare($select);
		$prepare->bindValue(':blog_id'	, $blog_id );
		$result	= $prepare->execute();
		if($result){
			$row	= $result->fetchArray(SQLITE3_ASSOC);
			if ($row){
				$ret 	= $row['views'];
			}
			else{
				$error_msg	.= "FAILED TO GET ROW for get_blog_views AT PATH `";
				$error_msg	.= $blog_id . "`; ";
			}
		}
		else{
			$error_msg	.= "FAILED TO GET  BLOG VIEWS AT PATH `".$blog_id."`";
		}
		$db->close();
		if($error_msg !== '')
			update_errors_db($error_msg, $CONFIG);
	}
	catch(Exception $exception){
		$msg	= "BAD SELECT TO  FIND BLOG VIEWS AT ID `".$blog_id."`";
		update_errors_db($msg, $CONFIG);
	}
	return $ret;
}
function add_blog_view($blog_id, $CONFIG){
	$dbpath		= $CONFIG['DBPATH_RESOURCES'];
	$table		= $CONFIG['DBTABLE_BLOG'];
	$cur_views	= get_blog_views($blog_id, $CONFIG);
	$update		= "UPDATE " . $table . " SET views = :views WHERE id = :blog_id";
	try{
		$db		= new SQLite3($dbpath);
		$prepare	= $db->prepare($update);
		$prepare->bindValue(':views'	,$cur_views+1 );
		$prepare->bindValue(':blog_id'	, $blog_id );
		$result	= $prepare->execute();
		if($result)
			$ret = TRUE;
		else{
			$msg	= "CANNOT ADD TO BLOG VIEWS AT ID `".$blog_id."`";
			update_errors_db($msg, $CONFIG);
		}
		$db->close();
	}
	catch(Exception $exception){
		$msg	= "BAD UPDATE TO  ADD TO BLOG VIEWS AT ID `".$blog_id."`";
		update_errors_db($msg, $CONFIG);
	}
	return $ret;
}
?>
