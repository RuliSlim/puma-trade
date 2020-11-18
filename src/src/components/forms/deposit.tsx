import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from "@material-ui/core";
import React from "react";

export default function DepositForm(): JSX.Element {
	const [ checked, setChecked ] = React.useState<boolean>(false);
	return(
		<Box width="100%">
			<form>
				<Grid container direction="column">
					<Grid item>
						<TextField
							autoFocus
							margin="dense"
							id="amount"
							label="amount"
							type="text"
							fullWidth
						/>
					</Grid>
					<Grid item>
						<TextField
							margin="dense"
							id="ticket"
							label="ticket"
							type="text"
							fullWidth
						/>
					</Grid>
					<Grid item>
						<FormControlLabel
							control={<Checkbox checked={checked} onChange={(): void => setChecked(!checked)} name="agreement" />}
							label="agree to term and services"
						/>
					</Grid>
					<Grid item>
						<Button type="submit" variant="contained" color="secondary" fullWidth>Submit</Button>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}