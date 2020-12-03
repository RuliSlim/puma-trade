import React from "react";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import { formContext } from "../../context/form.context";

export default function ConverBonus(): JSX.Element {
	const { values, actions } = React.useContext(formContext);
	const { handleChange } = actions;

	return(
		<React.Fragment>
			<TextField
				autoFocus
				margin="dense"
				id="nominal"
				label="nominal"
				type="text"
				fullWidth
				onChange={handleChange("convert")}
				value={values.convert}
			/>
			<FormControlLabel
				control={<Checkbox checked={values.agree} onChange={handleChange("agree")} name="agreement" />}
				label="agree to term and services"
			/>
		</React.Fragment>
	);
}