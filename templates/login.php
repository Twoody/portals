<!doctype html>
<?
require_once('./config/imports.php');
$PATHS = get_paths();

require_once($PATHS['DATATABLES_CSS_PATH']);
require_once($PATHS['DATATABLES_JS_PATH']);
require_once($PATHS['FORMS_LOGIN']);
require_once($PATHS['LIBPATH_AUTH_USER']);
$CONFIG = get_config();

/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
//TODO: Store title in a pages db;
$CONFIG['TITLE'] = "TEMPLATE A";

$CONFIG['HAS_DATATABLES'] = TRUE;

$html			= '';
$show_login	= true;

$html .= get_header($CONFIG);
$html .= "\n";

$html .= "\n<body>";
$html .= get_js($CONFIG);
/*
	TODO:
		Php this at this spot:

			<h1>DataTables Template</h1>

			<!-- jQuery first, then Popper.js, then Bootstrap JS -->
			<script 
				src="https://code.jquery.com/jquery-3.3.1.slim.min.js" 
				integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" 
				crossorigin="anonymous">
			</script>
			<script 
				src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" 
				integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" 
				crossorigin="anonymous">
			</script>
			<script
				src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" 
				integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" 
				crossorigin="anonymous">
			</script>
			<script
				src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" 
				integrity="" 
				crossorigin="anonymous">
			</script>
			<script
				src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js" 
				integrity="" 
				crossorigin="anonymous">
			</script>
*/

$html .=	"\n\t<!-- Optional JavaScript -->\n";

if(isset($_POST['form_submit'])){
	//TODO: Authenticate user...
	$show_login = false;
	$email  = $_POST["inputEmail"];
	$user   = strstr($email, '@', true); //strip everything after `@`
	$pw     = $_POST["inputPassword"];
	$access = $_POST["userLevel"];
	//TODO: Pull dbpath from config file...
	$dbpath = $PATHS['DB_USERS'];
	$is_valid_email = is_valid_email($email);
	if ($access === "isMember")
		$access = "member";
	else if ($access === "isOwner")
		$access = "owner";
	else if ($access === "isAdmin")
		$access = "admin";
	else{
		$access = "error";
		//TODO: Get error pulled from $ERRORS parsed obj of errors.json file;
		$html.= clog("ERROR 234234: BAD ACCESS LEVEL");
		$show_login = True;
	}
	if ($access !== 'error' && $is_valid_email){
		$db			= new SQLite3($dbpath);
		$salt			= getS_salt($email);
		$user_hash	= get_hash($email);
		$is_validPW	= password_verify($pw.$salt, $user_hash);
		$has_access	= is_valid_access($email, $access);
		$db->close();														// CLOSING DB;
		if (!$has_access || !$is_valid_pw){
			if (!$is_valid_pw)
				echo alert("Bad Password");
			else if (!$has_access)
				echo alert("Bad Access Level");
			else
				echo alert("Bad Login");
			$show_login = TRUE;
		}
	}
	else{
		echo alert("Bad Email");
		$show_login = TRUE;
	}
}
if ($show_login){
	$html .= get_login_form($CONFIG);
}
else{
	$html .= "<p>Welcome, ".$user.".</p>";
	$html .= "<p>You are logged in as a ".$access.".</p>";
	$html .= clog("\"USER: \" + JSON.stringify(" .$user. ")");
}

$html .= "\n</body>";
$html .= "\n</html>\n";
echo $html;
?>
