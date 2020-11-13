export interface CardModel {
	name: string;
	value: string;
	button: string;
}

export interface CardComponentProps {
	item: CardModel;
}