import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { formContext } from "../../context/form.context";
import { useStyles } from "../../utils";

export default function DenseAppBar(): JSX.Element {
	const { actions } = React.useContext(formContext);
	const { handleLogout } = actions;
	const classes = useStyles();

	return (
		<AppBar position="static">
			<Toolbar variant="dense">
				<Typography variant="h6" color="inherit" style={{ flex: 1 }}>
					<img src="./assets/images/logo_no_text.png" alt="logo libra" className={classes.logoAppbar} />
				</Typography>
				<Button color="inherit" onClick={handleLogout}>Logout</Button>
			</Toolbar>
		</AppBar>
	);
}
