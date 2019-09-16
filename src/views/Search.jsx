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
					<ResultList.Description>Score: {res._score}</ResultList.Description>
					<ResultList.Description>
						Channel: {res.channelTitle}
					</ResultList.Description>
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
						componentId='Category-List'
						placeholder='Filter Category'
						dataField='category.keyword'
						size={5}
					/>
					<MultiDropdownList
						title='Channel'
						componentId='Channel-List'
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
								componentId='Video-Search'
								title='Video Search'
								dataField={['title']}
								fieldWeights={[1, 1]}
								fuzziness={1}
								queryFormat='and'
							/>
							<DataSearch
								autosuggest={false}
								componentId='Transcript-Search'
								title='Transcript Search'
								dataField={['transcript']}
								fieldWeights={[1, 1]}
								fuzziness={1}
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
								loader='Loading Results..'
								pagination
								size={5}
								react={{
									and: [
										'Video-Search',
										'Transcript-Search',
										'Category-List',
										'Channel-List'
									]
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
