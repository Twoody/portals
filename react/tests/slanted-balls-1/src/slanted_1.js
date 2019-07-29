'use strict';
const MIN_RADIUS			= 1;
const MAX_RADIUS			= 3;
const WALL_FRICTION		= 0.075;
const BALL_FRICTION		= 0.05;
const GRAVITY				= 0.45;
const KINETIC_LOSS		= 0.15;
const KINETIC_KEEP		= 0.85;
const BACKGROUND_COLOR	= "black";
const MAX_SPEED			= MAX_RADIUS * 2;
const initBallCnt			= 85;
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
function writeToScreen(ctx, msg, x, y, color="black"){
	ctx.beginPath();
	ctx.font      = "25px Arial";
	ctx.fillStyle = color;
	ctx.fillText(msg, x, y);
	ctx.closePath();
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
		this.balls				= [];
		this.rectangles		= [];
		this.middleRectangle	= null;
		this.friction			= WALL_FRICTION;
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
	updateMiddleRectangle(){
		const middleCords	= this.getMiddleOfCanvas();
		const width			= 110;
		const height		= 30;
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
		this.middleRectangle = rectangle;
	}//end updateMiddleRectangle()
	updateBackground(){
     	const canvas	= this.canvasRef;
     	let ctx			= canvas.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = BACKGROUND_COLOR;
		ctx.fillRect(0, 0, this.state.width, this.state.height);
		ctx.closePath();
		for(let i=0; i<this.rectangles.length; i++){
			let rectangle = this.rectangles[i];
			rectangle.draw(ctx);
		}//end i-for
	}
	initDisplay(){
		this.setState({
			hasGravity:				false,
			hasWallFriction:		false,
			hasBallFriction:		false,
			hasKineticTransfer:	false,
			isLeavingTrails:		false,
			isShowingLabels:		true,
		});
		for(let i=0; i<initBallCnt; i++){
			//Make new balls;
			let newBall = this.makeRandomBall();
			let cnt		= 0;
			while(newBall === false){
				newBall = this.makeRandomBall();
				cnt += 1;
				if(cnt === 50)
					return false;
			}
			newBall.maxSpeed = MAX_SPEED;;
			this.balls.push(newBall);
		}//end i-for

		this.setState({
			ballCnt: initBallCnt
		});
		return true;
	}//End initDisplay
	makeRandomBall(){
		//Return false if random ball fails;
		//Else return random ball;
		let randomRadius	= getRandomInt(MIN_RADIUS, MAX_RADIUS);
		randomRadius += getRandomInt(1,99) * 0.01;
		const randomX			= getRandomInt(0+randomRadius, this.state.width  - randomRadius);
		const randomY			= getRandomInt(0+randomRadius, this.state.height - randomRadius);
		const randomDX			= getRandomInt(1, 20) * 0.01;
		const randomDY			= getRandomInt(1, 20) * 0.01;
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
		if(this.balls.length %4 === 0){
			newBall.isGoingLeft	= true;
			newBall.isGoingRight	= false;
			newBall.isGoingDown	= true;
			newBall.isGoingUp		= false;
		}
		else if(this.balls.length %4 === 1){
			newBall.isGoingLeft	= true;
			newBall.isGoingRight	= false;
			newBall.isGoingDown	= false;
			newBall.isGoingUp		= true;
		}
		else if(this.balls.length %4 === 2){
			newBall.isGoingLeft	= false;
			newBall.isGoingRight	= true;
			newBall.isGoingDown	= false;
			newBall.isGoingUp		= true;
		}

		for(let i=0; i<this.rectangles.length; i++){
			let rectangle = this.rectangles[i];
			if(rectangle.isOverLappingBall(newBall))
				return false;
		}//end i-for
		if(this.middleRectangle.isOverLappingBall(newBall))
			return false;
		newBall.maxSpeed = MAX_SPEED;
		return newBall;
	}//end /akeRandomBall
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
		let randomRadius	= getRandomInt(MIN_RADIUS, MAX_RADIUS);
		randomRadius += getRandomInt(1,99) * 0.01;
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
				isLegalBall = ballMouseDistance >= (radius + randomRadius);
			if(clickedBall){
				ball.accelerate(4*GRAVITY, 20*GRAVITY);
				didClickBall = true;
				break;
			}
		}//end i-for
		for(let i=0; i<this.rectangles.length; i++){
			let rectangle = this.rectangles[i];
			if(yCanvasPos > rectangle.yTop-randomRadius && yCanvasPos < rectangle.yBottom+randomRadius
				&& xCanvasPos < rectangle.xRight+randomRadius && xCanvasPos > rectangle.xLeft-randomRadius
			){
				isLegalBall = false;
				break;
			}
		}//end i-for
		if(yCanvasPos > this.middleRectangle.yTop-randomRadius 
			&& yCanvasPos < this.middleRectangle.yBottom+randomRadius
			&& xCanvasPos < this.middleRectangle.xRight+randomRadius 
			&& xCanvasPos > this.middleRectangle.xLeft-randomRadius
		){
			isLegalBall = false;
		}


		if(isLegalBall){
			//Check with top, bottom, and sides;
			if (xCanvasPos - randomRadius < 0)
				isLegalBall = false;
			else if (xCanvasPos + randomRadius > this.state.width)
				isLegalBall = false;
			else if (yCanvasPos - randomRadius < 0)
				isLegalBall = false;
			else if (yCanvasPos + randomRadius > this.state.height)
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
					radius:	randomRadius,
					dx: 		2,
					dy:		2
				});
				newBall.maxSpeed = MAX_SPEED;
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
     	const canvas		= this.canvasRef;
      let width			= window.innerWidth;
      let height			= window.innerHeight;
     	let ctx				= canvas.getContext('2d');
      if (width && width >575)
         width -= 320;   //Buffer for not x-small
      else{
         width -= 120;   //Buffer for x-small
			height = 500;
		}
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
				ball.accelerate(4*GRAVITY, 20*GRAVITY);
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
      const canvas		= this.canvasRef;
		const middleCords	= this.getMiddleOfCanvas();
		const msgX			= middleCords.x-50;
		const msgY			= middleCords.y+7;
      const ctx			= canvas.getContext('2d');
		if(this.state.width !== 0){
			if(this.balls.length === 0){
				this.updateBackground();
				this.updateMiddleRectangle();
				this.initDisplay();
			}// End first ball init;
			else if(this.state.isLeavingTrails === false){
				this.updateBackground();
			}
		}//end if state.width clarity check;

		this.updateMiddleRectangle();
		this.middleRectangle.draw(ctx);
		writeToScreen(ctx, "HIRE ME", msgX, msgY, getRandomColor());

		for(let i=0; i<this.balls.length; i++){
			let ball	= this.balls[i];
			if(!this.state.hasWallFriction)
				this.friction = 0;
			else
				this.friction = WALL_FRICTION;

			if(!this.state.hasBallFriction)
				ball.friction = 0;
			else
				ball.friction = BALL_FRICTION;

			if(!this.state.hasKineticTransfer){
				ball.kineticGain = 1;
				ball.kineticLoss = 0;
			}
			else{
				ball.kineticLoss	= KINETIC_LOSS;
				ball.kineticGain	= KINETIC_KEEP;
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
				ball.handleRectangleInteractions(rectangle, this.state.width, this.state.height);
			}//end j-for
			ball.handleRectangleInteractions(this.middleRectangle, this.state.width, this.state.height);

			//See if expected coordinates will prevent us from going certain directions;
			ball.handleBoundaries(this.state.width, this.state.height, this.balls);
			ball.handleWallCollisions(this.state.width, this.state.height, this.friction);
			ball.handleBallCollisions(this.balls);

			ball.handleMovement(this.friction);
			ball.updateCoordinates();
			if( this.state.hasGravity ){
				ball.gravity = GRAVITY;
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
			let ball = this.balls[i];
			if(ball.dx < 1)
				ball.dx += 3;
			if(ball.dy < 1)
				ball.dy += 3;
			const dxGain = getRandomInt(1,50) * 0.01 * ball.dx;
			const dyGain = getRandomInt(1,50) * 0.01 * ball.dy;
			ball.accelerate( dxGain, dyGain );
		}//end i-for
	}//end accelerateBalls
	decelerateBalls(event){
		for(let i=0; i<this.balls.length; i++){
			const dxLoss = getRandomInt(1,50) * 0.01 * this.balls[i].dx;
			const dyLoss = getRandomInt(1,50) * 0.01 * this.balls[i].dy;
			this.balls[i].decelerate( dxLoss, dyLoss );
		}//end i-for
	}//end decelerateBalls
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
