'use strict';
class BallPen extends React.Component{
	constructor(props){
		super(props);
		this.state		= {
			height: 0,
			width: 0,
		};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}
	
	componentDidMount() {
		this.updateWindowDimensions();
		this.updateCanvas();
		window.addEventListener('resize', this.updateWindowDimensions);
	}
	componentDidUpdate() {
		this.updateCanvas();
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		let width	= window.innerWidth;
		if (width && width >575)
			width -= 320;	//Buffer for not x-small
		else
			width -= 120;	//Buffer for x-small
		let height	= window.innerHeight;
		height	-= 320;	//Buffer...
		if (height < 0)
			height = 0;
		this.setState({
			width: width, 
			height: height
		});
		return;
	}
	updateCanvas(){
		const canvas	= this.refs.canvas;
		const ctx		= canvas.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(0,0, 100, 100);
		ctx.rect(0,0, this.state.width, this.state.height);
		ctx.fill();
	}

	render(){
		const penStyle	= {
			border:	"1px solid #000000"
		};
		return (
			<div>
				<h1>
					Height:{this.state.height}
				</h1>
				<h1>
					Width:{this.state.width}
				</h1>
				<canvas
					ref="canvas"
					width={this.state.width}
					height={this.state.height}
					style={penStyle}
				/>
			</div>
		);
	}
}

ReactDOM.render(
	<BallPen />,
	document.getElementById('ball-pen')
);

