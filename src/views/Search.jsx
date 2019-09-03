import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { Navbar, NavbarBrand, Container } from 'reactstrap';
import {
	ReactiveBase,
	ResultList,
	ReactiveList,
	MultiList,
	SelectedFilters,
	DataSearch,
	CategorySearch
} from '@appbaseio/reactivesearch';
import './Search.scss';

const { ResultListWrapper } = ReactiveList;

export default function SearchTest() {
	return (
		<ReactiveBase
			app='hieroglyph-videos'
			credentials='3DFErLjK1:a7f3b0cc-6a6c-4105-9a91-e32575e209c5'
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
					dataField={['transcript']}
					fieldWeights={[1]}
					autoSuggest={true}
					// highlight={true}
					// highlightField={['title']}
					placeholder='Search transcripts'
				/>

				<SelectedFilters showClearAll={true} />
				<div className='container'>
					{/* sidebars */}
					<div>
						<MultiList
							componentId='Category'
							placeholder='Video Category'
							dataField='categoryId'
							size={50}
							className='filter'
							react={{
								and: ['Channel', 'Category', 'Tags', 'Search']
							}}
						/>
						<MultiList
							componentId='Channel'
							placeholder='Channel'
							dataField='channelTitle.keyword'
							size={10}
							className='filter'
							react={{
								and: ['Channel', 'Category', 'Tags', 'Search']
							}}
						/>
						<MultiList
							componentId='Tags'
							placeholder='Tags'
							dataField='tags.keyword'
							size={10}
							className='filter'
							react={{
								and: ['Channel', 'Category', 'Tags', 'Search']
							}}
						/>
					</div>
					{/* Displays results */}
					<div>
						<ReactiveList
							componentId='List'
							dataField={['title', 'description', 'transcript']}
							className='result'
							pagination
							size={5}
							react={{
								and: ['Channel', 'Category', 'Tags', 'Search']
							}}
							render={resultsListRender}
						/>
					</div>
				</div>
			</Container>
		</ReactiveBase>
	);
}

// Can use boostrap here

// number of hits within the document
//
function resultsListRender({ data }) {
	console.log(data);
	const resultListMap = data.map((res) => (
		<ResultList key={res._id}>
			<ResultList.Image src={res.thumbnails.default.url} small={true} />
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
