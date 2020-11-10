import { createMuiTheme } from "@material-ui/core";

export const MyTheme = createMuiTheme({
	palette: {
		background: {
			default: "#0C0D17"
		},
		text: {
			primary: "#e2e5ed"
		}
	},
	overrides: {
		MuiPaper: {
			root: {
				color: "white",
				background: "linear-gradient(180deg, rgba(35,46,75,1) 47%, rgba(78,87,110,1) 100%);"
			},
		},
		MuiButton: {
			root: {
				// background: "rgb(30,149,233)",
				background: "linear-gradient(90deg, rgba(30,149,233,1) 35%, rgba(10,95,247,1) 100%)"
			},
			sizeLarge: {
				height: "150%"
			}
		}
	}
});