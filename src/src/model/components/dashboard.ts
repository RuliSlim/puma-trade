export interface CardModel {
	name: "Bonus" | "Capping" | "Token" | "Point";
	value: string;
	button: string;
}

export interface CardComponentProps {
	item: CardModel;
	openingModal: (item: string) => () => void;
}

export interface AccordianState {
	deposit: boolean;
	invest: boolean;
}