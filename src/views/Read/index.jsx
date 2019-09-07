import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Container, Button, Row, Col } from 'reactstrap';
import './Read.scss';

import TranscriptText from './TranscriptText';
import ResponsivePlayer from './ResponsivePlayer';
import VideoMetadata from './VideoMetadata';

const statusEnum = Object.freeze({
	WAITING: 'WAITING',
	ERROR: 'ERROR',
	UPLOAD: 'UPLOAD',
	READY: 'READY'
});

// YB46h1koicQ Colbert Interview (Example)

export default function Read(props) {
	const { videoId } = props;

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
		<Container>
			{showPlayer ? (
				<Row>
					<Col xl='9' className='video-frame__box'>
						{/* There is a bug here. videoId should equal video.videoId */}
						<ResponsivePlayer status={status} videoId={videoId} />
					</Col>
				</Row>
			) : null}

			<Row>
				<Col xl='9'>
					<Button onClick={() => setShowPlayer(!showPlayer)}>
						Show Player
					</Button>
				</Col>
			</Row>

			<Row>
				<Col xl='9'>
					<VideoMetadata status={status} video={video} />
				</Col>
			</Row>

			{/* Line Break (remove?)
			<Row>
				<Col xs='9'>
					<hr />
				</Col>
			</Row>
			{/* Transcript Text */}
			<Row className='transcript-row'>
				<Col xl='9'>
					<TranscriptText status={status} video={video} />
				</Col>
			</Row>
		</Container>
	);
}
