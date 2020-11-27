import React from "react";
import { MyModal } from "..";
import { formContext } from "../../context/form.context";
import { DepositModel } from "../../model/models/transaction.model";
import ContentDeposit from "./content/content_deposit";
import ContentInvest from "./content/content_invest";

interface Props {
	type: string;
}

export default function ModalSuspense(props: Props): JSX.Element {
	const { type } = props;
	const { postResource  } = React.useContext(formContext);
	const result = postResource?.result?.write().data as DepositModel;
	const amount = result?.jumlah;

	const whichOpen = (): boolean => {
		if (type === "deposit") {
			console.log("masuk sini", amount ? true : false);
			return amount ? true : false;
		} else {
			return postResource?.result?.write().data === "Invest Success!";
		}
	};

	const [ open, setOpen ] = React.useState<boolean>(() => whichOpen());

	const checkOpen = (): void => {
		if (type === "deposit") {
			setOpen(amount ? true : false);
		} else if (type === "invest") {
			setOpen(postResource?.result?.write().data === "Invest Success!" ? true : false);
		} else {
			setOpen(false);
		}

	};

	React.useEffect(() => {
		checkOpen();
	}, [ postResource ]);

	const content = type === "deposit" ? <ContentDeposit /> : <ContentInvest />;
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
