import React, { useState } from 'react';
import { Col, Row, Button, Layout, Menu, Card } from 'antd';

import {
	ReactiveBase,
	ResultList,
	ReactiveList,
	MultiList,
	SelectedFilters,
	DataSearch,
	RangeSlider
} from '@appbaseio/reactivesearch';

const { Content, Header } = Layout;

const { ResultListWrapper } = ReactiveList;

const AB_READ_KEY = 'VDqoTiyCf:5c0efad8-8d1b-4a8e-857a-10e3eb8fe67b';

export default function Search() {
	const [filters, setFilters] = useState(false);
	const [selected, setSelected] = useState(null);

	function resultsListRender({ data }) {
		const resultListMap = data.map((res) => (
			<ResultList key={res._id} onClick={() => setSelected(res)}>
				{/* <ResultList.Image src={res.thumbnails.standard.url} /> */}
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
			<Layout>
				<Header>
					<Menu mode='horizontal' theme='dark'>
						<Menu.Item key='1'>Nav 1</Menu.Item>
						<Menu.Item key='2'>Nav 2</Menu.Item>
						<Menu.Item key='3'>Nav 3</Menu.Item>
					</Menu>
				</Header>

				<Content>
					<Row>
						<Col span={8} offset={8}>
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
						<Card>
							{filters && (
								<>
									<Row>
										<Col span={24}>
											<SelectedFilters showClearAll={true} />
										</Col>
									</Row>

									<Row gutter={16}>
										<Col span={6}>
											<MultiList
												componentId='Category-list'
												placeholder='Category'
												dataField='category.keyword'
												size={5}
											/>
										</Col>
										<Col span={6}>
											<MultiList
												componentId='Channel-list'
												placeholder='Channel'
												dataField='channelTitle.keyword'
												size={5}
											/>
										</Col>
										<Col span={6}>
											<MultiList
												componentId='Tags-list'
												placeholder='Tags'
												dataField='tags.keyword'
												size={5}
											/>
										</Col>
										<Col span={6}>
											<MultiList
												componentId='Category-list'
												placeholder='Category'
												dataField='category.keyword'
												s
											/>
										</Col>
									</Row>
								</>
							)}
							<Row>
								<Col span={2} offset={10}>
									<Button onClick={() => setFilters(!filters)}>
										Hide Filters
									</Button>
								</Col>
							</Row>
						</Card>
					</Row>

					{/* This is where we do split view */}
					<Row gutter={16}>
						<Col span={8} offset={selected ? 4 : 8}>
							<ReactiveList
								componentId='List'
								dataField='_score'
								className='result'
								pagination
								size={10}
								react={{
									and: ['Channel-list', 'Category-list', 'Search-list']
								}}
								render={resultsListRender}
							/>
						</Col>

						{selected && (
							<Col span={8}>
								<Button onClick={() => setSelected('')}>Close</Button>
								<Card title={selected.title}>
									<p>{selected.channelTitle}</p>
									<p>{selected.description}</p>
									<hr />
									<p>{selected.transcript}</p>
								</Card>
							</Col>
						)}
					</Row>
				</Content>
			</Layout>
		</ReactiveBase>
	);
}
