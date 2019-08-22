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

const statusEnum = Object.freeze({
	INVALID_INPUT: 'INVALID_INPUT', // display invalid error
	WAITING: 'WAITING', // show spinner while waiting for response from server
	SERVER_ERROR: 'SERVER_ERROR', // show error & try again
	FOUND: 'FOUND', // display message & show link to /read/videoId:
	SUCCESS: 'SUCCESS' // sucessfully added to database. Show link to /read/videoId:
});

export default function Upload() {
	const [inputUrl, setInputUrl] = useState('');
	const [videoId, setVideoId] = useState('');
	const [status, setStatus] = useState('');

	const handleInput = (e) => {
		setInputUrl(e.target.value);
		setStatus(''); // clears everything
	};

	// this is where the
	const handleSubmit = (url) => {
		const { INVALID_INPUT, WAITING, SEVER_ERROR, FOUND, SUCCESS } = statusEnum;
		if (!validateUrl(url)) setStatus(INVALID_INPUT);

		// if request resolves, show link to Read
		// if request goofs, display error
	};

	function messageSwitch(statusParam) {
		const { INVALID_INPUT, FOUND, SERVER_ERROR, SUCCESS } = statusEnum;
		switch (statusParam) {
			case INVALID_INPUT:

			case FOUND:
				return <p>Transcript already added. Click next to read it.</p>; // display message & show link to /read/videoId:
			case SUCCESS:
				return <p>Transcript added. Click next to read it.</p>;
			case SERVER_ERROR:
				return <p>Server error.</p>;
			default:
				return null;
		}
	}

	function buttonSwitch(statusParam) {
		const { ALREADY_EXISTS, SUCCESS } = statusEnum;
		switch (statusParam) {
			case ALREADY_EXISTS:
			case SUCCESS:
				return (
					<Button>
						<Link to={`read/${videoId}`}>Next</Link>
					</Button>
				);
			default:
				return <Button onClick={() => handleSubmit(inputUrl)}>Submit</Button>;
		}
	}

	async function postMetadata(videoId) {
		try {
			const response = await axios.post(`/api/metadata/${videoId}`);
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	}

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
				<hr />
				<InputGroup>
					<Input
						type='text'
						placeholder='YouTube URL'
						value={inputUrl}
						onChange={(e) => handleInput(e)}
					/>
					<InputGroupAddon addonType='append'>
						{buttonSwitch(status)}
					</InputGroupAddon>
				</InputGroup>

				<hr />
				{messageSwitch(status)}
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
