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
      ./Brandon_bld.otf
      ./health-fair-2019-04.png
  */
?>

<html>
<head>
  <style>
    @font-face {
      font-family: "Brandon Grotesque";
      font-weight: bold;
      src: url("Brandon_bld.otf") format("opentype");
    }

    body{
      height: 100%;
      margin: 0;
    }
    .bg {
      background-image: url(health-fair-2019-04.png);
      height: 100%;
      /* Center and scale the image nicely */
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .women {
      position: absolute;
      top: 37%;
      left: 13%;
      transform: translate(-50%, -50%);
    }
    .men {
      position: absolute;
      top: 37%;
      left: 74%;
      transform: translate(-50%, -50%);
    }
    .leaderboard-text{
      font-family: "Brandon Grotesque";
      font-weight: 900;
      font-size: 30px;
    }
  </style>
</head>
<body>
  <div class="bg">
    <div class="women leaderboard-text">
<?php
  $html          = "";
  $db            = "./../../../dbs/precoa.db";
  $table         = "rowing_2019";
  $conn          = new SQLite3($db);
  $select_gender = "SELECT * FROM " . $table . " WHERE gender = :gender";
  $statement = $conn->prepare($select_gender);
  $statement->bindValue(':gender', "f");

  $women = $statement->execute();
  while($woman	= $women->fetchArray( SQLITE3_ASSOC )){
    $fname = $woman['fname'];
    $lname = $woman['lname'];
    $score = $woman['score'];
    $html .= $fname . " " . $lname .": " . $score . "<br/>";
    echo $html;
  }//end while
  echo $html;
  $conn->close();
?>
    </div>
    <div class="men leaderboard-text">
<?php
  $html      = "";
  $conn      = new SQLite3($db);
  $statement = $conn->prepare($select_gender);
  $statement->bindValue(':gender', "m");
  $men = $statement->execute();
  while($man	= $men->fetchArray( SQLITE3_ASSOC )){
    $fname = $man['fname'];
    $lname = $man['lname'];
    $score = $man['score'];
    $html  .= $fname . " " . $lname ." - " . $score . "<br/>";
  }//end while
  echo $html;
  $conn->close();
?>

    </div>
  </div>
  <script>
  </script>
</body>
</html>
