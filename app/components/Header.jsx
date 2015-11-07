import React, {Component} from 'react';
import { Link } from 'react-router';

if (process.env.BROWSER) {
  require('../styles/Header.scss');
}

class Header extends Component {

	constructor() {
	  	super();
	}

	render() {
		return (
			<header className="Header">
				<nav>
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/counter">Counter App</Link></li>
					</ul>
				</nav>
			</header>
		);
	}
}

export default Header;
