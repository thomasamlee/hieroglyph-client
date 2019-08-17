import React from 'react';

export default function TranscriptTimestamp(props) {
	const { caption, videoDetails } = props;

	return (
		<div>
			<h2>{videoDetails.title}</h2>
			<hr />
			<div>{display(caption)}</div>
		</div>
	);
}

function display(caption) {
	return caption.map((item, i) => (
		<p key={i}>
			<span>{item.start}</span>
			<span>{item.text}</span>
		</p>
	));
}
