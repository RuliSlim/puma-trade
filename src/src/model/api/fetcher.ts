import { LoginModel, RegisterModel, User } from "../models/user.model";

export interface WrapperGet {
	read(): User;
	write(): ResponsePost;
}

export interface FetchApi {
	user: WrapperGet;
}

export interface PostBody {
	body: LoginModel | RegisterModel | string;
}

export interface ResponsePost {
	message: string;
	username: string;
}

export interface WrapperApi {
	result: WrapperGet;
}