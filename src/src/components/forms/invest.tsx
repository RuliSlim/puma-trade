import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Box, Button, Checkbox } from "@material-ui/core";

export default function InvestForm() {
	const [ value, setValue ] = React.useState("female");
	const [ checked, setChecked ] = React.useState<boolean>(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};

	return (
		<Box width="100%">
			<form>
				<FormControl component="blockquote">
					<FormLabel component="legend">Gender</FormLabel>
					<RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
						<FormControlLabel value="female" control={<Radio />} label="Female" />
						<FormControlLabel value="male" control={<Radio />} label="Male" />
						<FormControlLabel value="other" control={<Radio />} label="Other" />
					</RadioGroup>
					<FormControlLabel
						control={<Checkbox checked={checked} onChange={(): void => setChecked(!checked)} name="agreement" />}
						label="agree to term and services"
					/>
				</FormControl>
				<Button type="submit" variant="contained" color="secondary" fullWidth>Submit</Button>
			</form>
		</Box>
	);
}
