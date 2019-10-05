
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
if( isset( $_GET['minutes'] )|| isset( $_GET['seconds'] ) ){
  //TODO: Check if result is already in the DB...
  //TODO: Validate that score is correct syntax and properly error report if not;
  $db     = "./../../../../dbs/precoa.db";
  $table  = "rowing_2019";
  $insert = "INSERT INTO " . $table . " (score, fname, lname, gender, score_ms) VALUES (?, ?, ?, ?, ?)";
  $adding_to_db = TRUE;

//Get the values
  $fname    = $_GET['fname'];
  $lname    = $_GET['lname'];
  $minutes  = $_GET['minutes'];
  $seconds  = $_GET['seconds'];
  $mseconds = $_GET['mseconds'];
  $score    = $minutes . ":" . $seconds . ":" . $mseconds;
  $score_ms = seconds_to_ms($score);
  $gender   = $_GET['gender'];

//Does another entry exist for this person?
  $query_duplicates = "SELECT id, score_ms FROM " . $table . " WHERE fname=:fname AND lname=:lname";
  $conn = new SQLite3($db);
  $stmt = $conn->prepare($query_duplicates);
  $stmt->bindParam(":fname", $fname);
  $stmt->bindParam(":lname", $lname);
  $duplicates = $stmt->execute();
  $curr_score = $score_ms;
  while($duplicate = $duplicates->fetchArray( SQLITE3_ASSOC )){
    $prev_score = $duplicate['score_ms'];
    if( $prev_score*1 >= $curr_score*1 ){
      //If score is greater, we should remove it from the DB...  
      $delete = "DELETE FROM " . $table . " WHERE fname = :fname AND lname = :lname";
      $stmt = $conn->prepare($delete);
      $stmt->bindParam(":fname", $fname);
      $stmt->bindParam(":lname", $lname);
      $stmt->execute();
    }
    else
      $curr_score = $prev_score;
  }//end while
  $conn->close();
  if( $curr_score !== $score_ms )
    $adding_to_db = FALSE;

 

//Added validated values to db
  if( $adding_to_db ){
    $conn = new SQLite3($db);
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
  }
  else{
    $html .="<span style=\"color:yellow; background-color:black;\">";
    $html .= "Previous score found for \"".$fname." ".$lname."\" WAS BETTER;"; 
    $html .= "<br/>";
    $html .= "Not updating the Database.";
    $html .="</span>";

  }
}//end if GET
else{
  $html .= "No entries currently added to the DB.";
}

echo $html;
?>
</div>
<hr class="thickline">
<h1 style="text-align:center">2019 Precoa Rowing Competition Data Entry</h1>
<h2 style="text-align:center">Enter your time in the 500M rowing competition! The score from the men and women’s categories will receive a PTO day!</h2>
<div class="data-form">
  <form id="row-data">
    <label for="fname">First Name</label>
    <input type="text" id="fname" name="fname" placeholder="First name..." required>

    <label for="lname">Last Name</label>
    <input type="text" id="lname" name="lname" placeholder="Last name..." required>

    <label for="minutes">Minutes</label>
    <select id="minutes"  name="minutes">
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
    </select>
    <label for="seconds">Seconds</label>
    <select id="seconds"  name="seconds">
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
      <option value="15">15</option>
      <option value="16">16</option>
      <option value="17">17</option>
      <option value="18">18</option>
      <option value="19">19</option>
      <option value="20">20</option>
      <option value="21">21</option>
      <option value="22">22</option>
      <option value="23">23</option>
      <option value="24">24</option>
      <option value="25">25</option>
      <option value="26">26</option>
      <option value="27">27</option>
      <option value="28">28</option>
      <option value="29">29</option>
      <option value="30">30</option>
      <option value="31">31</option>
      <option value="32">32</option>
      <option value="33">33</option>
      <option value="34">34</option>
      <option value="35">35</option>
      <option value="36">36</option>
      <option value="37">37</option>
      <option value="38">38</option>
      <option value="39">39</option>
      <option value="40">40</option>
      <option value="41">41</option>
      <option value="42">42</option>
      <option value="43">43</option>
      <option value="44">44</option>
      <option value="45">45</option>
      <option value="46">46</option>
      <option value="47">47</option>
      <option value="48">48</option>
      <option value="49">49</option>
      <option value="50">50</option>
      <option value="51">51</option>
      <option value="52">52</option>
      <option value="53">53</option>
      <option value="54">54</option>
      <option value="55">55</option>
      <option value="56">56</option>
      <option value="57">57</option>
      <option value="58">58</option>
      <option value="59">59</option>
    </select>

    <label for="mseconds">Miliseconds</label>
    <select id="mseconds"  name="mseconds">
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
      <option value="15">15</option>
      <option value="16">16</option>
      <option value="17">17</option>
      <option value="18">18</option>
      <option value="19">19</option>
      <option value="20">20</option>
      <option value="21">21</option>
      <option value="22">22</option>
      <option value="23">23</option>
      <option value="24">24</option>
      <option value="25">25</option>
      <option value="26">26</option>
      <option value="27">27</option>
      <option value="28">28</option>
      <option value="29">29</option>
      <option value="30">30</option>
      <option value="31">31</option>
      <option value="32">32</option>
      <option value="33">33</option>
      <option value="34">34</option>
      <option value="35">35</option>
      <option value="36">36</option>
      <option value="37">37</option>
      <option value="38">38</option>
      <option value="39">39</option>
      <option value="40">40</option>
      <option value="41">41</option>
      <option value="42">42</option>
      <option value="43">43</option>
      <option value="44">44</option>
      <option value="45">45</option>
      <option value="46">46</option>
      <option value="47">47</option>
      <option value="48">48</option>
      <option value="49">49</option>
      <option value="50">50</option>
      <option value="51">51</option>
      <option value="52">52</option>
      <option value="53">53</option>
      <option value="54">54</option>
      <option value="55">55</option>
      <option value="56">56</option>
      <option value="57">57</option>
      <option value="58">58</option>
      <option value="59">59</option>
      <option value="60">60</option>
      <option value="61">61</option>
      <option value="62">62</option>
      <option value="63">63</option>
      <option value="64">64</option>
      <option value="65">65</option>
      <option value="66">66</option>
      <option value="67">67</option>
      <option value="68">68</option>
      <option value="69">69</option>
      <option value="70">70</option>
      <option value="71">71</option>
      <option value="72">72</option>
      <option value="73">73</option>
      <option value="74">74</option>
      <option value="75">75</option>
      <option value="76">76</option>
      <option value="77">77</option>
      <option value="78">78</option>
      <option value="79">79</option>
      <option value="80">80</option>
      <option value="81">81</option>
      <option value="82">82</option>
      <option value="83">83</option>
      <option value="84">84</option>
      <option value="85">85</option>
      <option value="86">86</option>
      <option value="87">87</option>
      <option value="88">88</option>
      <option value="89">89</option>
      <option value="90">90</option>
      <option value="91">91</option>
      <option value="92">92</option>
      <option value="93">93</option>
      <option value="94">94</option>
      <option value="95">95</option>
      <option value="96">96</option>
      <option value="97">97</option>
      <option value="98">98</option>
      <option value="99">99</option>
    </select>

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


