import React from "react";
import { Grid, Button, Accordion, AccordionDetails, AccordionSummary, Card, CardHeader, CardContent, Typography, Box, CardActions } from "@material-ui/core";
import { CardHorizontal, CardVertical, DepositForm, InvestForm } from "../components";
import { AccordianState, CardModel } from "../model/components/dashboard";

export default function Dashboard(): JSX.Element {
	const topItem = [ "Deposit", "Invest" ];
	const dummy: CardModel[] = [
		{
			name: "Token",
			value: "70",
			button: "Withdraw"
		},
		{
			name: "Point",
			value: "30",
			button: "Transfer"
		},
	];

	const dummyBonus: CardModel[] = [
		{
			name: "Bonus",
			value: "100",
			button: "Convert"
		},
		{
			name: "Capping",
			value: "250",
			button: "Convert"
		},
	];

	const [ collapse, setCollapse ] = React.useState<AccordianState>({
		deposit: false,
		invest: false
	});

	const openingForm = (item: string) => (): void => {
		const data = item.toLowerCase() as keyof AccordianState;
		setCollapse({ ...collapse, [item]: !collapse[data] });
	};

	React.useEffect(() => {
		// console.log(props, "ini prosps");
	}, []);

	return (
		<Grid container direction="column" spacing={5} alignItems="center">
			<Grid item container spacing={5} xs={12}>
				{topItem.map((item) => (
					<Grid item xs={12} md={6} key={item}>
						<Accordion>
							<AccordionSummary>
								<Button size="large" fullWidth variant="contained" onClick={openingForm(item)}>{item}</Button>
							</AccordionSummary>
							<AccordionDetails>
								{item === "Deposit" ? <DepositForm /> : <InvestForm /> }
							</AccordionDetails>
						</Accordion>
					</Grid>
				))}
			</Grid>
			<Grid item container  xs={12} justify="space-around" spacing={5}>
				<Grid item xs={12} md={6} container spacing={3} direction="row">
					{
						dummy.map((el, i) => (
							<Grid item key={el.name + i} xs={12}>
								<CardHorizontal item={el}/>
							</Grid>
						))
					}
				</Grid>
				<Grid item xs={12} md={6} container spacing={3} direction="row">
					{
						dummyBonus.map((el, i) => (
							<Grid item xs={12} lg={6} key={el.name + i}>
								<CardVertical item={el} />
							</Grid>
						))
					}
				</Grid>
			</Grid>
		</Grid>
	);
}
