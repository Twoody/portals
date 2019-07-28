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
			var bottomDistance = ball.distanceTo(ball.nextX, this.yBottom);
			var topDistance = ball.distanceTo(ball.nextX, this.ytop);
			var leftDistance = ball.distanceTo(this.xLeft, ball.nextY);
			var rightDistance = ball.distanceTo(this.xRight, ball.nextY);
			var willOverLapBottom = bottomDistance < ball.radius;
			var willOverLapTop = topDistance < ball.radius;
			var willOverLapLeft = leftDistance < ball.radius;
			var willOverLapRight = rightDistance < ball.radius;
			var isOverLapping = willOverLapBottom && willOverLapTop && willOverLapRight && willOverLapLeft;
			return isOverLapping;
		}
	}]);

	return Rectangle;
}(); //End Rectangle Class