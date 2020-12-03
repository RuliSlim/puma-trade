import React from "react";
import { useLocation } from "react-router-dom";
import { Loading } from "../components";
import { formContext } from "../context/form.context";
import { dummyDeposit } from "../model/dummy_data";

const HistoryTable = React.lazy(() => import("../components/table/wrapper"));
export default function HistoryPages(): JSX.Element {
	const params = useLocation().search.slice(1);

	const { actions } = React.useContext(formContext);
	const { fetchingData, clearPostResource } = actions;

	React.useEffect(() => {
		fetchingData("history");
	}, [ params ]);

	React.useEffect(() => {
		clearPostResource();
	}, []);

	return(
		<React.Fragment>
			<React.Suspense fallback={<Loading thickness={100} />}>
				<HistoryTable rows={dummyDeposit} title={`History ${params}`} params={params} />
			</React.Suspense>
		</React.Fragment>
	);
}