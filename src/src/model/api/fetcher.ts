import { DepositModel } from "../models/transaction.model";
import { LoginModel, RegisterModel, User } from "../models/user.model";
import { Member } from "../tree_data";

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

export interface Capping {
	value_capping: number;
	persen_capping: number;
}

export interface ResponsePost {
	message: string;
	status: number;
	data: User | DepositModel | null | string | Member[] | Capping;
}

export interface WrapperApi {
	result?: WrapperGet;
	user?: WrapperGet;
	point?: WrapperGet;
	token?: WrapperGet;
	bonus?: WrapperGet;
	capping?: WrapperGet;
	tree?: WrapperGet;
	deposit?: WrapperGet;
	invest?: WrapperGet;
	convert?: WrapperGet;
}