import React from "react";
import { TextField } from "@material-ui/core";
import { FormApi } from "../../model/components/form";

interface RegisterProps {
	type: "login" | "register";
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
			{type === "register" &&
				<>
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
						label="ticket"
						type="text"
						fullWidth
						onChange={handleChange("codeReferral")}
						value={values.codeReferral}
					/>
				</>
			}
		</>
	);
}