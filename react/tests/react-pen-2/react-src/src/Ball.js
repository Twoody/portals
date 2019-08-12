import { getRandomFloat, isOverLapping } from "./utils";

export function shrinkBalls(balls){
	//Each ball has a 50% chance of getting radius reduced;
	for(let i=0; i<balls.length; i++){
		let ball = balls[i];
		if(Math.random() >=0.5)
			ball.shrink();
	}//end i-for
}//end shrinkBalls
export function accelerateBalls(balls){
	//Accelerate each and every ball by a random percent;
	for(let i=0; i<balls.length; i++){
		let ball = balls[i];
		if(ball.dx < 1)
			ball.dx += 3;
		if(ball.dy < 1)
			ball.dy += 3;
		const dxGain = getRandomFloat(0, 0.99) * ball.dx;
		const dyGain = getRandomFloat(0, 0.99) * ball.dy;
		ball.accelerate( dxGain, dyGain );
	}//end i-for
}//end accelerateBalls
export function decelerateBalls(balls){
	//Decelerate each and every ball by a random percent;
	for(let i=0; i<balls.length; i++){
		let ball = balls[i];
		const dxLoss = getRandomFloat(0, 0.99) * ball.dx;
		const dyLoss = getRandomFloat(0, 0.99) * ball.dy;
		ball.decelerate( dxLoss, dyLoss );
	}//end i-for
}//end decelerateBalls

