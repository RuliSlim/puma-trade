import { DepositModel } from "../models/transaction.model";
import { LoginModel, RegisterModel, User } from "../models/user.model";

export interface WrapperGet {
	read(): User;
	write(): ResponsePost;
}

export interface FetchApi {
	user?: WrapperGet;
	point?: WrapperGet;
	token?: WrapperGet;
	bonus?: WrapperGet;
	capping?: WrapperGet;
}

export interface PostBody {
	body: LoginModel | RegisterModel | string;
}

export interface ResponsePost {
	message: string;
	status: number;
	data: User | DepositModel | null | string;
}

export interface WrapperApi {
	result?: WrapperGet;
	user?: WrapperGet;
	point?: WrapperGet;
	token?: WrapperGet;
	bonus?: WrapperGet;
	capping?: WrapperGet;
}