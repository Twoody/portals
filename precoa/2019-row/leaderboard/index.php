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

  $db            = "./../../../../dbs/precoa.db";
  $table         = "rowing_2019";
  $conn          = new SQLite3($db);
  $html          = "";
  $select_men    = "SELECT * FROM " . $table . " WHERE gender='m'";
  $select_women  = "SELECT * FROM " . $table . " WHERE gender='w'";
  $select_other  = "SELECT * FROM " . $table . " WHERE gender='o'";
 
  $women = $conn->query( $select_women );
  $table = "<table>";

  $table .= "<colgroup>";
  $table .= "<col style='background-color:pink'>";
  $table .= "<col style='background-color:pink'>";
  $table .= "<col style='background-color:blue'>";
  $table .= "</colgroup>";

  $table .= "<tr>";
  $table .= "<th>First Name</th>";
  $table .= "<th>Last Name</th>";
  $table .= "<th>Score</th>";
  $table .= "</tr>";

  while($woman	= $women->fetchArray( SQLITE3_ASSOC)){
    $fname = $woman['fname'];
    $lname = $woman['lname'];
    $score = $woman['score'];
    $table .= "<tr>";

    $table .= "<td>";
    $table .= $fname;
    $table .= "</td>";
    $table .= "<td>";
    $table .= $lname;
    $table .= "</td>";
    $table .= "<td>";
    $table .= $score;
    $table .= "</td>";
    $table .= "</tr>";
  }//end while
  $table .= "</table>";
  $html .= "<h2>Women Leaderboard</h2>";
  $html .= $table;
//END WOMAN

  $men = $conn->query( $select_men );
  $table = "<table>";

  $table .= "<colgroup>";
  $table .= "<col style='background-color:pink'>";
  $table .= "<col style='background-color:pink'>";
  $table .= "<col style='background-color:blue'>";
  $table .= "</colgroup>";

  $table .= "<tr>";
  $table .= "<th>First Name</th>";
  $table .= "<th>Last Name</th>";
  $table .= "<th>Score</th>";
  $table .= "</tr>";

  while($man	= $men->fetchArray( SQLITE3_ASSOC)){
    $fname = $man['fname'];
    $lname = $man['lname'];
    $score = $man['score'];
    $table .= "<tr>";

    $table .= "<td>";
    $table .= $fname;
    $table .= "</td>";
    $table .= "<td>";
    $table .= $lname;
    $table .= "</td>";
    $table .= "<td>";
    $table .= $score;
    $table .= "</td>";
    $table .= "</tr>";
  }//end while
  $table .= "</table>";
  $html .= "<h2>Men Leaderboard</h2>";
  $html .= $table;
  echo $html;

//END MAN

?>
