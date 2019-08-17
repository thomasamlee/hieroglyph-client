import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';

import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import FolderIcon from '@material-ui/icons/Folder';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SettingsIcon from '@material-ui/icons/Settings';

import { useStyles } from './DrawerNavStyles';

export default function DrawerNav(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open
				})}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={() => setOpen(true)}
						edge='start'
						className={clsx(classes.menuButton, open && classes.hide)}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap>
						Hieroglyph
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant='persistent'
				anchor='left'
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}>
				<div className={classes.drawerHeader}>
					<IconButton onClick={() => setOpen(false)}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />

				<List>
					<Link to='/dashboard'>
						<ListItem button>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary={'Dashboard'} />
						</ListItem>
					</Link>

					<Link to='/search'>
						<ListItem button>
							<ListItemIcon>
								<SearchIcon />
							</ListItemIcon>
							<ListItemText primary={'Search'} />
						</ListItem>
					</Link>

					<Link to='/upload'>
						<ListItem button key={'Upload'}>
							<ListItemIcon>
								<CloudUploadIcon />
							</ListItemIcon>
							<ListItemText primary={'Upload'} />
						</ListItem>
					</Link>
				</List>

				<Divider />

				{/* User-centric Links: Library, Notes, Saved, etc */}
				<List>
					<Link to='/library'>
						<ListItem button key={'Library'}>
							<ListItemIcon>
								<FolderIcon />
							</ListItemIcon>
							<ListItemText primary={'Library'} />
						</ListItem>
					</Link>
				</List>

				<Divider />

				{/* Settings Links */}
				<List>
					<Link to='/library'>
						<ListItem button key={'Settings'}>
							<ListItemIcon>
								<SettingsIcon />
							</ListItemIcon>
							<ListItemText primary={'Settings'} />
						</ListItem>
					</Link>
				</List>

				<Divider />
			</Drawer>

			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open
				})}>
				<div className={classes.drawerHeader} />

				{props.children}
			</main>
		</div>
	);
}
