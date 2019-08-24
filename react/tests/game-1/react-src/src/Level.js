import { World } from "./World.js";
import { Ball } from "./Ball.js";


export class Level extends World{
	constructor(props={}){
		props.hasBrandBalls	= false;
		props.hasMovableRect	= true;
		props.initBallCnt		= 1;
		super(props);
		this.isGameGoing		= true;
		this.hasGravity		= false;
		this.hasWallFriction = true;
		this.hasIneritia		= true;
		this.hasBallFriction	= true;
		this.brickWidth		= 40;
		this.brickHeight		= 10;
		this.didInit			= false;	//Init is when we hit spacebar
		this.reservedKeys.push(32); 	//Adding spacebar eventcode;
									 			//	Will remove with didInit;
		this.isDisplayingHud	= true;
	}
	initBalls(){
		//WWARNING: Rewriting World.initBalls()
		//This init should only have one ball:
		//	Ball should be centered around our movableRect, which is
		//	defaulted as always being made first and at rectangles[0]
		if(!this.width || this.width === 0)
			return false;
		const rect		= this.rectangles[0];
		const radius	= 20;
		const newBall	= new Ball({
			ballID:	0,
			color:	"yellow",
			xCord:	rect.xCenter,
			yCord:	rect.yTop - radius-0.001, //Buffer
			radius:	radius,
			dx: 		0,
			dy:		0,
		});
		newBall.maxSpeed = radius * 0.66;
		this.balls.push(newBall);
		this.initBallCnt = 1;
		this.ballCnt = 1;
		return true;
	}
	initRectangles(ctx){
		super.initRectangles(ctx);
		this.makeDestructibleRects();
	}
	updateBalls(ctx){
		for (let i=0; i<this.balls.length; i++){
			let ball = this.balls[i];
			if(ball.hitBottom(this.height)){
				this.balls.splice(i, 1);
				this.ballCnt -= 1;
			}
		}
		if(this.balls.length === 0)
			this.didInit = false;
		super.updateBalls(ctx);
	//	this.labelBallCnt(ctx);
	}
	updateRectangles(ctx){
		//Update the ball with the rectangle while we did not init;
		super.updateRectangles(ctx);
		if(this.didInit === false || this.isGameGoing === false){
			this.balls = [];
			this.initBalls();
			return true;
		}
		let rLen	= this.rectangles.length;
		let cnt	= 0;
		while(cnt < rLen){
			let rectangle = this.rectangles[cnt]
			if(rectangle.isDestructing()){
				this.rectangles.splice(cnt, 1);
				rLen -= 1;
				this.score += 100;
				console.log(this.score);
			}
			else
				cnt += 1;
		}//end while
		if(this.rectangles.length === 1){
			this.isGameGoing	= false;
			this.didInit		= false;
			console.log('game over');
			//this.makeDestructibleRects();
		}
	}//end updateRectangles()
	handleKeydown(keycode, ctx){
		super.handleKeydown(keycode, ctx);
		if( this.didInit === false && keycode === 32){
			this.didInit		= true;
			this.isGameGoing	= true;
			for( let i=0; i< this.balls.length; i++){
				let ball = this.balls[i];
				ball.accelerate(10,10);
			}
		}
	}
	makeDestructibleRects(){
		//Should be over written by child classes;
	}
}//End class
