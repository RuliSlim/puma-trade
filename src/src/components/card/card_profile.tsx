import React from "react";
import { Box, Button, Card, CardActionArea, CardContent, CardHeader, Grid, Paper, Typography } from "@material-ui/core";
import { CardProfileProps } from "../../model/components/dashboard";
import { Circle } from "rc-progress";
import { useStyles } from "../../utils";
import { useDeviceSize } from "../../hooks/device";
import { getUser } from "../../utils/auth";
import { UserData } from "../../model/models/user.model";
import { Settings } from "@material-ui/icons";

export default function CardProfile(props: CardProfileProps): JSX.Element {
	const { openingModal } = props;
	const { device } = useDeviceSize();
	const classess = useStyles();
	const [ user, _ ] = React.useState<UserData>(getUser());

	return(
		<Card raised className={classess.wallet}>
			{device.isLaptop && <CardHeader title="Profile" />}
			<CardContent>
				<Grid container direction="column" style={{ height: "100%" }} spacing={5}>
					<Grid item>
						<Typography variant="h6">username</Typography>
						<Typography variant={device.isLaptop ? "h4" : "h5"}>{user.username}</Typography>
					</Grid>
					<Grid item>
						<Typography variant="h6">email</Typography>
						<Typography variant={device.isLaptop ? "h4" : "h5"}>{user.email}</Typography>
					</Grid>
					<Grid item>
						<Typography variant="h6">Referal Code</Typography>
						<Typography variant={device.isLaptop ? "h4" : "h5"}>{user.referal_code}</Typography>
					</Grid>
				</Grid>
			</CardContent>
			<Button style={{ height: "100%", width: "100%" }} className={classess.percent} onClick={openingModal("profile")}>
				<Box width="100%" height="100%" position={device.isLaptop ? "" : "absolute"} top={device.isLaptop ? "45%" : "10%"} >
					<Paper elevation={10}>
						<Typography variant="h6" gutterBottom component="h2" align="center">
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
						</Typography>
					</Paper>
				</Box>
				<Box position="absolute" top={device.isLaptop ? "45%" : "15%"} left={device.isLaptop ? "28%" : "30%"}>
					<Typography variant={device.isLaptop ? "h2" : "subtitle2"}>{
						device.isLaptop ? "Setting" : <Settings />
					}</Typography>
				</Box>
			</Button>
		</Card>
	);
}
