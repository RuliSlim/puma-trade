import React from "react";
import { Box, Button, Card, CardActionArea, CardContent, CardHeader, Grid, Paper, Typography } from "@material-ui/core";
import { CardComponentProps, CardProfileProps } from "../../model/components/dashboard";
import { Circle } from "rc-progress";
import { useStyles } from "../../utils";
import { useDeviceSize } from "../../hooks/device";
import { getUser } from "../../utils/auth";
import { UserData } from "../../model/models/user.model";

// const Value = React.lazy(() => import("./fetching/value"));
// const Circle = React.lazy(() => import("./fetching/circle"));

export default function CardProfile(props: CardProfileProps): JSX.Element {
	const { openingModal } = props;
	const { device } = useDeviceSize();
	const classess = useStyles();
	const [ user, setUser ] = React.useState<UserData>(getUser());

	return(
		<Card raised className={classess.wallet}>
			<CardActionArea>
				<CardHeader title="Profile"/>
				<CardContent>
					<Grid container direction="column" style={{ height: "100%" }} spacing={5}>
						<Grid item>
							<Typography variant="h6">username</Typography>
							<Typography variant="h4">{user.username}</Typography>
						</Grid>
						<Grid item>
							<Typography variant="h6">email</Typography>
							<Typography variant="h4">{user.email}</Typography>
						</Grid>
						<Grid item>
							<Typography variant="h6">Referal Code</Typography>
							<Typography variant="h4">{user.referal_code}</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
			<Button style={{ height: "100%", width: "100%" }} className={classess.percent} onClick={openingModal("profile")}>
				<Box width="100%" height="100%">
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
				<Box position="absolute" top={device.isLaptop ? "45%" : "40%"} left={device.isLaptop ? "28%" : "30%"}>
					<Typography variant={device.isLaptop ? "h2" : "subtitle2"}>Settings</Typography>
				</Box>
			</Button>
		</Card>
	);
}
