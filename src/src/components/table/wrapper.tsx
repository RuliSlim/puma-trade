import React from "react";
import { formContext } from "../../context/form.context";
import { dummyDeposit } from "../../model/dummy_data";
import { SponsorHistoryModel, TItleTableModel } from "../../model/history";
import HistoryTable from "./history_table";

type HistoryTableProps = {
	rows: Array<TItleTableModel | SponsorHistoryModel>;
	title: string;
	params: string;
}

export default function WrapperTable (props: HistoryTableProps): JSX.Element {
	const { resource } = React.useContext(formContext);
	const { rows, title, params } = props;
	const [ data, setData ] = React.useState<TItleTableModel[]>(dummyDeposit);

	const deposit = resource?.deposit?.write().data as TItleTableModel[];
	const invest = resource?.invest?.write().data as TItleTableModel[];
	const convert = resource?.convert?.write().data as TItleTableModel[];
	const transfer = resource?.transfer?.write().data as TItleTableModel[];
	const withdraw = resource?.withdraw?.write().data as TItleTableModel[];
	const sponsor = resource?.sponsor?.write().data as TItleTableModel[];
	// let data = dummyDeposit;

	const getData = (): TItleTableModel[] => {

		if (params === "deposit") {
			// setData(deposit);
			// data = deposit;
			return deposit;
		} else if (params === "invest") {
			// setData(invest);
			// data = invest;
			return invest;
		} else if (params === "transfer") {
			// setData(transfer);
			// data = transfer;
			return transfer;
		} else if (params === "withdraw") {
			// setData(withdraw);
			// data = withdraw;
			return withdraw;
		} else if (params === "sponsor") {
			// setData(sponsor);
			// data = sponsor;
			return sponsor;
		} else {
			// setData(convert);
			// data = convert;
			console.log("SAJDNSAJLNFJASNFSAJNFJASL");
			return convert;
		}
	};

	// React.useEffect(() => {
	// 	getData();
	// }, []);

	return (
		getData().length ?
			<HistoryTable rows={getData()} title={title}/>
			:
			<div>No History Yet!</div>
	);
}