var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = function () {
	function Rectangle(properties) {
		_classCallCheck(this, Rectangle);

		this.rectID = properties.rectID;
		this.color = properties.color;
		this.width = properties.width;
		this.height = properties.height;
		this.xLeft = properties.xLeft;
		this.yTop = properties.yTop;
		this.xRight = this.xLeft + this.width;
		this.yBottom = this.yTop + this.height;
		this.xCenter = Math.abs(this.xRight - this.width / 2);
		this.yCenter = Math.abs(this.yBottom - this.height / 2);
		this.gravity = 0;
		this.friction = 0.05;
	}

	_createClass(Rectangle, [{
		key: 'draw',
		value: function draw(ctx) {
			ctx.beginPath();
			ctx.rect(this.xLeft, this.yTop, this.width, this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
		}
	}, {
		key: 'isOverLappingBall',
		value: function isOverLappingBall(ball) {
			//Each distance should be positive;
			//rectangle bottom is highest value: subtract top of ball from it;
			//rectangle top is lower value: add ball and radius and subtract rectangle top;
			//rectangle right is hight value: subtract left of ball from it;
			//rectangle left is lower value: add ball and radius and subtract rectangle left from it;
			var bottomDistance = this.yBottom - ball.nextY - ball.radius;
			var topDistance = ball.nextY + ball.radius - this.yTop;
			var rightDistance = this.xRight - ball.nextX - ball.radius;
			var leftDistance = ball.nextX + ball.radius - this.xLeft;
			var isBallAboveBottom = bottomDistance > -15;
			var isBallBelowTop = topDistance > -15;
			var isBallRightOfLeft = leftDistance > -15;
			var isBallLeftOfRight = rightDistance > -15;
			var isOverLapping = isBallAboveBottom && isBallBelowTop && isBallLeftOfRight && isBallRightOfLeft;
			return isOverLapping;
		}
	}]);

	return Rectangle;
}(); //End Rectangle Class