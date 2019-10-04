<?php
  /**
    Author:
      Tanner.L.Woody@gmail.com
      2019-10-01
    Purpose:
      Do data entry and a leaderboard for the 2019 Precoa
      Rowing Competition;

    Resources:
      $ROOT/../dbs/precoa.db
      $ROOT/../dbs/inits/20191001_rowing.sql
  */
function seconds_to_ms($score){
  $values  = explode(":", $score);
  var_dump($values);
  $minutes = $values[0];
  $seconds = $values[1];
  $ms      = $values[2];
  $total   = ($minutes*60*1000) + ($seconds*1000) + ($ms*10);
  return $total;
}
if( isset( $_GET['score'] ) ){
  //TODO: Check if result is already in the DB...
  //TODO: Validate that score is correct syntax and properly error report if not;
  $db     = "./../../../../dbs/precoa.db";
  $table  = "rowing_2019";
  $conn   = new SQLite3($db);
  $insert = "INSERT INTO " . $table . " (score, fname, lname, gender, score_ms) VALUES (?, ?, ?, ?, ?)";

  $fname    = $_GET['fname'];
  $lname    = $_GET['lname'];
  $score    = $_GET['score'];
  $score_ms = seconds_to_ms($score);
  $gender   = $_GET['gender'];
  
  $stmt = $conn->prepare($insert);
  $stmt->bindParam(1, $score);
  $stmt->bindParam(2, $fname);
  $stmt->bindParam(3, $lname);
  $stmt->bindParam(4, $gender);
  $stmt->bindParam(5, $score_ms);

  $stmt->execute();
}//end if GET
 
?>
<!DOCTYPE html>
<html>
<body>
<h2>2019 Precoa Rowing Competition Data Entry</h2>
<div class="previous-results">
  <!-- Put the previous querry success here or Error or nothing entered -->
</div>
<form>

  <label for="score">Score</label>
  <input type="text" name="score" id="score">
  <br/>
  <label for="fname">First Name</label>
  <input type="text" name="fname" id="fname">
  <br/>
  <label for="fname">Last Name</label>
  <input type="text" name="lname" id="lname">
  <br/>
  <br/>

  <span class="form-text">Gender:</span>
  <br/>

  <label for="male">Male</label>
  <input type="radio" name="gender" id="male" value="m">
  <br/>
  <label for="female">Female</label>
  <input type="radio" name="gender" id="female" value="f">
  <br/>

  <input type="submit" value="Submit">
</form>
</body>
</html>


