import { Container } from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router-dom";
import { HistoryTable } from "../components";
import { dummyDeposit, dummyPairing, dummySponsor } from "../model/dummy_data";

export default function HistoryPages(): JSX.Element {
	const params = useLocation().hash.slice(9);
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