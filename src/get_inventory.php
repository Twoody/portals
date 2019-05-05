<?php 
function get_inventory($CONFIG){
	//TODO: Add `where storeid = ?` to query upon adding storeid to the members;
	//TODO:	IF the user is logged in as an owner, then have all their storeid's populated...
	if($PATHS === Null)
		$PATHS = get_paths($CONFIG['ROOT']);
	require_once($PATHS['LIBPATH_DB_HELPER']);
	$dbpath	= $PATHS['DB_INVENTORY'];
	$query	= "SELECT name, quantity, price, image_id FROM inventory";
	$table	= '';
	$table .= $CONFIG['INVENTORY_CONTAINER'];
	$table .= $CONFIG['INVENTORY_ROW'];
	$table .= "\n\t\t\t<div class=\"col-12 bg-info\">";
	$table .= "The start to the table.";
	$table .= "\n\t\t\t</div><!-- END COL -->";
	$table .= "\n\t\t</div><!-- END ROW -->";
	$table .= "\n\t</div><!-- END CONTAINER -->";

	$table .=  get_table_from_query($dbpath, $query, $CONFIG);

	return $table;
}
?>
