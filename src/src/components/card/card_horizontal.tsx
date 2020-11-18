import React from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Grid, Typography } from "@material-ui/core";
import { CardComponentProps, CardModel } from "../../model/components/dashboard";
import { Circle } from "rc-progress";
import { useStyles } from "../../utils";
import { useDeviceSize } from "../../hooks/device";

export default function CardDashboard(props: CardComponentProps): JSX.Element {
	const { item } = props;
	const { device } = useDeviceSize();
	const classess = useStyles();

	return(
		<Card raised className={classess.wallet}>
			<CardActionArea>
				<CardHeader title={item.name}/>
				<CardContent >
					<Typography variant="h6" gutterBottom component="h2" align="center">$ {item.value}</Typography>
				</CardContent>
			</CardActionArea>
			<Button style={{ height: "100%", width: "100%" }}>
				<Box width="100%" height="100%">
					<Circle
						percent={100}
						strokeWidth={2}
						strokeColor={{
							"0%": "#fa100b",
							"50%": "#b7f446",
							"100%": "#04f723"
						}}
						trailColor="#a3a0a0"
						style={{ width: "65%", paddingTop: "5%" }}
					/>
				</Box>
				<Box position="absolute" top="45%" left={device.isLaptop ? "28%" : "25%"}>
					<Typography variant={device.isLaptop ? "h5" : "subtitle2"}>{item.button}</Typography>
				</Box>
			</Button>
		</Card>
	);
	// linear-gradient(90deg, rgba(250,16,11,0.654499299719888) 0%, rgba(183,244,70,0.48923319327731096) 42%, rgba(4,247,35,1) 100%)
}