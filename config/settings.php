<?
	/* ----- ----- GENERAL OPTIONS ----- ----- */
	$FLAGS=[];
	$VERSION=1.00;
	$HAS_LOGIN=FALSE;
	$ACTIVE_PAGE="./";
	$LANG="en";
	$CHAR_SET="utf-8";
	/* ----- ----- GENERAL OPTIONS ----- ----- */


	/* ----- ----- DATABASE MANAGEMENT ----- ----- */
	$DBPATH_USERS="./resources/dbs/users.db";
	$USERS_VERSION=1.00;
	
	/* ----- ----- BOOTSTRAP REQUIRED PARAMETERS AND CONFIGURATION ----- ----- */
	$HAS_BOOTSTRAP=TRUE;
	$HAS_POPPER=TRUE;
	$HAS_JQUERY=TRUE;
	
	$BOOTSTRAP_CSS_REL="stylesheet"; //The required rel attribute specifies the relationship between the current document and the linked document/resource
	$BOOTSTRAP_CSS_LINK="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css";
	$BOOTSTRAP_CSS_INTEGRITY="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO";
	$BOOTSTRAP_CSS_ORIGIN="anonymous";
	
	$BOOTSTRAP_JS_SRC="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js";
	$BOOTSTRAP_JS_INTEGRITY="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy";
	$BOOTSTRAP_JS_ORIGIN="anonymous";

	// - POPPER.js
	$BOOTSTRAP_JS_POPPER_SRC="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js";
	$BOOTSTRAP_JS_POPPER_INTEGRITY="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49";
	$BOOTSTRAP_JS_POPPER_ORIGIN="anonymous";

	// - jQuery
	$BOOTSTRAP_JS_JQUERY_SRC="https://code.jquery.com/jquery-3.3.1.slim.min.js";
	$BOOTSTRAP_JS_JQUERY_INTEGRITY="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo";
	$BOOTSTRAP_JS_JQUERY_ORIGIN="anonymous";

	/* ----- ----- DATATABLES REQUIRED PARAMETERS AND CONFIGURATION ----- ----- */
	$HAS_DATATABLES=FALSE;
	$HAS_DATATABLES_JQUERY=FALSE;

	$DATATABLES_CSS_REL="stylesheet"; //The required rel attribute specifies the relationship between the current document and the linked document/resource
	$DATATABLES_CSS_LINK="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css";
	$DATATABLES_CSS_INTEGRITY="";
	$DATATABLES_CSS_ORIGIN="anonymous";
	
	$DATATABLES_JS_SRC="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js";
	$DATATABLES_JS_INTEGRITY="";
	$DATATABLES_JS_ORIGIN="anonymous";
	
	// - jQuery
	$DATATABLES_JS_JQUERY_SRC="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js";
	$DATATABLES_JS_JQUERY_INTEGRITY="";
	$DATATABLES_JS_JQUERY_ORIGIN="anonymous";
?>
