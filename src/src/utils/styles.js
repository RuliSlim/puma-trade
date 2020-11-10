import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	list: {
		width: 250,
	},
	fullList: {
		width: "auto",
	},
	sidebarContainer: {
		width: "5vw",
		height:"100vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		position: "fixed"
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
	root: {
		height: "100vh",
		// padding: `${theme.spacing(20)} 0`
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
	},
	cardDashboard: {
		height: "20vw",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
		alignContent: "center"
	},
	deposit: {
		height: "10vw",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignContent: "center"
	},
	paper: {
		// height: "20vw",
		// display: "flex",
		// flexDirection: "column",
		// "& .MuiCardContent-root": {
		// 	flex: 3,
		// },
		// "& .MuiCardContent-root div": {
		// 	flex: 1,
		// 	paddingTop: theme.spacing(12)
		// },
		// "& .MuiCardActions-root": {
		// 	flex: 1,
		// },
		// "& div": {
		// 	[theme.breakpoints.up("md")]: {
		// 		display: "flex",
		// 		flexDirection: "row",
		// 		justifyContent: "space-around",
		// 	},
		// 	[theme.breakpoints.down("md")]: {
		// 		display: "none",
		// 	}
		// },
	},
	tree: {
		width: "80vw",
		height: "80vh",
		margin: "10vh auto"
	},
	table: {
		minWidth: 750,
	},
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1,
	},
	paperTable: {
		width: "100%",
		marginBottom: theme.spacing(2),
	},
}));
