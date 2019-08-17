import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));
