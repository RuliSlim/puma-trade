export interface CardModel {
	name: "Bonus" | "Capping" | "Token" | "Point";
	value: string;
	button: string;
}

export interface CardComponentProps {
	item: CardModel;
}

export interface AccordianState {
	deposit: boolean;
	invest: boolean;
}