import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	list: {
		width: 250,
	},
	fullList: {
		width: "auto",
	},
	container: {
		width: "5vw",
		height:"100vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		position: "absolute"
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
	root: {
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		flexDirection: "column"
	},
	paper: {
		height: "20vw",
		display: "flex",
		flexDirection: "column",
		"& .MuiCardContent-root": {
			flex: 3,
		},
		"& .MuiCardContent-root div": {
			flex: 1,
			paddingTop: theme.spacing(12)
		},
		"& .MuiCardActions-root": {
			flex: 1,
		},
		"& div": {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-around",
		},
	},
	tree: {
		width: "100vw",
		height: "100vh"
	}
}));
