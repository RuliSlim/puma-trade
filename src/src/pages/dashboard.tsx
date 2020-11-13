import React from "react";
import { Grid, Card, CardContent, Typography, Divider, CardActions, Button, CardActionArea } from "@material-ui/core";
import { useStyles } from "../utils/styles";

export default function Dashboard(): JSX.Element {
	const topItem = [ "Deposit", "Purchase", "Transfer", "Withdraw" ];
	const item = [ "Bonus", "Capping", "Saldo Token", "Saldo Point" ];
	const value = [ "100", "300%" ];
	const classes = useStyles();

	React.useEffect(() => {
		// console.log(props, "ini prosps");
	}, []);

	const card = (text: string, index: number, pos: string): JSX.Element => (
		<CardActionArea>
			<Card elevation={8} raised={true} className={pos === "top" ? classes.deposit :classes.cardDashboard}>
				<CardContent>
					<Grid container direction="column" spacing={10}>
						<Grid item>
							<Typography component="p" align="center">{text}</Typography>
						</Grid>
						{ pos !== "top" &&
							<Grid item>
								{index < 2 && value.map((el, i) => (
									<Typography component="p" align="center" key={el+i}>{el}</Typography>
								))}
							</Grid>
						}
					</Grid>
				</CardContent>
				{index < 2 && pos !== "top" &&
				<React.Fragment>
					<Divider />
					<CardActions>
						<Button size="small" fullWidth>Convert</Button>
					</CardActions>
				</React.Fragment>
				}
			</Card>
		</CardActionArea>
	);

	return (
		<Grid container direction="column" spacing={5}>
			<Grid item container spacing={3}>
				{topItem.map((item) => (
					<Grid item xs={12} md={3} key={item}>
						<Button size="large" fullWidth>{item}</Button>
					</Grid>
				))}
			</Grid>
			<Grid item container spacing={3}>
				{item.map((item, index) => (
					<Grid item xs={12} md={index < 3 ? 6 : 6} key={item}>
						{card(item, index, "bot")}
					</Grid>
				))}
			</Grid>
		</Grid>
	);
}