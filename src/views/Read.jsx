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
	const [metadata, setMetadata] = useState(null);
	const [status, setStatus] = useState(WAITING);

	async function fetchData(videoId) {
		const { ERROR, UPLOAD, READY } = statusEnum;
		try {
			const { data } = await axios.get(`/api/metadata/${videoId}`);
			if (data.videoDetails && data.transcript) {
				setMetadata(data);
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
							<ReactPlayer
								url={`https://youtu.be/${metadata.videoId}`}
								width='100%'
								height='642px'
							/>
						</Row>
						<Row>
							<Col>
								<h1>{metadata.videoDetails.title}</h1>
								<hr />
								<p>{metadata.transcript}</p>
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
	}, [videoId, fetchData]);

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
			<Container>{pageSwitch(status)}</Container>
		</div>
	);
}
