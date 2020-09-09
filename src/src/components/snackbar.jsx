import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MySnackbar({isOpen, message, variant, onClose}) {

	
	return (
		<>
			<Snackbar 
				open={isOpen} 
				onClose={onClose}
				autoHideDuration={3000}
			>
				<Alert severity={variant}>
					{message}
				</Alert>
			</Snackbar>
		</>
	);
}

MySnackbar.propTypes = {
	isOpen: PropTypes.bool,
	message: PropTypes.string,
	variant: PropTypes.string,
	onClose: PropTypes.func
};
