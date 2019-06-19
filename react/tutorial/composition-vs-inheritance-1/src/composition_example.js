'use strict';

function FancyBorder(props){
	return (
		<div className={'FancyBorder FancyBorder-' + props.color}>
			{props.children}
		</div>
	);
}
function WelcomeDialog(){
	'use strict';
	return (
		<FancyBorder color="blue">
			<h1 className="Dialog-title">
				Welcome
			</h1>
			<p className="Dialog-message">
				Thank you for visiting our spacecraft!
			</p>
		</FancyBorder>
	);
}
function Contacts(){
	return(
		<div className="Contacts" value="Foo"/>
		//<div className="Contacts">Contacts<div/>
	);
}

function Chat(){
	return(
		<div className="Chat" />
		//<div className="Chat">Chat<div/>
	);
}
function SplitPane(props) {
	return (
		<div className="SplitPane">
			<div className="SplitPane-left">
				{props.left}
			</div>
			<div className="SplitPane-right">
				{props.right}
			</div>
		</div>
	);
}
function SplitPaneApp(){
	return (
		<SplitPane 
			left={<Contacts />}
			right={<Chat />}
		/>
	);
}

function App(){
	return(
		//<WelcomeDialog />
		<SplitPaneApp />
	);
}

ReactDOM.render(
	<App />,
	document.getElementById('composition_example')
);
