export function countDecimals(x){
	if( (x%1) !== 0 )
		return x.toString().split(".")[1].length || 0;
	return 0;
}
export function distanceBetween(x1, y1, x2, y2){
	const xDiff 	= x1-x2;
	const yDiff 	= y1-y2;
	const distance	= Math.sqrt(xDiff**2 + yDiff**2);
	return distance;
}
export function getMiddleOfCanvas(width, height){
		let cords = {};
		cords.x = width/2;
		cords.y = height/2;
		return cords;
}
export function getRandomColor(){
	let red		= Math.floor(Math.random() * 3) * 127;
	let green	= Math.floor(Math.random() * 3) * 127;
	let blue		= Math.floor(Math.random() * 3) * 127;
	let rc		= "rgb(" + red + ", " + green + ", " + blue + ")";
	return rc;
}
export function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function getRandomFloat(min, max){
	//Get a random number with decimals not exceeding smallest place;
	const decimals1	= countDecimals(min);
	const decimals2	= countDecimals(max);
	const retDecimals = Math.max(decimals1, decimals2);
	let random			= (Math.random() * (max - min) + min).toFixed(retDecimals);
	random				= parseFloat(random);
	return random;
}
export function isInRange(x, min, max){
	return (x>=min && x<=max);
}
export function isOverLapping(x1, y1, x2, y2, distance){
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
export function writeToScreen(ctx, msg, x, y, color="black"){
	ctx.beginPath();
	ctx.font      = "25px Arial";
	ctx.fillStyle = color;
	ctx.fillText(msg, x, y);
	ctx.closePath();
}
