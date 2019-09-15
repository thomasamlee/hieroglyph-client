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

export default function Home(props) {
	const { setVideoId } = props;

	function resultsListRender({ data }) {
		const resultListMap = data.map((res) => (
			<ResultList key={res._id}>
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
						<Col span={6} offset={8}>
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
				</Content>
			</Layout>
		</ReactiveBase>
	);
}
