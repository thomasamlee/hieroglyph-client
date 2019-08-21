import React from 'react';
import Logo from '../assets/logo.png';

import { Link } from 'react-router-dom';
import {
	Navbar,
	NavbarBrand,
	Nav,
	NavItem,
	Container,
	Button,
	InputGroup,
	InputGroupAddon,
	Input
} from 'reactstrap';
import './Search.scss';

export default function Search(props) {
	return (
		<div>
			<Navbar color='light' light expand='md'>
				<NavbarBrand>
					<Link to='/'>Hieroglyph</Link>
				</NavbarBrand>

				<Nav className='ml-auto' navbar>
					<NavItem>
						<Link to='/upload'>Upload</Link>
					</NavItem>
				</Nav>
			</Navbar>

			<Container>
				<div className='search'>
					<div className='logo'>
						<img className='logo__img' src={Logo} alt='hieroglyph logo' />
					</div>

					<div className='search'>
						<InputGroup>
							<Input placeholder='search here' />
							<InputGroupAddon addonType='append'>
								<Button>Submit</Button>
							</InputGroupAddon>
						</InputGroup>
					</div>
				</div>
			</Container>
		</div>
	);
}
