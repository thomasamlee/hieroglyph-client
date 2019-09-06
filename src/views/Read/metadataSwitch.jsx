import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner, Col } from 'reactstrap';

const statusEnum = Object.freeze({
	WAITING: 'WAITING',
	ERROR: 'ERROR',
	UPLOAD: 'UPLOAD',
	READY: 'READY'
});

export default function textSwitch(statusParam, video) {
	switch (statusParam) {
		case 'READY':
			return <p>{video.transcript}</p>;
		default:
			return null;
	}
}
