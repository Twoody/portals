function countDecimals(x){
	if( (x%1) != 0 )
		return x.toString().split(".")[1].length || 0;
	return 0;
}
function distanceBetween(x1, y1, x2, y2){
	const xDiff 	= x1-x2;
	const yDiff 	= y1-y2;
	const distance	= Math.sqrt(xDiff**2 + yDiff**2);
	return distance;
}
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
function getRandomFloat(min, max){
	//Get a random number with decimals not exceeding smallest place;
	const decimals1	= countDecimals(min);
	const decimals2	= countDecimals(max);
	const retDecimals = Math.max(decimals1, decimals2);
	let random			= (Math.random() * (max - min) + min).toFixed(retDecimals);
	random				= parseFloat(random);
	return random;
}
function isInRange(x, min, max){
	return (x>=min && x<=max);
}
function isLegalBall(ball, sWidth, sHeight, otherBalls, rectangles){
	/*Ball is legal if it: 
		1. is in bounds
		2. is not overlapping the rectangle
		3. ball is not overallping any otherBall in this.balls;
	*/
	if(ball.xCord - ball.radius < 0)
		return false;
	if(ball.xCord + ball.radius > sWidth)
		return false;
	if(ball.yCord - ball.radius < 0)
		return false;
	if(ball.yCord + ball.radius > sHeight)
		return false;
	for(let i=0; i<rectangles.length; i++){
		const rectangle = rectangles[i];
		const rectangleBallConflict = rectangle.isOverLappingBall(ball);
		if(rectangleBallConflict)
			return false;
	}//end i-for
	for(let i=0; i<otherBalls.length; i++){
		const otherBall		= otherBalls[i];
		const isOverLapping	= ball.isOverLappingBall(otherBall);
		if(isOverLapping)
			return false;
	}//end i-for
	return true;
}//end isLegalBall()
function isOverLapping(x1, y1, x2, y2, distance){
	/*	Will use distance formula to compute;
		Input:
			x1: int
			y1: int
			x2: int
			y2: int
			distance: int
		Output:
			boolean
	*/
	if( (x1-x2)**2 + (y1-y2)**2 <= distance**2 )
		return true;
	return false
}
function makeRandomBall(sWidth, sHeight, ballID, minRadius=3, maxRadius=30, maxSpeed=null){
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
	const randomX	= getRandomInt(randomRadius, sWidth - randomRadius);
	const randomY	= getRandomInt(randomRadius, sHeight - randomRadius);
	let randomDX	= getRandomFloat(0, 0.151);	//Slow start
	let randomDY	= getRandomFloat(0, 0.151);	//Slow start
	if(maxSpeed !== null){
		if(randomDX > maxSpeed)
			randomDX = maxSpeed;
		if(randomDY > maxSpeed)
			randomDY = maxSpeed;
	}
	const newBall	= new Ball({
		ballID:	ballID,
		color:	getRandomColor(),
		xCord:	randomX,
		yCord:	randomY,
		radius:	randomRadius,
		dx: 		randomDX,
		dy:		randomDY,
	});
	if(maxSpeed !== null){
		if(maxSpeed < randomRadius)
			newBall.maxSpeed = maxSpeed;
		else
			newBall.maxSpeed = Math.ceil(randomRadius);	//set max speed to a legal int of radius;
	}
	else
		newBall.maxSpeed = randomRadius;
	return newBall;
}//end makeRandomBall
function makeRandomClickableBall(
	sWidth, 
	sHeight, 
	ballID, 
	minRadius=3, 
	maxRadius=30, 
	unicode,
	href, 
	maxSpeed=null
){
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
	const randomX	= getRandomInt(randomRadius, sWidth - randomRadius);
	const randomY	= getRandomInt(randomRadius, sHeight - randomRadius);
	let randomDX	= getRandomFloat(0, 0.151);	//Slow start
	let randomDY	= getRandomFloat(0, 0.151);	//Slow start
	if(maxSpeed !== null){
		if(randomDX > maxSpeed)
			randomDX = maxSpeed;
		if(randomDY > maxSpeed)
			randomDY = maxSpeed;
	}
	const newBall	= new ClickableBall({
		ballID:	ballID,
		color:	getRandomColor(),
		xCord:	randomX,
		yCord:	randomY,
		radius:	randomRadius,
		dx: 		randomDX,
		dy:		randomDY,
	});
	if(maxSpeed !== null){
		if(maxSpeed < randomRadius)
			newBall.maxSpeed = maxSpeed;
		else
			newBall.maxSpeed = Math.ceil(randomRadius);	//set max speed to a legal int of radius;
	}
	else
		newBall.maxSpeed = randomRadius;
	newBall.href = href;
	return newBall;
}//end makeRandomClickableBall


function writeToScreen(ctx, msg, x, y, color="black"){
	ctx.beginPath();
	ctx.font      = "25px Arial";
	ctx.fillStyle = color;
	ctx.fillText(msg, x, y);
	ctx.closePath();
}
