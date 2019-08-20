import { isLegalBall, makeRandomBall } from "./Ball.js";
import { Rectangle } from "./Rectangle.js";
import { initClickables } from "./initClickables.js";
import { getMiddleOfCanvas, getRandomColor, isOverLapping, writeToScreen} from "./utils.js";

export class World{
	constructor( props={} ){
		// Defaults
		this.backgroundColor		= props.backgroundColor	|| "black";
		this.wallFriction			= props.wallFriction		|| 0.075;
		this.rectangleWidth		= props.rectangleWidth	|| 160;
		this.rectangleHeight		= props.rectangleHeight	|| 30;
		this.minRadius				= props.minRadius			|| 1;
		this.maxRadius				= props.maxRadius			|| 3.00;
		this.maxSpeed				= props.maxSpeed			|| 5;
		this.ballFriction			= props.ballFriction		|| 0.05;
		this.gravity				= props.gravity			|| 0.45;
		this.kineticLoss			= props.kineticLoss		|| 0.15;
		this.kineticKeep			= props.kineticKeep		|| 0.85;
		this.initBallCnt			= props.initBallCnt		|| 0;
		this.width					= props.width				|| 0;
		this.height					= props.height				|| 0;
		this.reservedKeys			= [37, 38, 39, 40];
		this.ballCnt				= 0;
		this.hasGravity			= false;
		this.isLeavingTrails		= false;
		this.hasWallFriction		= false;
		this.hasBallFriction		= false;
		this.hasInertia			= false;
		this.hasBrandBalls		= props.hasBrandBalls	|| false;
		this.balls					= [];
		this.movableRectangle	= null;
		this.clickTimer			= null;	//Set only during a click; Reset to null after;
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
	drawBackground(ctx){
		if(this.width === 0)
			return false;
		ctx.beginPath();
		ctx.fillStyle = this.backgroundColor;
		ctx.fillRect(0, 0, this.width, this.height);
		ctx.closePath();
		return true;
	}//end drawBackground();
	drawBalls(ctx){
		for(let i=0; i<this.balls.length; i++){
			const ball = this.balls[i];
			ball.draw(ctx);
			if(ball.href !== ""){
				ball.label(ctx);
			}
			else
				ball.label(ctx);
		}//end i-for
	}//end drawBalls()
	drawRectangle(ctx){
		this.movableRectangle.draw(ctx);
		writeToScreen(
			ctx, 
			"RECTANGLE", 
			this.movableRectangle.xCenter -80, 
			this.movableRectangle.yCenter + 7, 
			getRandomColor()
		);
	}//end drawRectangle()
	handleCanvasClick(canvas){
		const rect			= canvas.getBoundingClientRect();
		const xCanvasPos	= this.xClick - rect.left;		//X cord of user click
		const yCanvasPos	= this.yClick - rect.top;		//Y cord of user click
		const clickedBall = this.didClickBall(xCanvasPos, yCanvasPos);
		if(clickedBall !== null){
			return clickedBall.handleClick();;
		}
		//No ball was clicked; Is user trying to make a new ball?
		let newBall = makeRandomBall(
			this.width, 
			this.height, 
			this.balls.length, 
			this.minRadius, 
			this.maxRadius, 
			this.maxSpeed
		);
		newBall.xCord = xCanvasPos;
		newBall.yCord = yCanvasPos;
		newBall.nextX = xCanvasPos;
		newBall.nextY = yCanvasPos;
		let isLegal	= isLegalBall(
			newBall,
			this.width,
			this.height,
			this.balls,
			[this.movableRectangle]
		);
		if(isLegal === false)
			return false;
		newBall.setRandomDirection();
		console.log('making new ball' + newBall.ballID);
		this.balls.push(newBall);
		this.ballCnt += 1;
		return true;
	}//end handleCanvasClick
	handleCanvasMouseUp(event, canvas){
		/* If elapsed time is less than half a second, user just clicked;
			Else, user is long pressing and moving the rectangle;
		*/
		const endTime					= new Date();	//End time of screen click;
		const elapsedTime				= endTime - this.clickTimer; //In Milliseconds;
		const acceptableClickTime	= 250;
		this.clickTimer				= null;
		if(elapsedTime < acceptableClickTime){
			//User just clicked screen
			this.xClick	= event.clientX;
			this.yClick	= event.clientY;
			this.handleCanvasClick(canvas);
			return this.ballCnt;
		}
		else{
			console.log("DRAGGING FINSIHED");
			return -1;
		}
	}//end handleCanvasMouseUp()
	handleCanvasMouseDown(event){
		/* Determine if click is long press or just a click;
			Will call functions on mouseup and mousemove;
		*/
		this.clickTimer	= new Date(); //Start timer
		if(event.changedTouches && event.changedTouches.length){
			//Touch event: Mobile + touch screen laptops;
			this.xClick	= Math.round(event.changedTouches[0].clientX);
			this.yClick	= Math.round(event.changedTouches[0].clientY);
		}
		else if(event){
			this.xClick	= event.clientX;
			this.yClick	= event.clientY;
		}
		else
			console.log('input not understood');
		return true;
	}//end handleCanvasMouseDown()
	handleCanvasMouseMove(event, canvas){
		//TODO: Get movement of mouse and move rectangle accordingly;
      const ctx	= canvas.getContext('2d');
		if(!this.movableRectangle){
			console.log("WARNING: Rectangle not initialized yet;");
			return false;
		}
		if(event.changedTouches && event.changedTouches.length){
			//event.preventDefault();
			this.xClick	= Math.round(event.changedTouches[0].clientX);
			this.yClick	= Math.round(event.changedTouches[0].clientY);
		}
		else{
			this.xClick	= event.clientX;
			this.yClick	= event.clientY;
		}
		const isLegalDrag = this.handleRectangleDrag(canvas);
		if(isLegalDrag)
			this.updateRectangle(ctx);
		return true;
	}//end handleCanvasMouseMove()

	handleKeydown(keyCode, ctx){
		let speed			= 2;
		let nextX 			= this.movableRectangle.xLeft;
		let nextY 			= this.movableRectangle.yTop;
		if(!this.reservedKeys.includes(keyCode)){
			console.log('could not find keycode `'+keyCode+'`');
			return false;
		}
		this.movableRectangle.resetMovement();
		//Figure out speed
		if(this.isHeldDown){
			const currTime			= new Date();
			const elapsedTime		= currTime - this.timePressed;
			speed += elapsedTime/100;
			if(speed > this.movableRectangle.width)
				speed = this.movableRectangle.width/2 - 0.01; //Buffer
		}
		else{
			this.isHeldDown	= true;
			this.timePressed	= new Date();
		}
		if(keyCode === 37){
			nextX -= speed;
			this.movableRectangle.isGoingLeft = true;
		}
		if(keyCode === 38){
			nextY -= speed;
			this.movableRectangle.isGoingUp = true;
		}
		if(keyCode === 39){
			nextX += speed;
			this.movableRectangle.isGoingRight = true;
		}
		if(keyCode === 40){
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
				this.width, 
				this.height,
				this.balls
			);
      	this.updateRectangle(ctx);
		}
	}//end handleKeydown()
	handleKeyup(){
		this.isHeldDown	= false;
		this.timePressed	= null;
		console.log('key up');
	}//end handleKeyup()
	handleMount(ctx){
		this.initMiddleRectangle();				//TODO: Move to initRectangles()
		this.rectangleTimerID   = setInterval(
			()=>this.updateRectangle(ctx),
			25
		);
		this.ballTimerID   = setInterval(
			()=>this.updateBalls(ctx),
			25
		);
	}//end handleMount()
	handleUnmount(){
	   clearInterval(this.rectangleTimerID);
      clearInterval(this.ballTimerID);
	}
	handleRectangleDrag(canvas){
		const rect			= canvas.getBoundingClientRect();
		const clientX		= this.xClick - rect.left;
		const clientY		= this.yClick - rect.top;
		const isDragging	= this.movableRectangle.processDrag(clientX, clientY, this.balls);
		if(!isDragging)
			return false;
		this.movableRectangle.handleMove(
			this.width, 
			this.height,
			this.balls
		);
		return true;
	}//end handleRectangleDrag();
	handleScreenResize(width, height, ctx){
		this.width = width;
		this.height = height;
		const drewBG = this.drawBackground(ctx);			//Update/draw Background
		if(drewBG === false)
			console.log('big error');
		if(this.movableRectangle){
			//Following hack to see if current coordinates are 
			//	colliding with wall or not;
			this.movableRectangle.handleMove(
				this.width, 
				this.height,
				[]
			);
      	this.updateRectangle(ctx);		//Update/draw Rectangle
		}
		if(this.balls){
			for(let i=0; i<this.balls.length; i++){
				this.balls[i].handleWindowResize(
					this.width, 
					this.height, 
					this.balls,
					[this.movableRectangle],
				);
			}//end i-for
			this.updateBalls(ctx);			//Update/draw Balls;
		}
      return true;
	}//end handleScreenResize()
	initBalls(){
		if(this.hasBrandBalls === true){
			const brandBalls = initClickables( 
				this.width, 
				this.height, 
				30, 
				30, 
				this.maxSpeed,
				[this.movableRectangle],
			);
			for(let i=0; i<brandBalls.length; i++){
				this.balls.push(brandBalls[i]);
				this.ballCnt += 1;
			}//end i-for
		}
		for(let i=this.ballCnt; i< this.initBallCnt; i++){
			let cnt		= 0;
			let isLegal = false;
			let newBall	= null;
			while(isLegal === false){
				newBall = makeRandomBall(
					this.width, 
					this.height,
					this.balls.length, 
					this.minRadius, 
					this.maxRadius, 
					this.maxSpeed
				);
				isLegal = isLegalBall(
					newBall,
					this.width,
					this.height,
					this.balls,
					[this.movableRectangle]
				);
				if(cnt === 500){
					console.log('FAILED MAKING A WORKABLE BALL');
					break;
				}
				cnt += 1;
			}//end while
			if(newBall && cnt !== 500){
				newBall.setRandomDirection();
				this.balls.push(newBall);
				this.ballCnt += 1;
			}
		}//end i-for
		return true;
	}//end initBalls()
	initMiddleRectangle(){
		if(this.width === 0)
			return false;
		//Initialize a middle rectangle;
		//Rectangle is going to have draggable properties;
		const middleCords	= getMiddleOfCanvas(this.width, this.height);
		const width			= this.rectangleWidth;
		const height		= this.rectangleHeight;
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
	}//end initMiddleRectangle()
/*
TODO: Fill this out later...
	resetBalls(event){
		this.balls		= [];
		this.setState({ballCnt: 0});
		//Even though we reset the balls, we are always going to force
		//logos and hrefs on the user;
		const brandBalls = initClickables( 
			this.width, 
			this.height, 
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
*/
	updateBalls(ctx){
		if(this.width === 0)
			return false;
		if(!this.movableRectangle)
			return false;
		if(this.balls.length === 0 && this.initBallCnt !== 0)
			this.initBalls();
		for(let i=0; i<this.balls.length; i++){
			let ball = this.balls[i];
			if(this.hasGravity === false)
				ball.gravity = 0;
			else
				ball.gravity = this.gravity;
			if(this.hasInertia === false){
				ball.kineticLoss = 0;
				ball.kineticGain = 1
			}
			else{
				ball.kineticLoss = this.kineticLoss;
				ball.kineticGain = this.kineticKeep;
			}
			if(this.hasBallFriction === false)
				ball.friction = 0;
			else
				ball.friction = this.ballFriction;
			if(this.hasWallFriction === false)
				this.friction = 0;
			else
				this.friction = this.wallFriction;

			ball.move(
				this.width,
				this.height,
				this.friction,
				[this.movableRectangle],
				this.balls
			);
		}//end i-for

		//Update other objects 
		if(this.isLeavingTrails === false)
			this.drawBackground(ctx);	//Redraw Background
		this.drawBalls(ctx);
		this.drawRectangle(ctx);	//Update rectangle;
		return true;
	}//end updateBalls()
	updateRectangle(ctx){
		if(this.width === 0)
			return;
		if(!this.movableRectangle)
			this.initMiddleRectangle();

		if(this.hasWallFriction)
			this.movableRectangle.friction = this.wallFriction;
		else
			this.movableRectangle.friction = 0;
		this.drawRectangle(ctx);
	}//End updateRectangle()
}
