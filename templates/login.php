<!doctype html>
<?
require_once('./config/imports.php');
$PATHS = get_paths();

require_once($PATHS['DATATABLES_CSS_PATH']);
require_once($PATHS['DATATABLES_JS_PATH']);
require_once($PATHS['FORMS_LOGIN']);
$CONFIG = get_config();

/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
//TODO: Store title in a pages db;
$CONFIG['TITLE'] = "TEMPLATE A";

$CONFIG['HAS_DATATABLES'] = TRUE;

$html			= '';
$showLogin	= true;

$html .= get_header($CONFIG);
$html .= "\n";

$html .= "\n<body>";

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
			<!-- Optional JavaScript -->


*/

if(isset($_POST['form_submit'])){
	//TODO: Authenticate user...
	$showLogin = false;
	$email  = $_POST["inputEmail3"];
	$user   = strstr($email, '@', true); //strip everything after `@`
	$pw     = $_POST["inputPassword3"];
	$access = $_POST["userLevel"];
	//TODO: Pull dbpath from config file...
	$dbpath = "/Users/tannerleewoody/Workspace/testdir/html/bootstrap/resources/dbs/users.db";	//RUNNING FROM ROOT `./forms/login4.php`
	$dbpath = "./resources/dbs/users.db";	//RUNNING FROM ROOT `./forms/login4.php`
	$isValidEmail = isValidEmail($email);
	if ($access === "isMember")
		$access = "member";
	else if ($access === "isOwner")
		$access = "owner";
	else if ($access === "isAdmin")
		$access = "admin";
	else{
		$access = "error";
		echo "<script>console.log(\"ERROR 234234: BAD ACCESS LEVEL\");</script>";
		$showLogin = True;
	}
	if ($access !== 'error' && $isValidEmail === TRUE){
		$db			= new SQLite3($dbpath);
		$salt			= getSalt($email);
		$user_hash	= getHash($email);
		$isValidPW	= password_verify($pw.$salt, $user_hash);
		$isUser		= isValidAccess($email, $access);
		$db->close();
		if ($isUser === FALSE || $isValidPW !== TRUE){
			if ($isValidPW !== true){
				echo "<script>alert(\"Bad Password;\");</script>";
			}
			else if (isValidAccess($email, $access) === FALSE){
				echo "<script>alert(\"Bad Access Level;\");</script>";
			}
			else{
				echo "<script>alert(\"Bad Login;\");</script>";
			}
			$showLogin = TRUE;
		}
	}
	else{
		echo "<script>alert(\"Bad Email;\");</script>";
		$showLogin = TRUE;
	}
}
if ($showLogin === TRUE){
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
