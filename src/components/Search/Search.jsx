import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import {
	ReactiveBase,
	ResultList,
	ReactiveList,
	MultiDropdownList,
	SelectedFilters,
	CategorySearch
} from '@appbaseio/reactivesearch';
import './Search.scss';

const { ResultListWrapper } = ReactiveList;

const AB_READ_API_KEY = 'I1QCdN1rr:cb4cbab9-5398-4c7d-98d5-761236bfa597';

export default function Search(props) {
	// selects videoId to display in Read pane
	const { setVideoId } = props;

	function resultsListRender({ data }) {
		const resultListMap = data.map((res) => (
			<ResultList key={res._id}>
				<ResultList.Content>
					<ResultList.Title>{res.title}</ResultList.Title>
					<ResultList.Description>{res.channelTitle}</ResultList.Description>
				</ResultList.Content>
			</ResultList>
		));

		return <ResultListWrapper>{resultListMap}</ResultListWrapper>;
	}

	return (
		<ReactiveBase
			app='hieroglyph-videos'
			credentials={AB_READ_API_KEY}
			theme={{
				typography: {
					fontFamily:
						'"Lato", "Open Sans", "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif'
				}
			}}
		>
			<Container>
				<Row>
					<Col>
						<CategorySearch
							componentId='Search'
							dataField={['title', 'channelTitle', 'description']}
							autoSuggest={true}
							placeholder='Search transcripts'
						/>
					</Col>
				</Row>

				<Row>
					<Col>
						<SelectedFilters showClearAll={true} />
					</Col>
				</Row>

				{/* Filters */}
				<Row>
					<Col xl='4'>
						<MultiDropdownList
							componentId='Category'
							placeholder='Video Category'
							dataField='categoryId'
							size={50}
							className='filter'
							react={{
								and: ['Channel', 'Category', 'Tags', 'Search']
							}}
						/>
					</Col>
					<Col xl='4'>
						<MultiDropdownList
							componentId='Channel'
							placeholder='Channel'
							dataField='channelTitle.keyword'
							size={10}
							className='filter'
							react={{
								and: ['Channel', 'Category', 'Tags', 'Search']
							}}
						/>
					</Col>
					<Col xl='4'>
						<MultiDropdownList
							componentId='Tags'
							placeholder='Tags'
							dataField='tags.keyword'
							size={10}
							className='filter'
							react={{
								and: ['Channel', 'Category', 'Tags', 'Search']
							}}
						/>
					</Col>
				</Row>
				{/* Displays results */}
				<Row>
					<Col>
						<ReactiveList
							componentId='List'
							dataField={['title', 'description', 'transcript']}
							className='result'
							pagination
							size={10}
							react={{
								or: ['Channel', 'Category', 'Tags', 'Search']
							}}
							render={resultsListRender}
						/>
					</Col>
				</Row>
			</Container>
		</ReactiveBase>
	);
}

// Can use boostrap here

// number of hits within the document
//
