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
	}
	isOverLappingBall(ball){
		const bottomDistance	= ball.distanceTo(ball.nextX, this.yBottom);
		const topDistance		= ball.distanceTo(ball.nextX, this.ytop);
		const leftDistance	= ball.distanceTo(this.xLeft, ball.nextY);
		const rightDistance	= ball.distanceTo(this.xRight, ball.nextY);
		const willOverLapBottom = bottomDistance < ball.radius;
		const willOverLapTop		= topDistance < ball.radius;
		const willOverLapLeft	= leftDistance < ball.radius;
		const willOverLapRight	= rightDistance < ball.radius;
		const isOverLapping =  (willOverLapBottom && willOverLapTop && willOverLapRight && willOverLapLeft);
		return isOverLapping;
	}
}//End Rectangle Class
