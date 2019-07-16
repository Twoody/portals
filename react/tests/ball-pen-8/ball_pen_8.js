'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
	function Ball(properties) {
		_classCallCheck(this, Ball);

		this.canvas = properties.canvas;
		this.ballID = properties.ballID;
		this.x = properties.x;
		this.y = properties.y;
		this.radius = properties.radius;
		this.elasticity = 0.65;
		this.color = "blue";
		this.xVelocity = 2;
		this.yVelocity = 5;
		this.nextX = this.x + this.xVelocity;
		this.nextY = this.y + this.yVelocity;
		this.mass = this.radius * 3;
		this.hasFriction = false;
		this.hasGravity = false;
	}

	_createClass(Ball, [{
		key: 'draw',
		value: function draw() {
			var ctx = this.canvas.getContext('2d');
			this.x = this.nextX;
			this.y = this.nextY;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 2 * Math.PI, //Start angle in radians
			0 //End angle in radians
			);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	}, {
		key: 'applyGravity',
		value: function applyGravity(maxHeight, gravity) {
			if (this.y + this.radius < maxHeight) this.yVelocity += gravity;
		}
	}, {
		key: 'applyElasticity',
		value: function applyElasticity() {
			this.yVelocity *= -1 * this.elasticity;
		}
	}, {
		key: 'applyFriction',
		value: function applyFriction(friction) {
			this.xVelocity = this.xVelocity - this.xVelocity * friction;
			//this.yVelocity = this.yVelocity - (this.yVelocity*friction);
		}
	}, {
		key: 'updateBall',
		value: function updateBall(maxWidth, maxHeight, friction, allBalls, gravity) {
			if (this.hasGravity && this.y + this.radius <= maxHeight) this.applyGravity(maxHeight, gravity);
			this.nextX = this.x + this.xVelocity;
			this.nextY = this.y + this.yVelocity;
			this.x = this.x + this.xVelocity;
			this.y = this.y + this.yVelocity;
			this.handleWallCollisions(maxWidth, maxHeight, friction);
			this.handleBallCollisions(maxWidth, maxHeight, friction, allBalls);
		}
	}, {
		key: 'handleWallCollisions',
		value: function handleWallCollisions(maxWidth, maxHeight, friction) {
			if (this.nextX > maxWidth - this.radius) {
				if (this.hasFriction) this.applyFriction(friction);
				this.xVelocity *= -1;
				this.nextX = maxWidth - this.radius;
			}
			if (this.nextX < this.radius) {
				if (this.hasFriction) this.applyFriction(friction);
				this.xVelocity *= -1;
				this.nextX = this.radius;
			}
			if (this.nextY > maxHeight - this.radius) {
				if (this.hasGravity) this.applyElasticity();else this.yVelocity *= -1;
				if (this.hasFriction) this.applyFriction(friction);
				this.nextY = maxHeight - this.radius;
			}
			if (this.nextY < this.radius) {
				if (this.hasFriction) this.applyFriction(friction);
				this.yVelocity *= -1;
				this.nextY = this.radius;
			}
		}
	}, {
		key: 'handleBallCollisions',
		value: function handleBallCollisions(maxWidth, maxHeight, friction, allBalls) {
			for (var i = 0; i < allBalls.length; i++) {
				var otherBall = allBalls[i];
				if (otherBall.ballID === this.ballID) continue;
				var willCollide = this.isCollidingWith(otherBall);
				if (!willCollide) continue;
				//Else, update velocity and direction between balls;
				otherBall.nextX = otherBall.x + otherBall.xVelocity;
				otherBall.nextY = otherBall.y + otherBall.yVelocity;
				var collisionAngle = this.getCollisionAngle(otherBall);

				var mass1 = this.mass;
				var speed1 = this.getSpeed();
				var direction1 = this.getDirection();
				var xVelocity1 = speed1 * Math.cos(direction1 - collisionAngle);
				var yVelocity1 = speed1 * Math.sin(direction1 - collisionAngle);

				var mass2 = otherBall.mass;
				var speed2 = otherBall.getSpeed();
				var direction2 = otherBall.getDirection();
				var xVelocity2 = speed2 * Math.cos(direction2 - collisionAngle);
				var yVelocity2 = speed2 * Math.sin(direction2 - collisionAngle);

				var mDiff1 = mass1 - mass2;
				var mDiff2 = mass2 - mass1;
				var mass3 = mass1 + mass2;

				var xVelocityFinal1 = (mDiff1 * xVelocity1 + mass2 * 2 * xVelocity2) / mass3;
				//var final_velocityx_1 = ((ball1.mass - ball2.mass) * velocityx_1 + 
				//    (ball2.mass + ball2.mass) * velocityx_2)/(ball1.mass + ball2.mass);
				var xVelocityFinal2 = (mass3 * xVelocity1 + mDiff2 * xVelocity2) / mass3;
				//var final_velocityx_2 = ((ball1.mass + ball1.mass) * velocityx_1 + 
				//    (ball2.mass - ball1.mass) * velocityx_2)/(ball1.mass + ball2.mass);

				//Rotate angles back to preserve collision angle;
				var xLengthOfSide = Math.cos(collisionAngle);
				var xLengthOfReflection = Math.cos(collisionAngle + Math.PI / 2);
				var yLengthOfSide = Math.sin(collisionAngle);
				var yLengthOfReflection = Math.sin(collisionAngle + Math.PI / 2);
				this.xVelocity = xLengthOfSide * xVelocityFinal1 + xLengthOfReflection * yVelocity1;
				otherBall.xVelocity = xLengthOfSide * xVelocityFinal2 + xLengthOfReflection * yVelocity1;
				this.yVelocity = yLengthOfSide * xVelocityFinal1 + yLengthOfReflection * yVelocity1;
				otherBall.yVelocity = yLengthOfSide * xVelocityFinal2 + yLengthOfReflection * yVelocity2;

				//Update next coordinates for both balls;
				this.nextX = this.x + this.xVelocity;
				this.nextY = this.y + this.yVelocity;
				this.x = this.x + this.xVelocity;
				this.y = this.y + this.yVelocity;
				//otherBall.handleWallCollisions(maxWidth, maxHeight, friction);
			} //end i-for
		}
	}, {
		key: 'isCollidingWith',
		value: function isCollidingWith(otherBall) {
			var rCombined = this.radius + otherBall.radius;
			//const	xDiff				= this.nextX - otherBall.x;
			//const	yDiff				= this.nextY - otherBall.y;
			var xDiff = this.nextX - otherBall.nextX;
			var yDiff = this.nextY - otherBall.nextY;
			var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
			if (!distance) console.log('WARNING: DISTANCE NOT CALCULABLE');
			if (distance >= rCombined) return false;
			return true;
		}
	}, {
		key: 'getSpeed',
		value: function getSpeed() {
			var speed = Math.sqrt(Math.pow(this.xVelocity, 2) + Math.pow(this.yVelocity, 2));
			return speed;
		}
	}, {
		key: 'getDirection',
		value: function getDirection() {
			var direction = Math.atan2(this.yVelocity, this.xVelocity);
			return direction;
		}
	}, {
		key: 'getCollisionAngle',
		value: function getCollisionAngle(otherBall) {
			//const xDiff = this.nextX - otherBall.x;
			//const yDiff = this.nextY - otherBall.y;
			var xDiff = this.nextX - otherBall.nextX;
			var yDiff = this.nextY - otherBall.nextY;
			var angle = Math.atan(yDiff, xDiff);
			if (!angle) console.log('WARNING: COLLISION ANGLE NOT CALCULABLE');
			return angle;
		}
	}]);

	return Ball;
}(); //End Ball Class


