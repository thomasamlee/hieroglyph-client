import React from 'react';
import Container from '@material-ui/core/Container';

export default function Search() {
	return (
		<Container>
			<h1>Search</h1>
			<input placeholder='search here' />
			<button>submit</button>
		</Container>
	);
}
