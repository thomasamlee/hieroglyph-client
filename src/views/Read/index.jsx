import React, { useState, useEffect } from 'react';
import axios from 'axios';

import transcriptSwitch from './transcriptSwitch';
import playerSwitch from './playerSwitch';
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

			<Container>
				<Row>
					<Col>
						<Button color='secondary' onClick={() => props.history.goBack()}>
							Back
						</Button>
					</Col>
				</Row>

				{showPlayer ? (
					<Row>
						<Col xs='12'>
							<div className='video-frame'>{playerSwitch(status, video)}</div>
						</Col>
					</Row>
				) : null}

				<Row>
					<Col xs='12'>
						<h1>VIDEO TITLE</h1>
						<h3>Channel Title</h3>
						<p>Description</p>
					</Col>
				</Row>

				{/* Button Bar */}
				<Row>
					<Col>
						<Button
							color='secondary'
							onClick={() => setShowPlayer(!showPlayer)}
						>
							Show Player
						</Button>
					</Col>
				</Row>
				{/* Line Break (remove?) */}
				<Row>
					<Col xs='12'>
						<hr />
					</Col>
				</Row>
				{/* Transcript Text */}
				<Row>
					<Col xs='12'>{transcriptSwitch(status, video)}</Col>
				</Row>
			</Container>
		</div>
	);
}
