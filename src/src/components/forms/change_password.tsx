import React from "react";
import { Checkbox, Input, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, TextField } from "@material-ui/core";
import { FormApi } from "../../model/components/form";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useStyles } from "../../utils";

interface RegisterProps {
	// type: "login" | "register" | "inside";
	handleChange: (value: keyof FormApi) => (e: React.ChangeEvent<HTMLInputElement>) => void;
	values: FormApi;
}

export default function ChangePassword (props: RegisterProps): JSX.Element {
	const { handleChange, values } = props;
	const [ showPassword, setShowPassword ] = React.useState<boolean>(false);
	const classes = useStyles();

	const handleShowPassword = (): void => {
		setShowPassword(!showPassword);
	};

	return(
		<div className={classes.forms}>
			<FormControl fullWidth>
				<InputLabel htmlFor="password">old password</InputLabel>
				<Input
					margin="dense"
					id="password"
					fullWidth
					onChange={handleChange("oldPassword")}
					type={showPassword ? "text" : "password"}
					value={values.oldPassword}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleShowPassword}
								// onMouseDown={handleMouseDownPassword}
							>
								{showPassword ? <Visibility color="secondary"/> : <VisibilityOff color="primary"/>}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
			<FormControl fullWidth>
				<InputLabel htmlFor="password">new password</InputLabel>
				<Input
					margin="dense"
					id="password"
					fullWidth
					onChange={handleChange("password")}
					type={showPassword ? "text" : "password"}
					value={values.password}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleShowPassword}
								// onMouseDown={handleMouseDownPassword}
							>
								{showPassword ? <Visibility color="secondary"/> : <VisibilityOff color="primary"/>}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
			<FormControl fullWidth>
				<InputLabel htmlFor="password2">confirm password</InputLabel>
				<Input
					margin="dense"
					id="password2"
					type={showPassword ? "text" : "password"}
					fullWidth
					onChange={handleChange("password2")}
					value={values.password2}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleShowPassword}
							>
								{showPassword? <Visibility color="secondary"/> : <VisibilityOff color="primary"/>}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
			<FormControlLabel
				control={<Checkbox checked={values.agree} onChange={handleChange("agree")} name="agreement" />}
				label="agree to term and services"
			/>
		</div>
	);
}