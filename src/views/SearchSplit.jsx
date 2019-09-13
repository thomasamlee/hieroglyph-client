import React, { useState } from 'react';
import { Navbar, NavbarBrand, Button, Container, Row, Col } from 'reactstrap';

import Read from '../components/Read/Read';
import Search from '../components/Search/Search';
import './SearchSplit.scss';

// redux here

export default function SearchSplit() {
	const [showRead, setShowRead] = useState(true);
	const [videoId, setVideoId] = useState('');
	return (
		<>
			<Navbar color='light' light expand='md'>
				<NavbarBrand>Hieroglyph</NavbarBrand>
			</Navbar>

			<Container>
				<Row>
					<Col>
						<Search />
					</Col>

					{showRead ? (
						<Col>
							<Button
								close
								onClick={() => setShowRead(false)}
								setVideoId={setVideoId}
							/>
							<Read videoId={videoId} />
						</Col>
					) : null}
				</Row>
			</Container>
		</>
	);
}

// This is where you would hold the logic for displaying a single pane or split
