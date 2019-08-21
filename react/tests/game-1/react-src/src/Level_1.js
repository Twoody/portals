import { World } from "./World.js";
import { Ball } from "./Ball.js";

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
		this.hasGravity		= true;
		this.hasWallFriction = true;
		this.hasIneritia		= true;
		this.hasBallFriction	= true;
		this.didInit			= false;	//Init is when we hit spacebar
	}
	initBalls(){
		//WWARNING: Rewriting World.initBalls()
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
		this.balls.push(newBall);
		this.initBallCnt = 1;
		return true;
	}
	updateRectangle(ctx){
		//Update the ball with the rectangle while we did not init;
		super.updateRectangle(ctx);
		if(this.didInit === false){
			this.balls = [];
			this.initBalls();
		}
	}
}//end Level1 Class

