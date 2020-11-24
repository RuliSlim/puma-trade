import React, { SyntheticEvent } from "react";
import { Snackbar, SnackbarCloseReason } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { formContext } from "../../context/form.context";

function Alert(props: AlertProps): JSX.Element {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MySnackbarSuspense(): JSX.Element {
	const [ isOpen, setIsOpen ] = React.useState<boolean>(true);

	const { resource } = React.useContext(formContext);

	const openOrNot = (): void => {
		resource?.result.write().username ? setIsOpen(true) : setIsOpen(false);
	};

	React.useEffect(() => {
		openOrNot();
	}, [ resource ]);

	return (
		<>
			<Snackbar
				open={isOpen}
				onClose={(): void => setIsOpen(false)}
				autoHideDuration={3000}
			>
				<Alert severity="success">
					Ini hasil result tadiiii {resource?.result.write().username}
				</Alert>
			</Snackbar>
		</>
	);
}
