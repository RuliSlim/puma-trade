import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
		// padding: `${theme.spacing(20)} 0`
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignContent: "center",
		width: "100vw"
	},
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
	tree: {
		width: "80vw",
		height: "60vh",
		margin: "5vh auto"
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
