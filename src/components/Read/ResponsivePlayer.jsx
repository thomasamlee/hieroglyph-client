import React from 'react';
import ReactPlayer from 'react-player';

export default function playerSwitch(props) {
	const { status, videoId } = props;

	return status && status === 'READY' ? (
		<ReactPlayer
			url={`https://youtu.be/${videoId}`}
			width='100%'
			height='100%'
		/>
	) : null;
}
