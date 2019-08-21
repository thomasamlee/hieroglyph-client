import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
	Navbar,
	NavbarBrand,
	Nav,
	NavItem,
	Container,
	Button,
	InputGroup,
	InputGroupAddon,
	Input
} from 'reactstrap';

export default function Upload() {
	const [inputUrl, setInputUrl] = useState('');
	const [videoId, setVideoId] = useState('');
	const [message, setMessage] = useState('');

	const handleInput = (e) => {
		setInputUrl(e.target.value);
		setVideoId(''); // clear success
		setMessage(''); // clear fail
	};

	const handleSubmit = (url) => {
		if (validateUrl(url)) {
			setMessage('Success! Valid URL.');
			setVideoId(getvideoId(url));
			postMetadata(videoId);
		} else {
			setMessage('Invalid URL.');
		}
	};

	return (
		<div>
			<Navbar color='light' light expand='md'>
				<NavbarBrand>
					<Link to='/'>Hieroglyph</Link>
				</NavbarBrand>

				<Nav className='ml-auto' navbar>
					<NavItem>
						<Link to='/upload'>Upload</Link>
					</NavItem>
				</Nav>
			</Navbar>

			<Container>
				<h1>Upload</h1>

				<div>
					<InputGroup>
						<Input
							type='text'
							placeholder='YouTube URL'
							value={inputUrl}
							onChange={(e) => handleInput(e)}
						/>
						<InputGroupAddon addonType='append'>
							{videoId ? (
								<Button>
									<Link to={`read/${videoId}`}>Next</Link>
								</Button>
							) : (
								<Button onClick={() => handleSubmit(inputUrl)}>Submit</Button>
							)}
						</InputGroupAddon>
					</InputGroup>
				</div>

				<hr />

				{/* Message box (Turn this into Modal messages) */}

				{message ? <div>{message}</div> : null}
			</Container>
		</div>
	);
}

// helper functions
function validateUrl(url) {
	const regex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

	return regex.test(url);
}

function getvideoId(url) {
	const ytRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
	return url.match(ytRegex)[1];
}

async function postMetadata(videoId) {
	try {
		const response = await axios.post(`/api/metadata/${videoId}`);
		console.log(response);
	} catch (err) {
		console.log(err);
	}
}
