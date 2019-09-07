import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Button, Card } from 'reactstrap';

import Read from '../Read';
import Search from '../Search';
import './SearchSplit.scss';

// redux here

export default function SearchSplit() {
	const [showRead, setShowRead] = useState(true);
	const [videoId, setVideoId] = useState('OVtH0YB6C4I');
	return (
		<>
			<Navbar color='light' light expand='md'>
				<Link to='/'>
					<NavbarBrand>Hieroglyph</NavbarBrand>
				</Link>
				<Button onClick={() => setShowRead(true)}>
					Test Button for {videoId}
				</Button>
			</Navbar>

			<div className='split-container'>
				<Search />

				{showRead ? (
					<div>
						<Button close onClick={() => setShowRead(false)} />
						<Read videoId={videoId} />
					</div>
				) : null}
			</div>
		</>
	);
}

// This is where you would hold the logic for displaying a single pane or split
