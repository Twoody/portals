
<!DOCTYPE html>
<html>
<head>
  <style>
    .previous-results{
      color: green;
    }
    .thickline{
    border: 10px solid green;
    border-radius: 5px;  
    }
    input[type=text], select {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
    
    input[type=submit] {
      width: 100%;
      background-color: #4CAF50;
      color: white;
      padding: 14px 20px;
      margin: 8px 0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    input[type=submit]:hover {
      background-color: #45a049;
    }
    
    .data-form {
      border-radius: 5px;
      background-color: #f2f2f2;
      padding: 20px;
    }
  </style>
</head>
<body>

<div class="previous-results">
  <!-- Put the previous querry success here or Error or nothing entered -->
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
  $minutes = $values[0];
  $seconds = $values[1];
  $ms      = $values[2];
  $total   = ($minutes*60*1000) + ($seconds*1000) + ($ms*10);
  return $total;
}
$html = "";
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
  $conn->close();

  $html .= $fname . " " . $lname . " ADDED TO THE DATABASE";
  $html .= "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SCORE - " . $score;
}//end if GET
else{
  $html .= "No entries currently added to the DB.";
}

echo $html;
?>
</div>
<hr class="thickline">
<h2>2019 Precoa Rowing Competition Data Entry</h2>
<div class="data-form">
  <form>
    <label for="fname">First Name</label>
    <input type="text" id="fname" name="fname" placeholder="Your name..">

    <label for="lname">Last Name</label>
    <input type="text" id="lname" name="lname" placeholder="Your last name..">

    <label for="score">Score</label>
    <input type="text" id="score"  name="score" placeholder="MM:SS:MS">

    <label for="country">Gender</label>
    <select id="gender" name="gender">
      <option value="f">Female</option>
      <option value="m">Male</option>
    </select>

    <input type="submit" value="Submit">
  </form>
</div>
</body>
</html>


