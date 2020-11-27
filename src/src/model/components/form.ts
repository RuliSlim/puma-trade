export interface FormApi {
	username: string;
	email: string;
	password: string;
	codeReferral: string;
	isSubmit: string;
	nominal: number;
	invest: string;
	isError: boolean;
	message: string;
	variant: "success" | "info" | "warning" | "error";
}

export interface ActionFormApi {
	type: keyof FormApi;
	value: string | boolean;
}

export interface FormProps {
	values: FormApi;
	handleChange: (value: keyof FormApi) => (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleDeposit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleInvest: (e: React.FormEvent<HTMLFormElement>) => void;
	closingForm: (item: string) => () =>  void;
	item: string;
}