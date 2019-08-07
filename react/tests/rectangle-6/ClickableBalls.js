var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClickableBall = function (_Ball) {
	_inherits(ClickableBall, _Ball);

	function ClickableBall(properties) {
		_classCallCheck(this, ClickableBall);

		var _this = _possibleConstructorReturn(this, (ClickableBall.__proto__ || Object.getPrototypeOf(ClickableBall)).call(this, properties));

		_this.href = properties.href;
		return _this;
	} //end constructor()


	_createClass(ClickableBall, [{
		key: 'consoleHREF',
		value: function consoleHREF() {
			console.log(this.href);
		}
	}, {
		key: 'handleClick',
		value: function handleClick() {
			/*WARNING: ReWrite of ./Balls.js and handleClick
   	Input:
   		None
   	Output:
   		Boolean if success;
   */
			console.log('Opening ' + this.href);
			return true;
		}
	}]);

	return ClickableBall;
}(Ball);