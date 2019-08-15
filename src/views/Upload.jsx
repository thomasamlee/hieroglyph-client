import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Upload() {
	const [inputUrl, setInputUrl] = useState('');
	const [videoID, setVideoID] = useState('');
	const [message, setMessage] = useState('');

	const handleInput = e => {
		setInputUrl(e.target.value);
		setVideoID(''); // clear success
		setMessage(''); // clear fail
	};

	const handleSubmit = url => {
		if (validateUrl(url)) {
			setMessage('Success! Valid URL.');
			setVideoID(getVideoID(url));
		} else {
			setMessage('Invalid URL.');
		}
	};

	return (
		<div className='container'>
			<h1>Upload</h1>
			<div>
				<input
					className='u-full-width'
					type='text'
					placeholder='YouTube URL'
					value={inputUrl}
					onChange={e => handleInput(e)}
				/>

				{videoID ? (
					<Link to={`/read/${videoID}`}>
						<button className='u-full-width'>Next</button>
					</Link>
				) : (
					<button
						className='u-full-width'
						onClick={() => handleSubmit(inputUrl)}>
						Submit
					</button>
				)}
			</div>
			<hr />
			{message ? <div>{message}</div> : null}
		</div>
	);
}

// helper functions
function validateUrl(url) {
	const regex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

	return regex.test(url);
}

function getVideoID(url) {
	const ytRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
	return url.match(ytRegex)[1];
}
