/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { AES, enc, SHA256 } from "crypto-js";
import { User } from "../model/models/user.model";

const _decrypUser = (): User => {
	const key = SHA256("userData").toString(enc.Hex);
	const token = localStorage.getItem(key);
	const secret = process.env.REACT_APP_SECRET!.toString();
	const unlock = AES.decrypt(token ?? "", secret).toString(enc.Utf8);
	return JSON.parse(unlock);
};

const _encrypUser = (user: User): void => {
	const key = SHA256("userData").toString(enc.Hex);
	const secret = process.env.REACT_APP_SECRET!.toString();
	const lockedToken = AES.encrypt(JSON.stringify(user), secret);
	localStorage.setItem(key, lockedToken.toString());
};

export const getToken: () => User = (): User => {
	return _decrypUser();
};

export const saveToken = (user: User): void => {
	_encrypUser(user);
};