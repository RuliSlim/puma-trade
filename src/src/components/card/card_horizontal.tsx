import React from "react";
import { Box, Button, Card, CardActionArea, CardContent, CardHeader, Paper, Typography } from "@material-ui/core";
import { CardComponentProps } from "../../model/components/dashboard";
// import { Circle } from "rc-progress";
import { useStyles } from "../../utils";
import { useDeviceSize } from "../../hooks/device";
import Loading from "../utils/loading";

const Value = React.lazy(() => import("./fetching/value"));
const Circle = React.lazy(() => import("./fetching/circle"));

export default function CardDashboard(props: CardComponentProps): JSX.Element {
	const { item, openingModal, resource } = props;
	const { device } = useDeviceSize();
	const classess = useStyles();

	const loading = <Loading thickness={30} position="relative" top="-15vh" left="2vw" />;

	return(
		<Card raised className={classess.wallet}>
			<CardActionArea>
				<CardHeader title={item.name}/>
				<CardContent >
					<React.Suspense fallback={loading}>
						<Value item={item} resource={resource} openingModal={openingModal} />
					</React.Suspense>
				</CardContent>
			</CardActionArea>
			<Button style={{ height: "100%", width: "100%" }} className={classess.percent} onClick={openingModal(item.button)}>
				<Box width="100%" height="100%">
					<Paper elevation={10}>
						<React.Suspense fallback={loading}>
							<Circle item={item} resource={resource} openingModal={openingModal} />
						</React.Suspense>
					</Paper>
				</Box>
				<Box position="absolute" top={device.isLaptop ? "45%" : "40%"} left={device.isLaptop ? "28%" : "30%"}>
					<Typography variant={device.isLaptop ? "h5" : "subtitle2"}>{item.button}</Typography>
				</Box>
			</Button>
		</Card>
	);
}
