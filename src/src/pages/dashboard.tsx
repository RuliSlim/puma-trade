import React from "react";
import { Grid, Button, Accordion, AccordionDetails, AccordionSummary, Card, CardHeader, CardContent, Typography, Box, CardActions } from "@material-ui/core";
import { CardHorizontal, CardVertical, DepositForm, InvestForm, MyModal, TransferForm, WithdrawForm } from "../components";
import { AccordianState, CardModel } from "../model/components/dashboard";
import { useDebounce } from "../hooks/debounce";
import { useHistory } from "react-router-dom";
import { PagesProps } from "../model/components/pages";

interface Modal {
	withdraw: boolean;
	transfer: boolean;
	convertBonus: boolean;
	convertCapping: boolean;
}

export default function Dashboard(props: PagesProps): JSX.Element {
	const history = useHistory();
	// const { setNow } = useDebounce();

	const topItem = [ "Deposit", "Invest" ];
	const [ isModal, setIsModal ] = React.useState<Modal>({
		convertBonus: false,
		convertCapping: false,
		transfer: false,
		withdraw: false
	});

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

	const openingModal = (item: string) => (): void => {
		console.log("masuk sini ga siiih????", item);
		setIsModal({ ...isModal, [item.toLowerCase()]: true });
	};

	React.useEffect(() => {
		const route: string = history.location.pathname.slice(1);
		// setNow(route);
	}, []);

	return (
		<Grid container direction="column" spacing={5} alignItems="center">
			<Grid item container spacing={5} xs={12}>
				{topItem.map((item) => (
					<Grid item xs={12} md={6} key={item}>
						<Accordion >
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
								<CardHorizontal item={el} openingModal={openingModal}/>
							</Grid>
						))
					}
				</Grid>
				<Grid item xs={12} md={6} container spacing={3} direction="row">
					{
						dummyBonus.map((el, i) => (
							<Grid item xs={12} lg={6} key={el.name + i}>
								<CardVertical item={el} openingModal={openingModal}/>
							</Grid>
						))
					}
				</Grid>
			</Grid>
			<MyModal
				buttons={{ cancel: "Cancel", accept: "Register" }}
				content={<WithdrawForm />}
				isOpen={isModal.withdraw}
				message={{ title: "Withdraw", message: "" }}
				onClose={(): void => setIsModal({ ...isModal, withdraw: false })}
			/>
			<MyModal
				buttons={{ cancel: "Cancel", accept: "Register" }}
				content={<TransferForm />}
				isOpen={isModal.transfer}
				message={{ title: "Transfer Point", message: "" }}
				onClose={(): void => setIsModal({ ...isModal, transfer: false })}
			/>
			{/* <MyModal
				buttons={{ cancel: "Cancel", accept: "Register" }}
				content={<WithdrawForm />}
				isOpen={isModal.withdraw}
				message={{ title: "Withdraw", message: "" }}
				onClose={(): void => setIsModal({ ...isModal, withdraw: false })}
			/>
			<MyModal
				buttons={{ cancel: "Cancel", accept: "Register" }}
				content={<WithdrawForm />}
				isOpen={isModal.withdraw}
				message={{ title: "Withdraw", message: "" }}
				onClose={(): void => setIsModal({ ...isModal, withdraw: false })}
			/> */}
		</Grid>
	);
}
