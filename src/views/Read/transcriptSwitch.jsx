import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';

const statusEnum = Object.freeze({
	WAITING: 'WAITING',
	ERROR: 'ERROR',
	UPLOAD: 'UPLOAD',
	READY: 'READY'
});

export default function transcriptSwitch(statusParam, video) {
	const { ERROR, UPLOAD, READY } = statusEnum;
	switch (statusParam) {
		case ERROR:
			return <p>Try refreshing.</p>;
		case UPLOAD:
			return (
				<p>
					If you would like to add the video, click{' '}
					<Link to='/upload'>here</Link>.
				</p>
			);
		case READY:
			return <p>{video.transcript}</p>;
		default:
			return <Spinner color='primary' />;
	}
}
