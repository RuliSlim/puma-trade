import React from "react";
import { useLocation } from "react-router-dom";
import { Loading } from "../components";
import { formContext } from "../context/form.context";
import { confirmationUrl } from "../lib/url";
import { callFetch } from "../utils/fetcher";

export default function ConfirmPage(): JSX.Element {
	const location = useLocation();

	React.useEffect(() => {
		// callFetch("POST", )
		console.log(location, "<<<<<<FASFAS");
		const token = {
			token: location.search.slice(1)
		};

		callFetch("POST", confirmationUrl, token);
	}, []);

	return (
		<>
			<div>Confirmation email, please wait...</div>
			<Loading thickness={100} position="absolute" top="40%" left="45%" />
		</>
	);
}