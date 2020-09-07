import React from "react";
import { Grid, Container, Card, CardContent, Typography, Divider, CardActions, Button } from "@material-ui/core";
import { useStyles } from "../utils/styles";

export default function Dashboard() {
	const item = ["Aktif", "Pasif", "250%", "Saldo Token", "Saldo Point"];
	const classes = useStyles();

	const card = (text, index) => (
		<Card elevation={5} raised={true} className={classes.paper}>
			<CardContent>
				<div>
					<Typography component="p">{text}</Typography>
					{index < 2 && <Typography component="p">100</Typography>}
				</div>
			</CardContent>
			<Divider />
			{index < 3 && 
				<CardActions>
					<Button size="small">Convert</Button>
				</CardActions>
			}
		</Card>
	);

	return (
		<Container className={classes.root}>
			<Grid container spacing={3}>
				{item.map((item, index) => (
					<Grid item xs={12} md={index < 3 ? 4 : 6} key={item}>
						{card(item, index)}
					</Grid>
				))}
			</Grid>
		</Container>
	);
}