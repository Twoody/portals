class ClickableBall extends Ball{
	constructor(properties){
		super(properties);
		this.href	= properties.href;
	}//end constructor()
	consoleHREF(){
		console.log(this.href);
	}
	handleClick(){
		/*WARNING: ReWrite of ./Balls.js and handleClick
			Input:
				None
			Output:
				Boolean if success;
		*/
		console.log('Opening ' + this.href);
		return true;
	}
}
