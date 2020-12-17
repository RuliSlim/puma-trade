import React from "react";
import { Box, Button, Card, CardActionArea, CardContent, CardHeader, Grid, Paper, Typography } from "@material-ui/core";
import { CardProfileProps } from "../../model/components/dashboard";
import { Circle } from "rc-progress";
import { useStyles } from "../../utils";
import { useDeviceSize } from "../../hooks/device";
import { getUser, hashLinkUrl } from "../../utils/auth";
import { UserData } from "../../model/models/user.model";
import { FileCopy, Settings } from "@material-ui/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MySnackbar from "../utils/snackbar";

export default function CardProfile(props: CardProfileProps): JSX.Element {
	const { openingModal } = props;
	const { device } = useDeviceSize();
	const classess = useStyles();
	const [ user ] = React.useState<UserData>(getUser());
	const [ copy, setCopy ] = React.useState<boolean>(false);
	const [ hashedLink, setHashLink ] = React.useState<string>("");

	const handleCopy = (): void => {
		setCopy(false);
		setCopy(true);
	};

	const handleCopyLink = (): void => {
		setCopy(false);
		setCopy(true);
	};

	const hashLink = (code: string): void => {
		const linked = hashLinkUrl(code);
		setHashLink(linked);
	}

	React.useEffect(() => {
		hashLink("refferal=" + getUser().referal_code);
	}, [])

	return(
		<Card raised className={classess.wallet} style={{flex: 1}}>
			{device.isLaptop && <CardHeader title="Profile" />}
			<CardContent style={{flex: 3}} className={device.isMobile ? classess.cardProf : undefined}>
				<Grid container direction="column" style={{ height: "100%" }} spacing={5}>
					<Grid item>
						<Typography variant="h6">username</Typography>
						<Typography variant={device.isLaptop ? "h4" : "h6"}>{user.username}</Typography>
					</Grid>
					<Grid item>
						<Typography variant="h6">email</Typography>
						<Typography variant={device.isLaptop ? "h4" : "h6"}>{user.email}</Typography>
					</Grid>
					<Grid item>
						<Typography variant="h6">Refferal Code</Typography>
						<Grid container direction="row" justify="space-between">
							<Typography variant={device.isLaptop ? "h4" : "h6"}>{user.referal_code}</Typography>
							<CopyToClipboard
								text={user.referal_code}
								onCopy={handleCopy}
							>
								<Button>
									<FileCopy />
								</Button>
							</CopyToClipboard>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction="row" justify="space-between">
							<Typography variant="h6">Link refferal</Typography>
							<CopyToClipboard
								text={`https://libra19.com/register?${hashedLink}`}
								onCopy={handleCopyLink}
							>
								<Button>
									<FileCopy />
								</Button>
							</CopyToClipboard>
						</Grid>
							<Typography variant={device.isLaptop ? "subtitle2" : "subtitle2"} noWrap={false}>{`https://libra19.com/register?${hashedLink}`}</Typography>
					</Grid>
				</Grid>
			</CardContent>
			<Button style={{flex: 1}} className={classess.percent} onClick={openingModal("profile")}>
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
					<Typography variant={device.isLaptop ? "h5" : "subtitle2"}>{
						device.isLaptop ? "Setting" : <Settings />
					}</Typography>
				</Box>
			</Button>
			<MySnackbar
				isOpen={copy}
				message="code copy to clipboard"
				onClose={(): void => setCopy(false)}
				variant="success"
			/>
		</Card>
	);
}
