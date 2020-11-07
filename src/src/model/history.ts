export interface HistoryModel {
	id: number;
}

export interface TItleTableModel extends HistoryModel {
	date: string;
	nominal: number;
	type: string;
	total: number;
}

export interface SponsorHistoryModel extends HistoryModel {
	date: string;
	nominal: number;
	type: string;
}