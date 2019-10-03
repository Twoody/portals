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
//END MAN
?>

<html>
<head>
  <style>
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
  </style>
</head>
<body>
  <div class="bg">
    <canvas id="mainCanvas" >
    </canvas>
  </div>
  <script>
    function getWidthRatio(){
      const testScreenWidth = 650;
      const testWomenWidth  = 250;
      const ratio = testScreenWidth/testWomenWidth;;
      return ratio;
    }
    function getHeightRatio(){
      const testScreenHeight = 425;
      const testWomenHeight  = document.body.clientHeight;
      const ratio = testScreenHeight/testWomenHeight;;
      return ratio;
    }

    function initCanvas(){
      let canvas    = document.getElementById("mainCanvas");
      canvas.width  = document.body.clientWidth; //document.width is obsolete
      canvas.height = document.body.clientHeight; //document.height is obsolete
      return canvas;
    }//end initCanvas()
    function getImage(){
      let bgi = new Image();
      bgi.src = "./health-fair-2019-04.png";
      return bgi;
    }//end getBackgroundImage

    let canvas  = initCanvas();
    let ctx     = canvas.getContext('2d');
    console.log(canvas.width);
    console.log(canvas.height);
    //Minimal ratio set at 11H to 7W

//    //Below digits are assuming a 650x425 screen;
//    //TODO: figure out math to accurately overlay
//    //      Note that the current digits are the no-go zone;
//		ctx.beginPath();
//		ctx.rect(
//		  250,              //this.xLeft,
//			140,              //this.yTop, 
//			140,               //this.width,
//			canvas.height     //this.height, 
//		);
//		ctx.fillStyle = "black";
//		ctx.fill();
//		ctx.closePath();

  //Womens leaderboard
		ctx.beginPath();
		ctx.rect(
		  0,              //this.xLeft,
			140,              //this.yTop, 
			250,               //this.width,
			canvas.height     //this.height, 
		);
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.closePath();

  //Mens leaderboard
  	ctx.beginPath();
		ctx.rect(
		  250+140,              //this.xLeft,
			140,              //this.yTop, 
			250,               //this.width,
			canvas.height     //this.height, 
		);
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.closePath();
  


  </script>
</body>
</html>