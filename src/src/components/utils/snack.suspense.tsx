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
		// if (!resource?.result.write().ok) {
		// 	resource?.result.write().statusText ? setIsOpen(true) : setIsOpen(false);
		// }
		if (resource?.result?.write().status !== 200 || resource?.result.write().status !== 201) {
			console.log("masuk sini gaaaa?????D?SA?DSA?D?S?A?");
			resource?.result?.write().message ? setIsOpen(true) : setIsOpen(false);
			message = resource?.result?.write().message ?? "please relogin";
			console.log(resource?.result?.write(), "<<<<II MESASSGA");
		}
		if (postResource?.result?.write().status !== 200 || postResource?.result.write().status !== 201) {
			console.log("masuk sini gaaaa?????D?SA?DSA?D?S?A?");
			postResource?.result?.write().message ? setIsOpen(true) : setIsOpen(false);
			message = postResource?.result?.write().message ?? "please relogin";
		}
	};

	React.useEffect(() => {
		console.log("<<<<>SD<D>SA<D>SA<DA>S<D>D<A>>>>");
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
					{message}
				</Alert>
			</Snackbar>
		</>
	);
}
