'use strict';
class Ball{
	constructor(properties){
		this.canvas			= properties.canvas;
		this.ballID			= properties.ballID;
		this.xCord			= properties.xCord;
		this.yCord			= properties.yCord;
		this.radius			= properties.radius;
		this.dx 				= properties.dx;
		this.dy				= properties.dy;
		this.color			= "blue";
		this.nextX			= this.xCord + this.dx;
		this.nextY			= this.yCord + this.dy;
		this.gravity		= 0.05;
		this.friction		= 0.05
		this.isGoingRight	= true;
		this.isGoingDown	= true;
		this.isStatic		= false;
	}
	draw(){
		const ctx = this.canvas.getContext('2d');
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
	updateCoordinates(){
		this.xCord = this.nextX;
		this.yCord = this.nextY;
	}
	applyGravity(){
		if(this.isGoingDown)
			this.dy += this.gravity;
		else
			this.dy -= this.gravity;
	}
	accelerate(){
		this.dx += 2;
		this.dy += 2;
	}
	handleWindowResize(maxWidth, maxHeight){
		const ballBottom = this.yCord + this.radius;
		const ballTop    = this.yCord - this.radius;
		const ballRight  = this.xCord + this.radius;
		const ballLeft   = this.xCord - this.radius;
		if(ballBottom >= maxHeight)
			this.yCord = maxHeight - this.radius;
		if(ballTop <= 0)
			this.yCord = 0 + this.radius;
		if(ballRight >= maxWidth)
			this.xCord = maxWidth - this.radius;
		if(ballLeft <= 0)
			this.xCord = 0 + this.radius;
	}//end handleWindowResize()
	handleWallCollisions(maxWidth, maxHeight, friction){
		const willOverlapBottom	= this.hitBottom(maxHeight);
		const willOverlapTop		= this.hitTop();
		const willOverlapRight	= this.hitRight(maxWidth);
		const willOverlapLeft	= this.hitLeft();
		if(willOverlapTop && willOverlapBottom){
			//The screen is now to small for our ball;
			//We will just keep the ball at it's current place and stop all movemnt;
			this.nextX = this.xCord;
			this.nextY = this.yCord;
			this.dy = 0;
			this.dx = 0;
			console.log('WARNING: SCREEN NOT FITTED;');
		}
		else if(willOverlapBottom){
			this.dy -= friction;
			if(this.dy <= 0){
				this.dy = 0;
				this.isGoingDown = true;
			}
			else
				this.isGoingDown = false;
			this.nextY = maxHeight - this.radius;
		}
		else if(willOverlapTop){
			this.dy += friction;
			this.isGoingDown = true;
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
			this.isGoingRight = false;
			this.nextX = maxWidth - this.radius;
		}
		else if(willOverlapLeft){
			this.isGoingRight = true;
			this.nextX = 0 + this.radius;
		}
		else{
			//No collision
		}
	}
	handleBallCollisions(allBalls){
		//Find out if NEXT coordinates overlap anything;
		for(let i=0; i<allBalls.length; i++){
			if(this.ballID === allBalls[i].ballID)
				continue;
			let otherBall			= allBalls[i];
			const minDistance		= otherBall.radius + this.radius;
			let nextDistance		= this.distanceTo(otherBall.xCord, otherBall.yCord);
			let willOverlap		= nextDistance < minDistance;
			if( !willOverlap )
				continue;
			//Else, we will need to adjust the next coordinates so that they do not 
			//	overlap otherBall;
			//We can do this by taking the ratio of dx and dy changes and "step back"
			//	through time until we find a place the balls no longer overlap;
			let timeRatio	= 100;
			let dyRatio		= this.dy / timeRatio;
			let dxRatio		= this.dx / timeRatio;
			let cnt			= 0;
			while(willOverlap){
				if(this.isGoingRight)
					this.nextX -= dxRatio;	//Step back left
				else
					this.nextX += dxRatio;	//Step back right
				if(this.isGoingDown)
					this.nextY -= dyRatio;	//Step back up
				else
					this.nextY += dyRatio;	//Step back down
				nextDistance	= this.distanceTo(otherBall.xCord, otherBall.yCord);
				willOverlap		= nextDistance < minDistance;
				cnt += 1;
				if(cnt === timeRatio){
					this.nextX = this.xCord;
					this.nextY = this.yCord;
					break;
				}
			}//end while

			//Change directions of balls for next iteration;
			if(this.isGoingRight !== otherBall.isGoingRight)
				otherBall.isGoingRight = !otherBall.isGoingRight;
			this.isGoingRight = !this.isGoingRight;
			if(this.isGoingDown){
				if(!otherBall.isGoingDown){
					//Current ball needs to go up
					this.isGoingDown			= false;
					otherBall.isGoingDown	= true;
				}
				else{
					//Both balls are going down
					//TODO:
					//Make sure that the ball that ball on bottom is going 
					//	faster than the ball on top;
					if(otherBall.isStatic)
						this.isGoingDown = false;
					else
						this.isGoingDown = true;
					otherBall.isGoingDown = true;
				}
			}
			else{
				if(otherBall.isGoingDown){
					//Current ball is going up; Other ball is going down
					//Upon collision, change directions;
					this.isGoingDown			= true;
					otherBall.isGoingDown	= false;
				}
				else{
					//Current ball is going down; other Ball is going up;
					//Upon collision, change directions;
					this.isGoingDown			= false;
					otherBall.isGoingDown	= true;
				}
			}
			
			//Apply friction between balls
			if(this.dx){
				this.dx -= otherBall.friction;
				if(this.dx < 0)
					this.dx = 0;
			}
			if(otherBall.dx){
				otherBall.dx -= this.friction;
				if(otherBall.dx < 0)
					otherBall.dx = 0;
			}
			if(this.dy){
				this.dy -= otherBall.friction;
			}
			if(otherBall.dy){
				otherBall.dy -= this.friction;
			}
		}//end i-for
	}
	distanceTo(x, y){
		const xDiff 	= this.nextX - x;
		const yDiff 	= this.nextY - y;
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
	isBouncing(maxHeight, allBalls){
		const ballMaxBottom = this.yCord + this.radius;
		if(ballMaxBottom >= maxHeight && this.dy <= 0){
			//Positive dy implies ball still wants to go down;
			//If we are on the bottom, the ball can no longer go down;
			this.isGoingDown = true;
			return false;
		}
		return true;
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
		this.friction = 0.1;
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
		for(let i=0; i<this.balls.length; i++){
			let ball = this.balls[i];
			ball.handleWindowResize(width, height);
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
						canvas:	canvas,
						ballID:	0,
						xCord:	41,
						yCord:	41,
						radius:	30,
						dx: 		2,
						dy:		2
					})
				);
			}// End first ball init;
			for(let i=0; i<this.balls.length; i++){
				let ball	= this.balls[i];
				const isBouncing	= ball.isBouncing(this.state.height, this.balls);
				if( !ball.isGoingDown && ball.dy <= 0)
					ball.isGoingDown = true;
				if( !isBouncing && ball.dx === 0 ){
					//Ball is static;
					ball.isStatic = true;
					ball.draw();
					ctx.font      = "15px Arial";
					ctx.fillStyle = "white";
					ctx.fillText("Static", ball.xCord-ball.radius+1, ball.yCord+1);
					ball.dy = 0;
					ball.dx = 0;
					ball.nextY = ball.yCord;
					ball.nextX = ball.xCord;
					continue;
				}
				else if( !isBouncing ){
					ball.nextY = ball.yCord + ball.dy;
					if(ball.isGoingRight)
						ball.nextX = ball.xCord + ball.dx;
					else
						ball.nextX = ball.xCord - ball.dx;
					//Ball is rolling; Apply friction;
					ball.dx -= this.friction;
					if(ball.dx < 0)
						ball.dx = 0;
					ball.dy = 0;
					ball.handleWallCollisions(this.state.width, this.state.height, this.friction);
					ball.handleBallCollisions(this.balls);
					ball.updateCoordinates();
					ball.draw();
					ctx.font      = "15px Arial";
					ctx.fillStyle = "white";
					ctx.fillText("Rolling", ball.xCord-ball.radius+1, ball.yCord+1);
				}
				else{
					ball.applyGravity();
					if(ball.isGoingDown)
						ball.nextY = ball.yCord + ball.dy;
					else
						ball.nextY = ball.yCord - ball.dy;
					if(ball.isGoingRight)
						ball.nextX = ball.xCord + ball.dx;
					else
						ball.nextX = ball.xCord - ball.dx;
					ball.handleWallCollisions(this.state.width, this.state.height, this.friction);
					ball.handleBallCollisions(this.balls);
					ball.updateCoordinates();
					ball.draw();
					ctx.font      = "12px Arial";
					ctx.fillStyle = "white";
					ctx.fillText("Bouncing", ball.xCord-ball.radius+1, ball.yCord+1);
				}
			}//end i-for
		}
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
							const radius		= this.balls[0].radius;
							let isLegalBall	= true;
							let didClickBall	= false;
							for(let i=0; i<this.balls.length; i++){
								const ball			= this.balls[i];
								const xBall			= ball.xCord;
								const yBall			= ball.yCord;
								const xDiff			= xCanvasPos - xBall;
								const yDiff			= yCanvasPos - yBall;
								const ballMouseDistance	= Math.sqrt(xDiff**2 + yDiff**2);
								const clickedBall = ballMouseDistance <= radius;
								if (isLegalBall)
									isLegalBall			= ballMouseDistance >= (radius*2);
								if(clickedBall){
									ball.accelerate();
									didClickBall	= true;
									break;
								}
							}//end i-for
							if(isLegalBall){
								//Check with top, bottom, and sides;
								if (xCanvasPos - radius < 0)
									isLegalBall = false;
								else if (xCanvasPos + radius > this.state.width)
									isLegalBall = false;
								else if (yCanvasPos - radius < 0)
									isLegalBall = false;
								else if (yCanvasPos + radius > this.state.height)
									isLegalBall = false;
							}
							if(!didClickBall){
								//Make new ball;
								if(isLegalBall){
									console.log('Making new ball' + this.balls.length)
									const canvas	= this.canvasRef;
									const newBall	= new Ball({
										canvas:		canvas,
										ballID:		this.balls.length,
										xCord:		xCanvasPos,
										yCord:		yCanvasPos,
										radius:	30,
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
	document.getElementById('ball-pen-6')
);
