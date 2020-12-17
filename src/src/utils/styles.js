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
		// overflow: "auto !important",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		height: "100%",
	},
	cardProf: {
		width: "80%",
		overflow: "auto"
	},
	bonus: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
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
	},
	// login or register
	loginOrRegister: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		alignContent: "center",
		// width: "80vw",
		margin: "auto",
		// height: "100%",
		[theme.breakpoints.up("lg")]: {
			width: "40vw"
		},
		[theme.breakpoints.down("md")]: {
			width: "80vw",
		},
		// "& > *": {
		// 	margin: "0.8vw"
		// }
	},
	logo: {
		// backgroundImage: "url('./assets/images/logo.png')",
		// background: "10vw no-repeat",
		// backgroundSize: "contain",
		// position: "relative",
		// // width: "100%",
		// zIndex: 10
		flex: 0.2,
		width: "200px"
	},
	logoAppbar: {
		width: "50px"
	},
	forms: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		// width: "100%",
		"& > *": {
			marginTop: "20px",
			marginBottom: "20px"
		}
	},
	percent: {
		display: "flex",
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center"
	}
}));
