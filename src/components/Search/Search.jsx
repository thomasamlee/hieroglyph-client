import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import {
	ReactiveBase,
	ResultList,
	ReactiveList,
	MultiDropdownList,
	SelectedFilters,
	DataSearch,
	RangeSlider
} from '@appbaseio/reactivesearch';

const { ResultListWrapper } = ReactiveList;

const AB_READ_KEY = 'VDqoTiyCf:5c0efad8-8d1b-4a8e-857a-10e3eb8fe67b';

export default function Search(props) {
	const { setVideoId } = props;

	function resultsListRender({ data }) {
		const resultListMap = data.map((res) => (
			<ResultList key={res._id}>
				<ResultList.Image src={res.thumbnails.standard.url} />
				<ResultList.Content>
					<ResultList.Title>{res.title}</ResultList.Title>
					<ResultList.Description>{res.channelTitle}</ResultList.Description>
				</ResultList.Content>
			</ResultList>
		));

		return <ResultListWrapper>{resultListMap}</ResultListWrapper>;
	}

	return (
		<ReactiveBase app='hiero-videos' credentials={AB_READ_KEY}>
			<Container>
				<Row>
					<Col>
						<DataSearch
							autosuggest={false}
							componentId='Search'
							dataField={['transcript']}
							fieldWeights={[1]}
							fuzziness={1}
							highlight={true}
							highlightField={['transcript']}
							queryFormat='and'
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
							placeholder='Category'
							dataField='category.keyword'
							size={50}
						/>
					</Col>
					<Col xl='4'>
						<MultiDropdownList
							componentId='Channel'
							placeholder='Channel'
							dataField='channelTitle.keyword'
							size={10}
						/>
					</Col>
					<Col xl='4'>
						<MultiDropdownList
							componentId='Tags'
							placeholder='Tags'
							dataField='tags.keyword'
							size={10}
						/>
					</Col>
				</Row>

				<Row>
					<Col>
						<RangeSlider
							componentId='Publish Date'
							dataField='publishedAt'
							title='Publish Date'
							showHistogram={true}
						/>
					</Col>
				</Row>
				{/* Displays results */}
				<Row>
					<Col>
						<ReactiveList
							componentId='List'
							dataField='_score'
							className='result'
							pagination
							size={10}
							react={{
								and: ['Channel', 'Category', 'Search']
							}}
							render={resultsListRender}
						/>
					</Col>
				</Row>
			</Container>
		</ReactiveBase>
	);
}
