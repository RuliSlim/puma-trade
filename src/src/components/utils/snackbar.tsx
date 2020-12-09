import React, { SyntheticEvent } from "react";
import { Snackbar, SnackbarCloseReason } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

interface MySnackbarProps {
	isOpen: boolean;
	message: string;
	variant: "success" | "info" | "warning" | "error" | undefined;
	onClose?: (event: SyntheticEvent<unknown, Event>, reason: SnackbarCloseReason) => void;
}

function Alert(props: AlertProps): JSX.Element {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MySnackbar(props: MySnackbarProps): JSX.Element {
	const { isOpen, message, variant, onClose } = props;

	return (
		<>
			<Snackbar
				open={isOpen}
				onClose={onClose}
				autoHideDuration={3000}
			>
				<Alert severity={variant}>
					{message === "invalid token" ? "please relogin" : message}
				</Alert>
			</Snackbar>
		</>
	);
}
