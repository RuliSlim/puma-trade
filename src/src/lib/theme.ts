import { createMuiTheme } from "@material-ui/core";

const primaryText = "#e2e5ed";

export const MyTheme = createMuiTheme({
	palette: {
		background: {
			default: "#0C0D17"
		},
		text: {
			primary: primaryText,
		}
	},
	shape: {
		borderRadius: 20,
	},
	typography: {},
	overrides: {
		MuiPaper: {
			root: {
				color: primaryText,
				background: "linear-gradient(180deg, rgba(35,46,75,1) 47%, rgba(78,87,110,1) 100%);"
			},
		},
		MuiButton: {
			contained: {
				background: "linear-gradient(90deg, rgba(30,149,233,1) 35%, rgba(10,95,247,1) 100%)",
				color:  primaryText
			},
			containedSecondary: {
				background: "linear-gradient(90deg, rgba(244,6,1,0.654499299719888) 0%, rgba(241,255,84,1) 29%, rgba(4,198,29,1) 100%)",
				color: "black"
			},
			sizeLarge: {
				height: "150%"
			},
			root: {
				"&$disabled": {
					color: "gray"
				}
			},
			textPrimary:{
				color: primaryText
			}
		},
		MuiListItemText: {
			primary: {
				color: primaryText
			}
		},
		MuiIcon: {
			colorPrimary: {
				color: primaryText
			}
		},
		MuiInputLabel: {
			root: {
				color: primaryText
			}
		},
		MuiCardActionArea: {
			root: {
				"&$focusHighlight": {
					cursor: "default",
					backgroundColor: "transparent",
				},
				"&$focusVisible": {
					cursor: "default",
					backgroundColor: "transparent",
				},
			},
		},
		// MuiCardHeader: {
		// 	title: {
		// 		fontSize: "1em"
		// 	}
		// },
		MuiTypography: {
			h5: {
				fontSize: "1.5em"
			},
			h6: {
				fontSize: "1em",
				fontWeight: "bolder"
			},
			subtitle2: {
				fontSize: "0.9em"
			}
		},
		MuiFormLabel: {
			root: {
				color: primaryText,
				focused: {
					color: "rgba(78,87,110,1)"
				}
			},
		},
	}
});