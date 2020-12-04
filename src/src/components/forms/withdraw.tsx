import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import React from "react";
import { formContext } from "../../context/form.context";

export default function WithdrawForm(): JSX.Element {
	const { values, actions } = React.useContext(formContext);
	const { handleChange } = actions;

	return(
		<React.Fragment>
			<TextField
				autoFocus
				margin="dense"
				id="amount"
				label="amount"
				type="text"
				fullWidth
				onChange={handleChange("amount")}
				value={values.amount}
			/>
			<TextField
				autoFocus
				margin="dense"
				id="amount"
				label="address"
				type="text"
				fullWidth
				onChange={handleChange("address")}
				value={values.address}
			/>
			<FormControlLabel
				control={<Checkbox checked={values.agree} onChange={handleChange("agree")} name="agreement" />}
				label="agree to term and services"
			/>
		</React.Fragment>
	);
}