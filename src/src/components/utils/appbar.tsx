import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default function DenseAppBar(): JSX.Element {
	return (
		<AppBar position="static">
			<Toolbar variant="dense">
				<Typography variant="h6" color="inherit">
					Logo
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
