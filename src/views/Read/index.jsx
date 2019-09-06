import React, { useState, useEffect } from 'react';
import axios from 'axios';

import textSwitch from './textSwitch';
import videoSwitch from './videoSwitch';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Container, Button, Row, Col } from 'reactstrap';

import './Read.scss';

const statusEnum = Object.freeze({
	WAITING: 'WAITING',
	ERROR: 'ERROR',
	UPLOAD: 'UPLOAD',
	READY: 'READY'
});

export default function Read(props) {
	const { videoId } = props.match.params;

	const [video, setVideo] = useState(null);
	const [status, setStatus] = useState('WAITING');
	const [showPlayer, setShowPlayer] = useState(true);

	async function fetchData(videoId) {
		const { ERROR, UPLOAD, READY } = statusEnum;
		try {
			const { data } = await axios.get(`/api/video/${videoId}`);
			if (data) {
				setVideo(data);
				setStatus(READY);
			} else {
				setStatus(UPLOAD);
			}
		} catch (err) {
			console.log(err);
			setStatus(ERROR);
		}
	}

	useEffect(() => {
		fetchData(videoId);
	}, [videoId]);

	return (
		<div>
			<Navbar color='light' light expand='md'>
				<Link to='/'>
					<NavbarBrand>Hieroglyph</NavbarBrand>
				</Link>
			</Navbar>

			<Button
				color='secondary'
				size='lg'
				onClick={() => props.history.goBack()}
			>
				Back
			</Button>
			<Button
				color='secondary'
				size='lg'
				onClick={() => setShowPlayer(!showPlayer)}
			>
				Show Player
			</Button>

			<Container>
				<Row>
					<Col xs='9'>{textSwitch(status, video)}</Col>
					<Col xs='3'>
						<div className='video-frame'>
							{showPlayer ? videoSwitch(status, video) : null}
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
