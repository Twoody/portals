'use strict';

function tick() {
	var element = React.createElement(
		'div',
		null,
		React.createElement(
			'h1',
			null,
			'Hellow, world!'
		),
		React.createElement(
			'h2',
			null,
			'The time is ',
			new Date().toLocaleTimeString(),
			'.'
		)
	);
	ReactDOM.render(element, document.getElementById('ticking-clock'));
}

setInterval(tick, 1000);