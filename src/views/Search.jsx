import React, { useState } from 'react';
import { Col, Row, Button, Layout, Menu } from 'antd';

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
	const [selected, setSelected] = useState(null);

	function resultsListRender({ data }) {
		console.log(data);
		const resultListMap = data.map((res) => (
			<ResultList key={res._id} onClick={() => setSelected(res)}>
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
			app='hiero-videos'
			credentials='VDqoTiyCf:5c0efad8-8d1b-4a8e-857a-10e3eb8fe67b'
		>
			<Header>Hieroglyph</Header>
			<Layout>
				<Sider>
					<MultiDropdownList
						title='Category'
						componentId='Category-list'
						placeholder='Filter Category'
						dataField='category.keyword'
						size={5}
					/>
					<MultiDropdownList
						title='Channel'
						componentId='Channel-list'
						placeholder='Channel'
						dataField='channelTitle.keyword'
						size={5}
					/>
				</Sider>
				<Content>
					<Row>
						<Col span={8} offset={8}>
							<DataSearch
								autosuggest={false}
								componentId='Search'
								dataField={['transcript', 'title']}
								fieldWeights={[1, 1]}
								fuzziness={1}
								highlight={true}
								highlightField={['transcript', 'title,']}
								queryFormat='and'
							/>
							<SelectedFilters showClearAll={true} />
						</Col>
					</Row>

					<Row>
						<Col span={8} offset={8}></Col>
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
								<ReadCard video={selected} onClose={() => setSelected(null)} />
							</Col>
						)}
					</Row>
				</Content>
			</Layout>
		</ReactiveBase>
	);
}
