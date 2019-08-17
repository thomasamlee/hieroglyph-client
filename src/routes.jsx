import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Read from './views/Read';
import Upload from './views/Upload';
import Search from './views/Search';
import Results from './views/Results';

export default (
	<Switch>
		<Route component={Search} exact path='/' />
		<Route component={Upload} path='/upload' />
		<Route component={Read} path='/read/:videoID' />
		<Route component={Results} path='/search/?' />
	</Switch>
);
