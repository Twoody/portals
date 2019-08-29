<?php
$INT_WORD_MAP = Array(
	0 => "zero",
	1 => "one",
	2 => "two",
	3 => "three",
	4 => "four",
	5 => "five",
	6 => "six",
	7 => "seven",
	8 => "eight",
	9 => "nine",
	10 => "ten",
	11 => "eleven",
	12 => "twelve",
	13 => "thirteen",
	14 => "fourteen",
	15 => "fifteen",
	16 => "sixteen",
	17 => "seventeen",
	18 => "eighteen",
	19 => "nineteen",
	20 => "twenty",
	30 => "thirty",
	40 => "forty",
	50 => "fifty",
	60 => "sixty",
	70 => "seventy",
	80 => "eighty",
	90 => "ninety",
);
function intToText($n){
	/*
		Print number to English
		Input:
			int n s.t. 0 < n < 9,999
		Output:
			String of text
	*/
	global $INT_WORD_MAP;
	if (is_int($n) === FALSE)
		return "NOT GOOD ENTRY";
	$t = "";
	if ($n === 0){
		$t .= $INT_WORD_MAP[0];
		return $t;
	}
	$thousands	= floor( $n / 1000 );
	$hundreds	= floor( $n / 100 ) % 10;
	$teens		= $n % 100;
	$tens			= floor( $n / 10 ) % 10 * 10;
	$ones			= $n % 10;
	if ($thousands > 0){
		//$t .= $thousands . "<br/>";
		$t .= $INT_WORD_MAP[$thousands] . " thousand";
	}
	if ($hundreds > 0){
		if (count($t) > 0)
			$t .= " ";
		$t .= $INT_WORD_MAP[$hundreds] . " hundred";
	}
	if ($teens > 0){
		if (count($t) > 0)
			$t .= " ";
		if ($teens < 20 || $ones === 0){
			$t .= $INT_WORD_MAP[$teens];
		}
		else{
			if( $tens > 0 )
				$t .= $INT_WORD_MAP[$tens];
				$t .= " ";
			$t .= $INT_WORD_MAP[$ones];
		}
	}
	return $t;
}//end intToText()

if(isset($_GET['anInt'])){
	$q = intval($_GET['anInt']);
	$r = intToText($q);
	echo "<p>".$r."</p>";
}
?>
<!DOCTYPE html>
<html>
<body>

<h2>Text Input</h2>

<form>
  Integer from 0 to 9999:<br>
  <input type="text" name="anInt">
  <input type="submit" value="Submit">
</form>

<p>
	Hi Brandon, thanks again for the interview today. I got the problem sketched out via php
	and thought you would like to be able to submit the data, too.
	The file can be viewed at:
	<a href ="https://github.com/Twoody/portals/blob/master/precoa/intToText.php"
		target="_blank">
	 the git repo for this page.
	<a/>
</p>


<img src="./whiteboard.jpg"
	style="width:500px;height:600px;"
/>
</body>
</html>
