import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { formContext } from "../../context/form.context";

function Alert(props: AlertProps): JSX.Element {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MySnackbarSuspense(): JSX.Element {
	const [ isOpen, setIsOpen ] = React.useState<boolean>(true);

	const { resource } = React.useContext(formContext);

	const openOrNot = (): void => {
		if (resource?.result.write().status !== 200 || resource?.result.write().status === 201) {
			console.log("masuk sini ga siiih>>>>");
			resource?.result.write().message ? setIsOpen(true) : setIsOpen(false);
		}
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
					{resource?.result.write().message}
				</Alert>
			</Snackbar>
		</>
	);
}
