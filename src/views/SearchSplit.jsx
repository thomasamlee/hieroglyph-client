import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import ReadCard from '../components/ReadCard/ReadCard';
import Search from '../components/Search/Search';
import './SearchSplit.scss';

// redux here

export default function SearchSplit() {
	const [videoId, setVideoId] = useState('');
	return (
		<Container>
			<Row>
				<Col>
					<Search setVideoId={setVideoId} />
				</Col>

				{/* videoId sidebar? */}
				{videoId && (
					<Col>
						<Button close onClick={() => setVideoId('')} />
						{<ReadCard videoId={videoId} />}
					</Col>
				)}
			</Row>
		</Container>
	);
}

// This is where you would hold the logic for displaying a single pane or split
