'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BallPen = function (_React$Component) {
   _inherits(BallPen, _React$Component);

   function BallPen(props) {
      _classCallCheck(this, BallPen);

      var _this = _possibleConstructorReturn(this, (BallPen.__proto__ || Object.getPrototypeOf(BallPen)).call(this, props));

      _this.state = {
         height: 0,
         width: 0
      };
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
               style: penStyle
            })
         );
      }
   }]);

   return BallPen;
}(React.Component);

ReactDOM.render(React.createElement(BallPen, null), document.getElementById('ball-pen-1'));