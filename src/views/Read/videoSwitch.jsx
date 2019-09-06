import React from 'react';

import ReactPlayer from 'react-player';

export default function videoSwitch(statusParam, video) {
	if (statusParam === 'READY')
		return (
			<ReactPlayer
				url={`https://youtu.be/${video.videoId}`}
				width='100%'
				height='100%'
			/>
		);
	else return null;
}
