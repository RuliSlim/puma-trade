export interface ButtonModal {
	cancel: string;
	accept: string;
}

export interface MessageModal {
	title: string;
	message: string;
}

export interface ModalState {
	modal: boolean;
	snackbar: boolean;
}