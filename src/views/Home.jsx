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
	NavItem,
	Card
} from 'reactstrap';

export default function Home() {
	return (
		<div>
			<header>
				<Navbar>
					<NavbarBrand href='/' className='mr-auto'>
						Hieroglyph
					</NavbarBrand>

					<Nav className='ml-auto' navbar>
						<NavItem>
							<Link to='/login'>
								<Button>Login</Button>
							</Link>
						</NavItem>
					</Nav>
				</Navbar>
			</header>

			<main>
				<Container>
					<Jumbotron>
						<h1>
							What is video <em>really</em> saying?
						</h1>
						<p>Shorten your research binge.</p>
						<Button color='primary'>Signup</Button>
					</Jumbotron>
				</Container>

				<Container>
					<Jumbotron>
						<h2>Features</h2>
						<Row>
							<Col>
								<Card>
									<h3>Search</h3>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col>
								<Card>
									<h3>Read</h3>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col>
								<Card>
									<h3>Note</h3>
								</Card>
							</Col>
						</Row>
					</Jumbotron>
				</Container>

				<Container>
					<Jumbotron>
						<h2>About Us</h2>
					</Jumbotron>
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
