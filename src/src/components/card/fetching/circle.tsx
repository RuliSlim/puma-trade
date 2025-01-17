/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Typography } from "@material-ui/core";
import { Circle } from "rc-progress";
import React from "react";
import { FetchApi } from "../../../model/api/fetcher";
import { CardComponentProps } from "../../../model/components/dashboard";

export default function CircleValue(props: CardComponentProps): JSX.Element {
	const { resource, item } = props;
	const data = item.name.toLowerCase() as keyof FetchApi;
	//@ts-ignore
	const percent = item.name !== "Capping" ? Number(resource?.[data]?.write().data) : Number(resource?.[data]?.write().data?.persen_capping / 3 ?? 3 / 3);

	return(
		<Typography variant="h6" gutterBottom component="h2" align="center">
			<Circle
				percent={item.name === "Capping" ? percent : percent}
				strokeWidth={2}
				strokeColor={{
					"0%": "#fa100b",
					"50%": "#b7f446",
					"100%": "#04f723"
				}}
				trailColor="#a3a0a0"
				style={{ width: "65%", paddingTop: "5%" }}
			/>
		</Typography>
	);
}
