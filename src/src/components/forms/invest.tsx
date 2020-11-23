import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Box, Button, Checkbox } from "@material-ui/core";

export default function InvestForm(): JSX.Element {
	const [ value, setValue ] = React.useState("50");
	const [ checked, setChecked ] = React.useState<boolean>(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setValue((event.target as HTMLInputElement).value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		console.log(value);
	};

	return (
		<Box width="100%">
			<form onSubmit={handleSubmit}>
				<FormControl component="blockquote">
					<FormLabel component="legend">Package</FormLabel>
					<RadioGroup aria-label="package" name="package" value={value} onChange={handleChange}>
						<FormControlLabel value="50" control={<Radio />} label="$ 50" />
						<FormControlLabel value="100" control={<Radio />} label="$ 100" />
						<FormControlLabel value="500" control={<Radio />} label="$ 500" />
					</RadioGroup>
					<FormControlLabel
						control={<Checkbox checked={checked} onChange={(): void => setChecked(!checked)} name="agreement" />}
						label="agree to term and services"
					/>
				</FormControl>
				<Button
					type="submit"
					variant="contained"
					color="secondary"
					disabled={!checked}
					fullWidth
				>
					Submit
				</Button>
			</form>
		</Box>
	);
}
