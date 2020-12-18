import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import React from "react";
import { formContext } from "../../context/form.context";

export default function TransferForm(): JSX.Element {
	const { values, actions } = React.useContext(formContext);
	const { handleChange } = actions;

	return(
		<React.Fragment>
			<TextField
				autoFocus
				margin="dense"
				id="receiver"
				label="receiver"
				type="text"
				fullWidth
				onChange={handleChange("receiver")}
				value={values.receiver.toUpperCase()}
			/>
			<TextField
				autoFocus
				margin="dense"
				id="amount"
				label="amount in usd"
				type="text"
				fullWidth
				onChange={handleChange("point")}
				value={values.point}
			/>
			<FormControlLabel
				control={<Checkbox checked={values.agree} onChange={handleChange("agree")} name="agreement" />}
				label="agree to term and services"
			/>
		</React.Fragment>
	);
}