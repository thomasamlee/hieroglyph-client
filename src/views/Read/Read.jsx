import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';

import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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

import Container from '@material-ui/core/Container';
import { useReadStyles } from './ReadStyles';

export default function Read(props) {
	// Material-ui state
	const classes = useReadStyles();
	const [open, setOpen] = useState(false);

	// Content state
	const { videoID } = props.match.params;
	const [title, setTitle] = useState('');
	const [transcript, setTranscript] = useState('');

	async function fetchData(videoID) {
		try {
			const { data } = await axios.get(`/api/metadata/${videoID}`);
			setTitle(data.video_details.title);
			setTranscript(data.transcript);
		} catch (err) {
			console.log(err);
		}
	}

	// should check if data exists (send error back from backend)

	useEffect(() => {
		fetchData(videoID);
	}, [videoID]);

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

				<Container>
					<Grid container spacing={3}>
						<Grid item xs={9}>
							<Paper className={classes.paper}>
								<Typography variant='h6' noWrap>
									{title}
								</Typography>
								<hr />
								<Typography paragraph>{transcript}</Typography>
							</Paper>
						</Grid>
						<Grid item xs={3}>
							<Paper className={classes.paper}>
								<ReactPlayer url='https://www.youtube.com/watch?v=OVtH0YB6C4I' />
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	);
}
