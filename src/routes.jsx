import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Read from './views/Read';
import Upload from './views/Upload';
import Settings from './views/Settings';
import Search from './views/Search';
import Home from './views/Home';
import Library from './views/Library.jsx';

export default (
	<Switch>
		<Route component={Home} exact path='/' />
		<Route component={Upload} path='/upload' />
		<Route component={Read} path='/read/:videoID' />
		<Route component={Search} path='/search' />
		{/* <Route component={Login} path='/login' /> */}
		{/* <Route component={Dashboard} path='/dashboard' /> */}
		{/* <Route component={Settings} path='/settings' /> */}
		{/* <Route component={Library} path='/library' /> */}
	</Switch>
);
