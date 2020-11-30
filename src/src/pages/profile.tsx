import React from "react";
import { CardProfile } from "../components";

interface Modal {
	withdraw: boolean;
	transfer: boolean;
	convertbonus: boolean;
	convertcapping: boolean;
}

export default function Profile(): JSX.Element {
	const [ isModal, setIsModal ] = React.useState<Modal>({
		convertbonus: false,
		convertcapping: false,
		transfer: false,
		withdraw: false
	});

	const openingModal = (item: string) => (): void => {
		setIsModal({ ...isModal, [item.toLowerCase()]: true });
	};

	return(
		<React.Fragment>
			<CardProfile openingModal={openingModal} />
		</React.Fragment>
	);
}