import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root: {
		margin: "0",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		msTransform: "translate(-50%, -50%)",
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
	sidebarProfile: {
		width: "5vw",
		height:"70vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		position: "absolute",
		right: "0",
		top: "8vh"
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
		// width: "100%",
		// marginBottom: theme.spacing(2),
	},
	// dashboard
	containerWallet: {
		[theme.breakpoints.up("lg")]: {
			height: "100%"
		},
		[theme.breakpoints.down("md")]: {
			height: "15vh",
		}
	},
	"containerWallet::nth-of-type(2)": {
		[theme.breakpoints.up("lg")]: {
			height: "100%"
		},
		[theme.breakpoints.down("md")]: {
			height: "50%",
			marginTop: "-45%"
		}
	},
	wallet: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		height: "100%",
	},
	bonus: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
	},
	convert: {
		[theme.breakpoints.up("lg")]: {
			width: "65%"
		},
		[theme.breakpoints.down("md")]: {
			width: "65%"
		},
	}
}));
