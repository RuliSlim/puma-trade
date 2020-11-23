import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { HistoryTable } from "../components";
// import { useDebounce } from "../hooks/debounce";
import { dummyDeposit, dummyPairing, dummySponsor } from "../model/dummy_data";

export default function HistoryPages(): JSX.Element {
	const params = useLocation().search.slice(1);
	const history = useHistory();
	// const { initPage } = useDebounce();

	React.useEffect(() => {
		const route: string = history.location.pathname.slice(1);
		console.log(history, "<<<<<<<CSDSADSCSAD");
		console.log(route, "<<<<<<<<<<CSADRAOSDNE");
		// setNow(route);
		// initPage();
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