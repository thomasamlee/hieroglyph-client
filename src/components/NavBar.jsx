import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export default function NavBar() {
	return (
		<Menu mode='horizontal' theme='dark'>
<<<<<<< HEAD
=======
			{/* <img src={Logo} alt='hierogly.ph' /> */}
>>>>>>> 27b446c74ceffba033f2eefdb7c1d21af473dece
			<Menu.Item key='search'>
				<Link to='/search'>Search</Link>
			</Menu.Item>
		</Menu>
	);
}
