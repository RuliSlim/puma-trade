import React from "react";
import { Checkbox, Input, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel } from "@material-ui/core";
import { FormApi } from "../../model/components/form";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useStyles } from "../../utils";
import { decryptLinkUrl } from "../../utils/auth";
import { useHistory } from "react-router-dom";

interface RegisterProps {
	type: "login" | "register" | "inside";
	handleChange: (value: keyof FormApi) => (e: React.ChangeEvent<HTMLInputElement>) => void;
	values: FormApi;
}

export default function Register (props: RegisterProps): JSX.Element {
	const { type, handleChange, values } = props;
	const [ showPassword, setShowPassword ] = React.useState<boolean>(false);
	const [ reff, setReff ] = React.useState<string>("");
	const classes = useStyles();
	const history = useHistory();

	const handleShowPassword = (): void => {
		setShowPassword(!showPassword);
	};
	
	React.useEffect(() => {
		const refferal = decryptLinkUrl(history.location.search.slice(1)).slice(9);
		setReff(refferal);
	}, [])

	return(
		<div className={classes.forms}>
			<FormControl fullWidth>
				<InputLabel htmlFor="username">username</InputLabel>
				<Input
					margin="dense"
					id="username"
					type="text"
					fullWidth
					onChange={handleChange("username")}
					value={values.username.toUpperCase()}
				/>
			</FormControl>
			<FormControl fullWidth>
				<InputLabel htmlFor="password">password</InputLabel>
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
							>
								{showPassword ? <Visibility color="secondary"/> : <VisibilityOff color="primary"/>}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
			{(type === "register" || type === "inside") &&
				<React.Fragment>
					<Grid item>
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
					</Grid>
					<Grid>
						<FormControl fullWidth>
							<InputLabel htmlFor="email">email</InputLabel>
							<Input
								autoFocus
								margin="dense"
								id="email"
								type="email"
								fullWidth
								onChange={handleChange("email")}
								value={values.email}
							/>
						</FormControl>
					</Grid>
					<Grid>
						<FormControl fullWidth>
							<InputLabel htmlFor="code">refferral</InputLabel>
							<Input
								margin="dense"
								id="ticket"
								type="text"
								fullWidth
								onChange={handleChange("codeReferral")}
								value={reff.length > 1 ? reff : values.codeReferral}
								disabled={reff.length > 1 ? true : false}
							/>
						</FormControl>
					</Grid>
					<Grid item>
						<FormControlLabel
							control={<Checkbox checked={values.agree} onChange={handleChange("agree")} name="agreement" />}
							label="agree to term and services"
						/>
					</Grid>
				</React.Fragment>
			}
		</div>
	);
}