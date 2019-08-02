class Rectangle{
	'use strict';
	constructor(properties){
		this.type			= 'rectangle';
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
		this.nextX			= this.xLeft;
		this.nextY			= this.yTop;
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
	handleRectangleMove(sWidth, sHeight, entities=[]){
		//Handle rectangle movement:

		this.handleRectangleWallInteractions(sWidth, sHeight);
		this.handleRectangleEntityInteractions(sWidth, sHeight, entities);
		this.updateCoordinates();
	}//end handleRectangleMove
	handleRectangleBallInteractions(sWidth, sHeight, entity){
		/*	Find out what way rectangle is moving;
			If we encounter a ball, move that ball IFF that ball can move in the other direction;
		*/
		
	}
	handleRectangleEntityInteractions(sWidth, sHeight, entities=[]){
		for( let i=0; i<entities.length; i++){
			const entity	= entities[i];
			if(entity.type === 'rectangle')
				this.handleRectangleRectangleInteractions(sWidth, sHeight, entity);
			else if(entity.type === 'ball')
				this.handleRectangleBallInteractions(sWidth, sHeight, entity);
			else{
				//type not found
			}
		}//end i-for
	}
	handleRectangleRectangleInteractions(sWidth, sHeight, entity){
		//Encountered other rectangle; Can we move that rectangle, too?
	}
	handleRectangleWallInteractions(sWidth, sHeight){
		//Find out what item is out of bounds and fix accordingly;
		if(this.nextX < 0)
			this.nextX = 0;
		if(this.nextX + this.width > sWidth)
			this.nextX = sWidth - this.width;
		if(this.nextY < 0)
			this.nextY = 0;
		if(this.nextY + this.height > sHeight)
			this.nextY = sHeight - this.height;
		return true;
	}
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
	updateCoordinates(){
		this.xLeft		= this.nextX;
		this.yTop		= this.nextY;
		this.xRight		= this.xLeft + this.width;
		this.yBottom	= this.yTop + this.height;
		this.xCenter	= Math.abs(this.xRight	- this.width/2);
		this.yCenter	= Math.abs(this.yBottom - this.height/2);
		this.nextX		= this.xLeft;
		this.nextY		= this.yTop;
	}//end updateCoordinates()
}//End Rectangle Class
