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
function isInRange(x, min, max) {
	return x >= min && x <= max;
}
function makeRandomBall(sWidth, sHeight, ballID) {
	var minRadius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3;
	var maxRadius = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 30;
	var maxSpeed = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 29;

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
	var randomDX = getRandomInt(1, 20) * 0.01;
	var randomDY = getRandomInt(1, 20) * 0.01;
	var newBall = new Ball({
		ballID: ballID,
		color: getRandomColor(),
		xCord: randomX,
		yCord: randomY,
		radius: randomRadius,
		dx: randomDX,
		dy: randomDY
	});
	newBall.maxSpeed = maxSpeed;
	return newBall;
} //end makeRandomBall

function writeToScreen(ctx, msg, x, y) {
	var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "black";

	ctx.beginPath();
	ctx.font = "25px Arial";
	ctx.fillStyle = color;
	ctx.fillText(msg, x, y);
	ctx.closePath();
}