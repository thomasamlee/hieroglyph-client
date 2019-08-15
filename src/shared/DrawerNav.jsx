import React, { useState } from './node_modules/react';

import clsx from './node_modules/clsx';
import Drawer from './node_modules/@material-ui/core/Drawer';
import Typography from './node_modules/@material-ui/core/Typography';
import CssBaseline from './node_modules/@material-ui/core/CssBaseline';
import AppBar from './node_modules/@material-ui/core/AppBar';
import Toolbar from './node_modules/@material-ui/core/Toolbar';
import List from './node_modules/@material-ui/core/List';
import Divider from './node_modules/@material-ui/core/Divider';
import ListItem from './node_modules/@material-ui/core/ListItem';
import ListItemIcon from './node_modules/@material-ui/core/ListItemIcon';
import ListItemText from './node_modules/@material-ui/core/ListItemText';
import ChevronLeftIcon from './node_modules/@material-ui/icons/ChevronLeft';
import IconButton from './node_modules/@material-ui/core/IconButton';
import HomeIcon from './node_modules/@material-ui/icons/Home';
import SearchIcon from './node_modules/@material-ui/icons/Search';
import MenuIcon from './node_modules/@material-ui/icons/Menu';
import FolderIcon from './node_modules/@material-ui/icons/Folder';
import CloudUploadIcon from './node_modules/@material-ui/icons/CloudUpload';
import SettingsIcon from './node_modules/@material-ui/icons/Settings';

import Container from './node_modules/@material-ui/core/Container';

import { useDrawerNavStyles } from './DrawerNavStyles';

export default function Read(props) {
	const classes = useDrawerNavStyles();
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

				{/* General Links: Dashboard, Search, Upload */}
				<List>
					<ListItem button key={'Dashboard'}>
						<Link to='/'>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary={'Dashboard'} />
						</Link>
					</ListItem>

					<ListItem button key={'Search'}>
						<ListItemIcon>
							<SearchIcon />
						</ListItemIcon>
						<ListItemText primary={'Search'} />
					</ListItem>

					<ListItem button key={'Upload'}>
						<ListItemIcon>
							<CloudUploadIcon />
						</ListItemIcon>
						<ListItemText primary={'Upload'} />
					</ListItem>
				</List>

				<Divider />

				{/* User-centric Links: Library, Notes, Saved, etc */}
				<List>
					<ListItem button key={'Library'}>
						<ListItemIcon>
							<FolderIcon />
						</ListItemIcon>
						<ListItemText primary={'Library'} />
					</ListItem>
				</List>

				<Divider />

				{/* Settings Links */}
				<List>
					<ListItem button key={'Settings'}>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary={'Settings'} />
					</ListItem>
				</List>
				<Divider />
			</Drawer>

			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open
				})}>
				<div className={classes.drawerHeader} />

				<Container>
					<Typography>Insert your stuff here</Typography>
				</Container>
			</main>
		</div>
	);
}
