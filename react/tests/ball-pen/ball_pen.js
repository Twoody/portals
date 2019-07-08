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
		this.xTrajectory = 2;
		this.yTrajectory = 2;
		this.acceleration = 0;
		this.gravity = 0.05;
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
			if (xBound2 <= 0) {
				this.xTrajectory = -this.xTrajectory;;
				this.xCord = 0 + this.radius + 1;
			} else if (xBound1 >= penWidth) {
				this.xTrajectory = -this.xTrajectory;;
				this.xCord = penWidth - this.radius - 1;
			} else if (yBound2 <= 0) {
				this.yTrajectory = -this.yTrajectory;;
				this.yCord = 0 + this.radius + 1;
			} else if (yBound1 >= penHeight) {
				this.acceleration += 1;
				this.yTrajectory = -this.yTrajectory;;
				this.yCord = penHeight - this.radius - 1;
			}
		}
	}, {
		key: 'updateCoordinates',
		value: function updateCoordinates(maxHeight) {
			//Commented out until we get acceleration and gravity on track;
			//if (this.acceleration <= 0 && (this.yCord+this.radius >=maxHeight)){
			//stuck on the floor with no movement;
			//	return;
			//}
			if (this.yTrajectory > 0) {
				//We are going down;
				//Gravity increases;
			} else {
					//We are going up;
				}
			this.xCord += this.xTrajectory;
			this.yCord += this.yTrajectory;
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
			}, 25);
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
				this.ball.updateCoordinates(this.state.height);
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