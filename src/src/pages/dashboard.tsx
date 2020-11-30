import React from "react";
import { Grid, Button, Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";
import { Loading } from "../components";
import { AccordianState, CardModel } from "../model/components/dashboard";
import { formContext } from "../context/form.context";

interface Modal {
	withdraw: boolean;
	transfer: boolean;
	convertbonus: boolean;
	convertcapping: boolean;
}

// components
const CardHorizontal = React.lazy(() => import("../components/card/card_horizontal"));
const CardVertical = React.lazy(() => import("../components/card/car_vertical"));
// forms
const ConverForm = React.lazy(() => import("../components/forms/convert"));
const DepositForm = React.lazy(() => import("../components/forms/deposit"));
const InvestForm = React.lazy(() => import("../components/forms/invest"));
const TransferForm = React.lazy(() => import("../components/forms/transfer"));
const WithdrawForm = React.lazy(() => import("../components/forms/withdraw"));
// modal suspense
const ModalSuspense = React.lazy(() => import("../components/modal/modal_suspense"));
// utils regular
const MyModal = React.lazy(() => import("../components/modal/modal"));

export default function Dashboard(): JSX.Element {
	// deposit
	const { actions, values, resource, postResource } = React.useContext(formContext);
	const { handleDeposit, handleChange, handleInvest, fetchingData, clearPostResource } = actions;

	React.useEffect(() => {
		clearPostResource();
	}, []);

	React.useEffect(() => {
		fetchingData("dashboard");
	}, [ postResource ]);

	// component dummy
	const topItem = [ "Deposit", "Invest" ];
	const [ isModal, setIsModal ] = React.useState<Modal>({
		convertbonus: false,
		convertcapping: false,
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
		setIsModal({ ...isModal, [item.toLowerCase()]: true });
	};

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
								<React.Suspense fallback={<Loading thickness={30} />}>
									{item === "Deposit" ?
										<DepositForm
											handleChange={handleChange}
											handleDeposit={handleDeposit}
											values={values}
											handleInvest={handleInvest}
											closingForm={openingForm}
											item={item}
										/>
										:
										<InvestForm
											handleChange={handleChange}
											handleDeposit={handleDeposit}
											values={values}
											handleInvest={handleInvest}
											closingForm={openingForm}
											item={item}
										/>
									}
								</React.Suspense>
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
								<CardHorizontal item={el} openingModal={openingModal} resource={resource} />
							</Grid>
						))
					}
				</Grid>
				<Grid item xs={12} md={6} container spacing={3} direction="row">
					{
						dummyBonus.map((el, i) => (
							<Grid item xs={12} lg={6} key={el.name + i}>
								<CardVertical item={el} openingModal={openingModal} resource={resource}/>
							</Grid>
						))
					}
				</Grid>
			</Grid>
			<MyModal
				buttons={{ cancel: "Cancel", accept: "Withdraw" }}
				content={<WithdrawForm />}
				isOpen={isModal.withdraw}
				message={{ title: "Withdraw", message: "" }}
				onClose={(): void => setIsModal({ ...isModal, withdraw: false })}
			/>
			<MyModal
				buttons={{ cancel: "Cancel", accept: "Transfer" }}
				content={<TransferForm />}
				isOpen={isModal.transfer}
				message={{ title: "Transfer Point", message: "" }}
				onClose={(): void => setIsModal({ ...isModal, transfer: false })}
			/>
			<MyModal
				buttons={{ cancel: "Cancel", accept: "Convert" }}
				content={<ConverForm />}
				isOpen={isModal.convertbonus}
				message={{ title: "Convert Bonus", message: "" }}
				onClose={(): void => setIsModal({ ...isModal, convertbonus: false })}
			/>
			<MyModal
				buttons={{ cancel: "Cancel", accept: "Convert" }}
				content={<ConverForm />}
				isOpen={isModal.convertcapping}
				message={{ title: "Convert Bonus", message: "" }}
				onClose={(): void => setIsModal({ ...isModal, convertcapping: false })}
			/>
			<ModalSuspense type="deposit"/>
			<ModalSuspense type="invest"/>
			<ModalSuspense type="convert"/>
		</Grid>
	);
}
