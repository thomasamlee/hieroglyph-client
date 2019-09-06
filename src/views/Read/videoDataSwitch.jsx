import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';

const statusEnum = Object.freeze({
	WAITING: 'WAITING',
	ERROR: 'ERROR',
	UPLOAD: 'UPLOAD',
	READY: 'READY'
});

export default function videoDataSwitch(statusParam, video) {
	const { READY } = statusEnum;
	return statusParam === READY ? (
		<Col xs='12'>
			<h1>{video.title}</h1>
			{/* <h3>{video.channelTitle}</h3>
					<p>{video.description}</p> */}
		</Col>
	) : null;
}
