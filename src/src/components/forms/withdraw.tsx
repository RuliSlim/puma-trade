import { TextField } from "@material-ui/core";
import React from "react";

export default function WithdrawForm(): JSX.Element {
	return(
		<React.Fragment>
			<TextField
				autoFocus
				margin="dense"
				id="amount"
				label="amount in usd"
				type="text"
				fullWidth
			/>
			<TextField
				autoFocus
				margin="dense"
				id="doge"
				label="your address doge"
				type="text"
				fullWidth
			/>
		</React.Fragment>
	);
}