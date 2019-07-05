'use strict';

const navClass	= "navbar fixed-top navbar-expand-sm navbar-light bg-light pl-3 pr-3 pb-0 pt-0";
const navID	= "navbar_b";

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
	const href		= props.href;
	const content	= props.content;
	const isActive	= props.isActive
	let liClass	= "nav-item";
	if (isActive && isActive === true)
		liClass += " active";
	return(
		<div>
			<li className={liClass}>
				<a className="nav-link" href={href}>
					{content}
				</a>
			</li>
		</div>
	);
}
function ShoppingCart(props){
	return '';
}

function NavText(props){
	'use strict';
	const isLoggedIn	= props.isLoggedIn;
	const cartCount	= props.cartCount;
	const logout		= props.root + '/u/actions/logout/index.php';
	const login			= props.root + '/u/actions/login/index.php';
	const register		= props.root + '/u/actions/register/index.php';
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
class MainNav extends React.Component{
	'use strict';
	constructor(props){
		//TODO: Probably read the paths from a json file;
		//TODO: Pull over shopping cart from nav-test and data-*
		super(props);
		this.state			= {open:false, isLoggedIn: false};
		this.home			= this.props.root + '/index.php';
		this.features		= this.props.root + '/features/index.php';
		this.pricing		= this.props.root + '/pricing/index.php';
		this.blog			= this.props.root + '/u/actions/get_blogs/index.php';
		this.isLoggedIn	= this.props.is_logged_in;
		this.cartCount		= this.props.cart_count;
		this.fname			= this.props.fname;
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
