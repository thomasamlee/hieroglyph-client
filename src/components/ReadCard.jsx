import React from 'react';
import { Card, Button } from 'antd';

export default function ReadCard(props) {
	const { video, onClose } = props;
	return (
		<Card title={video.title} size='default'>
			<Button onClick={() => onClose()}>Close</Button>
			<p>{video.channelTitle}</p>
			<p>{video.description}</p>
			<hr />
			<p>{video.transcript}</p>
		</Card>
	);
}
