export interface FormApi {
	username: string;
	email: string;
	password: string;
	codeReferral: string;
	isSubmit: string;
}

export interface ActionFormApi {
	type: keyof FormApi;
	value: string;
}