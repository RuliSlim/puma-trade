import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { formContext } from "../../context/form.context";

function Alert(props: AlertProps): JSX.Element {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MySnackbarSuspense(): JSX.Element {
	const [ isOpen, setIsOpen ] = React.useState<boolean>(true);

	const { resource, postResource } = React.useContext(formContext);
	let message: string = postResource?.result?.write().message ?? resource?.result?.write().message ?? "please relogin";

	const openOrNot = (): void => {
		if (resource?.result?.write().status !== 200 || resource?.result.write().status !== 201) {
			resource?.result?.write().message ? setIsOpen(true) : setIsOpen(false);
			message = resource?.result?.write().message ?? "please relogin";
		}
		if (postResource?.result?.write().status !== 200 || postResource?.result.write().status !== 201) {
			postResource?.result?.write().message ? setIsOpen(true) : setIsOpen(false);
			message = postResource?.result?.write().message ?? "please relogin";
		}
	};

	React.useEffect(() => {
		openOrNot();
	}, [ postResource, resource ]);

	return (
		<>
			<Snackbar
				open={isOpen}
				onClose={(): void => setIsOpen(false)}
				autoHideDuration={3000}
			>
				<Alert severity="success">
					{message === "invalid token" ? "please relogin" : message}
				</Alert>
			</Snackbar>
		</>
	);
}
