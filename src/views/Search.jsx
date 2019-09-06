import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar, NavbarBrand, Container, Col, Row } from 'reactstrap';
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

const AB_READ_API_KEY = '3DFErLjK1:a7f3b0cc-6a6c-4105-9a91-e32575e209c5';

export default function Search() {
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
			<Navbar color='light' light expand='md'>
				<Link to='/'>
					<NavbarBrand>Hieroglyph</NavbarBrand>
				</Link>
			</Navbar>

			<Container>
				<CategorySearch
					componentId='Search'
					dataField={['title', 'channelTitle', 'description']}
					autoSuggest={true}
					placeholder='Search transcripts'
				/>

				<SelectedFilters showClearAll={true} />

				{/* sidebars */}
				<Row>
					<Col>
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
					<Col>
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
					<Col>
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
							size={5}
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
function resultsListRender({ data }) {
	const resultListMap = data.map((res) => (
		<ResultList key={res._id}>
			<ResultList.Content>
				<ResultList.Title>
					<Link to={`/read/${res._id}`}>{res.title}</Link>
				</ResultList.Title>
				<ResultList.Description>{res.channelTitle}</ResultList.Description>
			</ResultList.Content>
		</ResultList>
	));

	return <ResultListWrapper>{resultListMap}</ResultListWrapper>;
}

const categoryRender = (dataObj) => {
	console.log(dataObj);
	// Is this where we send the query term (as prop or qs?) to then do read search?
};
