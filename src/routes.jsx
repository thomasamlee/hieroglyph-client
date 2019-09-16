import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from './views/Search';

export const viewRoutes = (
	<Switch>
		<Route component={Search} exact path='/' />
	</Switch>
);
