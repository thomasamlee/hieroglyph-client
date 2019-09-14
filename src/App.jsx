import React from 'react';
import { viewRoutes } from './routes';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function App() {
	return (
		<>
			<Navbar color='light' light expand='md'>
				<NavbarBrand>Hieroglyph</NavbarBrand>

				<Nav>
					<NavItem>
						<NavLink>
							<Link to='/upload' style={{ textDecoration: 'none' }}>
								Upload
							</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link to='/' style={{ textDecoration: 'none' }}>
								Home
							</Link>
						</NavLink>
					</NavItem>
				</Nav>
			</Navbar>
			{viewRoutes}
		</>
	);
}
