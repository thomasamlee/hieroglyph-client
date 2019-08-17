import React from 'react';
import { Link } from 'react-router-dom';
import {
	Container,
	Row,
	Col,
	Jumbotron,
	Button,
	Navbar,
	NavbarBrand,
	Nav,
	NavItem
} from 'reactstrap';

export default function Home() {
	return (
		<div>
			<main>
				<Container>
					<Row>
						<h3>Find it Now</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur. Excepteur sint occaecat cupidatat non proident,
							sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
					</Row>
					<Row>
						<Col xs={6}>
							<img src='http://via.placeholder.com/380x380' alt='feature 1' />
						</Col>
						<Col xs={6}>
							<h3>Read</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur. Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
						</Col>
					</Row>
					<Row>
						<Col xs={6}>
							<h3>Note</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur. Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
						</Col>
						<Col xs={6}>
							<img src='http://via.placeholder.com/380x380' alt='feature 2' />
						</Col>
					</Row>

					<h2>About Us</h2>
				</Container>
			</main>

			<footer>
				<Container fluid>
					<p>legal stuff here</p>
				</Container>
			</footer>
		</div>
	);
}
