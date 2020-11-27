import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { formContext } from "../../../context/form.context";

export default function ContentInvest(): JSX.Element {
	const { postResource  } = React.useContext(formContext);
	const result = postResource?.result?.write().data;

	return(
		<React.Fragment>
			<Grid container direction="column" justify="center">
				<Grid item>
					<img src="https://cdn.pixabay.com/photo/2012/04/26/19/45/check-42926_1280.png" width="10$"/>
					<Typography variant="h6">{result}</Typography>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
