import { Typography } from "@material-ui/core";
import React from "react";
import { FetchApi } from "../../../model/api/fetcher";
import { CardComponentProps } from "../../../model/components/dashboard";

export default function ValueCard(props: CardComponentProps): JSX.Element {
	const { resource, item } = props;
	const data = item.name.toLowerCase() as keyof FetchApi;

	return(
		<Typography variant="h6" gutterBottom component="h2" align="center">
			{item.name !== "Capping" && "$"}
			{
				resource[data]?.write().data
			}
			{item.name === "Capping" && "%"}
		</Typography>
	);
}
