export function initClickables( 
	sWidth,
	sHeight, 
	minRadius=3, 
	maxRadius=30, 
	maxSpeed=null, 
	rectangles
){
	const clickables = [
		{
			__name:		'gmail',
			faUnicode: '\uf1a0',
			href:			'mailto:Tanner.L.Woody@gmail.com',
			color:		'#dd4b39',
		},
		{
			__name:		'android',
			faUnicode: '\uF17B',
			href:			'https://play.google.com/store/apps/details?id=com.beWoody.tanner.KISS_List',
			color:		'#a4c639',
		},
		{
			__name:		'strava',
			faUnicode: '\uf428',
			href:			'https://www.strava.com/athletes/9502204',
			color:		'#fc4c02',
		},
		{
			__name:		'instagram',
			faUnicode:	'\uf16d',
			href:			'https://www.instagram.com/thatguywoody/',
			color:		'#125688',
		},
		{
			__name:		'facebook',
			faUnicode:	'\uf09a',
			href:			'https://www.facebook.com/tanner.woody.9',
			color:		'#3B5998',
		},
		{
			__name:		'linkedIn',
			faUnicode:	'\uf08c',
			href:			'https://www.linkedin.com/in/tanner-woody-113208b7/',
			color:		'#007bb5',
		},
		{
			__name:		'twitter',
			faUnicode:	'\uf099',
			href:			'https://twitter.com/woody_tanner',
			color:		'#55ACEE',
		},
		{
			__name:		'stackoverflow',
			faUnicode:	'\uf16c',
			href:			'https://stackoverflow.com/users/2957890/t-woody',
			color:		'#FF9900',
		},
		{
			__name:		'github',
			faUnicode:	'\uf09b',
			href:			'https://github.com/TWoody',
			color:		'#f40083',
		},
	];
	let retBalls = [];
	for (let i=0; i<clickables.length; i++){
		let clickable	= clickables[i];
		let isLegal		=  false;
		let cnt			= 0;
		let newBall		= null;
		while(isLegal === false){
			newBall = makeRandomClickableBall(
				sWidth, 
				sHeight,
				clickable.__name, //ballID
				minRadius, 
				maxRadius,
				clickable.faUnicode, 
				clickable.href,
				maxSpeed
			);
			isLegal = isLegalBall(newBall, sWidth, sHeight, retBalls, rectangles);
			//console.log('clickable attemp: ' + cnt);
			cnt += 1;
			if(cnt === 50){
				console.log('UNABLE TO MAKE BALL ' + clickable.__name);
				break;
			}
		}//end while
		if(newBall && cnt !== 50){
			newBall.color = clickable.color;
			retBalls.push(newBall);
		}
	}//end i-for
	return retBalls;
}
