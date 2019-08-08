function getRandomColor() {
	var red = Math.floor(Math.random() * 3) * 127;
	var green = Math.floor(Math.random() * 3) * 127;
	var blue = Math.floor(Math.random() * 3) * 127;
	var rc = "rgb(" + red + ", " + green + ", " + blue + ")";
	return rc;
}
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function writeToScreen(ctx, msg, x, y) {
	var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "black";

	ctx.beginPath();
	ctx.font = "25px Arial";
	ctx.fillStyle = color;
	ctx.fillText(msg, x, y);
	ctx.closePath();
}
function getMiddleOfCanvas(width, height) {
	var cords = {};
	cords.x = width / 2;
	cords.y = height / 2;
	return cords;
}
function makeRandomBall(existingBalls, rectangle, sWidth, sHeight){
      //Return false if random ball fails;
      //Else return random ball;
      let randomRadius  = getRandomInt(MIN_RADIUS, MAX_RADIUS);
      randomRadius += getRandomInt(1,99) * 0.01;
      const randomX        = getRandomInt(0+randomRadius, sWidth  - randomRadius);
      const randomY        = getRandomInt(0+randomRadius, sHeight - randomRadius);
      const randomDX       = getRandomInt(1, randomRadius/2) * 0.1;
      const randomDY       = getRandomInt(1, randomRadius/2) * 0.1;
      for(let i=0; i<existingBalls.length; i++){
         const otherBall = existingBalls[i];
         const minDistance    = otherBall.radius + randomRadius;
         const currDistance   = otherBall.distanceTo(randomX, randomY);
         if(currDistance < minDistance){
            return false;
         }
      }//end i-for
      let newBall  = new Ball({
         ballID:  existingBalls.length,
         color:   getRandomColor(),
         xCord:   randomX,
         yCord:   randomY,
         radius:  randomRadius,
         dx:      randomDX,
         dy:      randomDY,
      });
      if(existingBalls.length %4 === 0){
         newBall.isGoingLeft  = true;
         newBall.isGoingRight = false;
         newBall.isGoingDown  = true;
         newBall.isGoingUp    = false;
      }
      else if(existingBalls.length %4 === 1){
         newBall.isGoingLeft  = true;
         newBall.isGoingRight = false;
         newBall.isGoingDown  = false;
         newBall.isGoingUp    = true;
      }
      else if(existingBalls.length %4 === 2){
         newBall.isGoingLeft  = false;
         newBall.isGoingRight = true;
         newBall.isGoingDown  = false;
         newBall.isGoingUp    = true;
      }
        if(rectangle.isOverLappingBall(newBall))
         return false;

      return newBall;
}//end makeRandomBall()


