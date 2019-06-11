<?php
/*
	Inventory backbome for db mgmt;
*/
function init_inventory($db){
	$ret			= TRUE;
	$products	= Array(
		Array(
			'name'			=>'Snickers',
			'quantity'		=>	0,
			'price'			=>'2.00',
			'image_id'		=>'',
			'categories'	=>'food'
		),
		Array(
			'name'			=>'Trident',
			'quantity'		=>	0,
			'price'			=>'1.00',
			'image_id'		=>'',
			'categories'	=>'food'
		),
	);
	$db->exec('BEGIN;');
	try{
		foreach($products as $product){
			$product[''];
			$sql 		= "INSERT INTO inventory(name, quantity, price, categories) VALUES (:name, :quantity, :price, :categories)";
			$prepare	= $db->prepare($sql);
			$prepare->bindValue(':name',			$product['name']);
			$prepare->bindValue(':quantity',		$product['quantity']);
			$prepare->bindValue(':price',			$product['price']);
			$prepare->bindValue(':cateogires',	$product['cateogires']);
			echo "\n\tINSERTING `".$product['name']."` INTO DB;";
			$result = $prepare->execute();
		}
		$db->exec('COMMIT;');
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
		$ret = FALSE;
		$db->exec('ROLLBACK;');
	}
	return $ret;
}
function get_all_inventory($db, $where=null){
	//TODO: Move to DBHelper file;
	if ($where === null)
		$where=[];
	$sql       = 'SELECT * FROM inventory WHERE 1=1';
	foreach($where as $w){
		$sql .= " AND " .$w;
		echo "\n<p>\n\t".$w."\n</p>";
	}
	echo "\n<p>ERROR 44:\n\t".$sql."\n</p>";
	$result    = $db->query($sql);
	return $result;
}
function __main__($ROOT){
	require_once($ROOT . '/config/paths.php');
	$PATHS   = get_paths($ROOT);
	require_once($PATHS['SETTINGS_PATH']);
	$CONFIG  = get_config($CONFIG);
	$dbpath	= $PATHS['DB_INVENTORY'];
	$db		= new SQLite3($dbpath);
	$ret		= '';
	$suc		= init_inventory($db);
	if ($suc === FALSE){
		$ret .= "\n<p>\n\tBad inserts;\n</p>";
		return $ret;
	}
	$db->close();
	return $ret;
}
$ROOT = "../..";
$ROOT = ".";
echo __main__($ROOT);
?>

