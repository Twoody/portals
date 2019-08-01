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
	updateCoordinates(nextX, nextY){
		this.xLeft		= nextX;
		this.yTop		= nextY;
		this.xRight		= this.xLeft + this.width;
		this.yBottom	= this.yTop + this.height;
		this.xCenter	= Math.abs(this.xRight	- this.width/2);
		this.yCenter	= Math.abs(this.yBottom - this.height/2);
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
	}
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
	}
	isOverLappingBall(ball){
		//Each distance should be positive;
		//rectangle bottom is highest value: subtract top of ball from it;
		//rectangle top is lower value: add ball and radius and subtract rectangle top;
		//rectangle right is hight value: subtract left of ball from it;
		//rectangle left is lower value: add ball and radius and subtract rectangle left from it;
		const bottomDistance	= this.yBottom - ball.nextY - ball.radius;	
		const topDistance		= ball.nextY + ball.radius - this.yTop;
		const rightDistance	= this.xRight - ball.nextX - ball.radius;
		const leftDistance	= ball.nextX + ball.radius - this.xLeft ;
		const isBallAboveBottom	= bottomDistance	> -15;
		const isBallBelowTop		= topDistance		> -15;
		const isBallRightOfLeft	= leftDistance		> -15;
		const isBallLeftOfRight	= rightDistance	> -15;
		const isOverLapping =  (isBallAboveBottom && isBallBelowTop 
											&& isBallLeftOfRight && isBallRightOfLeft);
		return isOverLapping;
	}
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
	}
}//End Rectangle Class
