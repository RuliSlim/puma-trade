import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ButtonModal, MessageModal } from "../../model/components/modal";

interface FormDialogProps {
	isOpen: boolean;
	onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	message: MessageModal;
	buttons: ButtonModal;
	content: JSX.Element;
}

export default function FormDialog(props: FormDialogProps): JSX.Element {
	const { isOpen, onClose, message, buttons, content } = props;
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
