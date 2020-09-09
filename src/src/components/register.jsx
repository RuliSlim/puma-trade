import React from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";

export default function Register ({type}) {
	return(
		<>
			{type === "register" &&
			<>
				<TextField
					autoFocus
					margin="dense"
					id="email"
					label="email"
					type="email"
					fullWidth
				/>
				<TextField
					margin="dense"
					id="username"
					label="username"
					type="text"
					fullWidth
				/>
				<TextField
					margin="dense"
					id="ticket"
					label="ticket"
					type="text"
					fullWidth
				/>
			</>
			}
		</>
	);
}

Register.propTypes = {
	type: PropTypes.string
};