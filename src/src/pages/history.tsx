import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { HistoryTable } from "../components";
import { formContext } from "../context/form.context";
// import { useDebounce } from "../hooks/debounce";
import { dummyDeposit, dummyPairing, dummySponsor } from "../model/dummy_data";

export default function HistoryPages(): JSX.Element {
	const params = useLocation().search.slice(1);
	const history = useHistory();

	const { actions } = React.useContext(formContext);
	const { fetchingData } = actions;

	React.useEffect(() => {
		const route: string = history.location.pathname.slice(1);
		console.log(history, "<<<<<<<CSDSADSCSAD");
		console.log(route, "<<<<<<<<<<CSADRAOSDNE");
		// setNow(route);
		// initPage();
		const url = params === "" ? "deposit" : params;
		fetchingData(url);
	}, []);

	return(
		<React.Fragment>
			{(params === "deposit" || params === "") &&
				<HistoryTable rows={dummyDeposit} title="History Deposit"/>
			}
			{params === "sponsor" &&
				<HistoryTable rows={dummySponsor} title="History Sponsor"/>
			}
			{params === "pairing" &&
				<HistoryTable rows={dummyPairing} title="History Pairing"/>
			}
		</React.Fragment>
	);
}