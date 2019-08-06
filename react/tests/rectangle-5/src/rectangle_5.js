'use strict';
const BACKGROUND_COLOR		= "black";
const WALL_FRICTION			= 0.075;
const RECTANGLE_WIDTH		= 110;
const RECTANGLE_HEIGHT		= 30;
const RECTANGLE_FRICTION	= 0.075;
const MIN_RADIUS				= 1;
const MAX_RADIUS				= 10;
const MAX_SPEED				= 5;
const BALL_FRICTION			= 0.05;
const GRAVITY					= 0.45;
const KINETIC_LOSS			= 0.15;
const KINETIC_KEEP			= 0.85;
const INIT_BALL_CNT			= 185;

class BallPen extends React.Component{
   constructor(props){
      super(props);
      this.state      = {
         height:		0,
         width:		0,
			clickTimer:	0,
			xClick:		0,
			yClick:		0,
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
			console.log('accelerating ball' + clickedBall.ballID);
			clickedBall.accelerate(5, 20);
			return true;
		}
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
		if(this.isLegalBall(newBall)){
			console.log('making new ball' + newBall.ballID);
			this.balls.push(newBall);
			return true;
		}
		return false;
	}//end handleCanvasClick
	handleCanvasMouseDown(event){
		/* Determine if click is long press or just a click;
			Will call functions on mouseup and mousemove;
		*/
		if(event.changedTouches && event.changedTouches.length){
			//Touch event: Mobile + touch screen laptops;
			hireMeCanvas.addEventListener( 'touchmove', 
				ev =>{
					ev.preventDefault();
					ev.stopImmediatePropagation;
				},
				{passive:false}
			);
			hireMeCanvas.addEventListener( 'touchmove', this.handleCanvasMouseMove);
			hireMeCanvas.addEventListener('touchend', this.handleCanvasMouseUp);
			this.setState({
				clickTimer:	new Date(),	//Start timer
				xClick:		Math.round(event.changedTouches[0].clientX),
				yClick:		Math.round(event.changedTouches[0].clientY),
			});
		}
		else if(event){
			hireMeCanvas.addEventListener('mousemove', this.handleCanvasMouseMove);
			hireMeCanvas.addEventListener('mouseup', this.handleCanvasMouseUp);
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
		hireMeCanvas.removeEventListener('mousedown',	this.handleCanvasMouseDown);
		hireMeCanvas.removeEventListener('mouseup',		this.handleCanvasMouseUp);
		hireMeCanvas.removeEventListener('mousemove',	this.handleCanvasMouseMove);
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
			let isRectangleAtFinalDestination = false;
	  		const canvas		= this.canvasRef;
			const rect			= canvas.getBoundingClientRect();
			const xMid			= this.movableRectangle.xCenter;
			const yMid			= this.movableRectangle.yCenter;
			const xCanvasPos	= this.state.xClick - rect.left;	//X cord of user click
			const yCanvasPos	= this.state.yClick - rect.top;	//Y cord of user click
			let safetyNet		= 0;

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
		if(this.balls.length !== 0)
			return true;

		for(let i=0; i< INIT_BALL_CNT; i++){
			let newBall = makeRandomBall(
				this.state.width, 
				this.state.height, 
				this.balls.length, 
				MIN_RADIUS, 
				MAX_RADIUS,
				MAX_SPEED
			);
			let cnt = 0;
			while(this.isLegalBall(newBall) === false){
				cnt += 1;
				newBall = makeRandomBall(
					this.state.width, 
					this.state.height,
					this.balls.length, 
					MIN_RADIUS, 
					MAX_RADIUS, 
					MAX_SPEED
				);
				console.log('new ball attempt: ' + cnt);
				if(cnt > 500){
					console.log('FAILED MAKING A WORKABLE BALL');
					break;
				}
			}//end while
			if(cnt <= 500)
				this.balls.push(newBall);
		}//end i-for
		return true;
	}//end initBalls()
	isLegalBall(ball){
		/*Ball is legal if it: 
			1. is in bounds <-- Checked in makeRandomBall()
			2. is not overlapping the rectangle
			3. ball is not overallping any otherBall in this.balls;
		*/
		if(this.movableRectangle.isOverLappingBall(ball))
			return false;
		for(let i=0; i<this.balls.length; i++){
			const otherBall		= this.balls[i];
			const isOverLapping	= ball.isOverLappingBall(otherBall);
			if(isOverLapping)
				return false;
		}//end i-for
		return true;
	}//end isLegalBall()
   componentDidMount(){
 	   this.updateWindowDimensions();
   	this.drawBackground();
		this.initMiddleRectangle;
      this.rectangleTimerID   = setInterval(
         ()=>this.updateRectangle(),
        225
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
		hireMeCanvas.removeEventListener('mousemove',	this.handleCanvasMouseMove);
		hireMeCanvas.removeEventListener('mouseup',		this.handleCanvasMouseUp);
		hireMeCanvas.removeEventListener('touchstart',	this.handleCanvasMouseDown);
		hireMeCanvas.removeEventListener('touchmove',	this.handleCanvasMouseMove);
		hireMeCanvas.removeEventListener('touchend',		this.handleCanvasMouseUp);
   }
   componentDidUpdate() {
		//Going to handle updates as we go to enhance efficiency;
   }

   updateWindowDimensions() {
      let width		= window.innerWidth;
      let height		= window.innerHeight;
      if (width && width >575)
         width -= 320;   //Buffer for not x-small
      else{
         width -= 120;   //Buffer for x-small
			height = 500;
		}
      height   -= 280;   //Buffer...
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
				this.balls[i].handleWindowResize(this.state.width, this.state.height, this.balls);
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
		if(this.balls.length === 0)
			this.initBalls();
      const canvas	= this.canvasRef;
      const ctx		= canvas.getContext('2d');
	
		for(let i=0; i<this.balls.length; i++){
			this.balls[i].move(
				this.state.width,
				this.state.height,
				this.friction,
				[this.movableRectangle],
				this.balls
			);
		}//end i-for

		//Update other objects 
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

	}
   render(){
      const penStyle		= {
         border:   "1px solid #000000",
			touchAction: "none",
      };
      return (
         <div>
            <canvas
					id="hireMeCanvas"
               ref={canvas => this.	canvasRef = canvas}
               width={this.state.width}
               height={this.state.height}
               style={penStyle}
					onMouseDown		= { this.handleCanvasMouseDown }
					onTouchStart	= { this.handleCanvasMouseDown }
            />
         </div>
      );
   }
}

ReactDOM.render(
	<BallPen />,
	document.getElementById('rectangle-5')
);
