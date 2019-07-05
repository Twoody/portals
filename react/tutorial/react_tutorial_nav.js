'use strict';

var numbers = [
	//put links here
];
var listItems = numbers.map(function (number) {
	return React.createElement(
		'li',
		null,
		number
	);
});

ReactDOM.render(React.createElement(
	'ul',
	null,
	listItems
), document.getElementById('react-tutorial-nav'));