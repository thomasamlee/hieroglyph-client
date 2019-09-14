import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Button, Row, Col } from 'reactstrap';
import './ReadCard.scss';

import TranscriptText from '../TranscriptText';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

const statusEnum = Object.freeze({
	WAITING: 'WAITING',
	ERROR: 'ERROR',
	UPLOAD: 'UPLOAD',
	READY: 'READY'
});

export default function ReadCard(props) {
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
			{showPlayer && (
				<Row>
					<Col className='video-frame__box'>
						<ReactPlayer
							url={`https://youtu.be/${videoId}`}
							width='100%'
							height='100%'
						/>
					</Col>
				</Row>
			)}

			<Row>
				<Col>
					<Button onClick={() => setShowPlayer(!showPlayer)}>
						Show Player
					</Button>
				</Col>
			</Row>

			<Row>
				<Col>
					{status === 'READY' && (
						<>
							<Link to={`/read/${videoId}`}>
								<h2>{video.title}</h2>
							</Link>
							<p>{video.channelTitle}</p>
						</>
					)}
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
				<Col>
					<TranscriptText status={status} video={video} />
				</Col>
			</Row>
		</Container>
	);
}
