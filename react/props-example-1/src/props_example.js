'use strict';

function Welcome(props) {
	return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Betsy" />; //jsk pulling from function
ReactDOM.render(
	element,
	document.getElementById('props-example')
);

