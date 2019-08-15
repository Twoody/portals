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
export function moveSVG(svgString, x,y ){
	/*	Change the svgString to be drawn based off a starting point of x,y
		Return String
	*/
	let commands			= svgString.split(/([ACHLMQSTVZachlmvqstz])/);
	let moddedCommands	= [];
	let i = 0;
	while(i < commands.length ){
		let command			= commands[i];
		let coordString	= commands[i+1];
		if(command === ""){
			i += 1;
			continue;
		}
		if(command === 'M' || command === 'm'){
			//"Move to" commands:
			//	M: Move to coordinates
			//	m: Move relative to last position
			const coordArr	= coordString.split(' ');
			const xPre		= parseFloat(coordArr[0]);
			const yPre		= parseFloat(coordArr[1]);
			const xNext		= (xPre + x).toString();
			const yNext		= (yPre + y).toString();
			const nextCoord	= xNext + " " + yNext;
			moddedCommands.push(command);
			if(command === 'M')
				moddedCommands.push(nextCoord);
			else
				moddedCommands.push(coordString);
		//	console.log('m: ' + nextCoord);
		}
		else if(command === 'L' || command === 'l'){
			//L: Draw a line to x,y coords
			//l: Draw a line relative to last point
			const coordArr	= coordString.split(' ');
			const xPre		= parseFloat(coordArr[0]);
			const yPre		= parseFloat(coordArr[1]);
			const xNext		= (xPre + x).toString();
			const yNext		= (yPre + y).toString();
			const nextCoord	= xNext + " " + yNext;
			moddedCommands.push(command);
			if(command === 'L')
				moddedCommands.push(nextCoord);
			else
				moddedCommands.push(coordString);
		}
		else if(command === 'H' || command === 'h'){
			//H: Draw a horizontal line from curr point to given coords;
			//h: Draw a horizontal line from curr point by dx ratio;
			const coordArr	= coordString.split(' ');
			const xPre		= parseFloat(coordArr[0]);
			const xNext		= (xPre + x).toString();
			moddedCommands.push(command);
			if(command === 'H')
				moddedCommands.push(xNext);
			else
				moddedCommands.push(xPre.toString());
		}
		else if(command === 'V' || command === 'v'){
			//V: Draw a vertical line from curr point to given coords;
			//v: Draw a vertical line from curr point by dy ratio;
			const coordArr	= coordString.split(' ');
			const yPre		= parseFloat(coordArr[1]);
			const yNext		= (yPre + y).toString();
			moddedCommands.push(command);
			if(command === 'V')
				moddedCommands.push(yNext);
			else
				moddedCommands.push(yPre.toString());
		}
		else if(command === 'C' || command === 'c'){
			/*
			Draw a cubic Bézier curve from the current point to the end point 
			specified by x,y. The start control point is specified by x1,y1 
			and the end control point is specified by x2,y2. 
			Any subsequent triplet(s) of coordinate pairs are interpreted as 
			parameter(s) for implicit absolute cubic Bézier curve (C) command(s). 
			Formulae: Po' = Pn = {x, y} ; Pcs = {x1, y1} ; Pce = {x2, y2}
			*/
			moddedCommands.push(command);
			moddedCommands.push(coordString);
		}
		else if(command === 'S' || command === 's'){
			/*
			Draw a smooth cubit  Bézier curve from the current point to 
			the end point specified by x,y. 
			*/
			moddedCommands.push(command);
			moddedCommands.push(coordString);
		}
		else if(command === 'Q' || command === 'q'){
			/*
			Draw a quadratic Bézier curve from the current point 
			to the end point specified by x,y. 
			*/
			moddedCommands.push(command);
			moddedCommands.push(coordString);
		}
		else if(command === 'T' || command === 't'){
			/*
			Draw a smooth quadratic Bézier curve from the current point to the 
			end point specified by x,y. 
			*/
			moddedCommands.push(command);
			moddedCommands.push(coordString);
		}


		else if(command === 'A' || command === 'a'){
			moddedCommands.push(command);
			moddedCommands.push(coordString);
		}
		else{
			moddedCommands.push(command);
			moddedCommands.push(coordString);
		}
		i += 2;
	}//end i-for
	const ret = moddedCommands.join(' ');
	//console.log(ret)
	return ret;
}
export function writeToScreen(ctx, msg, x, y, color="black"){
	ctx.beginPath();
	ctx.font      = "25px Arial";
	ctx.fillStyle = color;
	ctx.fillText(msg, x, y);
	ctx.closePath();
}