export class Ball{
	'use strict';
	constructor(properties){
		this.type			= 'ball';
		this.ballID			= properties.ballID;
		this.color			= properties.color;
		this.xCord			= properties.xCord;
		this.yCord			= properties.yCord;
		this.radius			= properties.radius;
		this.dx 				= properties.dx;
		this.dy				= properties.dy;
		this.gravity		= 0.45;
		this.friction		= 0.05;
		this.kineticLoss	= 1/3;
		this.kineticGain	= 2/3;
		//Direction variables;
		this.isGoingRight	= true;	//Ball starts going to the right;
		this.isGoingDown	= true;	//Ball starts going down;
		this.isGoingLeft	= false;
		this.isGoingUp		= false;
		this.nextX			= this.xCord + this.dx;
		this.nextY			= this.yCord + this.dy;
		//Boundary variables;
		this.canGoLeft		= false;
		this.canGoRight	= false;
		this.canGoDown		= false;
		this.canGoUp		= false;
	}
	accelerate(dxBoost, dyBoost){
		this.dx += dxBoost;
		this.dy += dyBoost;

		//Apply buffer to stay in speed of light realm;
		if(this.dx > this.radius*2 - 0.01)
			this.dx = this.radius*2 - 0.01;
		if(this.dy > this.radius*2 - 0.01)
			this.dy = this.radius*2 - 0.01;

		if(this.dx > this.maxSpeed)
			this.dx = this.maxSpeed;
		if(this.dy > this.maxSpeed)
			this.dy = this.maxSpeed;
		this.decelerate(0,0);	//Hack to check if zero;
		//Should we be updating the next coords here?
			//this.setNextCoordinates();
	}
	accelerateBySize(dx=true, dy=true, ratio=50){
		const rate = this.radius/ratio;
		if(dx && dy)
			this.accelerate(rate, rate);
		else if(dx)
			this.accelerate(rate, 0);
		else if(dy)
			this.accelerate(0, rate);
		//Should we be updating the next coords here?
			//this.setNextCoordinates();
	}
	applyGravity(){
		if(this.isGoingDown)
			this.accelerate(0, this.gravity);
		else if(this.isGoingUp)
			this.decelerate(0, this.gravity);
		else if (this.canGoDown)
			this.accelerate(0, this.gravity);
	}
	decelerate(dxLoss, dyLoss){
		this.dx -= dxLoss;
		this.dy -= dyLoss;
		if(this.dx <=0)
			this.dx = 0;
		if(this.dy <=0)
			this.dy = 0;
		//Should we be updating the next coords here?
			//this.setNextCoordinates();
	}//end decelerate()
	destruct(){
		//Destroy Ball
		this.radius	= 0;
	}
	distanceTo(x, y){
		const xDiff 	= this.nextX - x;
		const yDiff 	= this.nextY - y;
		const distance	= Math.sqrt(xDiff**2 + yDiff**2);
		return distance;
	}
	draw(ctx){
		ctx.beginPath();
		ctx.arc(
			this.xCord,
			this.yCord, 
			this.radius,
			2*Math.PI,		//Start angle in radians
			0					//End angle in radians
		);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}//end draw()
	handleBallCollisions(allBalls){
		//Find out if NEXT coordinates overlap anything;
		for(let i=0; i<allBalls.length; i++){
			if(this.ballID === allBalls[i].ballID)
				continue;
			let otherBall			= allBalls[i];
			const minDistance		= otherBall.radius + this.radius;
			let nextDistance		= this.distanceTo(otherBall.nextX, otherBall.nextY);
			let willOverlap		= nextDistance <= minDistance;
			if( !willOverlap ){
				continue;
			}

			//Set the directions that this ball cannot go;
			if(this.nextX > otherBall.nextX){
				//Current ball is right of otherball
				this.canGoLeft = false;
			}
			else
				this.canGoRight = false;
			if(this.nextY > otherBall.yCord){
				//Current ball is below of otherball
				this.canGoUp = false;
			}
			else
				this.canGoDown = false;

			//Adjust the next coordinates so that they do not overlap otherBall;
			//We can do this by taking the ratio of dx and dy changes and "step back"
			//	through time until we find a place the balls no longer overlap;
			let timeRatio	= 50;
			let dyRatio		= this.dy / timeRatio;
			let dxRatio		= this.dx / timeRatio;
			let cnt			= 0;
			while(willOverlap){
				if(this.isGoingRight)
					this.nextX -= dxRatio;	//Step back left
				else if(this.isGoingLeft)
					this.nextX += dxRatio;	//Step back right
				if(this.isGoingDown)
					this.nextY -= dyRatio;	//Step back up
				else if(this.isGoingUp)
					this.nextY += dyRatio;	//Step back down
				nextDistance	= this.distanceTo(otherBall.nextX, otherBall.nextY);
				willOverlap		= nextDistance < minDistance;
				cnt += 1;
				if(cnt === timeRatio){
					//Problem not solved;
					//We need to adjust the ball instead;
					this.nextY = this.yCord;
					this.nextX = this.xCord;
					break;
				}
			}//end while

			if(cnt === timeRatio){
				//Overlap problem not solved;
				if(this.canGoDown === false){
					if(this.canGoRight && this.canGoLeft)
						console.log('weird');
					if(this.canGoRight && this.dx === 0){
						this.accelerateBySize(true, false);
					}
					else if(this.canGoLeft && this.dx === 0){
						this.accelerateBySize(true, false);
					}
					//else, stuck
					return false;
				}
			}

			//Apply Kinetic Transfers & Friction
			otherBall.decelerate(this.friction, this.friction);
			this.decelerate(otherBall.friction, otherBall.friction);
			
			if(this.kineticLoss > 0 && this.kineticGain > 0){
				otherBall.accelerate(this.dx * this.kineticLoss, 0)
				otherBall.accelerate(0, this.dy * this.kineticLoss)
				this.dy			*= this.kineticGain;
				this.dx			*= this.kineticGain;
			}
		}//end i-for
		return true;
	}//End handleBallCollision()
	handleClick(){
		console.log('accelerating ball' + this.ballID);
		this.accelerate(5, 20);
		return true;
	}
	handleMovement(friction){
		//Set directions for next movement based off of current collisions;

		if(this.dy === 0){
			//Ball has no more momentum;
			if(this.isGoingUp){
				//Ball lost momentum, but is in the air; Ball comes back down;
				this.isGoingUp		= false;
				if(this.canGoDown){
					//We have a small bug here where momentum is still happening;
					this.isGoingDown	= true;
				}
				else{
					this.isGoingDown	= false;
				}
			}
			else if(this.isGoingDown){
				//Ball has no more momentum to go back up;
				this.isGoingUp = false;
				this.isGoingDown = false;
			}
			else{
				//Ball is just rolling and losing dx momentum;
				this.isGoingUp		= false;
				this.isGoingDown	= false;
				this.decelerate(friction, 0);
			}
		}
		else{
			//Ball Has Momenutm;
			if(this.canGoDown && this.canGoUp){
				//Ball can go anywhere and should follow its natural path;
				if(this.isGoingDown){
					this.isGoingUp		= false;	
					this.isGoingDown	= true;
				}
				else if(this.isGoingUp){
					this.isGoingUp		= true;
					this.isGoingDown	= false;
				}
				else{
					this.isGoingUp		= false;
					this.isGoingDown	= true;
				}
			}
			else if(this.canGoUp){
				//Ball has momentum and can go up;
				//Ball cannot go down;
				this.isGoingUp = true;
				this.isGoingDown = false;
			}
			else if(this.canGoDown){
				this.isGoingDown	= true;
				this.isGoingUp		= false
			}
			else{
				this.isGoingDown	= false;
				this.isGoingUp		= false;
				this.decelerate(friction, 0);
			}
		}
		//END up/down movements;
		if(this.dx <=0){
			//If Ball has no momentum, it can go in neither direction;
			//But if ball is "stuck", we need to give it a boost;
			if(this.canGoDown && this.gravity > 0){
				if(this.dx === 0){
					//this.accelerate(this.gravity*4, 0);
				}
				if(this.canGoRight){
					this.isGoingRight = true;
					this.isGoingLeft	= false;
				}
				else if(this.canGoLeft){
					this.isGoingRight = false;
					this.isGoingLeft	= true;
				}
			}
			else{
				this.isGoingRight = false;
				this.isGoingLeft	= false;
			}
		}
		else if(!this.isGoingRight && !this.isGoingLeft){
			//Ball had no momentum but just received momentum;
			if(this.canGoRight){
				this.isGoingRight	= true;
				this.isGoingLeft	= false;
			}
			else if(this.canGoLeft){
				this.isGoingLeft	= true;
				this.isGoingRight	= false;
			}
		}
		else if(this.canGoRight && this.canGoLeft){
			//Ball has momentum and can go its natural path;
			if(this.isGoingRight){
				this.isGoingRight	= true;
				this.isGoingLeft	= false;
			}
			else{
				this.isGoingLeft	= true;
				this.isGoingRight	= false;
			}
		}
		else if(this.canGoRight){
			//Ball has momentum but cannot go left;
			this.isGoingRight	= true;
			this.isGoingLeft	= false;
		}
		else if(this.canGoLeft){
			//Ball has momentum but cannot go right;
			this.isGoingLeft	= true;
			this.isGoingRight	= false;
		}
		else{
			this.isGoingRight	= false;
			this.isGoingLeft	= false;
		}

		if(this.isGoingUp && this.isGoingDown)
			console.log('ERROR: BALL CANNOT GO UP AND DOWN');
		if(this.isGoingLeft && this.isGoingRight){
			console.log('ERROR: BALL CANNOT GO LEFT AND RIGHT');
		}
	}//End handleMovement()
	handleRectangleInteractions(rectangle, screenWidth, screenHeight){
		//Handle rectangle objects
		let isOverlapping = rectangle.isOverLappingBall(this);
		if( isOverlapping === false)
			return;
		this.decelerate(rectangle.friction, rectangle.friction);

		//There is a collision;
		//Set the directions that this ball cannot go;
		if(this.nextX > rectangle.xCenter){
			//Current ball is right of rectangle
			this.canGoLeft = false;
		}
		else
			this.canGoRight = false;
		if(this.nextY > rectangle.yCenter){
			//Current ball is below of rectangle; 
			this.canGoUp = false;
		}
		else{
			this.canGoDown = false;
			if(this.dy === 0){
				//BUG: this never seems to happen
				//console.log('cant go back up');
				this.canGoUp = false;
			}
			this.nextY = rectangle.yTop + this.radius;
		}

		//Set canGo* flags, rewind time on next* coords;
		let timeRatio	= 50;
		let dyRatio		= this.dy / timeRatio;
		let dxRatio		= this.dx / timeRatio;
		let cnt			= 0;
		let isResolved	= true;
		while(isOverlapping){
			if(this.isGoingRight)
				this.nextX -= dxRatio;	//Step back left
			else if(this.isGoingLeft)
				this.nextX += dxRatio;	//Step back right
			if(this.isGoingDown)
				this.nextY -= dyRatio;	//Step back up
			else if(this.isGoingUp)
				this.nextY += dyRatio;	//Step back down
			isOverlapping = rectangle.isOverLappingBall(this);
			cnt += 1;
			if(cnt === timeRatio){
				//Problem not solved;
				//We need to adjust the ball instead;
				isResolved = false;
				break;
			}
		}//end while
		if(isResolved === false){
			this.nextY = this.yCord;
			this.nextX = this.xCord;
		}
	}//end handleRectangleInteractions()
	handleWallCollisions(maxWidth, maxHeight, friction){
		const willOverlapBottom	= this.hitBottom(maxHeight);
		const willOverlapTop		= this.hitTop(0);
		const willOverlapRight	= this.hitRight(maxWidth);
		const willOverlapLeft	= this.hitLeft(0);
		if(willOverlapTop && willOverlapBottom){
			//The screen is now to small for our ball;
			//This is now handles with  window resize;
		}
		else if(willOverlapBottom){
			this.decelerate(0, friction);
			if(this.dy === 0){
				this.canGoUp = false;
			}
			this.canGoDown = false;
			this.nextY = maxHeight - this.radius;
		}
		else if(willOverlapTop){
			this.decelerate(0, friction);
			this.canGoUp = false;
			this.nextY = 0 + this.radius;
		}
		else{
			//No collision
		}
		if(willOverlapRight && willOverlapLeft){
			//The screen is now to small for our ball;
			//We will just keep the ball at it's current place and stop all movemnt;
			//TODO: Handle this with window resize;
			this.nextX = this.xCord;
			this.nextY = this.yCord;
			this.dy = 0;
			this.dx = 0;
			console.log('WARNING: SCREEN NOT FITTED;');
		}
		else if(willOverlapRight){
			this.canGoRight = false;
			this.nextX = maxWidth - this.radius;
		}
		else if(willOverlapLeft){
			this.canGoLeft = false;
			this.nextX = 0 + this.radius;
		}
		else{
			//No collision
		}
	}//End handleWallCollision
	handleWindowResize(maxWidth, maxHeight, otherBalls, rectangles){
		if(this.yCord + this.radius > maxHeight){
			this.yCord = maxHeight - this.radius;
			this.accelerate(4, 10);
			this.shrink();
		}
		if(this.yCord - this.radius <= 0){
			this.shrink();
		}
		if(this.xCord + this.radius > maxWidth || this.xCord - this.radius < 0){
			if(this.xCord + this.radius > maxWidth)
				this.xCord = maxWidth - this.radius;
			else
				this.xCord = 0 + this.radius;
			this.accelerate(10, 4);
			this.shrink();
		}
		for(let i=0; i<otherBalls.length; i++){
			let otherBall = otherBalls[i];
			if(otherBall.ballID === this.ballID)
				continue;
			const isOverLapping	= this.isOverLappingBall(otherBall);
			if(isOverLapping)
				this.shrink();
		}//end i-for
		for(let i=0; i<rectangles.length; i++){
			const rectangle = rectangles[i];
			if(rectangle.isOverLappingBall(this)){
				//Need to find balls position relative to rectangle;
				//nearestX and nearestY are places on our rectangle;
				const nearestX = Math.max(
					rectangle.xLeft,
					Math.min(this.xCord, rectangle.xLeft+rectangle.width),
				);
				const nearestY = Math.max(
					rectangle.yTop,
					Math.min(this.xCord, rectangle.yTop+rectangle.height),
				);
				if(this.yCord + this.radius < nearestY){
					//Ball is above rectangle;
					//We need to adjust ball up;
					this.yCord = nearestY + this.radius;
				}
				else if(this.yCord - this.radius < nearestY){
					//Ball is below rectangle;
					//We need to adjust ball down;
					this.yCord = nearestY - this.radius;
				}
				if(this.xCord - this.radius > nearestX){
					//Ball is right of rectangle and needs to be adjusted right;
					this.xCord = nearestX + this.radius;
				}
				else if(this.xCord + this.radius < nearestX){
					//Ball is left of rectangle and needs to be adjusted left;
					this.xCord = nearestX - this.radius;
				}
				this.accelerate(6,6);
				this.shrink();
			}
		}//end i-for
		
	}//end handleWindowResize()
	hitBottom(maxHeight){
		const ballMaxBottom = this.nextY + this.radius;
		if(ballMaxBottom >= maxHeight)
			return true;
		return false;
	}
	hitLeft(minWidth){
		const ballMaxLeft = this.nextX - this.radius;
		if(ballMaxLeft <= minWidth)
			return true;
		return false;
	}

