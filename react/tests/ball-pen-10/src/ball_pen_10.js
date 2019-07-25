'use strict';
const initRadius = 30;

class Ball{
	'use strict';
	constructor(properties){
		this.ballID			= properties.ballID;
		this.xCord			= properties.xCord;
		this.yCord			= properties.yCord;
		this.radius			= properties.radius;
		this.dx 				= properties.dx;
		this.dy				= properties.dy;
		this.color			= "blue";
		this.gravity		= 0.45;
		this.friction		= 0.05;
		this.kineticLoss	= 1/3;
		this.kineticGain	= 2/3;
		//Direction variables;
		this.isGoingRight	= true;
		this.isGoingDown	= true;
		this.isGoingLeft	= false;
		this.isGoingUp		= false;
		this.nextX			= this.xCord + this.dx;	//Ball starts going to the right;
		this.nextY			= this.yCord + this.dy;	//Ball starts going down;
		//Boundary variables;
		this.canGoLeft		= false;
		this.canGoRight	= false;
		this.canGoDown		= false;
		this.canGoUp		= false;
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
	}
	label(ctx){
		if(this.radius < 30)
			return;
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
	}//end label()
	updateCoordinates(){
		this.xCord = this.nextX;
		this.yCord = this.nextY;
	}
	applyGravity(){
		if(this.isGoingDown)
			this.dy += this.gravity;
		else if(this.isGoingUp)
			this.dy -= this.gravity;
		else if (this.canGoDown){
	//		console.log('BALL' + this.ballID + " CAN GO DOWN");
			this.dy += this.gravity;
		}
	}
	accelerate(){
		this.dx += 4 * this.gravity;
		this.dy += 20 * this.gravity;;
	}
	handleBoundaries(width, height, allBalls){
		const y 	= this.yCord;
		const xL	= this.xCord - this.dx;
		const xR	= this.xCord + this.dx;
		for(let i=0; i<allBalls.length; i++){
			let otherBall			= allBalls[i];
			if(otherBall === this)
				continue;
			const minDistance		= this.radius + otherBall.radius;
			const leftDistance	= this.distanceBetween(xL, y, otherBall.xCord, otherBall.yCord);
			const rightDistance	= this.distanceBetween(xR, y, otherBall.xCord, otherBall.yCord);
			if(rightDistance < minDistance && leftDistance < minDistance ){
				this.canGoDown = false;
				this.canGoUp = false;
			}
		}//end i-for
		if(y-this.radius <=0)
			this.canGoUp = false;
		if(y+this.radius >= height)
			this.canGoDown = false;
	}//end handleBoundaries
	handleBallCollisions(allBalls){
		//Find out if NEXT coordinates overlap anything;
		for(let i=0; i<allBalls.length; i++){
			if(this.ballID === allBalls[i].ballID)
				continue;
			let otherBall			= allBalls[i];
			const minDistance		= otherBall.radius + this.radius;
			let nextDistance		= this.distanceTo(otherBall.xCord, otherBall.yCord);
			let willOverlap		= nextDistance <= minDistance;
			if( !willOverlap ){
				continue;
			}

			//Set the directions that this ball cannot go;
			if(this.nextX > otherBall.xCord){
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
				nextDistance	= this.distanceTo(otherBall.xCord, otherBall.yCord);
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

			//Apply Kinetic Transfers & Friction
			otherBall.dy	-= this.friction;
			this.dy			-= this.friction
			otherBall.dx	-= this.friction;
			this.dx			-= this.friction
			this.dy			*= this.kineticGain;
			otherBall.dx	+= this.dx * this.kineticLoss;
			this.dx			*= this.kineticGain;
			otherBall.dy	+= this.dy * this.kineticLoss;
			
			if(otherBall.dx <= 0)
				otherBall.dx = 0;
			if(otherBall.dy <= 0)
				otherBall.dy = 0;
			if(this.dx <= 0)
				this.dx = 0;
			if(this.dy <= 0)
				this.dy = 0;
		}//end i-for
	}//End handleBallCollision()
	handleMovement(){
		//Set directions for next movement based off of current collisions;

		if(this.dy <=0){
			//Ball has no more momentum;
			this.dy = 0;
			if(this.isGoingUp){
				//Ball lost momentum, but is in the air; Ball comes back down;
				this.isGoingUp		= false;
				if(this.canGoDown){
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
				this.dx -= this.friction;
				if(this.dx < 0)
					this.dx = 0;
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
				this.dx -= this.friction;
				if(this.dx < 0)
					this.dx = 0;
			}
		}
		//END up/down movements;
		if(this.dx <=0){
			//If Ball has no momentum, it can go in neither direction;
			//But if ball is "stuck", we need to give it a boost;
			if(this.canGoDown){
				if(this.dx === 0)
					this.dx += this.gravity*4;	
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
	handleWallCollisions(maxWidth, maxHeight, friction){
		const willOverlapBottom	= this.hitBottom(maxHeight);
		const willOverlapTop		= this.hitTop();
		const willOverlapRight	= this.hitRight(maxWidth);
		const willOverlapLeft	= this.hitLeft();
		if(willOverlapTop && willOverlapBottom){
			//The screen is now to small for our ball;
			//We will just keep the ball at it's current place and stop all movemnt;
			//this.nextX = this.xCord;
			//this.nextY = this.yCord;
			//this.dy = 0;
			//this.dx = 0;
			//console.log('WARNING: SCREEN NOT FITTED;');
		}
		else if(willOverlapBottom){
			this.dy -= friction;
			if(this.dy < 0){
				this.dy = 0;
				this.canGoUp = false;
			}
			this.canGoDown = false;
			this.nextY = maxHeight - this.radius;
		}
		else if(willOverlapTop){
			this.dy -= friction;
			if(this.dy < 0)
				this.dy = 0;
			this.canGoUp = false;
			this.nextY = 0 + this.radius;
		}
		else{
			//No collision
		}
		if(willOverlapRight && willOverlapLeft){
			//The screen is now to small for our ball;
			//We will just keep the ball at it's current place and stop all movemnt;
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
	handleWindowResize(maxWidth, maxHeight){
		const ballBottom = this.yCord + this.radius;
		const ballTop    = this.yCord - this.radius;
		const ballRight  = this.xCord + this.radius;
		const ballLeft   = this.xCord - this.radius;
		if(ballBottom >= maxHeight){
			this.yCord = maxHeight - this.radius;
			this.accelerate();
			this.destruct();
		}
		else
			this.canGoDown = true;
		if(ballTop <= 0){
			this.yCord = 0 + this.radius;
			this.accelerate();
			this.destruct();
		}
		if(ballRight >= maxWidth){
			this.xCord = maxWidth - this.radius;
			this.destruct();
		}
		if(ballLeft <= 0){
			this.xCord = 0 + this.radius;
			this.destruct();
		}
	}//end handleWindowResize()
	distanceTo(x, y){
		const xDiff 	= this.nextX - x;
		const yDiff 	= this.nextY - y;
		const distance	= Math.sqrt(xDiff**2 + yDiff**2);
		return distance;
	}
	distanceBetween(x1, y1, x2, y2){
		const xDiff 	= x1-x2;
		const yDiff 	= y1-y2;
		const distance	= Math.sqrt(xDiff**2 + yDiff**2);
		return distance;
	}
	hitBottom(maxHeight){
		const ballMaxBottom = this.nextY + this.radius;
		if(ballMaxBottom >= maxHeight)
			return true;
		return false;
	
	}
	hitTop(){
		const ballMaxTop = this.nextY - this.radius;
		if(ballMaxTop <= 0)
			return true;
		return false;
	}
	hitRight(maxWidth){
		const ballMaxRight = this.nextX + this.radius;
		if(ballMaxRight >= maxWidth)
			return true;
		return false;
	
	}
	hitLeft(){
		const ballMaxLeft = this.nextX - this.radius;
		if(ballMaxLeft <= 0)
			return true;
		return false;
	}
	destruct(){
		//Destroy Ball
		this.radius	*= 0.8;
	}
}//End Ball Class
class BallPen extends React.Component{
   constructor(props){
      super(props);
      this.state      = {
         height: 0,
         width:  0,
      };
		this.balls    = [];
		this.friction = 1.0;
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
   }
   
   componentDidMount() {
      this.updateWindowDimensions();
      this.updateCanvas();
      this.timerID   = setInterval(
         ()=>this.updateCanvas(),
         25
      );
      window.addEventListener('resize', this.updateWindowDimensions);
   }
   componentWillUnmount(){
      clearInterval(this.timerID);
      window.removeEventListener('resize', this.updateWindowDimensions);
   }
   componentDidUpdate() {
      this.updateCanvas();
   }

   updateWindowDimensions() {
      let width   = window.innerWidth;
      if (width && width >575)
         width -= 320;   //Buffer for not x-small
      else
         width -= 120;   //Buffer for x-small
      let height   = window.innerHeight;
      height   -= 280;   //Buffer...
      if (height < 0)
         height = 0;
      this.setState({
         width: width, 
         height: height
      });

		//Move balls around if conflict;
		//Change radius if conflict;
		for(let i=0; i<this.balls.length; i++){
			let ball			= this.balls[i];
			let ballBottom	= ball.yCord + ball.radius;
			let ballTop		= ball.yCord - ball.radius;
			if(ballBottom > height){
				ball.yCord = height - ball.radius;
				ball.accelerate();
				ball.radius *= 0.9;
			}
			if(ballTop <= 0){
				ball.radius *= 0.9;
			}
			for(let j=i+1; j<this.balls.length; j++){
				let otherBall = this.balls[j];
				const minDistance = ball.radius + otherBall.radius;
				const curDistance	= ball.distanceBetween(
					ball.xCord,
					ball.yCord,
					otherBall.xCord,
					otherBall.yCord,
				);
				if(curDistance < minDistance)
					ball.radius *= 0.9;
			}
		}//end i-for
      return;
   }
   updateCanvas(){
      const canvas   = this.canvasRef;
      const ctx      = canvas.getContext('2d');
      ctx.beginPath();
      ctx.rect(0,0, this.state.width, this.state.height);
      ctx.fillStyle = "#FF0000";
      ctx.fill();
		if(this.state.width !== 0){
			if(this.balls.length === 0){
				// Init first ball
				this.balls.push(
					new Ball({
						ballID:	0,
						xCord:	41,
						yCord:	41,
						radius:	initRadius,
						dx: 		2,
						dy:		2
					})
				);
			}// End first ball init;
			for(let i=0; i<this.balls.length; i++){
				let ball	= this.balls[i];

				//Assume we can go any direction first; Change values on `handle`*;
				ball.canGoUp		= true;
				ball.canGoDown		= true;
				ball.canGoLeft		= true;
				ball.canGoRight	= true;

				//Set wanted coordinates based off of previous movement;
				if(ball.isGoingUp)
					ball.nextY = ball.yCord - ball.dy;
				else if(ball.isGoingDown)
					ball.nextY = ball.yCord + ball.dy;
				if(ball.isGoingLeft)
					ball.nextX = ball.xCord - ball.dx;
				else if(ball.isGoingRight)
					ball.nextX = ball.xCord + ball.dx;
				
				//See if expected coordinates will prevent us from going certain directions;
				ball.handleBoundaries(this.state.width, this.state.height, this.balls);
				ball.handleWallCollisions(this.state.width, this.state.height, this.friction);
				ball.handleBallCollisions(this.balls);

				ball.handleMovement();

				ball.updateCoordinates();
				ball.applyGravity();

				ball.draw(ctx);
				ball.label(ctx);
			}//end i-for
		}//end if state.width clarity check;
   }

   render(){
      const penStyle   = {
         border:   "1px solid #000000"
      };
      return (
         <div>
            <canvas
               ref={canvas => this.canvasRef = canvas}
               width={this.state.width}
               height={this.state.height}
               style={penStyle}
					onClick={e =>{
							const rect = this.canvasRef.getBoundingClientRect();
							const xMousePos	= e.clientX;
							const yMousePos	= e.clientY;
							const xCanvasPos	= xMousePos - rect.left;
							const yCanvasPos	= yMousePos - rect.top;
							let isLegalBall	= true;	//Will try to make false;
							let didClickBall	= false;
							for(let i=0; i<this.balls.length; i++){
								//See if ball is clicked;
								//If ball not clicked, see if new ball is still possible;
								const ball			= this.balls[i];
								const xBall			= ball.xCord;
								const yBall			= ball.yCord;
								const xDiff			= xCanvasPos - xBall;
								const yDiff			= yCanvasPos - yBall;
								const radius		= this.balls[i].radius;
								const ballMouseDistance	= Math.sqrt(xDiff**2 + yDiff**2);
								const clickedBall			= ballMouseDistance <= radius;
								if (isLegalBall)
									isLegalBall = ballMouseDistance >= (radius + initRadius);
								if(clickedBall){
									ball.accelerate();
									didClickBall = true;
									break;
								}
							}//end i-for
							if(isLegalBall){
								//Check with top, bottom, and sides;
								if (xCanvasPos - initRadius < 0)
									isLegalBall = false;
								else if (xCanvasPos + initRadius > this.state.width)
									isLegalBall = false;
								else if (yCanvasPos - initRadius < 0)
									isLegalBall = false;
								else if (yCanvasPos + initRadius > this.state.height)
									isLegalBall = false;
							}
							if(!didClickBall){
								//Make new ball;
								if(isLegalBall){
									console.log('Making new ball' + this.balls.length)
									const newBall	= new Ball({
										ballID:	this.balls.length,
										xCord:	xCanvasPos,
										yCord:	yCanvasPos,
										radius:	initRadius,
										dx: 		2,
										dy:		2
									});
									this.balls.push(newBall);
								}
								else
									console.log('Not legal ball');
							}
						}
					}
            />
         </div>
      );
   }
}

ReactDOM.render(
	<BallPen />,
	document.getElementById('ball-pen-10')
);
