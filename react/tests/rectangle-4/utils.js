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
function writeToScreen(ctx, msg, x, y) {
	var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "black";

	ctx.beginPath();
	ctx.font = "25px Arial";
	ctx.fillStyle = color;
	ctx.fillText(msg, x, y);
	ctx.closePath();
}