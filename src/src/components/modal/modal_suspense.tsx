import React from "react";
import { MyModal } from "..";
import { formContext } from "../../context/form.context";
import { DepositModel } from "../../model/models/transaction.model";
import ContentDeposit from "./content/content_deposit";

interface Props {
	type: string;
}

export default function ModalSuspense(props: Props): JSX.Element {
	const { type } = props;
	const { resource  } = React.useContext(formContext);
	const result = resource?.result.write().data as DepositModel;
	const amount = result?.jumlah;

	const whichOpen = (): boolean => {
		if (type === "deposit") {
			console.log("masuk sini", amount ? true : false);
			return amount ? true : false;
		}

		// if (type === "invest") {
		// }
		else {
			return false;
		}
	};

	const [ open, setOpen ] = React.useState<boolean>(() => whichOpen());

	const checkOpen = (): void => {
		if (type === "deposit") {
			console.log("masuk sini", amount ? true : false);
			setOpen(amount ? true : false);
		}

		// if (type === "invest") {
		// }
		else {
			setOpen(false);
		}
	};

	React.useEffect(() => {
		checkOpen();
	}, [ amount ]);

	const content = type === "deposit" ? <ContentDeposit /> : <div>Invest</div>;
	const title = type === "deposit" ? "Deposit Doge" : "Invest";

	return(
		<MyModal
			buttons={{ accept: "Ok" }}
			content={content}
			isOpen={open}
			message={{ title: title, message: "" }}
			onClose={(): void => setOpen(false)}
		/>
	);
}
