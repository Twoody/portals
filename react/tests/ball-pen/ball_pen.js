'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
	function Ball(props) {
		_classCallCheck(this, Ball);

		this.xCord = 21;
		this.yCord = 21;
		this.radius = 20;
		this.trajectory = 120; //In degrees; 0 to 359
		this.acceleration = 0;
		this.color = "white";
		this.ballId = props.ballId;
		this.canvas = props.canvas;
	}

	_createClass(Ball, [{
		key: 'draw',
		value: function draw() {
			var ctx = this.canvas.getContext('2d');
			ctx.beginPath();
			ctx.arc(this.xCord, this.yCord, this.radius, 2 * Math.PI, false);
			ctx.fillStyle = "blue";
			ctx.fill();
		}
	}, {
		key: 'updateTrajectory',
		value: function updateTrajectory(penHeight, penWidth) {
			//Will need to update to allow for multiple heights and widths
			//	and then find the best/only solution;
			var xBound1 = this.xCord + this.radius;
			var xBound2 = this.xCord - this.radius;
			var yBound1 = this.yCord + this.radius;
			var yBound2 = this.yCord - this.radius;
			if (xBound1 >= penWidth || xBound2 <= 0) {
				this.trajectory += 180;
				if (xBound2 < 0) this.xCord = 0 + this.radius + 1;else if (xBound1 > penWidth) this.xCord = penWidth - this.radius - 1;
			} else if (yBound1 >= penHeight || yBound2 <= 0) {
				//	if (this.yCord >= penHeight || this.yCord <= 0){
				this.trajectory += 180;
				if (yBound2 < 0) this.yCord = 0 + this.radius + 1;else if (yBound1 > penHeight) this.yCord = penHeight - this.radius - 1;
			}
			if (this.trajectory >= 360) this.trajectory -= 360; //reset back between 0 and 359;
		}
	}, {
		key: 'updateCoordinates',
		value: function updateCoordinates() {
			if (this.trajectory >= 330 && this.trajectory < 360) {
				//1
				//up one;
				this.yCord = this.yCord - 1;
				this.xCord = this.xCord;
			} else if (this.trajectory >= 0 && this.trajectory < 15) {
				//1
				//up one;
				this.yCord = this.yCord - 1;
				this.xCord = this.xCord;
			} else if (this.trajectory >= 15 && this.trajectory < 60) {
				//2
				//up one; right one;
				this.yCord = this.yCord - 1;
				this.xCord = this.xCord + 1;
			} else if (this.trajectory >= 60 && this.trajectory < 105) {
				//3
				//right one;
				this.yCord = this.yCord;
				this.xCord = this.xCord + 1;
			} else if (this.trajectory >= 105 && this.trajectory < 150) {
				//4
				//down one; right one;
				this.yCord = this.yCord + 1;
				this.xCord = this.xCord + 1;
			} else if (this.trajectory >= 150 && this.trajectory < 195) {
				//5
				//down one;
				this.yCord = this.yCord + 1;
				this.xCord = this.xCord;
			} else if (this.trajectory >= 195 && this.trajectory < 240) {
				//6
				//down one; left one;
				this.yCord = this.yCord + 1;
				this.xCord = this.xCord - 1;
			} else if (this.trajectory >= 240 && this.trajectory < 285) {
				//7
				//left one;
				this.yCord = this.yCord;
				this.xCord = this.xCord - 1;
			} else if (this.trajectory >= 285 && this.trajectory < 330) {
				//8
				//up one; left one;
				this.yCord = this.yCord - 1;
				this.xCord = this.xCord - 1;
			} else {
				console.log('BALL TRAJECTORY OUT OF BOUNDS');
			}
		}
	}]);

	return Ball;
}();

var BallPen = function (_React$Component) {
	_inherits(BallPen, _React$Component);

	function BallPen(props) {
		_classCallCheck(this, BallPen);

		var _this = _possibleConstructorReturn(this, (BallPen.__proto__ || Object.getPrototypeOf(BallPen)).call(this, props));

		_this.state = {
			height: 0,
			width: 0
		};
		_this.ball = null;
		_this.isStarted = false;
		_this.updateWindowDimensions = _this.updateWindowDimensions.bind(_this);
		return _this;
	}

	_createClass(BallPen, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.updateWindowDimensions();
			this.updateCanvas();
			this.timerID = setInterval(function () {
				return _this2.updateCanvas();
			}, 10);
			window.addEventListener('resize', this.updateWindowDimensions);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearInterval(this.timerID);
			window.removeEventListener('resize', this.updateWindowDimensions);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.updateCanvas();
		}
	}, {
		key: 'updateWindowDimensions',
		value: function updateWindowDimensions() {
			var width = window.innerWidth;
			if (width && width > 575) width -= 320; //Buffer for not x-small
			else width -= 120; //Buffer for x-small
			var height = window.innerHeight;
			height -= 280; //Buffer...
			if (height < 0) height = 0;
			this.setState({
				width: width,
				height: height
			});
			return;
		}
	}, {
		key: 'updateCanvas',
		value: function updateCanvas() {
			var canvas = this.refs.canvas;
			var ctx = canvas.getContext('2d');
			ctx.beginPath();
			ctx.rect(0, 0, this.state.width, this.state.height);
			ctx.fillStyle = "#FF0000";
			ctx.fill();
			if (this.isStarted === false) {
				//init balls
				this.ball = new Ball({ canvas: canvas, ballID: "ball0" });
				this.ball.draw();
				this.isStarted = true;
			} else {
				//animate balls
				//Will need to refigure trajectory and acceleration;
				this.ball.updateTrajectory(this.state.height, this.state.width);
				this.ball.updateCoordinates();
				this.ball.draw();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var penStyle = {
				border: "1px solid #000000"
			};
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h1',
					null,
					'Height:',
					this.state.height
				),
				React.createElement(
					'h1',
					null,
					'Width:',
					this.state.width
				),
				React.createElement('canvas', {
					ref: 'canvas',
					width: this.state.width,
					height: this.state.height,
					style: penStyle
				})
			);
		}
	}]);

	return BallPen;
}(React.Component);

ReactDOM.render(React.createElement(BallPen, null), document.getElementById('ball-pen'));