	hitTop(minHeight){
		const ballMaxTop = this.nextY - this.radius;
		if(ballMaxTop <= minHeight)
			return true;
		return false;
	}
	hitRight(maxWidth){
		const ballMaxRight = this.nextX + this.radius;
		if(ballMaxRight >= maxWidth)
			return true;
		return false;
	
	}
	isOverLappingBall(otherBall){
		const doesOverLap = isOverLapping(
			this.xCord, 
			this.yCord, 
			otherBall.nextX, 
			otherBall.nextY,
			this.radius + otherBall.radius
		);
		if(doesOverLap === false)
			return false;
		return true;
	}//end isOverLappingBall
	label(ctx){
		if(this.radius < 30)
			return;
		ctx.beginPath();
		if(!this.isGoingDown && !this.isGoingUp){
			if(!this.isGoingRight && !this.isGoingLeft){
				ctx.font      = "12px Arial";
				ctx.fillStyle = "white";
				ctx.fillText("Static"+this.ballID, this.xCord - this.radius+1, this.yCord+1);

				ctx.font      = "10px Arial";
				ctx.fillStyle = "white";
				ctx.fillText("dx:" + this.dx.toFixed(2), this.xCord - this.radius+10, this.yCord+10);

				ctx.font      = "10px Arial";
				ctx.fillStyle = "white";
				ctx.fillText("dy:" + this.dy.toFixed(2), this.xCord - this.radius+10, this.yCord+20);
			}
			else{
				ctx.font      = "12px Arial";
				ctx.fillStyle = "white";
				ctx.fillText("Rolling"+this.ballID, this.xCord - this.radius+1, this.yCord+1);
				if(this.isGoingRight){
					ctx.font      = "10px Arial";
					ctx.fillStyle = "white";
					ctx.fillText("Right", this.xCord - this.radius+10, this.yCord+10);
				}
				if(this.isGoingLeft){
					ctx.font      = "10px Arial";
					ctx.fillStyle = "white";
					ctx.fillText("Left", this.xCord - this.radius+10, this.yCord+10);
				}
				ctx.font      = "10px Arial";
				ctx.fillStyle = "white";
				ctx.fillText(this.dx.toFixed(2), this.xCord - this.radius+10, this.yCord+20);
			}
		}
		else{
			ctx.font      = "10px Arial";
			ctx.fillStyle = "white";
			ctx.fillText("Bouncing" + this.ballID, this.xCord - this.radius+1, this.yCord+1);
			if(this.isGoingDown){
				ctx.font      = "8px Arial";
				ctx.fillStyle = "white";
				ctx.fillText("Down: " + this.dy.toFixed(1), this.xCord - this.radius+13, this.yCord+10);
			}
			else{
				ctx.font      = "8px Arial";
				ctx.fillStyle = "white";
				ctx.fillText("Up: " + this.dy.toFixed(1), this.xCord - this.radius+13, this.yCord+10);
			}
			if(this.isGoingLeft){
				ctx.font      = "8px Arial";
				ctx.fillStyle = "white";
				ctx.fillText("Left: " + this.dx.toFixed(1), this.xCord - this.radius+13, this.yCord+22);
			}
			if(this.isGoingRight){
				ctx.font      = "8px Arial";
				ctx.fillStyle = "white";
				ctx.fillText("Right: " + this.dx.toFixed(1), this.xCord - this.radius+13, this.yCord+22);
			}
		}
		ctx.closePath();
	}//end label()
	move(sWidth, sHeight, wallFriction, rectangles, balls){
		//Assume we can go any direction first; Change values on `handle`*;
		//Reset canGo* properties for this iteration;
		this.resetSurroundings();
		
		//Set coordinates for next movment;
		this.setNextCoordinates();

		//See if next coordinates create any conflicts and if expected coordinates 
		//	will prevent us from going certain directions;
		for(let i=0; i<rectangles.length; i++){
			this.handleRectangleInteractions(
				rectangles[i], 
				sWidth, 
				sHeight
			);
		}
		this.handleWallCollisions(sWidth, sHeight, wallFriction);
		this.handleBallCollisions(balls);
		//Process final available movements; Update coords appropriately; Apply Gravity;
		this.handleMovement(wallFriction);
		this.updateCoordinates();
		this.applyGravity();
	}//end move()
	resetSurroundings(){
		this.canGoUp		= true;
		this.canGoDown		= true;
		this.canGoLeft		= true;
		this.canGoRight	= true;
	}
	setNextCoordinates(){
		//Update balls nextX and nextY according to previous movement;
		if(this.isGoingUp)
			this.nextY = this.yCord - this.dy;
		else if(this.isGoingDown)
			this.nextY = this.yCord + this.dy;
		if(this.isGoingLeft)
			this.nextX = this.xCord - this.dx;
		else if(this.isGoingRight)
			this.nextX = this.xCord + this.dx;
	}//end setNextCoordinates
	shrink(){
		//Destroy Ball
		this.radius	*= 0.9;
		this.setNextCoordinates();
	}
	updateCoordinates(){
		this.xCord = this.nextX;
		this.yCord = this.nextY;
	}
}//End Ball Class
