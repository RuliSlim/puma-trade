import { Box, CircularProgress } from "@material-ui/core";
import React from "react";

export default function Loading(): JSX.Element {
	return(
		<Box position="absolute" left="50%" top="40%">
			<CircularProgress variant="indeterminate" size={100} />
		</Box>
	);
}