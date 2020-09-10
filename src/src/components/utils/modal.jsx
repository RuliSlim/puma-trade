import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

export default function FormDialog({isOpen, onClose, message, buttons, content}) {
	return (
		<Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">{message.title}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{message.message}
				</DialogContentText>
				{content}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					{buttons.cancel}
				</Button>
				<Button onClick={onClose} color="primary">
					{buttons.accept}
				</Button>
			</DialogActions>
		</Dialog>
	);
}


FormDialog.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.bool,
	message: PropTypes.object,
	buttons: PropTypes.object,
	content: PropTypes.node
};
