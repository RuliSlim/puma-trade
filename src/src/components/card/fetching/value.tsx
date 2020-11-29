import { Typography } from "@material-ui/core";
import React from "react";
import { Capping, FetchApi } from "../../../model/api/fetcher";
import { CardComponentProps } from "../../../model/components/dashboard";

export default function ValueCard(props: CardComponentProps): JSX.Element {
	const { resource, item } = props;
	const data = item.name.toLowerCase() as keyof FetchApi;

	const value = resource?.[data]?.write().data;
	const capping = item.name === "Capping" ? value as Capping : null;
	const percent = capping?.persen_capping;
	const nominal = capping?.value_capping;
	// resource?.result.write().data
	return(
		<React.Fragment>
			<Typography variant="h5" gutterBottom component="h5" align="center">
				{item.name !== "Capping" && "$"}
				{
					item.name === "Capping" ? percent : value
				}
				{item.name === "Capping" && "%"}
			</Typography>
			{
				item.name === "Capping" &&
				<Typography variant="h5" gutterBottom component="h5" align="center">
					$ {nominal}
				</Typography>
			}
		</React.Fragment>
	);
}
