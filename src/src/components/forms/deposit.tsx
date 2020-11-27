import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from "@material-ui/core";
import React from "react";
import { FormProps } from "../../model/components/form";

export default function DepositForm(props: FormProps): JSX.Element {
	const [ checked, setChecked ] = React.useState<boolean>(false);
	const { handleChange, values, handleDeposit, closingForm, item } = props;

	const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		handleDeposit(e);
		closingForm(item);
	};

	return(
		<Box width="100%">
			<form onSubmit={onSubmit}>
				<Grid container direction="column">
					<Grid item>
						<TextField
							autoFocus
							margin="dense"
							id="nominal"
							label="nominal"
							type="text"
							fullWidth
							onChange={handleChange("nominal")}
							value={values.nominal}
						/>
					</Grid>
					<Grid item>
						<FormControlLabel
							control={<Checkbox checked={checked} onChange={(): void => setChecked(!checked)} name="agreement" />}
							label="agree to term and services"
						/>
					</Grid>
					<Grid item>
						<Button
							type="submit"
							variant="contained"
							color="secondary"
							disabled={!checked}
							fullWidth
						>
							Submit
						</Button>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}