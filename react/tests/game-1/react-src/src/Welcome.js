import { World } from "./World.js";

export class Welcome extends World{
	/*
		Be the begining screen of the game;
		Add the other levels to a clickable interface for
		our game to choose from;
	*/
	constructor(props={}){
		props.hasBrandBalls	= false;
		props.hasMovableRect	= false;
		props.initBallCnt		= 85;
		super(props);
	}
}//end Welcome Class
