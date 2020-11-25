/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-undef */
import { AES, enc, SHA256 } from "crypto-js";
import { User, UserData } from "../model/models/user.model";

const _decrypToken = (): string => {
	const key = SHA256("token").toString(enc.Hex);
	const token = localStorage.getItem(key);
	const secret = process.env.REACT_APP_SECRET!.toString();
	const unlock = AES.decrypt(token ?? "", secret).toString(enc.Utf8);
	console.log(unlock, "<<<<<<CSAAS");
	return unlock;
};

const _encrypToken = (token: string): void => {
	const key = SHA256("token").toString(enc.Hex);
	const secret = process.env.REACT_APP_SECRET!.toString();
	const lockedToken = AES.encrypt(token, secret);
	localStorage.setItem(key, lockedToken.toString());
};

const _clearToken = (): void => {
	const key = SHA256("token").toString(enc.Hex);
	localStorage.removeItem(key);
};

export const getToken: () => string = (): string => {
	return _decrypToken();
};

export const saveToken = (token: string): void => {
	_encrypToken(token);
};

export const clearToken = (): void => {
	_clearToken();
};

export const getUser = (): UserData => {
	const key = SHA256("user").toString(enc.Hex);
	const user = localStorage.getItem(key);
	const secret = process.env.REACT_APP_SECRET!.toString();
	const unlock = AES.decrypt(user!, secret).toString(enc.Utf8);
	return JSON.parse(unlock);
};

export const saveUser = (user: UserData): void => {
	const key = SHA256("user").toString(enc.Hex);
	const secret = process.env.REACT_APP_SECRET!.toString();
	const value = JSON.stringify(user);
	const lockedUser = AES.encrypt(value, secret);
	localStorage.setItem(key, lockedUser.toString());
	getUser();
};

export const hashLinkUrl = (url: string): string => {
	const secret = process.env.REACT_APP_SECRET!.toString();
	const locked = AES.encrypt(url, secret).toString();
	return locked;
};

export const decryptLinkUrl = (locked: string): string => {
	const secret = process.env.REACT_APP_SECRET!.toString();
	const unLocked = AES.decrypt(locked, secret).toString(enc.Utf8);
	return unLocked.length > 2 ? unLocked : "";
};
