'use strict';
const navClass	= "navbar fixed-top navbar-expand-sm navbar-light bg-light pl-3 pr-3 pb-0 pt-0";
const navID		= "navbar_b";

function NavBrand(props){
	'use strict';
	const root	= props.root;
	const home	= root + "/index.php";
	return(
		<div>
			<a className={"navbar-brand"} href={home}>
				Portals
			</a>
			<button
				aria-controls={"navbarText"}
				aria-expanded={"false"}
				aria-label={"Toggle navigation"}
				className={"navbar-toggler"}
				data-target={"#navbarText"}
				data-toggle={"collapse"}
				type={"button"}
			>
				<span className={"navbar-toggler-icon"}>
				</span>
			</button>
		</div>
	);
}
function ListItem(props){
	'use strict';
	const href		= props.href;
	const content	= props.content;
	const isActive	= props.isActive
	let liClass	= "nav-item";
	if (isActive && isActive === true)
		liClass += " active";
	return(
			<li className={liClass}>
				<a className="nav-link" href={href}>
					{content}
				</a>
			</li>
	);
}
function NavText(props){
	'use strict';
	const isLoggedIn		= props.isLoggedIn;
	//const shoppingCart	= props.shoppingCart;
	const logout			= props.root + '/u/actions/logout/index.php';
	const login				= props.root + '/u/actions/login/index.php';
	const register			= props.root + '/u/actions/register/index.php';
	if (isLoggedIn && isLoggedIn === "1"){
		//TODO: get shopping cart count here to keep out of nav-collapse;
		//cartCount	= props.cartCount;
		return(
			<span className="navbar-text">
				Welcome, {props.fname}.
				<br/>
				<a className="mute" href={logout}>
					Logout
				</a>
			</span>
		);
	}
	else{
		return(
			<span className="navbar-text">
				<a className="" href={login}>
					Sign In
				</a> 
				&nbsp;or&nbsp;
				<a className="" href={register}>
					Register Now
				</a>
			</span>
		);
	}
}
function ShoppingCart(props){
	'use strict';
	if (props.isLoggedIn && props.isLoggedIn === "1"){
		return(
			<li className="nav-item">
				<a  
					className="nav-link" 
					title="Shopping Cart" 
					href={props.href}
				>
					<span className="fa-stack ">
						<i className="fa-stack-2x backdrop-usd fas fa-circle"></i>
						<i className="fa-stack-1x fas fa-tw fa-shopping-cart"></i>
					</span>
					<span className="badge badge-primary">
						{props.cartCount}
					</span>
				</a>
			</li>
		);
	}
	else{
		return (<li/>);
	}
}

class MainNav extends React.Component{
	'use strict';
	constructor(props){
		//TODO: Probably read the paths from a json file;
		//TODO: Pull over shopping cart from nav-test and data-*
		super(props);
		this.state	= {
			collapseIsOpen:false,
			home:			"#",
			features:	"#",
			pricing:		"#",
			blog:			"#",
			userDash:	"#",
			adminDash:	"#"
		};
		let PATHS	= fetch(this.props.root + '/config/paths.json')
			.then(response => response.json())
			.then(resData =>{
				this.setState({home:			resData['NAV_HOME']});
				this.setState({features:	resData['NAV_ITEM2']});
				this.setState({pricing:		resData['NAV_ITEM3']});
				this.setState({blog:			resData['NAV_ITEM4']});
				this.setState({userDash:	resData['NAV_CART']});
				this.setState({adminDash:	resData['ADMIN_DASH']});
			});

		this.PATHS			= PATHS;
		this.isAdmin		= this.props.is_admin;			//DataSet
		this.isLoggedIn	= this.props.is_logged_in;		//DataSet
		this.fname			= this.props.fname;				//DataSet
		this.cartCount		= this.props.cart_count;		//DataSet
	}
	render(){
		return(
			<nav 
				className={navClass}
				id={navID}
			>
				<div className="collapse navbar-collapse" id="navbarText">
					<NavBrand root={this.props.root}/>
					<ul className="navbar-nav mr-auto">
						<ListItem href={this.state.home} content="Home" />
						<ListItem href={this.state.features} content="Features" />
						<ListItem href={this.state.pricing} content="Pricing" />
						<ListItem href={this.state.blog} content="Blog" />
						<ShoppingCart 
							href={this.userDash}
							cartCount={this.cartCount} 
							isLoggedIn={this.isLoggedIn}
						/>
						{this.isAdmin && this.isAdmin === "1" ?(
								<ListItem href={this.state.adminDash} content="Admin" />
							):(
								<div />
							)
						}
					</ul>
					<NavText 
						isLoggedIn={this.isLoggedIn}
						cartCount={this.cartCount}
						fname={this.fname}
						root={this.props.root} 
					/>
				</div>
			</nav>
		);
	}
}

ReactDOM.render(
	<MainNav {...main_nav.dataset}/>,
	document.getElementById('main_nav')	//Main nav bar
);
