<?
/*
	We are using the php password_hash() built in for hashing our passwords;
	In the initial testing of our DB, we are generating users with python;
	However, we need to generate their passwords with php to ensure that they
	are properly configured;

	In the test case, we are going to just have a password describing the test
	users access level: i.e. isOwner has a pw of `owner`.
*/
	function getAllUsers($db, $where=null){
		//TODO: Move to DBHelper file;
		if ($where === null)
			$where=[];
		$sql       = 'SELECT * FROM users WHERE 1=1';
		foreach($where as $w){
			$sql .= " AND " .$w;
			echo "<p>".$w."</p>";
		}
			echo "<p>".$sql."</p>";
		$result    = $db->query($sql);
		return $result;
	}
	function update_hash($user, $hash){
		/* Users can have emails for multiple accessLevels;
			Each email should share the same password though;
			Each email has to be unique;
		*/
		//TODO: Move to DBHelper file;
		//TODO: Get dbpath from config file...
		$dbpath = "./resources/dbs/users.db";
		$db     = new SQLite3($dbpath);
		$sql    = 'UPDATE users SET password = :password WHERE email= :email';
		$update = $db->prepare($sql);
		$update->bindValue(':password', $hash);
		$update->bindValue(':email', $user['email']);
		echo "<p>".$sql."</p>";
		$update->execute();
		if ($update)
			$ret = $db->changes();
		else
			$ret = 0;
		$db->close();
		return $ret;
	}
	function set_hash($user){
		/*
			Take the user object and set a hash for the provided email;
			This is the initial call and should only be made during testing...
		*/
		$salt = $user['salt'];
		$pw   = $user['accessLevel'];
		$hash = password_hash($pw.$salt, PASSWORD_DEFAULT);
		echo "<p>NEW HASH: ".gettype($hash)."</p>";
		echo "<p>NEW HASH: ".($hash)."</p>";
		update_hash($user, $hash);
		return TRUE;
	}
	
	//TODO: Pull dbpath from config file...
	$dbpath       = "./resources/dbs/users.db";
	$db           = new SQLite3($dbpath);
	$where_clause = ['(password is Null or password = "")'];
	$users        = getAllUsers($db, $where_clause);
	$updateThese  = [];
	echo "<hr>";
	while ($user = $users->fetchArray()){
		array_push($updateThese, $user);
	}
	$db->close();
	foreach ($updateThese as $user){
		echo "<p>SETTING UP HASH FOR <br/> ".$user["email"]."</p>";
		set_hash($user);
		echo "<hr>";
	}
?>

