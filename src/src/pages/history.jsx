import React from "react";
import { HistoryTable } from "../components";
import { dummyDeposit, dummyPairing, dummySponsor } from "../model/dummy_data";

export default function HistoryPages() {
	return(
		<>
			<HistoryTable rows={dummyDeposit} title="History Deposit"/>
			<HistoryTable rows={dummySponsor} title="History Sponsor"/>
			<HistoryTable rows={dummyPairing} title="History Pairing"/>
		</>
	);
}