import { World } from "./World.js";
import { Ball } from "./Ball.js";
import { accelerateBalls} from "./Ball.js";

export class Level1 extends World{
	/*
		Try to build a world with a single ball;
		Build the world with on movable rectangle;
		Build the world with one destructable rectangle;
		Add keycode `space` to accelerate the ball from
			our movable rectangle;
	*/
	constructor(props={}){
		props.hasBrandBalls	= false;
		props.hasMovableRect	= true;
		props.initBallCnt		= 1;
		super(props);
		this.hasGravity		= false;
		this.hasWallFriction = true;
		this.hasIneritia		= true;
		this.hasBallFriction	= true;
		this.didInit			= false;	//Init is when we hit spacebar
		this.reservedKeys.push(32); 	//Adding spacebar eventcode; Will remove with didInit;
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
		return true;
	}
	updateBalls(ctx){
		for (let i=0; i<this.balls.length; i++){
			let ball = this.balls[i];
			if(ball.hitBottom(this.height)){
				this.balls.splice(i, 1);
				this.didInit = false;
			}
		}
		super.updateBalls(ctx);
	}
	updateRectangle(ctx){
		//Update the ball with the rectangle while we did not init;
		super.updateRectangle(ctx);
		if(this.didInit === false){
			this.balls = [];
			this.initBalls();
		}
	}
	handleKeydown(keycode, ctx){
		super.handleKeydown(keycode, ctx);
		if( this.didInit === false && keycode === 32){
			this.didInit = true;
			for( let i=0; i< this.balls.length; i++){
				let ball = this.balls[i];
				ball.accelerate(10,10);
			}
			/*
			const spaceKeyIndex = this.reservedKeys.indexOf(32);
			if(spaceKeyIndex > -1){
				this.reservedKeys.splice(spaceKeyIndex, 1);
			}
			*/
		}
	}

}//end Level1 Class

