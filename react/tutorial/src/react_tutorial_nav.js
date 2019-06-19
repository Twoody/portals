'use strict';

const numbers = [
	//put links here
];
const listItems = numbers.map(
	(number) => <li>{number}</li>
);

ReactDOM.render(
	<ul>{listItems}</ul>,
	document.getElementById('react-tutorial-nav')
);