var BallPen = function (_React$Component) {
	_inherits(BallPen, _React$Component);

	function BallPen(props) {
		_classCallCheck(this, BallPen);

		var _this = _possibleConstructorReturn(this, (BallPen.__proto__ || Object.getPrototypeOf(BallPen)).call(this, props));

		_this.state = {
			height: 0,
			width: 0
		};
		_this.balls = [];
		_this.friction = 0.5;
		_this.gravity = 0.1;
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
			var canvas = this.canvasRef;
			var ctx = canvas.getContext('2d');
			ctx.beginPath();
			ctx.rect(0, 0, this.state.width, this.state.height);
			ctx.fillStyle = "#FF0000";
			ctx.fill();
			if (this.state.width !== 0) {
				if (this.balls.length === 0) {
					// Init first ball
					this.balls.push(new Ball({
						canvas: canvas,
						ballID: this.balls.length,
						x: 41,
						y: 41,
						radius: 30
					}));
				} // End first ball init;
				for (var i = 0; i < this.balls.length; i++) {
					var ball = this.balls[i];
					ball.updateBall(this.state.width, this.state.height, this.friction, this.balls, this.gravity);
					ball.draw();
				} //end i-for
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var penStyle = {
				border: "1px solid #000000"
			};
			return React.createElement(
				'div',
				null,
				React.createElement('canvas', {
					ref: function ref(canvas) {
						return _this3.canvasRef = canvas;
					},
					width: this.state.width,
					height: this.state.height,
					style: penStyle,
					onClick: function onClick(e) {
						var rect = _this3.canvasRef.getBoundingClientRect();
						var xMousePos = e.clientX;
						var yMousePos = e.clientY;
						var xCanvasPos = xMousePos - rect.left;
						var yCanvasPos = yMousePos - rect.top;
						var radius = _this3.balls[0].radius;
						var isLegalBall = true;
						var didClickBall = false;
						for (var i = 0; i < _this3.balls.length; i++) {
							var ball = _this3.balls[i];
							var xBall = ball.x;
							var yBall = ball.y;
							var xDiff = xCanvasPos - xBall;
							var yDiff = yCanvasPos - yBall;
							var ballMouseDistance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
							var clickedBall = ballMouseDistance <= radius;
							if (isLegalBall) isLegalBall = ballMouseDistance >= radius * 2;
							if (clickedBall) {
								//ball.accelerate();
								didClickBall = true;
								break;
							}
						} //end i-for
						if (isLegalBall) {
							//Check with top, bottom, and sides;
							if (xCanvasPos - radius < 0) isLegalBall = false;else if (xCanvasPos + radius > _this3.state.width) isLegalBall = false;else if (yCanvasPos - radius < 0) isLegalBall = false;else if (yCanvasPos + radius > _this3.state.height) isLegalBall = false;
						}
						if (!didClickBall) {
							//Make new ball;
							if (isLegalBall) {
								console.log('Making new ball' + _this3.balls.length);
								var canvas = _this3.canvasRef;
								var newBall = new Ball({
									canvas: canvas,
									ballID: _this3.balls.length,
									x: xCanvasPos,
									y: yCanvasPos,
									radius: 30
								});
								_this3.balls.push(newBall);
							} else console.log('Not legal ball');
						}
					}

				})
			);
		}
	}]);

	return BallPen;
}(React.Component);

ReactDOM.render(React.createElement(BallPen, null), document.getElementById('ball-pen-8'));