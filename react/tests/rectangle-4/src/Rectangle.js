class Rectangle{
	'use strict';
	constructor(properties){
		this.rectID			= properties.rectID;
		this.color			= properties.color;
		this.width			= properties.width;
		this.height			= properties.height;
		this.xLeft			= properties.xLeft;
		this.yTop			= properties.yTop;
		this.xRight			= this.xLeft + this.width;
		this.yBottom		= this.yTop + this.height;
		this.xCenter		= Math.abs(this.xRight	- this.width/2);
		this.yCenter		= Math.abs(this.yBottom - this.height/2);
		this.gravity		= 0;
		this.friction		= 0.05;
	}
	draw(ctx){
		ctx.beginPath();
		ctx.rect(
			this.xLeft,
			this.yTop, 
			this.width,
			this.height, 
		);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}//end draw()
	handleRectangleMove(nextX, nextY, sWidth, sHeight){
		//Handle rectangle movement:
		//Find out what item is out of bounds and fix accordingly;
		if(nextX < 0)
			nextX = 0;
		if(nextX + this.width > sWidth)
			nextX = sWidth - this.width;
		if(nextY < 0)
			nextY = 0;
		if(nextY + this.height > sHeight)
			nextY = sHeight - this.height;
		this.updateCoordinates(nextX, nextY);
	}//end handleRectangleMove
	isOverLappingBall(ball){
		/*Get X and Y range and see if balls coords fall in that range or not;
			Input:
				Ball() object
			Output:
				Boolean
			@ ./src/utils.js
		*/	
		const bottomAreaAllowed		= this.yBottom	+ ball.radius;
		const topAreaAllowed			= this.yTop		- ball.radius;
		const rightDistanceAllowed	= this.xRight	+ ball.radius;
		const leftDistanceAllowed	= this.xLeft	- ball.radius;
		const yIsInRange	= isInRange(ball.nextY, topAreaAllowed, bottomAreaAllowed);
		const xIsInRange	= isInRange(ball.nextX, leftDistanceAllowed, rightDistanceAllowed);
		if (yIsInRange ){
			if(xIsInRange){
				console.log('rectangle Y Range: ' + topAreaAllowed + ' - ' + bottomAreaAllowed);
				console.log('rectangle X range: ' + leftDistanceAllowed + ' - ' + rightDistanceAllowed);
				console.log('analyzed Y: ' + ball.nextY);
				console.log('analyzed X: ' + ball.nextX);
				return true;
			}
			else
				return false;
		}
		return false;
	}//end isOverLappingBall()
	isInBounds(width, height){
		//Determine if rectangle fits the screen width and screen height;
		if(this.xLeft < 0)
			return false;
		if(this.xRight > width)
			return false;
		if(this.yTop < 0)
			return false;
		if(this.yBottom > height)
			return false;
		return true;
	}//end isInBounds();
	updateCoordinates(nextX, nextY){
		this.xLeft		= nextX;
		this.yTop		= nextY;
		this.xRight		= this.xLeft + this.width;
		this.yBottom	= this.yTop + this.height;
		this.xCenter	= Math.abs(this.xRight	- this.width/2);
		this.yCenter	= Math.abs(this.yBottom - this.height/2);
	}//end updateCoordinates()
}//End Rectangle Class
