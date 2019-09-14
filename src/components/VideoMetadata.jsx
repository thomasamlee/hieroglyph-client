import React from 'react';
import { Link } from 'react-router-dom';

const statusEnum = Object.freeze({
	WAITING: 'WAITING',
	ERROR: 'ERROR',
	UPLOAD: 'UPLOAD',
	READY: 'READY'
});

export default function VideoMetadata(props) {
	const { status, video } = props;
	const { READY } = statusEnum;
	return status === READY ? (
		<>
			<Link to={`/read/${video._id}}`}>
				<h2>{video.title}</h2>
			</Link>
			<p>{video.channelTitle}</p>
		</>
	) : null;
}
