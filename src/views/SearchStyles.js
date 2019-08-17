import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexGrow: 1
	},

	hide: {
		display: 'none'
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		alignItems: 'center',
		color: theme.palette.text.secondary
	},

	logo: {
		width: '100%',
		height: 'auto'
	}
}));
