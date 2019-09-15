import React, { useState } from 'react';
import { Col, Row, Button } from 'antd';

import {
	ReactiveBase,
	ResultList,
	ReactiveList,
	MultiList,
	SelectedFilters,
	DataSearch,
	RangeSlider
} from '@appbaseio/reactivesearch';

const { ResultListWrapper } = ReactiveList;

const AB_READ_KEY = 'VDqoTiyCf:5c0efad8-8d1b-4a8e-857a-10e3eb8fe67b';

export default function SearchComp(props) {
	const { setVideoId } = props;
	const [filters, setFilters] = useState(true);

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
			<div>
				<Row>
					<Col span={12}>
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
					<Col span={6}>
						<SelectedFilters showClearAll={true} />
					</Col>
					<Col span={6}>
						<Button onClick={() => setFilters(!filters)}>Hide Filters</Button>
					</Col>
				</Row>

				{filters && (
					<>
						<Row>
							<Col xl='4'>
								<MultiList
									componentId='Category-list'
									placeholder='Category'
									dataField='category.keyword'
									size={5}
								/>
							</Col>
							<Col xl='4'>
								<MultiList
									componentId='Channel-list'
									placeholder='Channel'
									dataField='channelTitle.keyword'
									size={5}
								/>
							</Col>
							<Col xl='4'>
								<MultiList
									componentId='Tags-list'
									placeholder='Tags'
									dataField='tags.keyword'
									size={5}
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
					</>
				)}

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
			</div>
		</ReactiveBase>
	);
}
