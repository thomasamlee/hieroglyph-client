import React, { useState } from 'react';
import { Col, Row, Layout } from 'antd';
import {
	ReactiveBase,
	ResultList,
	ReactiveList,
	MultiDropdownList,
	SelectedFilters,
	DataSearch
} from '@appbaseio/reactivesearch';

import ReadCard from '../components/ReadCard';

const { Content, Header } = Layout;
const { ResultListWrapper } = ReactiveList;

export default function Search() {
	const [selected, setSelected] = useState(null);

	function resultsListRender({ data }) {
		const resultListMap = data.map((res) => {
			return (
				<ResultList key={res._id} onClick={() => setSelected(res)}>
					<ResultList.Content>
						<ResultList.Title>{res.title}</ResultList.Title>
						<ResultList.Description>
							Channel: {res.channelTitle}
						</ResultList.Description>
						<ResultList.Description>Score: {res._score}</ResultList.Description>
					</ResultList.Content>
				</ResultList>
			);
		});
		return <ResultListWrapper>{resultListMap}</ResultListWrapper>;
	}

	return (
		<ReactiveBase
			app='hiero-videos'
			credentials='VDqoTiyCf:5c0efad8-8d1b-4a8e-857a-10e3eb8fe67b'
		>
			<Layout>
				<Header>Hieroglyph</Header>
				<Content>
					<Row gutter={24}>
						{/* Search Column */}
						<Col
							xs={{ span: 20, offset: 2 }}
							xl={{ span: 8, offset: selected ? 4 : 8 }}
						>
							{/* Filters */}
							<Row gutter={24}>
								<Col span={12}>
									<MultiDropdownList
										componentId='list-category'
										placeholder='Category'
										dataField='category.keyword'
									/>
								</Col>
								<Col span={12}>
									<MultiDropdownList
										componentId='list-channel'
										placeholder='Channel'
										dataField='channelTitle.keyword'
									/>
								</Col>
							</Row>
							<DataSearch
								autosuggest={false}
								componentId='search'
								dataField={['transcript', 'tags', 'title', 'description']}
								fieldWeights={[10, 1, 1, 10]}
								fuzziness={0}
								highlight={true}
								highlightField={['transcript', 'tags', 'title', 'description']}
								placeholder='search transcripts'
								queryFormat='or'
								style={{
									marginBottom: 20
								}}
							/>
							<SelectedFilters showClearAll={true} />
							<ReactiveList
								componentId='result'
								dataField='_score'
								pagination
								size={10}
								react={{
									and: ['list-channel', 'list-category', 'search']
								}}
								render={resultsListRender}
							/>
						</Col>

						<Col span={selected ? 8 : 0} style={{ height: '100%' }}>
							{selected && (
								<ReadCard video={selected} onClose={() => setSelected(null)} />
							)}
						</Col>
					</Row>
				</Content>
			</Layout>
		</ReactiveBase>
	);
}

// xs <576px
// sm ≥576px
// md ≥768px
// lg ≥992px
// xl ≥1200px
// xxl ≥1600px
