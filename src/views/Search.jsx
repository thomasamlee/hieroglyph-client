import React from 'react';
import qs from 'qs';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Logo from '../assets/logo.png';
import { useStyles } from './SearchStyles';

export default function Search(props) {
	console.log(props.match);
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Container>
				<Grid container alignItems='center' justify='center'>
					<Grid item xs={6}>
						<Paper className={classes.paper}>
							<img src={Logo} className={classes.logo} />
							<hr />
							<input placeholder='search here' />
							<button>submit</button>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}
