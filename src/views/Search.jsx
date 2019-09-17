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
import './Search.scss';
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
					<Row gutter={{ lg: 24 }} type='flex' justify='center'>
						{/* Search Column */}
						<Col
							xs={{ span: 22 }}
							sm={{ span: 22 }}
							md={{ span: 22 }}
							lg={selected ? { span: 7 } : { span: 12 }}
							xl={selected ? { span: 11 } : { span: 12 }}
							xxl={selected ? { span: 8 } : { span: 8 }}
						>
							<DataSearch
								componentId='search'
								dataField={['transcript', 'tags', 'title', 'description']}
								fieldWeights={[10, 1, 1, 10]}
								fuzziness={0}
								highlight={true}
								highlightField={['transcript', 'title']}
								placeholder='search transcripts'
								queryFormat='and'
								URLParams={true}
								style={{
									marginTop: 24,
									marginBottom: 16
								}}
							/>
							<SelectedFilters
								style={{
									marginBottom: 16
								}}
							/>
							{/* Filters */}
							<Row gutter={{ xs: 8, md: 24 }}>
								<Col
									xs={{ span: 24 }}
									md={{ span: 12 }}
									style={{
										marginBottom: 4
									}}
								>
									<MultiDropdownList
										componentId='list-category'
										placeholder='Category'
										dataField='category.keyword'
									/>
								</Col>
								<Col
									xs={{ span: 24 }}
									md={{ span: 12 }}
									style={{
										marginBottom: 4
									}}
								>
									<MultiDropdownList
										componentId='list-channel'
										placeholder='Channel'
										dataField='channelTitle.keyword'
									/>
								</Col>
							</Row>
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

						{selected && (
							<Col
								xs={{ span: 0 }}
								lg={{ span: 15 }}
								xl={{ span: 11 }}
								xxl={{ span: 11 }}
								style={{ marginTop: 24, marginBottom: 24 }}
							>
								<ReadCard video={selected} onClose={() => setSelected(null)} />
							</Col>
						)}
					</Row>
				</Content>
			</Layout>
		</ReactiveBase>
	);
}

// Breakpoints:
// xs <576px
// sm ≥576px
// md ≥768px

// lg ≥992px => 1/3, 2/3 no margins (1, 11, 11, 1)
// xl ≥1200px => 1/3, 2/3 with margins
// xxl ≥1600px => => 1/2, 1/2 with margins

// Vertical Spacing:
// 8px (small spacing)
// 16px (middle spacing)
// 24px (large spacing)
