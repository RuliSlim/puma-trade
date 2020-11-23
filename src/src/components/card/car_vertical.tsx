import React from "react";
import { Box, Button, Card, CardActionArea, CardContent, CardHeader, Paper, Typography } from "@material-ui/core";
import { Circle } from "rc-progress";
import { useStyles } from "../../utils";
import { CardComponentProps } from "../../model/components/dashboard";
import { useDeviceSize } from "../../hooks/device";

export default function CardVertical(props: CardComponentProps): JSX.Element {
	const { item, openingModal } = props;
	const { device } = useDeviceSize();
	const classes = useStyles();

	return(
		<Card raised className={device.isLaptop ? classes.bonus : classes.wallet}>
			<CardActionArea>
				<CardHeader title={item.name}/>
				<CardContent >
					<Typography variant="h6" gutterBottom component="h2" align="center">{item.name === "Bonus" && "$"} {item.value}{item.name === "Capping" && "%"}</Typography>
				</CardContent>
			</CardActionArea>
			<Button style={{ width: "100%" }} onClick={openingModal(item.name === "Bonus" ? "convertBonus" : "convertCapping")}>
				<Box width="100%" height="100%">
					<Paper elevation={10}>
						<Circle
							percent={item.name === "Capping" ? Number(item.value) / 3 : 100}
							strokeWidth={2}
							strokeColor={{
								"0%": "#fa100b",
								"50%": "#b7f446",
								"100%": "#04f723"
							}}
							trailColor="#a3a0a0"
							style={{ width: "65%", flex: "1", marginTop: "5%" }}
						/>
					</Paper>
				</Box>
				<Box position="absolute" top={device.isLaptop ? "45%" : "40%"} left={device.isLaptop ? "28%" : "30%"}>
					<Typography variant={device.isLaptop ? "h5" : "subtitle2"}>{item.button}</Typography>
				</Box>
			</Button>
		</Card>
	);
}
