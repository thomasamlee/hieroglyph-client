import React from 'react';

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
			<h2>{video.title}</h2>
			<p>{video.channelTitle}</p>
		</>
	) : null;
}
