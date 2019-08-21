import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import {
	Navbar,
	NavbarBrand,
	Nav,
	NavItem,
	Container,
	Row,
	Col
} from 'reactstrap';

export default function Read(props) {
	const { videoId } = props.match.params;
	const [fetchStatus, setFetchStatus] = useState({ message: '', fault: false });
	const [title, setTitle] = useState('');
	const [transcript, setTranscript] = useState('');

	async function fetchData(videoId) {
		try {
			const { data } = await axios.get(`/api/metadata/${videoId}`);
			console.log(data);
			setTitle(data.videoDetails.title);
			setTranscript(data.transcript);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		fetchData(videoId);
	}, [videoId]);

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
				<Row>
					<ReactPlayer
						url={`https://youtu.be/${videoId}`}
						width='100%'
						height='642px'
					/>
				</Row>
				<Row>
					<Col>
						<h6>{title}</h6>
						<hr />
						<p>{transcript}</p>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
