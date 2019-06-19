'use strict';

function tick(){
	const element	= (
		<div>
			<h1>Hellow, world!</h1>
			<h2>
				The time is {new Date().toLocaleTimeString()}.
			</h2>
		</div>
	);
	ReactDOM.render(
		element,
		document.getElementById('ticking-clock')
	);
}

setInterval(tick, 1000);
