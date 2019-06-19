'use strict';

function Welcome(props) {
	return React.createElement(
		'h1',
		null,
		'Hello, ',
		props.name
	);
}

var element = React.createElement(Welcome, { name: 'Betsy' }); //jsk pulling from function
ReactDOM.render(element, document.getElementById('props-example'));