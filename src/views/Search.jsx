import React, { useState } from 'react';
import { Col, Row, Layout, Card } from 'antd';
import ReadCard from '../components/ReadCard';
import {
	ReactiveBase,
	ResultList,
	ReactiveList,
	MultiDropdownList,
	SelectedFilters,
	DataSearch
} from '@appbaseio/reactivesearch';

const { Content, Header, Sider } = Layout;

const { ResultListWrapper } = ReactiveList;

export default function Search() {
	// const [filters, setFilters] = useState(false);
	const [selected, setSelected] = useState(null);
	const [collapsed, setCollapsed] = useState(false);

	function resultsListRender({ data }) {
		const resultListMap = data.map((res) => (
			<>
				<ResultList key={res._id} onClick={() => setSelected(res)}>
					<ResultList.Content>
						<ResultList.Title>{res.title}</ResultList.Title>
						<ResultList.Description>{res.channelTitle}</ResultList.Description>
					</ResultList.Content>
				</ResultList>
				{selected === res._id && (
					<ReadCard video={selected} onClose={() => setSelected(!selected)} />
				)}
			</>
		));
		return <ResultListWrapper>{resultListMap}</ResultListWrapper>;
	}

	return (
		<ReactiveBase
			app='hiero-videos'
			credentials='VDqoTiyCf:5c0efad8-8d1b-4a8e-857a-10e3eb8fe67b'
		>
			<Header>Header Something</Header>
			<Layout>
				<Sider
					collapsible
					collapsed={collapsed}
					onCollapse={() => setCollapsed(!collapsed)}
					width={200}
					style={{ background: '#fff' }}
				>
					<MultiDropdownList
						componentId='Category-list'
						placeholder='Category'
						dataField='category.keyword'
						showCount={true}
						size={5}
					/>

					<MultiDropdownList
						componentId='Channel-list'
						placeholder='Channel'
						dataField='channelTitle.keyword'
						showCount={true}
					/>

					<MultiDropdownList
						componentId='Tags-list'
						placeholder='Tags'
						dataField='tags.keyword'
						showCount={true}
					/>

					<MultiDropdownList
						componentId='Category-list'
						placeholder='Category'
						dataField='category.keyword'
						s
					/>
				</Sider>

				<Content style={{ padding: '64px' }}>
					<Card>
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
								<SelectedFilters showClearAll={true} />
							</Col>
						</Row>

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
									<ReadCard
										video={selected}
										onClose={() => setSelected(!selected)}
									/>
								</Col>
							)}
						</Row>
					</Card>
				</Content>
			</Layout>
		</ReactiveBase>
	);
}
