import React from "react";
import { accelerateBalls, decelerateBalls, isLegalBall, makeRandomBall, shrinkBalls } from "./Ball.js";
import { Rectangle } from "./Rectangle.js";
import { initClickables } from "./initClickables.js";
import { getMiddleOfCanvas, getRandomColor, isOverLapping, writeToScreen} from "./utils.js";

const BACKGROUND_COLOR		= "black";
const WALL_FRICTION			= 0.075;		//Also tied to rectangles' friction;
const RECTANGLE_WIDTH		= 110;
const RECTANGLE_HEIGHT		= 30;
const MIN_RADIUS				= 1;
const MAX_RADIUS				= 3.00;
const MAX_SPEED				= 5;
const BALL_FRICTION			= 0.05;
const GRAVITY					= 0.45;
const KINETIC_LOSS			= 0.15;
const KINETIC_KEEP			= 0.85;
const INIT_BALL_CNT			= 85;

class BallPen extends React.Component{
   constructor(props){
      super(props);
      this.state      = {
         height:		0,
         width:		0,
			clickTimer:	0,
			xClick:		0,
			yClick:		0,
			ballCnt:		0,
			hasGravity:			false,
			hasWallFriction:	false,
			hasBallFriction:	false,
			hasInertia:			false,
			isLeavingTrails:	false,
      };
		this.movableRectangle			= null;
		this.balls							= [];
		this.friction						= WALL_FRICTION;
      this.updateWindowDimensions	= this.updateWindowDimensions.bind(this);
		this.handleKeydown				= this.handleKeydown.bind(this);
		this.handleKeyup					= this.handleKeyup.bind(this);
		this.handleCanvasMouseDown		= this.handleCanvasMouseDown.bind(this);
		this.handleCanvasMouseMove		= this.handleCanvasMouseMove.bind(this);
		this.handleCanvasMouseUp		= this.handleCanvasMouseUp.bind(this);
		this.handleInputChange			= this.handleInputChange.bind(this);
		this.handleToggleButton			= this.handleToggleButton.bind(this);
		this.resetBalls					= this.resetBalls.bind(this);
   }
	didClickBall(xCanvasPos, yCanvasPos){
		/*	Go through balls and see if clicked position is in ball or not;
			Inpus:
				x click position relative to canvase
				y click position relative to canvase
			Output:
				If true, clicked ball;
				Else, NULL
			@ utils.js
		*/
		for(let i=0; i<this.balls.length; i++){
			const ball			= this.balls[i];
			const isClicked	= isOverLapping(
				xCanvasPos, 
				yCanvasPos, 
				ball.xCord, 
				ball.yCord, 
				ball.radius
			);
			if(isClicked)
				return ball;
		}//end i-for
		return null;
	}//end didClickBall()
	drawBackground(){
		if(this.state.width === 0)
			return false;
     	const canvas	= this.canvasRef;
     	let ctx			= canvas.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = BACKGROUND_COLOR;
		ctx.fillRect(0, 0, this.state.width, this.state.height);
		ctx.closePath();
		return true;
	}//end drawBackground();
	handleCanvasClick(){
     	const canvas		= this.canvasRef;
		const rect			= canvas.getBoundingClientRect();
		const xCanvasPos	= this.state.xClick - rect.left;		//X cord of user click
		const yCanvasPos	= this.state.yClick - rect.top;		//Y cord of user click
		const clickedBall = this.didClickBall(xCanvasPos, yCanvasPos);
		if(clickedBall !== null){
			return clickedBall.handleClick();;
		}
		//No ball was clicked; Is user trying to make a new ball?
		let newBall = makeRandomBall(
			this.state.width, 
			this.state.height, 
			this.balls.length, 
			MIN_RADIUS, 
			MAX_RADIUS, 
			MAX_SPEED
		);
		newBall.xCord = xCanvasPos;
		newBall.yCord = yCanvasPos;
		newBall.nextX = xCanvasPos;
		newBall.nextY = yCanvasPos;
		let isLegal	= isLegalBall(
			newBall,
			this.state.width,
			this.state.height,
			this.balls,
			[this.movableRectangle]
		);
		if(isLegal === true){
			this.setNewBallDirection(newBall);
			console.log('making new ball' + newBall.ballID);
			this.balls.push(newBall);
			this.setState({ballCnt: this.state.ballCnt +1});
			return true;
		}
		return false;
	}//end handleCanvasClick
	handleInputChange(event) {
		const target	= event.target;
		const value		= target.type === 'checkbox' ? target.checked : target.value;
		const name		= target.name;
		this.setState({
			[name]: value
		});
	}//end handleInputChange()
	handleToggleButton(event){
		const target	= event.target;
		const name		= target.name;
		this.setState( state => ({
			[name] : !this.state[name]
		}));
	}
	handleCanvasMouseDown(event){
		/* Determine if click is long press or just a click;
			Will call functions on mouseup and mousemove;
		*/
		if(event.changedTouches && event.changedTouches.length){
			//Touch event: Mobile + touch screen laptops;
			document.addEventListener( 'touchmove', 
				ev =>{
					ev.preventDefault();
					ev.stopImmediatePropagation();
				},
				{passive:false}
			);
			document.addEventListener( 'touchmove', this.handleCanvasMouseMove);
			document.addEventListener('touchend', this.handleCanvasMouseUp);
			this.setState({
				clickTimer:	new Date(),	//Start timer
				xClick:		Math.round(event.changedTouches[0].clientX),
				yClick:		Math.round(event.changedTouches[0].clientY),
			});
		}
		else if(event){
			document.addEventListener('mousemove', this.handleCanvasMouseMove);
			document.addEventListener('mouseup', this.handleCanvasMouseUp);
			this.setState({
				clickTimer:	new Date(),	//Start timer
			});
		}
		else{
			console.log('input not understood');
		}
	}//end handleCanvasMouseDown
	handleCanvasMouseUp(event){
		/* If elapsed time is less than half a second, user just clicked;
			Else, user is long pressing and moving the rectangle;
		*/
		document.removeEventListener('mousedown',	this.handleCanvasMouseDown);
		document.removeEventListener('mouseup',		this.handleCanvasMouseUp);
		document.removeEventListener('mousemove',	this.handleCanvasMouseMove);
		const endTime		= new Date();	//End time of screen click;
		const elapsedTime = endTime - this.state.clickTimer; //In Milliseconds;
		if(elapsedTime < 250){
			//User just clicked screen
			this.setState({
				xClick:		event.clientX,
				yClick:		event.clientY,
			});
			this.handleCanvasClick();
		}
		else{
			console.log("DRAGGING FINSIHED");
		}
		//Make clickTimer unassigned;
		this.setState({
			clickTimer:	null,	//Start timer
		});
	}//end handleCanvasMouseUp()
	handleCanvasMouseMove(event){
		//TODO: Get movement of mouse and move rectangle accordingly;
		if(!this.movableRectangle){
			console.log("WARNING: Rectangle not initialized yet;");
			return false;
		}
		if(event.changedTouches && event.changedTouches.length){
			//event.preventDefault();
			this.setState({
				xClick:		Math.round(event.changedTouches[0].clientX),
				yClick:		Math.round(event.changedTouches[0].clientY)
			});
		}
		else{
			this.setState({
				xClick:		event.clientX,
				yClick:		event.clientY
			});
		}
		const isLegalDrag = this.handleRectangleDrag();
		if(isLegalDrag)
 	     this.updateRectangle();
	}//end handleCanvasMouseMove()
	handleRectangleDrag(){
	  	const canvas		= this.canvasRef;
		const rect			= canvas.getBoundingClientRect();
		const clientX		= this.state.xClick - rect.left;
		const clientY		= this.state.yClick - rect.top;
		const isDragging	= this.movableRectangle.processDrag(clientX, clientY, this.balls);
		if(!isDragging)
			return false;
		this.movableRectangle.handleMove(
			this.state.width, 
			this.state.height,
			this.balls
		);
		return true;
	}//end handleRectangleDrag();
	handleKeydown(event){
		if(!event && !event.key){
			console.log("WARNING: KEYBOARD INPUT NOT UNDERSTOOD");
			return false;
		}
		if(!this.movableRectangle){
			console.log("WARNING: Rectangle not initialized yet;");
			return false;
		}
		let goodCodes	= [37, 38, 39, 40];
		let speed		= 2;
		let nextX 		= this.movableRectangle.xLeft;
		let nextY 		= this.movableRectangle.yTop;
		this.movableRectangle.resetMovement();

		if(!goodCodes.includes(event.keyCode))
			return false;

		//Figure out speed
		if(this.state.isHeldDown){
			const currTime			= new Date();
			const elapsedTime		= currTime - this.state.timePressed;
			speed += elapsedTime/100;
			if(speed > this.movableRectangle.width)
				speed = this.movableRectangle.width/2 - 0.01; //Buffer
		}
		else{
      	this.setState({
				isHeldDown: true,
				timePressed: new Date(),
      	});
		}
		if(event.keyCode === 37){
			event.preventDefault();
			nextX -= speed;
			this.movableRectangle.isGoingLeft = true;
		}
		if(event.keyCode === 38){
			event.preventDefault();
			nextY -= speed;
			this.movableRectangle.isGoingUp = true;
		}
		if(event.keyCode === 39){
			event.preventDefault();
			nextX += speed;
			this.movableRectangle.isGoingRight = true;
		}
		if(event.keyCode === 40){
			event.preventDefault();
			nextY += speed;
			this.movableRectangle.isGoingDown = true;
		}

		const isMovable = this.movableRectangle.isLegalMovement(
			nextX,
			nextY,
			this.balls
		);
		if(isMovable === false){
			this.movableRectangle.nextX = this.movableRectangle.xLeft;
			this.movableRectangle.nextY = this.movableRectangle.yTop;
			this.movableRectangle.resetMovement();
			return false;
		}
		else{
			this.movableRectangle.nextX = nextX;
			this.movableRectangle.nextY = nextY;
			this.movableRectangle.handleMove(
				this.state.width, 
				this.state.height,
				this.balls
			);
      	this.updateRectangle();
		}
		return true;
	}//end handleKeydown()
	handleKeyup(){
     	this.setState({
			isHeldDown: false,
			timePressed: null,
     	});
		console.log('key up');
	}//end handleKeyup()
	initMiddleRectangle(){
		if(this.state.width === 0)
			return false;
		//Initialize a middle rectangle;
		//Rectangle is going to have draggable properties;
		const middleCords	= getMiddleOfCanvas(this.state.width, this.state.height);
		const width			= RECTANGLE_WIDTH;
		const height		= RECTANGLE_HEIGHT;
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
		this.movableRectangle = rectangle;
	}//end updateMiddleRectangle()
	initBalls(){
		const brandBalls = initClickables( 
			this.state.width, 
			this.state.height, 
			30, 
			30, 
			MAX_SPEED,
			[this.movableRectangle],
		);
		for(let i=0; i<brandBalls.length; i++){
			this.balls.push(brandBalls[i]);
			this.setState({ballCnt: this.state.ballCnt +1});
		}//end i-for
		for(let i=this.state.ballCnt; i< INIT_BALL_CNT; i++){
			let cnt		= 0;
			let isLegal = false;
			let newBall	= null;
			while(isLegal === false){
				newBall = makeRandomBall(
					this.state.width, 
					this.state.height,
					this.balls.length, 
					MIN_RADIUS, 
					MAX_RADIUS, 
					MAX_SPEED
				);
				isLegal = isLegalBall(
					newBall,
					this.state.width,
					this.state.height,
					this.balls,
					[this.movableRectangle]
				);
	//			console.log('new ball attempt: ' + cnt);
				if(cnt === 500){
					console.log('FAILED MAKING A WORKABLE BALL');
					break;
				}
				cnt += 1;
			}//end while
			if(newBall && cnt !== 500){
				this.setNewBallDirection(newBall);
				this.balls.push(newBall);
				this.setState({ballCnt: this.state.ballCnt +1});
			}
		}//end i-for
		return true;
	}//end initBalls()
	componentDidMount(){
 	   this.updateWindowDimensions();
 //  	this.drawBackground();
		this.initMiddleRectangle();
      this.rectangleTimerID   = setInterval(
         ()=>this.updateRectangle(),
        25
      );
      this.ballTimerID   = setInterval(
         ()=>this.updateBalls(),
        25
      );
      window.addEventListener('resize', this.updateWindowDimensions);
      document.body.addEventListener('keydown',	this.handleKeydown);
      document.body.addEventListener('keyup',	this.handleKeyup);
   }
   componentWillUnmount(){
      clearInterval(this.rectangleTimerID);
      clearInterval(this.ballTimerID);
      window.removeEventListener('resize', this.updateWindowDimensions);
      document.body.removeEventListener('keydown',		this.handleKeydown);
      document.body.removeEventListener('keyup',		this.handleKeyup);
		document.removeEventListener('mousemove',	this.handleCanvasMouseMove);
		document.removeEventListener('mouseup',		this.handleCanvasMouseUp);
		document.removeEventListener('touchstart',	this.handleCanvasMouseDown);
		document.removeEventListener('touchmove',	this.handleCanvasMouseMove);
		document.removeEventListener('touchend',		this.handleCanvasMouseUp);
   }
   componentDidUpdate() {
		//Going to handle updates as we go to enhance efficiency;
   }
   updateWindowDimensions(){
      let width		= window.innerWidth;	//Matching with bootstrap hack
      let height		= window.innerHeight;
		width -= 50;
      height   -= 180;   //Buffer...
      if (height < 0)
         height = 0;
		if(width < 0)
			width = 0;
      this.setState({
         width: width, 
         height: height
      });

      this.drawBackground();			//Update/draw Background
		if(this.movableRectangle){
			//Following hack to see if current coordinates are 
			//	colliding with wall or not;
			this.movableRectangle.handleMove(
				this.state.width, 
				this.state.height,
				[]
			);
      	this.updateRectangle();		//Update/draw Rectangle
		}
		if(this.balls){
			for(let i=0; i<this.balls.length; i++){
				this.balls[i].handleWindowResize(
					this.state.width, 
					this.state.height, 
					this.balls,
					[this.movableRectangle],
				);
			}//end i-for
			this.updateBalls();			//Update/draw Balls;
		}
      return;
   }//end updateWindowDimenstions()
	updateBalls(){
		if(this.state.width === 0)
			return false;
		if(!this.movableRectangle)
			return false;
		if(this.balls.length === 0 && INIT_BALL_CNT !== 0)
			this.initBalls();
      const canvas	= this.canvasRef;
      const ctx		= canvas.getContext('2d');
	
		for(let i=0; i<this.balls.length; i++){
			let ball = this.balls[i];
			if(this.state.hasGravity === false)
				ball.gravity = 0;
			else
				ball.gravity = GRAVITY;
			if(this.state.hasInertia === false){
				ball.kineticLoss = 0;
				ball.kineticGain = 1
			}
			else{
				ball.kineticLoss = KINETIC_LOSS;
				ball.kineticGain = KINETIC_KEEP;
			}
			if(this.state.hasBallFriction === false)
				ball.friction = 0;
			else
				ball.friction = BALL_FRICTION;
			if(this.state.hasWallFriction === false)
				this.friction = 0;
			else
				this.friction = WALL_FRICTION;

			ball.move(
				this.state.width,
				this.state.height,
				this.friction,
				[this.movableRectangle],
				this.balls
			);
		}//end i-for

		//Update other objects 
		if(this.state.isLeavingTrails === false)
			this.drawBackground();	//Redraw Background
		this.drawBalls(ctx);
		this.drawRectangle(ctx);	//Update rectangle;
		return true;
	}//end updateBalls()
   updateRectangle(){
		if(this.state.width === 0)
			return;
		if(!this.movableRectangle)
			this.initMiddleRectangle();

      const canvas	= this.canvasRef;
      const ctx		= canvas.getContext('2d');
		if(this.state.hasWallFriction)
			this.movableRectangle.friction = WALL_FRICTION;
		else
			this.movableRectangle.friction = 0;
		this.drawRectangle(ctx);
	}//End updateRectangle()
	drawBalls(ctx){
		for(let i=0; i<this.balls.length; i++){
			const ball = this.balls[i];
			ball.draw(ctx);
			ball.label(ctx);
		}//end i-for
	}//end drawBalls()
	drawRectangle(ctx){
		this.movableRectangle.draw(ctx);
		writeToScreen(
			ctx, 
			"HIRE ME", 
			this.movableRectangle.xCenter - 50, 
			this.movableRectangle.yCenter + 7, 
			getRandomColor()
		);
	}//end drawRectangle()
	setNewBallDirection(ball){
		const modGroup = this.balls.length %4;
		if(modGroup === 0){
			ball.isGoingDown	= true;
			ball.isGoingUp		= false;
			ball.isGoingRight	= true;
			ball.isGoingLeft	= false;
		}
		else if(modGroup === 1){
			ball.isGoingDown	= true;
			ball.isGoingUp		= false;
			ball.isGoingRight	= false;
			ball.isGoingLeft	= true;
		}
		else if(modGroup === 2){
			ball.isGoingDown	= false;
			ball.isGoingUp		= true;
			ball.isGoingRight	= false;
			ball.isGoingLeft	= true;
		}

		else if(modGroup === 3){
			ball.isGoingDown	= false;
			ball.isGoingUp		= true;
			ball.isGoingRight	= true;
			ball.isGoingLeft	= false;
		}
	}//end setNewBallDirection()
	resetBalls(event){
		this.balls		= [];
		this.setState({ballCnt: 0});
		//Even though we reset the balls, we are always going to force
		//logos and hrefs on the user;
		const brandBalls = initClickables( 
			this.state.width, 
			this.state.height, 
			30, 
			30, 
			MAX_SPEED,
			[this.movableRectangle],
		);
		for(let i=0; i<brandBalls.length; i++){
			this.balls.push(brandBalls[i]);
		}//end i-for
		this.setState({ballCnt: this.balls.length});
		return true;
	}//end resetBalls()
	
