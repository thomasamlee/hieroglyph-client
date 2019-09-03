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
	Col,
	Spinner
} from 'reactstrap';

const statusEnum = Object.freeze({
	WAITING: 'WAITING',
	ERROR: 'ERROR',
	UPLOAD: 'UPLOAD',
	READY: 'READY'
});

export default function Read(props) {
	const { videoId } = props.match.params;
	const { WAITING } = statusEnum;

	// State
	const [video, setVideo] = useState(null);
	const [status, setStatus] = useState(WAITING);

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

	function pageSwitch(statusParam) {
		const { WAITING, ERROR, UPLOAD, READY } = statusEnum;
		switch (statusParam) {
			case WAITING:
				return (
					<>
						<h1>Waiting...</h1>
						<hr />
						<Spinner color='primary' />
					</>
				);

			case ERROR:
				return (
					<>
						<h1>There is some unknown error.</h1>
						<hr />
						<p>Try refreshing.</p>
					</>
				);
			case UPLOAD:
				return (
					<>
						<h1>This video could not be found.</h1>
						<hr />
						<p>
							If you would like to add the video, click{' '}
							<Link to='/upload'>here</Link>.
						</p>
					</>
				);
			case READY:
				return (
					<>
						<Row>
							<Col>
								{/* <ReactPlayer
									url={`https://youtu.be/${videoId}`}
									width='100%'
									height='642px'
								/> */}
							</Col>
						</Row>
						<Row>
							<Col xs={12}>
								<h1>{video.title}</h1>
								<hr />
								<p>{video.transcript}</p>
							</Col>
						</Row>
					</>
				);
			default:
				return (
					<>
						<h1>Waiting...</h1>
						<hr />
						<Spinner color='primary' />
					</>
				);
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
			<Container>{pageSwitch(status)}</Container>
		</div>
	);
}
