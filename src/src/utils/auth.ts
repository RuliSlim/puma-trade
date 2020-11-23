import { AES, enc, SHA256 } from "crypto-js";
import { User } from "../model/models/user.model";

const _decrypToken = (): string => {
	const key = SHA256("token").toString(enc.Hex);
	const token = localStorage.getItem(key);
	const secret = process.env.REACT_APP_SECRET!.toString();
	const unlock = AES.decrypt(token ?? "", secret).toString(enc.Utf8);
	return unlock;
};

const _encrypToken = (token: string): void => {
	const key = SHA256("token").toString(enc.Hex);
	const secret = process.env.REACT_APP_SECRET!.toString();
	const lockedToken = AES.encrypt(token, secret);
	localStorage.setItem(key, lockedToken.toString());
};

const _clearToken = (token: string) => {
	const key = SHA256("token").toString(enc.Hex);
	localStorage.removeItem(key);
};

export const getToken: () => string = (): string => {
	return _decrypToken();
};

export const saveToken = (token: string): void => {
	_encrypToken(token);
};

export const clearToken = (token: string): void => {
	_clearToken(token);
};

export const saveUser = (user: User): void => {
	const key = SHA256("user").toString(enc.Hex);
	const secret = process.env.REACT_APP_SECRET!.toString();
	const value = JSON.stringify(user);
	const lockedUser = AES.encrypt(value, secret);
	localStorage.setItem(key, lockedUser.toString());
	getUser();
};

export const getUser = () => {
	const key = SHA256("user").toString(enc.Hex);
	const user = localStorage.getItem(key);
	const secret = process.env.REACT_APP_SECRET!.toString();
	const unlock = AES.decrypt(user!, secret).toString(enc.Utf8);
	return JSON.parse(unlock);
};

export const hashLinkUrl = (url: string) => {
	const secret = process.env.REACT_APP_SECRET!.toString();
	const locked = AES.encrypt(url, secret).toString();
	return locked;
};

export const decryptLinkUrl = (locked: string) => {
	const secret = process.env.REACT_APP_SECRET!.toString();
	const unLocked = AES.decrypt(locked, secret).toString(enc.Utf8);
	return unLocked.length > 2 ? unLocked : "";
};
