import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Loading } from "../components";
import { formContext } from "../context/form.context";
import { Capping } from "../model/api/fetcher";
// import { useDebounce } from "../hooks/debounce";
import { dummyDeposit, dummyPairing, dummySponsor } from "../model/dummy_data";
import { TItleTableModel } from "../model/history";
import { DepositModel } from "../model/models/transaction.model";
import { User } from "../model/models/user.model";
import { Member } from "../model/tree_data";

const HistoryTable = React.lazy(() => import("../components/table/wrapper"));
export default function HistoryPages(): JSX.Element {
	const params = useLocation().search.slice(1);
	const location = useLocation();
	const history = useHistory();

	const [ data, setData ] = React.useState<string | User | DepositModel | Member[] | Capping | null | undefined>();

	const { actions } = React.useContext(formContext);
	const { fetchingData, clearPostResource } = actions;

	React.useEffect(() => {
		const route: string = history.location.pathname.slice(1);

		// setNow(route);
		// initPage();
		const url = params === "" ? "deposit" : params;
		fetchingData("history");
		console.log("MASDSADSAD?SAD????????");
		// getData();
	}, [ params ]);

	React.useEffect(() => {
		clearPostResource();
	}, []);

	return(
		<React.Fragment>
			{/* {(params === "deposit" || params === "") &&
				<HistoryTable rows={dummyDeposit} title="History Deposit"/>
			}
			{params === "sponsor" &&
				<HistoryTable rows={dummySponsor} title="History Sponsor"/>
			} */}
			{/* dasfas */}
			{/* {data ? */}
			<React.Suspense fallback={<Loading thickness={100} />}>
				<HistoryTable rows={dummyDeposit} title={`History ${params}`} params={params} />
			</React.Suspense>
			{/* :
				<Loading thickness={100} /> */}
			{/* } */}
		</React.Fragment>
	);
}