import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import { useStyles } from '../shared/DrawerNavStyles';

export default function Read(props) {
	// Material-ui state
	const classes = useStyles();
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
	);
}
