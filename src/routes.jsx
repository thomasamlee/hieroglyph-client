import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Read from './views/Read';
import Upload from './views/Upload';
import Search from './views/Search';
// import Front from './views/Front';

export const viewRoutes = (
	<Switch>
		<Route component={Search} exact path='/' />
		<Route component={Upload} path='/upload' />
		<Route component={Read} path='/read/:videoId' />
	</Switch>
);
