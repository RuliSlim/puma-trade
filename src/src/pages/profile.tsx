import React from "react";
import { CardProfile, MyModal } from "../components";
import ChangePassword from "../components/forms/change_password";
import { formContext } from "../context/form.context";

interface Modal {

	profile: boolean;
}

export default function Profile(): JSX.Element {
	const [ isModal, setIsModal ] = React.useState<Modal>({
		profile: false
	});

	const { actions, values } = React.useContext(formContext);
	const { handleChange } = actions;

	const openingModal = (item: string) => (): void => {
		setIsModal({ ...isModal, [item.toLowerCase()]: true });
	};

	return(
		<React.Fragment>
			<CardProfile openingModal={openingModal} />
			<MyModal
				buttons={{ cancel: "Cancel", accept: "Change Password" }}
				content={<ChangePassword handleChange={handleChange} values={values}/>}
				isOpen={isModal.profile}
				message={{ title: "Change Profile", message: "" }}
				onClose={(): void => setIsModal({ ...isModal, profile: false })}
			/>
		</React.Fragment>
	);
}