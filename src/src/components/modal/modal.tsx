import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ButtonModal, MessageModal } from "../../model/components/modal";
import { formContext } from "../../context/form.context";
import { RegisterInsideModel } from "../../model/models/user.model";

interface FormDialogProps {
	isOpen: boolean;
	onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	message: MessageModal;
	buttons: ButtonModal;
	content: JSX.Element;
	data?: RegisterInsideModel;
}

export default function FormDialog(props: FormDialogProps): JSX.Element {
	const { isOpen, onClose, message, buttons, content, data } = props;
	const { actions, values } = React.useContext(formContext);
	const { handlingConvert, handlingTransfer, handleResetAgree, handleInside, handleChangePassword } = actions;

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		onClose(e);
		if (message.title === "Convert Bonus") {
			handlingConvert();
		}

		if (message.title === "Transfer Point") {
			console.log("masuk sainifasfs??>>>>>>>>>>>>>>");
			handlingTransfer();
		}

		if (message.title === "Register Inside") {
			if (data) {
				handleInside(data);
			}
		}

		if (message.title === "Change Profile") {
			handleChangePassword();
		}
	};

	const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		handleResetAgree();
		onClose(e);
	};
	return (
		<Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title" hideBackdrop>
			<DialogTitle id="form-dialog-title">{message.title}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{message.message}
				</DialogContentText>
				{content}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					{buttons.cancel}
				</Button>
				<Button onClick={handleSubmit} color="primary" disabled={(!values.agree || values.isError)}>
					{buttons.accept}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
