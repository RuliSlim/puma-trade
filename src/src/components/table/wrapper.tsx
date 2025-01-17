import React from "react";
import { useLocation } from "react-router-dom";
import { formContext } from "../../context/form.context";
import { SponsorHistoryModel, TItleTableModel } from "../../model/history";
import HistoryTable from "./history_table";

type HistoryTableProps = {
	rows: Array<TItleTableModel | SponsorHistoryModel>;
	title: string;
	params: string;
}

export default function WrapperTable (props: HistoryTableProps): JSX.Element {
	const { resource } = React.useContext(formContext);
	const { title, params } = props;
	const [ data, setData ] = React.useState<TItleTableModel[]>([]);

	const deposit = resource?.deposit?.write().data as TItleTableModel[];
	const invest = resource?.invest?.write().data as TItleTableModel[];
	const convert = resource?.convert?.write().data as TItleTableModel[];
	const transfer = resource?.transfer?.write().data as TItleTableModel[];
	const withdraw = resource?.withdraw?.write().data as TItleTableModel[];
	const sponsor = resource?.sponsor?.write().data as TItleTableModel[];
	// let data = dummyDeposit;

	const getData = (): void => {

		if (params === "deposit") {
			setData(deposit ?? []);
			// data = deposit;
			// return deposit;
		} else if (params === "invest") {
			setData(invest ?? []);
			// data = invest;
			// return invest;
		} else if (params === "transfer") {
			setData(transfer ?? []);
			// data = transfer;
			// return transfer;
		} else if (params === "withdraw") {
			setData(withdraw ?? []);
			// data = withdraw;
			// return withdraw;
		} else if (params === "sponsor") {
			setData(sponsor ?? []);
			// data = sponsor;
			// return sponsor;
		} else {
			setData(convert ?? []);
			// data = convert;
			// return convert;
		}
	};

	React.useEffect(() => {
		getData();
	}, [ useLocation() ]);

	return (
		data.length ?
			<HistoryTable rows={data} title={title}/>
			:
			<div>No History Yet!</div>
	);
}