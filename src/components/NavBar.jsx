import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export default function NavBar() {
	return (
		<Menu mode='horizontal' theme='dark'>
			<Menu.Item key='search'>
				<Link to='/search'>Search</Link>
			</Menu.Item>
		</Menu>
	);
}
