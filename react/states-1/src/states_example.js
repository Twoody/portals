'use strict';

class Clock extends React.Component{
	constructor(props){
		super(props);
		this.state = {date: new Date()};
	}

	tick(){
		this.setState(
			{
				date: new Date()
			}
		);
	}

	//"lifecycle methods"
	componentDidMount(){
		this.timerID	= setInterval(
			()=>this.tick(),
			1000
		);
	}

	//"lifecycle methods"
	componentWillUnmount(){
		clearInterval(this.timerID);
	}

	render(){
		return (
			<div>
				<h1>
					Hello, World!
				</h1>
				<h2>
					The time is {this.state.date.toLocaleTimeString()}.
				</h2>
			</div>
		);
	}
}

ReactDOM.render(
	<Clock />,
	document.getElementById('states-example')
);

