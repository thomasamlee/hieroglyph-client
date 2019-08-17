import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from './ReadStyles';

export default function Read(props) {
	const classes = useStyles();
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
					<Paper className={classes.paper} />
				</Grid>
			</Grid>
		</Container>
	);
}
