function countDecimals(x) {
	if (x % 1 != 0) return x.toString().split(".")[1].length || 0;
	return 0;
}
function distanceBetween(x1, y1, x2, y2) {
	var xDiff = x1 - x2;
	var yDiff = y1 - y2;
	var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
	return distance;
}
function getMiddleOfCanvas(width, height) {
	var cords = {};
	cords.x = width / 2;
	cords.y = height / 2;
	return cords;
}
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
function getRandomFloat(min, max) {
	//Get a random number with decimals not exceeding smallest place;
	var decimals1 = countDecimals(min);
	var decimals2 = countDecimals(max);
	var retDecimals = Math.max(decimals1, decimals2);
	var random = (Math.random() * (max - min) + min).toFixed(retDecimals);
	random = parseFloat(random);
	return random;
}
function isInRange(x, min, max) {
	return x >= min && x <= max;
}
function isLegalBall(ball, sWidth, sHeight, otherBalls, rectangles) {
	/*Ball is legal if it: 
 	1. is in bounds
 	2. is not overlapping the rectangle
 	3. ball is not overallping any otherBall in this.balls;
 */
	if (ball.xCord - ball.radius < 0) return false;
	if (ball.xCord + ball.radius > sWidth) return false;
	if (ball.yCord - ball.radius < 0) return false;
	if (ball.yCord + ball.radius > sHeight) return false;
	for (var i = 0; i < rectangles; i++) {
		var rectangle = rectangles[i];
		var rectangleBallConflict = rectangle.isOverLappingBall(ball);
		if (rectangleBallConflict) return false;
	} //end i-for
	for (var _i = 0; _i < otherBalls; _i++) {
		var otherBall = otherBalls[_i];
		var _isOverLapping = ball.isOverLappingBall(otherBall);
		if (_isOverLapping) return false;
	} //end i-for
	return true;
} //end isLegalBall()
function isOverLapping(x1, y1, x2, y2, distance) {
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
	if (Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) <= Math.pow(distance, 2)) return true;
	return false;
}
function makeRandomBall(sWidth, sHeight, ballID) {
	var minRadius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3;
	var maxRadius = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 30;
	var maxSpeed = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

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
	var randomRadius = getRandomInt(minRadius, maxRadius);
	randomRadius += getRandomInt(1, 99) * 0.01;
	var randomX = getRandomInt(randomRadius, sWidth - randomRadius);
	var randomY = getRandomInt(randomRadius, sHeight - randomRadius);
	var randomDX = getRandomFloat(0, 0.151); //Slow start
	var randomDY = getRandomFloat(0, 0.151); //Slow start
	if (maxSpeed !== null) {
		if (randomDX > maxSpeed) randomDX = maxSpeed;
		if (randomDY > maxSpeed) randomDY = maxSpeed;
	}
	var newBall = new Ball({
		ballID: ballID,
		color: getRandomColor(),
		xCord: randomX,
		yCord: randomY,
		radius: randomRadius,
		dx: randomDX,
		dy: randomDY
	});
	if (maxSpeed !== null) {
		if (maxSpeed < randomRadius) newBall.maxSpeed = maxSpeed;else newBall.maxSpeed = Math.ceil(randomRadius); //set max speed to a legal int of radius;
	} else newBall.maxSpeed = randomRadius;
	return newBall;
} //end makeRandomBall
function makeRandomClickableBall(sWidth, sHeight, ballID) {
	var minRadius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3;
	var maxRadius = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 30;
	var unicode = arguments[5];
	var href = arguments[6];
	var maxSpeed = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;

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
	var randomRadius = getRandomInt(minRadius, maxRadius);
	randomRadius += getRandomInt(1, 99) * 0.01;
	var randomX = getRandomInt(randomRadius, sWidth - randomRadius);
	var randomY = getRandomInt(randomRadius, sHeight - randomRadius);
	var randomDX = getRandomFloat(0, 0.151); //Slow start
	var randomDY = getRandomFloat(0, 0.151); //Slow start
	if (maxSpeed !== null) {
		if (randomDX > maxSpeed) randomDX = maxSpeed;
		if (randomDY > maxSpeed) randomDY = maxSpeed;
	}
	var newBall = new ClickableBall({
		ballID: ballID,
		color: getRandomColor(),
		xCord: randomX,
		yCord: randomY,
		radius: randomRadius,
		dx: randomDX,
		dy: randomDY
	});
	if (maxSpeed !== null) {
		if (maxSpeed < randomRadius) newBall.maxSpeed = maxSpeed;else newBall.maxSpeed = Math.ceil(randomRadius); //set max speed to a legal int of radius;
	} else newBall.maxSpeed = randomRadius;
	newBall.href = href;
	return newBall;
} //end makeRandomClickableBall


function writeToScreen(ctx, msg, x, y) {
	var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "black";

	ctx.beginPath();
	ctx.font = "25px Arial";
	ctx.fillStyle = color;
	ctx.fillText(msg, x, y);
	ctx.closePath();
}