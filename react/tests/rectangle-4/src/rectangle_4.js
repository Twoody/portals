'use strict';
const BACKGROUND_COLOR	= "black";
const RECTANGLE_WIDTH	= 110;
const RECTANGLE_HEIGHT	= 30;
const WALL_FRICTION		= 0.075;

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
		this.ball							= null;
		this.friction						= WALL_FRICTION;
      this.updateWindowDimensions	= this.updateWindowDimensions.bind(this);
		this.handleKeydown				= this.handleKeydown.bind(this);
		this.handleKeyup					= this.handleKeyup.bind(this);
		this.handleCanvasMouseDown		= this.handleCanvasMouseDown.bind(this);
		this.handleCanvasMouseMove		= this.handleCanvasMouseMove.bind(this);
		this.handleCanvasMouseUp		= this.handleCanvasMouseUp.bind(this);
   }
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
	initBall(){
		if(!this.ball){
			let newBall = makeRandomBall(this.state.width, this.state.height, 0, 30, 30, 30);
			let cnt		= 1;
			while(this.isLegalBall(newBall) === false){
				cnt += 1;
				newBall = makeRandomBall(this.state.width, this.state.height, 0, 30, 30, 30);
				console.log('new ball attempt: ' + cnt);
				if(cnt > 500){
					console.log('FAILED MAKING A WORKABLE BALL');
					break;
				}
			}//end while
			this.ball = newBall;
		}
	}//end initBall()
	isLegalBall(ball){
		/*Ball is legal if it: 
			1. is in bounds <-- Checked in makeRandomBall()
			2. is not overlapping the rectangle
		*/
		if(this.movableRectangle.isOverLappingBall(ball))
			return false;
		return true;

	}//end isLegalBall()
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
			//event.preventDefault();
			this.setState({
				clickTimer:	new Date(),	//Start timer
				xClick:		Math.round(event.changedTouches[0].clientX),
				yClick:		Math.round(event.changedTouches[0].clientY),
			});
		}
		else{
			document.body.addEventListener('mousemove', this.handleCanvasMouseMove);
			document.body.addEventListener('mouseup', this.handleCanvasMouseUp);
			this.setState({
				clickTimer:	new Date(),	//Start timer
				xClick:		event.xClick,
				yClick:		event.yClick,
			});
		}
	}//end handleCanvasMouseDown
	handleCanvasMouseUp(){
		/* If elapsed time is less than half a second, user just clicked;
			Else, user is long pressing and moving the rectangle;
		*/
		document.body.removeEventListener('mousedown', this.handleCanvasMouseDown);
		document.body.removeEventListener('mouseup', this.handleCanvasMouseUp);
		document.body.removeEventListener('mousemove', this.handleCanvasMouseMove);
		const endTime		= new Date();	//End time of screen click;
		const elapsedTime = endTime - this.state.clickTimer; //In Milliseconds;
		if(elapsedTime < 500){
			//User just clicked screen
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
		this.handleRectangleDrag();
      this.updateRectangle();
	}
	handleRectangleDrag(){
	  	const canvas			= this.canvasRef;
		const rect				= canvas.getBoundingClientRect();
		const clientX			= this.state.xClick - rect.left;
		const clientY			= this.state.yClick - rect.top;
		const xMid				= this.movableRectangle.xCenter;
		const yMid				= this.movableRectangle.yCenter;
		const rectangleLeft	= this.movableRectangle.xLeft;
		const rectangleTop	= this.movableRectangle.yTop;
		let nextX 				= this.movableRectangle.xLeft;
		let nextY 				= this.movableRectangle.yTop;
		if(clientX < xMid){
			//Move left
			nextX = clientX - (this.movableRectangle.width/2);
		}
		else if(clientX > xMid){
			//Move right
			nextX = clientX - (this.movableRectangle.width/2);
		}
		else{
			//Same position
		}
		if(clientY < yMid){
			//Move Up
			nextY = clientY - (this.movableRectangle.height/2);
		}
		else if(clientY > yMid){
			//Move Down
			nextY = clientY - (this.movableRectangle.height/2);
		}
		else{
			//Same position
		}
		this.movableRectangle.nextX = nextX;
		this.movableRectangle.nextY = nextY;
		this.movableRectangle.handleMove(
			this.state.width, 
			this.state.height,
			[this.ball]
		);
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

		if(!goodCodes.includes(event.keyCode))
			return false;

		//Figure out speed
		if(this.state.isHeldDown){
			const currTime			= new Date();
			const elapsedTime	= currTime - this.state.timePressed;
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
			console.log("moved left");
		}
		if(event.keyCode === 38){
			event.preventDefault();
			nextY -= speed;
			console.log("moved up");
		}
		if(event.keyCode === 39){
			event.preventDefault();
			nextX += speed;
			console.log("moved right");
		}
		if(event.keyCode === 40){
			event.preventDefault();
			nextY += speed;
			console.log("moved down");
		}

		this.movableRectangle.nextX = nextX;
		this.movableRectangle.nextY = nextY;
		this.movableRectangle.handleMove(
			this.state.width, 
			this.state.height,
			[this.ball]
		);
      this.updateRectangle();
		return true;
	}
	handleKeyup(){
      	this.setState({
				isHeldDown: false,
				timePressed: null,
      	});
			console.log('key up');
	}

   componentDidMount(){
 	   this.updateWindowDimensions();
   	this.drawBackground();
		this.initMiddleRectangle;
      this.rectangleTimerID   = setInterval(
         ()=>this.updateRectangle(),
        225
      );
      this.ballTimerID   = setInterval(
         ()=>this.updateBall(),
        25
      );
      window.addEventListener('resize', this.updateWindowDimensions);
      document.body.addEventListener('keydown', this.handleKeydown);
      document.body.addEventListener('keyup', this.handleKeyup);
   }
   componentWillUnmount(){
      clearInterval(this.rectangleTimerID);
      clearInterval(this.ballTimerID);
      window.removeEventListener('resize', this.updateWindowDimensions);
      document.body.removeEventListener('keydown', this.handleKeydown);
      document.body.removeEventListener('keyup', this.handleKeyup);
		document.body.removeEventListener('mousemove', this.handleCanvasMouseMove);
		document.body.removeEventListener('mouseup', this.handleCanvasMouseUp);
		hireMeCanvas.removeEventListener('touchstart', this.handleCanvasMouseDown);
		hireMeCanvas.removeEventListener('touchmove', this.handleCanvasMouseMove);
		hireMeCanvas.removeEventListener('touchend', this.handleCanvasMouseUp);
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

      this.drawBackground();
		if(this.movableRectangle){
			//Following hack to see if current coordinates are 
			//	colliding with wall or not;
			this.movableRectangle.handleMove(
				this.state.width, 
				this.state.height,
				[]
			);
      	this.updateRectangle();
		}
		if(this.ball){
			this.ball.handleWindowResize(this.state.width, this.state.height, []);
		}
		//Update objects on screen;
      return;
   }//end updateWindowDimenstions()
	updateBall(){
		if(this.state.width === 0)
			return false;
		if(!this.movableRectangle)
			return false;
		if(!this.ball)
			this.initBall();
      const canvas	= this.canvasRef;
      const ctx		= canvas.getContext('2d');
		//Assume we can go any direction first; Change values on `handle`*;
		//Reset canGo* properties for this iteration;
		this.ball.resetSurroundings();
		
		//Set coordinates for next movment;
		this.ball.setNextCoordinates();

		//See if next coordinates create any conflicts and if expected coordinates 
		//	will prevent us from going certain directions;
		this.ball.handleRectangleInteractions(
			this.movableRectangle, 
			this.state.width, 
			this.state.height
		);
		this.ball.handleBoundaries(this.state.width, this.state.height, []);
		this.ball.handleWallCollisions(this.state.width, this.state.height, this.friction);
		this.ball.handleBallCollisions([]);

		//Process final available movements; Update coords appropriately; Apply Gravity;
		this.ball.handleMovement(this.friction);
		this.ball.updateCoordinates();
		this.ball.applyGravity();

		//Update other objects 
		this.drawBackground();	//Redraw Background
		this.drawBall(ctx);
		this.drawRectangle(ctx);	//Update rectangle;

		return true;
	}
   updateRectangle(){
		if(this.state.width === 0)
			return;
		if(!this.movableRectangle)
			this.initMiddleRectangle();

      const canvas	= this.canvasRef;
      const ctx		= canvas.getContext('2d');
		this.drawRectangle(ctx);
	}//End updateRectangle()
	drawBall(ctx){
		this.ball.draw(ctx);
		this.ball.label(ctx);
	}
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
	document.getElementById('rectangle-4')
);
