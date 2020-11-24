export interface User {
	token?: string;
	name: string;
	email: string;
	phone: string;
	created: string;
	referal_code: string;
	referal_by: string;
}

export interface LoginModel {
	username: string;
	password: string;
}

export interface RegisterModel {
	email: string;
	password: string;
	referal_code: string;
}