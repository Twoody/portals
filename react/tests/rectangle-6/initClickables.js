function initClickables(sWidth, sHeight) {
	var minRadius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
	var maxRadius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;
	var maxSpeed = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
	var rectangles = arguments[5];

	var clickables = [{
		__name: 'gmail',
		faUnicode: '\uF1A0',
		href: 'mailto:Tanner.L.Woody@gmail.com',
		color: '#dd4b39'
	}, {
		__name: 'android',
		faUnicode: '\uF17B',
		href: 'https://play.google.com/store/apps/details?id=com.beWoody.tanner.KISS_List',
		color: '#a4c639'
	}, {
		__name: 'strava',
		faUnicode: '\uF428',
		href: 'https://www.strava.com/athletes/9502204',
		color: '#fc4c02'
	}, {
		__name: 'instagram',
		faUnicode: '\f16d',
		href: 'https://www.instagram.com/thatguywoody/',
		color: '#125688'
	}, {
		__name: 'facebook',
		faUnicode: '\uF09A',
		href: 'https://www.facebook.com/tanner.woody.9',
		color: '#3B5998'
	}, {
		__name: 'linkedIn',
		faUnicode: '\uF2B8',
		href: 'https://www.linkedin.com/in/tanner-woody-113208b7/',
		color: '#007bb5'
	}, {
		__name: 'twitter',
		faUnicode: '\uF099',
		href: 'https://twitter.com/woody_tanner',
		color: '#55ACEE'
	}, {
		__name: 'stackoverflow',
		faUnicode: '\uF16C',
		href: 'https://stackoverflow.com/users/2957890/t-woody',
		color: '#FF9900'
	}, {
		__name: 'github',
		faUnicode: '\f09b',
		href: 'https://github.com/TWoody',
		color: '#f40083'
	}];
	var retBalls = [];
	for (var i = 0; i < clickables.length; i++) {
		var clickable = clickables[i];
		var isLegal = false;
		var cnt = 0;
		var newBall = null;
		while (isLegal === false) {
			newBall = makeRandomClickableBall(sWidth, sHeight, clickable.__name, //ballID
			minRadius, maxRadius, clickable.faUnicode, clickable.href, maxSpeed);
			isLegal = isLegalBall(newBall, sWidth, sHeight, retBalls, rectangles);
			cnt += 1;
			if (cnt === 50) {
				console.log('UNABLE TO MAKE BALL ' + clickable.__name);
				break;
			}
		} //end while
		if (newBall && cnt !== 50) retBalls.push(newBall);
	} //end i-for
	return retBalls;
}