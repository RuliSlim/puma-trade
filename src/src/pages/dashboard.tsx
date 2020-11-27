import React from "react";
import { Grid, Button, Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";
import { DepositForm, InvestForm, Loading, ModalSuspense, MyModal, TransferForm, WithdrawForm } from "../components";
import { AccordianState, CardModel } from "../model/components/dashboard";
import { PagesProps } from "../model/components/pages";
import { callFetch } from "../utils/fetcher";
import { FetchApi } from "../model/api/fetcher";
import { bonusUrl, cappingUrl, pointUrl, tokenUrl } from "../lib/url";
import ApiSuspense from "../hooks/api/wrapfetcher";
import { formContext } from "../context/form.context";

interface Modal {
	withdraw: boolean;
	transfer: boolean;
	convertBonus: boolean;
	convertCapping: boolean;
}

const CardHorizontal = React.lazy(() => import("../components/card/card_horizontal"));
const CardVertical = React.lazy(() => import("../components/card/car_vertical"));

export default function Dashboard(props: PagesProps): JSX.Element {
	const { wrapFetcher } = ApiSuspense();

	const fetchApi = (): FetchApi => {
		// const user = callFetch("GET", tokenUrl);
		const point = callFetch("GET", pointUrl);
		const token = callFetch("GET", tokenUrl);
		const bonus = callFetch("GET", bonusUrl);
		const capping = callFetch("GET", cappingUrl);

		return {
			// user: wrapFetcher(user),
			point: wrapFetcher(point),
			token: wrapFetcher(token),
			bonus: wrapFetcher(bonus),
			capping: wrapFetcher(capping)
		};
	};

	const [ resource, setResource ] = React.useState(() => fetchApi());

	// deposit
	const { actions, values } = React.useContext(formContext);
	const { handleDeposit, handleChange, handleInvest } = actions;

	// component dummy
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
		setIsModal({ ...isModal, [item.toLowerCase()]: true });
	};

	// const depositForm =

	// const investForm = ;

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
								<React.Suspense fallback={<Loading thickness={30}/>}>
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
			<ModalSuspense type="deposit"/>
			<ModalSuspense type="invest"/>

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
