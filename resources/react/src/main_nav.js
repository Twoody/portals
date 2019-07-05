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
		//TODO: get shopping cart count
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
		let PATHS = fetch(this.props.root + '/config/paths.json')
			.then(response => response.json())
			.then(resData =>{
				console.log(resData['ADMIN_DASH'])
			});

		this.state			= {open:false, isLoggedIn: false};
		this.PATHS			= PATHS;
		console.log('MEAT:' + this.PATHS['ADMIN_DASH']);
		this.home			= this.props.root + '/index.php';
		this.features		= this.props.root + '/features/index.php';
		this.pricing		= this.props.root + '/pricing/index.php';
		this.blog			= this.props.root + '/u/actions/get_blogs/index.php';
		this.userDash		= this.props.root + '/u/actions/index.php';
		this.fname			= this.props.fname;				//DataSet
		this.isLoggedIn	= this.props.is_logged_in;		//DataSet
		this.cartCount		= this.props.cart_count;			//DataSet
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
						<ListItem href={this.home} content="Home" />
						<ListItem href={this.features} content="Features" />
						<ListItem href={this.pricing} content="Pricing" />
						<ListItem href={this.blog} content="Blog" />
						<ShoppingCart 
							href={this.userDash}
							cartCount={this.cartCount} 
							isLoggedIn={this.isLoggedIn}
						/>
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
