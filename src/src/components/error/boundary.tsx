import React from "react";
import { Button, Grid, Paper, Typography } from "@material-ui/core";

interface ErrorFallbackProps {
	error: Error;
}

export default function ErrorFallback(props: ErrorFallbackProps): JSX.Element {
	const { error } = props;
	const resetErrorBoundary = (): void => {
		window.location.reload();
	};
	return (
		<Paper elevation={5} style={{ width: "80vw", margin: "auto", padding: "5em" }}>
			<Grid container direction="column" spacing={5}>
				<Grid item>
					<Typography variant="h1">Opps! Something Went Wrong!</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h5">{error.name}: {error.message}</Typography>
				</Grid>
				<Grid item>
					<Button variant="contained" fullWidth onClick={resetErrorBoundary}>Refresh then try again</Button>
				</Grid>
			</Grid>
		</Paper>
	);
}