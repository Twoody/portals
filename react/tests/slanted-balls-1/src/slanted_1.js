'use strict';
const initRadius			= 30;
const initWallFriction	= 0.075;
const initBallFriction	= 0.05;
const initGravity			= 0.45;
const initKineticLoss	= 1/3;
const initKineticGain	= 2/3;
const rectangleColor		= "black";
const initBallCnt			= 1;
function getRandomColor(){
	let red		= Math.floor(Math.random() * 3) * 127;
	let green	= Math.floor(Math.random() * 3) * 127;
	let blue		= Math.floor(Math.random() * 3) * 127;
	let rc		= "rgb(" + red + ", " + green + ", " + blue + ")";
	return rc;
}
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function areRectangleAndBallColliding(rectangle, ball){
	let xDistance = Math.abs(ball.xCord - rectangle.xCenter);
	let yDistance = Math.abs(ball.yCord - rectangle.yCenter);
	const xMinDistance = rectangle.width/2 + ball.radius;
	const yMinDistance = rectangle.height/2 + ball.radius;
	if(xDistance > xMinDistance || yDistance > yMinDistance)
		return false;
	if(xDistance <=  rectangle.width/2)
		return true;
	if(yDistance <=  rectangle.height/2)
		return true;
	//Check if corner collision using pythagorean theoem;
	const xDistanceDiff = xDistance - rectangle.width/2;
	const yDistanceDiff = yDistance - rectangle.height/2;
	const radiusSquared = ball.radius**2;
	if(yDistanceDiff**2 + xDistanceDiff**2 <= radiusSquared)
		return true;
	return false;
}
function isOverLapping(x1, y1, x2, y2, minDistance){
	//Use Pythagorean Theorem to determine if points collide;
	//minDistance will form the right angle of the triangle;
	const xDiff = x1-x2;
	const yDiff = y1-y2;
	if(xDiff**2 + yDiff**2 >= minDistance**2)
		return true;
	return false;
}
class BallPen extends React.Component{
   constructor(props){
      super(props);
      this.state      = {
         height: 0,
         width:  0,
			hasGravity:				true,
			hasWallFriction:		true,
			hasBallFriction:		true,
			hasKineticTransfer:	true,
			isLeavingTrails:		false,
			isShowingLabels:		false,
      };
		this.balls			= [];
		this.rectangles	= [];
		this.friction = initWallFriction;
      this.updateWindowDimensions	= this.updateWindowDimensions.bind(this);
		this.handleInputChange			= this.handleInputChange.bind(this);
		this.shrinkBalls					= this.shrinkBalls.bind(this);
		this.accelerateBalls				= this.accelerateBalls.bind(this);
		this.decelerateBalls				= this.decelerateBalls.bind(this);
		this.resetBalls					= this.resetBalls.bind(this);
   }
	getMiddleOfCanvas(){
		let cords = {};
		cords.x = this.state.width/2;
		cords.y = this.state.height/2;
		return cords;
	}
	initRectangles(){
		const middleCords	= this.getMiddleOfCanvas();
		const width			= 200;
		const height		= 10;
		const xLeft			= middleCords.x - width/2;
		const yTop			= middleCords.y - height/2;
		const rectangle	= new Rectangle({
			rectID:	0,
			color:	'white',
			xLeft:	xLeft,
			yTop:		yTop,
			width:	width,
			height:	height,
		});
		this.rectangles.push(rectangle);
	}
	updateBackground(){
     	const canvas   = this.canvasRef;
     	const ctx      = canvas.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = rectangleColor;
		ctx.fillRect(0,0, this.state.width, this.state.height);
		ctx.closePath();
		for(let i=0; i<this.rectangles.length; i++){
			let rectangle = this.rectangles[i];
			rectangle.draw(ctx);
		}
	}
	initDisplay(){
		this.initRectangles();
		this.setState({
			hasGravity:				true,
			hasWallFriction:		true,
			hasBallFriction:		true,
			hasKineticTransfer:	true,
			isLeavingTrails:		false,
			isShowingLabels:		true,
		});
		for(let i=0; i<initBallCnt; i++){
			//Going to make 100 small balls and accelerate them;
			let newBall = this.makeRandomBall();
			let cnt		= 0;
			while(newBall === false){
				newBall = this.makeRandomBall();
				cnt += 1;
				if(cnt === 50)
					return false;
			}
			this.balls.push(newBall);
		}//end i-for

		this.setState({
			ballCnt: initBallCnt
		});
		return true;
	}//End initDisplay
	makeRandomBall(){
		const randomRadius	= getRandomInt(30,30);
		const randomX			= getRandomInt(0+randomRadius, this.state.width  - randomRadius);
		const randomY			= getRandomInt(0+randomRadius, this.state.height - randomRadius);
		const randomDX			= getRandomInt(5, 7);
		const randomDY			= getRandomInt(5, 7);
		for(let i=0; i<this.balls.length; i++){
			const otherBall = this.balls[i];
			const minDistance		= otherBall.radius + randomRadius;
			const currDistance	= otherBall.distanceTo(randomX, randomY);
			if(currDistance < minDistance){
				return false;
			}
		}
		const newBall	= new Ball({
			ballID:	this.balls.length,
			color:	getRandomColor(),
			xCord:	randomX,
			yCord:	randomY,
			radius:	randomRadius,
			dx: 		randomDX,
			dy:		randomDY,
		});
		for(let i=0; i<this.rectangles.length; i++){
			let rectangle = this.rectangles[i];
			if(rectangle.isOverLappingBall(newBall))
				return false;
		}//end i-for
		return newBall;
	}//end makeRandomBall
	handleInputChange(event) {
		const target	= event.target;
		const value		= target.type === 'checkbox' ? target.checked : target.value;
		const name		= target.name;

		//Makes a POST element on submit;
		this.setState({
			[name]: value
		});
	}
	handleCanvasClick(canvas, xClick, yClick){
		const rect			= canvas;
		const xMousePos	= xClick;
		const yMousePos	= yClick;;
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
				ball.accelerate(4*initGravity, 20*initGravity);
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
					color:	getRandomColor(),
					xCord:	xCanvasPos,
					yCord:	yCanvasPos,
					radius:	initRadius,
					dx: 		2,
					dy:		2
				});
				this.balls.push(newBall);
				this.setState({
					ballCnt: this.state.ballCnt + 1,
				});
			}
			else
				console.log('Not legal ball');
		}
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
				ball.accelerate(4*initGravity, 20*initGravity);
				ball.shrink();
			}
			if(ballTop <= 0){
				ball.shrink();
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
					ball.shrink();
			}
		}//end i-for
		if(this.state.isLeavingTrails === true && width && width >575){
			//Do not change the size if on mobile;
			this.updateBackground();
		}
      return;
   }
   updateCanvas(){
      const canvas   = this.canvasRef;
      const ctx      = canvas.getContext('2d');
		if(this.state.width !== 0){
			if(this.balls.length === 0){
				this.updateBackground();
				this.initDisplay();
			}// End first ball init;
			if(this.state.isLeavingTrails === false){
				this.updateBackground();
			}
		}//end if state.width clarity check;
		for(let i=0; i<this.balls.length; i++){
			let ball	= this.balls[i];
			if(!this.state.hasWallFriction)
				this.friction = 0;
			else
				this.friction = initWallFriction;

			if(!this.state.hasBallFriction)
				ball.friction = 0;
			else
				ball.friction = initBallFriction;

			if(!this.state.hasKineticTransfer){
				ball.kineticGain = 1;
				ball.kineticLoss = 0;
			}
			else{
				ball.kineticLoss	= initKineticLoss;
				ball.kineticGain	= initKineticGain;
			}
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
			
			for(let j=0; j<this.rectangles.length; j++){
				//Handle rectangle objects
				let rectangle	= this.rectangles[j];
				let ballBottomOverLapsTop	= ball.nextY + ball.radius >= rectangle.yTop;
				let ballTopOverLapsBottom	= ball.nextY - ball.radius <= rectangle.yBottom;
				//Process Up/Down 
				if(ball.nextY + ball.radius >= rectangle.yBottom){
					ballBottomOverLapsTop = false;
				}
				if(ball.nextY - ball.radius <= rectangle.yTop){
					ballTopOverLapsBottom = false;
				}
				if(ball.nextX-ball.radius >= rectangle.xRight){
					//Is the ball within the rectangle bounds
					ballBottomOverLapsTop = false;
					ballTopOverLapsBottom = false;
				}
				else if(ball.nextX+ball.radius <= rectangle.xLeft){
					//Is the ball within the rectangle bounds
					ballBottomOverLapsTop = false;
					ballTopOverLapsBottom = false;
				}
				if(ballBottomOverLapsTop){
					ball.nextY		= rectangle.yTop - ball.radius;
					ball.canGoDown = false;
				}
				else if(ballTopOverLapsBottom){
					ball.nextY		= rectangle.yBottom + ball.radius;
					ball.canGoUp	= false;
				}

				//Process Left/Right
				let ballRightOverLapsLeft = ball.nextX + ball.radius >= rectangle.xLeft;
				let ballLeftOverLapsRight = ball.nextX - ball.radius >= rectangle.xRight;
				if(ball.nextX + ball.radius >= rectangle.xLeft){
					ballRightOverLapsLeft = false;
				}
				if(ball.nextX - ball.radius >= rectangle.xLeft){
					ballLeftOverLapsRight = false;
				}

				if(ball.nextY-ball.radius >= rectangle.yBottom){
					ballRightOverLapsLeft = false;
					ballLeftOverLapsRight = false;
				}
				else if(ball.nextYr+ball.radius <= rectangle.yTop){
					ballRightOverLapsLeft = false;
					ballLeftOverLapsRight = false;
				}
				
				if(ballRightOverLapsLeft){
					ball.nextX		= rectangle.xLeft - ball.radius;
					ball.canGoLeft	= false;
				}
				else if(ballLeftOverLapsRight){
					ball.nextX		= rectangle.xRight + ball.radius;
					ball.canGoRight	= false;
				}
			}//end j-for



			//See if expected coordinates will prevent us from going certain directions;
			ball.handleBoundaries(this.state.width, this.state.height, this.balls);
			ball.handleWallCollisions(this.state.width, this.state.height, this.friction);
			ball.handleBallCollisions(this.balls);

			ball.handleMovement(this.friction);
			ball.updateCoordinates();
			if( this.state.hasGravity ){
				ball.gravity = initGravity;
				ball.applyGravity();
			}
			else{
				ball.gravity = 0;
			}

			ball.draw(ctx);
			if(this.state.isShowingLabels)
				ball.label(ctx);
		}//end i-for
   }//End updateCanvas()
	shrinkBalls(event){
		for(let i=0; i<this.balls.length; i++){
			if(Math.random() >=0.5)
				this.balls[i].shrink();
		}//end i-for
	}//end shrinkBalls
	accelerateBalls(event){
		for(let i=0; i<this.balls.length; i++){
			this.balls[i].accelerate( getRandomInt(5,12), getRandomInt(10,20) );
		}//end i-for
	}//end accelerateBalls
	decelerateBalls(event){
		for(let i=0; i<this.balls.length; i++){
			this.balls[i].decelerate( getRandomInt(1,5), getRandomInt(5,10) );
		}//end i-for
	}//end accelerateBalls
	resetBalls(event){
		this.balls							= [];
		this.setState({
			hasGravity:				true,
			hasWallFriction:		true,
			hasBallFriction:		true,
			hasKineticTransfer:	true,
			isLeavingTrails:		false,
			isShowingLabels:		true,
		});
		let newBall = this.makeRandomBall();
		newBall.radius = 30;
		newBall.color = "blue";
		this.balls.push(newBall);
		this.setState({
			ballCnt: 1
		});
	}//end resetBalls

   render(){
      const penStyle		= {
         border:   "1px solid #000000"
      };
		const totalStyle	= {
			textAlign: "right"
		};
      return (
         <div>
				<p style={totalStyle}>
					Ball Count: {this.state.ballCnt}
				</p>
            <canvas
               ref={canvas => this.	canvasRef = canvas}
               width={this.state.width}
               height={this.state.height}
               style={penStyle}
					onClick={e => {
						const canvas	= this.canvasRef.getBoundingClientRect();
						const xClick	= e.clientX;
						const yClick	= e.clientY;
						this.handleCanvasClick(canvas, xClick, yClick);
					}}
            />
				<table width={this.state.width}>
					<tbody>
					<tr>
						<td>
							<label>
								Has Gravity:&nbsp;&nbsp;
								<input
									name="hasGravity"
									type="checkbox"
									checked={this.state.hasGravity}
									onChange={this.handleInputChange} />
							</label>
						</td>
						<td>
							<label>
								Has Wall Friction:&nbsp;&nbsp;
								<input
									name="hasWallFriction"
									type="checkbox"
									checked={this.state.hasWallFriction}
									onChange={this.handleInputChange} />
							</label>
						</td>
						<td>
							<label>
								Has Ball Friction:&nbsp;&nbsp;
								<input
									name="hasBallFriction"
									type="checkbox"
									checked={this.state.hasBallFriction}
									onChange={this.handleInputChange} />
							</label>
						</td>
					</tr>
					<tr>
						<td>
							<label>
								Has Kinetic Transfer:&nbsp;&nbsp;
								<input
									name="hasKineticTransfer"
									type="checkbox"
									checked={this.state.hasKineticTransfer}
									onChange={this.handleInputChange} />
							</label>
						</td>
						<td>
							<label>
								Leave Trails:&nbsp;&nbsp;
								<input
									name="isLeavingTrails"
									type="checkbox"
									checked={this.state.isLeavingTrails}
									onChange={this.handleInputChange} />
							</label>
						</td>
						<td>
							<label>
								Turn on Lables:&nbsp;&nbsp;
								<input
									name="isShowingLabels"
									type="checkbox"
									checked={this.state.isShowingLabels}
									onChange={this.handleInputChange} />
							</label>

						</td>
					</tr>
					<tr>
						<td>
							<button onClick={this.shrinkBalls}>
								Shrink Some Balls
							</button>
						</td>
						<td>
							<button onClick={this.accelerateBalls}>
								Accelerate Balls
							</button>
						</td>
						<td>
							<button onClick={this.decelerateBalls}>
								Decelerate Balls
							</button>
						</td>
					</tr>
					<tr>
						<td>
							<button onClick={this.resetBalls}>
								Reset Balls
							</button>
						</td>
					</tr>
					</tbody>
				</table>

         </div>
      );
   }
}

ReactDOM.render(
	<BallPen />,
	document.getElementById('slanted-1')
);
