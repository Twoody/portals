function getMiddleOfCanvas(width, height){
		let cords = {};
		cords.x = width/2;
		cords.y = height/2;
		return cords;
}
function getRandomColor(){
	let red		= Math.floor(Math.random() * 3) * 127;
	let green	= Math.floor(Math.random() * 3) * 127;
	let blue		= Math.floor(Math.random() * 3) * 127;
	let rc		= "rgb(" + red + ", " + green + ", " + blue + ")";
	return rc;
}
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function makeRandomBall(sWidth, sHeight, ballID, minRadius=3, maxRadius=30, maxSpeed=29){
	/*	Return false if random ball fails;
		Else return random ball;
		Input:
			screen width,
			screen height,
			ballID
			mininum radius possible,
			maximum radius possible,
			maxSpeed possible -- no more than 2 times given radius;
		Output:
			Ball object;
		@ ./src/Balls.js
	*/
	let randomRadius	= getRandomInt(minRadius, maxRadius);
	randomRadius += getRandomInt(1,99) * 0.01;
	const randomX			= getRandomInt(randomRadius, sWidth - randomRadius);
	const randomY			= getRandomInt(randomRadius, sHeight - randomRadius);
	const randomDX			= getRandomInt(1, 20) * 0.01;
	const randomDY			= getRandomInt(1, 20) * 0.01;
	const newBall			= new Ball({
		ballID:	ballID,
		color:	getRandomColor(),
		xCord:	randomX,
		yCord:	randomY,
		radius:	randomRadius,
		dx: 		randomDX,
		dy:		randomDY,
	});
	newBall.maxSpeed = maxSpeed;
	return newBall;
}//end makeRandomBall

function writeToScreen(ctx, msg, x, y, color="black"){
	ctx.beginPath();
	ctx.font      = "25px Arial";
	ctx.fillStyle = color;
	ctx.fillText(msg, x, y);
	ctx.closePath();
}
