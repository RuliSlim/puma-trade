import React from "react";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import { FormApi } from "../../model/components/form";

interface RegisterProps {
	type: "login" | "register" | "inside";
	handleChange: (value: keyof FormApi) => (e: React.ChangeEvent<HTMLInputElement>) => void;
	values: FormApi;
}

export default function Register (props: RegisterProps): JSX.Element {
	const { type, handleChange, values } = props;

	return(
		<>
			<TextField
				margin="dense"
				id="username"
				label="username"
				type="text"
				fullWidth
				onChange={handleChange("username")}
				value={values.username}
			/>
			<TextField
				margin="dense"
				id="password"
				label="password"
				type="text"
				fullWidth
				onChange={handleChange("password")}
				value={values.password}
			/>
			{(type === "register" || type === "inside") &&
				<>
					<TextField
						margin="dense"
						id="password"
						label="confirm passowrd"
						type="text"
						fullWidth
						onChange={handleChange("password")}
						value={values.password}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="email"
						label="email"
						type="email"
						fullWidth
						onChange={handleChange("email")}
						value={values.email}
					/>
					<TextField
						margin="dense"
						id="ticket"
						label="refferal"
						type="text"
						fullWidth
						onChange={handleChange("codeReferral")}
						value={values.codeReferral}
					/>
					<FormControlLabel
						control={<Checkbox checked={values.agree} onChange={handleChange("agree")} name="agreement" />}
						label="agree to term and services"
					/>
				</>
			}
		</>

	// parent
	);
}