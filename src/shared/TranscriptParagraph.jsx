import React from 'react';

export default function TranscriptParagraph(props) {
	const { caption, videoDetails } = props;

	return (
		<div>
			<h2>{videoDetails.title}</h2>
			<hr />
			<p>{display(caption)}</p>
		</div>
	);
}

// caption = [{start: "1.034", dur: "2.168", text: "I JUST FINISHED EPISODE FOUR.↵SO, THE LANNISTERS"}, ....]

function display(caption) {
	let blockText = '';
	caption.forEach(element => (blockText += `${element.text} `));
	return blockText;
}