   render(){
		const	divStyle = {
			paddingRight:	35,
			paddingLeft:	35,
		};
      const penStyle	= {
			fontWeight:		400,
         border:   		"1px solid #000000",
			touchAction:	"none",
      };
		const ballCntStyle	= {
			textAlign: "right"
		};
		const buttonStyle = {
			color: "white",
			backgroundColor: "black",
		}
      return (
         <div style={divStyle}>
				<p id="ballCnt" style={ballCntStyle}>
					Ball Count: {this.state.ballCnt}
				</p>
            <canvas ref={canvas => this.canvasRef = canvas}
					id="hireMeCanvas"
               width={this.state.width}
               height={this.state.height}
               style={penStyle}
					onMouseDown		= { this.handleCanvasMouseDown }
					onTouchStart	= { this.handleCanvasMouseDown }
            />
				<table width={this.state.width}>
					<tbody>
					<tr>
						<td>
							<button
               			style={buttonStyle}
								name="hasGravity"
								onClick={this.handleToggleButton}
							> 
								Turn Gravity {this.state.hasGravity ? "Off" : "On"}
							</button>
						</td>
						<td>
							<button
               			style={buttonStyle}
								name="hasWallFriction"
								onClick={this.handleToggleButton}
							> 
								{this.state.hasWallFriction ? "Remove" : "Apply"} Wall Friction
							</button>

						</td>
						<td>
							<button
               			style={buttonStyle}
								name="hasBallFriction"
								onClick={this.handleToggleButton}
							> 
								{this.state.hasBallFriction ? "Remove" : "Apply"} Ball Friction
							</button>
						</td>
					</tr>
					<tr>
						<td>
							<button
               			style={buttonStyle}
								name="hasInertia"
								onClick={this.handleToggleButton}
							> 
								{this.state.hasInertia ? "Remove" : "Apply"} Energy Transfer
							</button>
						</td>
						<td>
							<button
               			style={buttonStyle}
								name="isLeavingTrails"
								onClick={this.handleToggleButton}
							> 
								{this.state.isLeavingTrails ? "Remove" : "Keep"} Trails
							</button>
						</td>
						<td>
							<button style={buttonStyle} onClick={this.resetBalls}>
								Reset Balls
							</button>
						</td>
					</tr>
					<tr>
						<td>
							<button style={buttonStyle} onClick={e => { shrinkBalls(this.balls); } }>
								Shrink Some Balls
							</button>
						</td>
						<td>
							<button style={buttonStyle} onClick={ e=> {accelerateBalls(this.balls); } }>
								Accelerate Balls
							</button>
						</td>
						<td>
							<button style={buttonStyle} onClick={ e=> { decelerateBalls(this.balls); } }>
								Decelerate Balls
							</button>
						</td>
					</tr>
					</tbody>
				</table>
         </div>
      );
   }
}
export default BallPen;
