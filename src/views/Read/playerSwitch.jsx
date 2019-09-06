import React from 'react';

import ReactPlayer from 'react-player';

export default function playerSwitch(statusParam, video) {
	return statusParam === 'READY' ? (
		<ReactPlayer
			url={`https://youtu.be/${video.videoId}`}
			width='100%'
			height='100%'
		/>
	) : null;
}
