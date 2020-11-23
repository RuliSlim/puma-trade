import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@material-ui/core";
import React from "react";

export default function TransferForm(): JSX.Element {
	const [ checked, setChecked ] = React.useState<boolean>(false);
	const [ value, setValue ] = React.useState("50");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setValue((event.target as HTMLInputElement).value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		console.log(value);
	};

	return(
		<React.Fragment>
			<TextField
				autoFocus
				margin="dense"
				id="email"
				label="email user"
				type="text"
				fullWidth
			/>
			<TextField
				autoFocus
				margin="dense"
				id="amount"
				label="amount in usd"
				type="text"
				fullWidth
			/>
		</React.Fragment>
	);
}