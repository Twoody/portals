class ClickableBall extends Ball{
	constructor(properties){
		super(properties);
		this.href	= properties.href;
	}//end constructor()
	consoleHREF(){
		console.log(this.href);
	}
}
