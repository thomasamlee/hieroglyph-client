import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Spinner } from 'reactstrap';

export default function textSwitch(statusParam, video) {
	switch (statusParam) {
		case 'ERROR':
			return <p>Try refreshing.</p>;
		case 'UPLOAD':
			return (
				<>
					<p>
						If you would like to add the video, click{' '}
						<Link to='/upload'>here</Link>.
					</p>
				</>
			);
		case 'READY':
			return (
				<>
					<h1>{video.title}</h1>
					<hr />
					<p>{video.transcript}</p>
				</>
			);
		default:
			return <Spinner color='primary' />;
	}
}
