import { World } from "./World.js";

export class Background extends World{
	/*
		Build a world with branded balls;
		Background shoudl have accelerate and newball clicks;
		Background should have one single movable rectangle;
		Background should have an extra layer of HUD:
			HUD will have ball cnt;
	*/
	constructor(props={}){
		props.hasBrandBalls	= true;
		props.hasMovableRect	= true;
		props.initBallCnt		= 85;
		super(props);
		this.isDisplayingHud	= true;
	}
}//end Background Class


