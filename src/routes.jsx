import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Upload from './views/Upload';
import SearchSplit from './views/SearchSplit';

export const viewRoutes = (
	<Switch>
		<Route component={SearchSplit} exact path='/' />
		<Route component={Upload} path='/upload' />
	</Switch>
);
