import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Loading } from "../components";
import { formContext } from "../context/form.context";
import { confirmationUrl } from "../lib/url";
import { callFetch } from "../utils/fetcher";

export default function ConfirmPage(): JSX.Element {
	const location = useLocation();
	const [ token, setToken ] = React.useState<string>(location.search.slice(1));
	const [ loading, setLoading ] = React.useState<boolean>(true);
	const [ error, setError ] = React.useState<boolean>(false);

	const statusOk = (): void => {
		const fetcher = callFetch("POST", confirmationUrl, {
			token: token
		});

		fetcher
			.then(data => data.json())
			.then(result => {
				if (result.status === 200) {
					setLoading(false);
				} else {
					setError(true);
				}
			});
	};

	React.useEffect(() => {
		const token = {
			token: location.search.slice(1)
		};

		statusOk();

	}, []);

	return (
		<>
			{loading ?
				<>
					<div>Please wait, validating your email...</div>
					<Loading thickness={100} position="absolute" top="40%" left ="45%" />
				</>
				:
				<Redirect to="/login" />
			}
			{
				error && <div>Something went worng, please contact our admin, or try login</div>
			}
		</>
	);
}