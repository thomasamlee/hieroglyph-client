import React from 'react';
import { ResultList } from '@appbaseio/reactivesearch';

export default function TranscriptAffix(res) {
	return (
		<ResultList key={res._id}>
			<ResultList.Content>
				<ResultList.Title>{res.title}</ResultList.Title>
				<ResultList.Description>
					Channel: {res.channelTitle}
				</ResultList.Description>
				<ResultList.Description>Score: {res._score}</ResultList.Description>
			</ResultList.Content>
		</ResultList>
	);
}
