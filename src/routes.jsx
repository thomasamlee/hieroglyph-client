import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Read from './views/Read';
import Upload from './views/Upload';
import Search from './views/Search';
import Landing from './views/Landing';

export const viewRoutes = (
	<Switch>
		<Route component={Landing} exact path='/' />
		<Route component={Search} path='/search' />
		<Route component={Upload} path='/upload' />
		<Route component={Read} path='/read/:videoID' />
	</Switch>
);
