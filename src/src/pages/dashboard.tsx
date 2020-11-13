import React from "react";
import { Grid, Card, CardContent, Typography, Divider, CardActions, Button, CardActionArea } from "@material-ui/core";
import { useStyles } from "../utils/styles";
import { CardDashboard } from "../components";
import { CardModel } from "../model/components/dashboard";

export default function Dashboard(): JSX.Element {
	const topItem = [ "Deposit", "Withdraw" ];
	const dummy: CardModel[] = [
		{
			name: "Bonus",
			value: "100",
			button: "Convert"
		},
		{
			name: "Capping",
			value: "3000%",
			button: "Convert"
		},
		{
			name: "Token",
			value: "70",
			button: "Withdraw"
		},
		{
			name: "Poin",
			value: "30",
			button: "Transfer"
		},
	];

	React.useEffect(() => {
		// console.log(props, "ini prosps");
	}, []);

	return (
		<Grid container direction="column" spacing={10}>
			<Grid item container spacing={3}>
				{topItem.map((item) => (
					<Grid item xs={12} md={6} key={item}>
						<Button size="large" fullWidth>{item}</Button>
					</Grid>
				))}
			</Grid>
			<Grid item container spacing={3} direction="row">
				{
					dummy.map((el, i) => (
						<Grid item key={el.name + i} lg={6}>
							<CardDashboard item={el}/>
						</Grid>
					))
				}
			</Grid>
		</Grid>
	);
}
