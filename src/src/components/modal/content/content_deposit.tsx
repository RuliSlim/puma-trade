import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { formContext } from "../../../context/form.context";
import { DepositModel } from "../../../model/models/transaction.model";

export default function ContentDeposit(): JSX.Element {
	const { postResource  } = React.useContext(formContext);
	const result = postResource?.result?.write().data as DepositModel;
	const address = result.address;
	const amount = result.jumlah;
	return(
		<React.Fragment>
			<Grid container direction="column">
				<Grid item>
					<Typography variant="caption">Please Transfer to this wallet</Typography>
					<Typography variant="h6">{address}</Typography>
				</Grid>
				<Grid item>
					<Typography variant="caption">Amount</Typography>
					<Typography variant="h6">{amount}</Typography>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
