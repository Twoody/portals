'use strict';

function FancyBorder(props) {
	return React.createElement(
		'div',
		{ className: 'FancyBorder FancyBorder-' + props.color },
		props.children
	);
}
function WelcomeDialog() {
	'use strict';

	return React.createElement(
		FancyBorder,
		{ color: 'blue' },
		React.createElement(
			'h1',
			{ className: 'Dialog-title' },
			'Welcome'
		),
		React.createElement(
			'p',
			{ className: 'Dialog-message' },
			'Thank you for visiting our spacecraft!'
		)
	);
}
function Contacts() {
	return React.createElement('div', { className: 'Contacts', value: 'Foo' })
	//<div className="Contacts">Contacts<div/>
	;
}

function Chat() {
	return React.createElement('div', { className: 'Chat' })
	//<div className="Chat">Chat<div/>
	;
}
function SplitPane(props) {
	return React.createElement(
		'div',
		{ className: 'SplitPane' },
		React.createElement(
			'div',
			{ className: 'SplitPane-left' },
			props.left
		),
		React.createElement(
			'div',
			{ className: 'SplitPane-right' },
			props.right
		)
	);
}
function SplitPaneApp() {
	return React.createElement(SplitPane, {
		left: React.createElement(Contacts, null),
		right: React.createElement(Chat, null)
	});
}

function App() {
	return (
		//<WelcomeDialog />
		React.createElement(SplitPaneApp, null)
	);
}

ReactDOM.render(React.createElement(App, null), document.getElementById('composition_example'));