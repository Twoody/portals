'use strict';
const initRadius			= 30;
const initWallFriction	= 0.075;
const initBallFriction	= 0.05;
const initGravity			= 0.45;
const initKineticLoss	= 1/3;
const initKineticGain	= 2/3;
const rectangleColor		= "black";
function getRandomColor(){
	let red = Math.floor(Math.random() * 3) * 127;
	let green = Math.floor(Math.random() * 3) * 127;
	let blue = Math.floor(Math.random() * 3) * 127;
	let rc = "rgb(" + red + ", " + green + ", " + blue + ")";
	return rc;
}
class BallPen extends React.Component{
   constructor(props){
      super(props);
      this.state      = {
         height: 0,
         width:  0,
			hasGravity: true,
			hasWallFriction: true,
			hasBallFriction: true,
			hasKineticTransfer: true,
			isLeavingTrails:false,
      };
		this.balls    = [];
		this.friction = initWallFriction;
      this.updateWindowDimensions	= this.updateWindowDimensions.bind(this);
		this.handleInputChange			= this.handleInputChange.bind(this);
   }
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
		if(this.state.isLeavingTrails === true){
      	const canvas   = this.canvasRef;
      	const ctx      = canvas.getContext('2d');
			// Init Canvas
			ctx.beginPath();
			ctx.rect(0,0, this.state.width, this.state.height);
			ctx.fillStyle = rectangleColor;
			ctx.fill();
		}
      return;
   }
   updateCanvas(){
      const canvas   = this.canvasRef;
      const ctx      = canvas.getContext('2d');
		if(this.state.isLeavingTrails === false){
			ctx.beginPath();
			ctx.rect(0,0, this.state.width, this.state.height);
			ctx.fillStyle = rectangleColor;
			ctx.fill();
		}
		if(this.state.width !== 0){
			if(this.balls.length === 0){
				// Init Canvas
				ctx.beginPath();
				ctx.rect(0,0, this.state.width, this.state.height);
				ctx.fillStyle = rectangleColor;
				ctx.fill();

				// Init first ball
				this.balls.push(
					new Ball({
						ballID:	0,
						color:	"blue",
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
				<label>
					Has Gravity:&nbsp;&nbsp;
					<input
						name="hasGravity"
						type="checkbox"
						checked={this.state.hasGravity}
						onChange={this.handleInputChange} />
				</label>
				<br/>
				<label>
					Has Wall Friction:&nbsp;&nbsp;
					<input
						name="hasWallFriction"
						type="checkbox"
						checked={this.state.hasWallFriction}
						onChange={this.handleInputChange} />
				</label>
				<br/>
				<label>
					Has Ball Friction:&nbsp;&nbsp;
					<input
						name="hasBallFriction"
						type="checkbox"
						checked={this.state.hasBallFriction}
						onChange={this.handleInputChange} />
				</label>
				<br/>
				<label>
					Has Kinetic Transfer:&nbsp;&nbsp;
					<input
						name="hasKineticTransfer"
						type="checkbox"
						checked={this.state.hasKineticTransfer}
						onChange={this.handleInputChange} />
				</label>
				<br/>
				<label>
					Leave Trails:&nbsp;&nbsp;
					<input
						name="isLeavingTrails"
						type="checkbox"
						checked={this.state.isLeavingTrails}
						onChange={this.handleInputChange} />
				</label>

         </div>
      );
   }
}

ReactDOM.render(
	<BallPen />,
	document.getElementById('ball-pen-11')
);
