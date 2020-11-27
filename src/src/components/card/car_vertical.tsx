import React from "react";
import { Box, Button, Card, CardActionArea, CardContent, CardHeader, Paper, Typography } from "@material-ui/core";
// import { Circle } from "rc-progress";
import { useStyles } from "../../utils";
import { CardComponentProps } from "../../model/components/dashboard";
import { useDeviceSize } from "../../hooks/device";
import { FetchApi } from "../../model/api/fetcher";
import Loading from "../utils/loading";

const Value = React.lazy(() => import("./fetching/value"));
const Circle = React.lazy(() => import("./fetching/circle"));

export default function CardVertical(props: CardComponentProps): JSX.Element {
	const { item, openingModal, resource } = props;
	const { device } = useDeviceSize();
	const classes = useStyles();

	const loading = <Loading thickness={30} position="relative" left="5vw"  top="-15vh" />;

	return(
		<Card raised className={device.isLaptop ? classes.bonus : classes.wallet}>
			<CardActionArea>
				<CardHeader title={item.name}/>
				<CardContent >
					<React.Suspense fallback={loading}>
						<Value item={item} resource={resource} openingModal={openingModal} />
					</React.Suspense>
				</CardContent>
			</CardActionArea>
			<Button style={{ width: "100%" }} onClick={openingModal(item.name === "Bonus" ? "convertBonus" : "convertCapping")}>
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
