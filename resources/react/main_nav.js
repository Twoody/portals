'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var navClass = "navbar fixed-top navbar-expand-sm navbar-light bg-light pl-3 pr-3 pb-0 pt-0";
var navID = "navbar_b";

function NavBrand(props) {
	'use strict';

	var root = props.root;
	var home = root + "/index.php";
	return React.createElement(
		"div",
		null,
		React.createElement(
			"a",
			{ className: "navbar-brand", href: home },
			"Portals"
		),
		React.createElement(
			"button",
			{
				"aria-controls": "navbarText",
				"aria-expanded": "false",
				"aria-label": "Toggle navigation",
				className: "navbar-toggler",
				"data-target": "#navbarText",
				"data-toggle": "collapse",
				type: "button"
			},
			React.createElement("span", { className: "navbar-toggler-icon" })
		)
	);
}
function ListItem(props) {
	'use strict';

	var href = props.href;
	var content = props.content;
	var isActive = props.isActive;
	var liClass = "nav-item";
	if (isActive && isActive === true) liClass += " active";
	return React.createElement(
		"li",
		{ className: liClass },
		React.createElement(
			"a",
			{ className: "nav-link", href: href },
			content
		)
	);
}
function NavText(props) {
	'use strict';

	var isLoggedIn = props.isLoggedIn;
	//const shoppingCart	= props.shoppingCart;
	var logout = props.root + '/u/actions/logout/index.php';
	var login = props.root + '/u/actions/login/index.php';
	var register = props.root + '/u/actions/register/index.php';
	if (isLoggedIn && isLoggedIn === "1") {
		//TODO: get shopping cart count
		//cartCount	= props.cartCount;
		return React.createElement(
			"span",
			{ className: "navbar-text" },
			"Welcome, ",
			props.fname,
			".",
			React.createElement("br", null),
			React.createElement(
				"a",
				{ className: "mute", href: logout },
				"Logout"
			)
		);
	} else {
		return React.createElement(
			"span",
			{ className: "navbar-text" },
			React.createElement(
				"a",
				{ className: "", href: login },
				"Sign In"
			),
			"\xA0or\xA0",
			React.createElement(
				"a",
				{ className: "", href: register },
				"Register Now"
			)
		);
	}
}
function ShoppingCart(props) {
	'use strict';

	if (props.isLoggedIn && props.isLoggedIn === "1") {
		return React.createElement(
			"li",
			{ className: "nav-item" },
			React.createElement(
				"a",
				{ className: "nav-link", title: "Shopping Cart", href: props.userDash },
				React.createElement(
					"span",
					{ className: "fa-stack " },
					React.createElement("i", { className: "fa-stack-2x backdrop-usd fas fa-circle" }),
					React.createElement("i", { className: "fa-stack-1x fas fa-tw fa-shopping-cart" })
				),
				React.createElement(
					"span",
					{ className: "badge badge-primary" },
					props.cartCount
				)
			)
		);
	} else {
		return React.createElement("li", null);
	}
}

var MainNav = function (_React$Component) {
	_inherits(MainNav, _React$Component);

	function MainNav(props) {
		_classCallCheck(this, MainNav);

		var _this = _possibleConstructorReturn(this, (MainNav.__proto__ || Object.getPrototypeOf(MainNav)).call(this, props));
		//TODO: Probably read the paths from a json file;
		//TODO: Pull over shopping cart from nav-test and data-*


		_this.state = { open: false, isLoggedIn: false };
		_this.home = _this.props.root + '/index.php';
		_this.features = _this.props.root + '/features/index.php';
		_this.pricing = _this.props.root + '/pricing/index.php';
		_this.blog = _this.props.root + '/u/actions/get_blogs/index.php';
		_this.userDash = _this.props.root + '/u/actions/index.php';
		_this.fname = _this.props.fname; //DataSet
		_this.isLoggedIn = _this.props.is_logged_in; //DataSet
		_this.cartCount = _this.props.cartCount; //DataSet
		return _this;
	}

	_createClass(MainNav, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"nav",
				{
					className: navClass,
					id: navID
				},
				React.createElement(
					"div",
					{ className: "collapse navbar-collapse", id: "navbarText" },
					React.createElement(NavBrand, { root: this.props.root }),
					React.createElement(
						"ul",
						{ className: "navbar-nav mr-auto" },
						React.createElement(ListItem, { href: this.home, content: "Home" }),
						React.createElement(ListItem, { href: this.features, content: "Features" }),
						React.createElement(ListItem, { href: this.pricing, content: "Pricing" }),
						React.createElement(ListItem, { href: this.blog, content: "Blog" }),
						React.createElement(ShoppingCart, {
							cartCount: this.cartCount,
							isLoggedIn: this.isLoggedIn,
							href: this.userDash
						})
					),
					React.createElement(NavText, {
						isLoggedIn: this.isLoggedIn,
						cartCount: this.cartCount,
						fname: this.fname,
						root: this.props.root
					})
				)
			);
		}
	}]);

	return MainNav;
}(React.Component);

ReactDOM.render(React.createElement(MainNav, main_nav.dataset), document.getElementById('main_nav') //Main nav bar
);