import React from "react";
import { loginUrl } from "../lib/url";
import { WrapperApi } from "../model/api/fetcher";
import { FormApi } from "../model/components/form";
import { LoginModel } from "../model/models/user.model";
import { callFetch, wrapFetccher } from "../utils/fetcher";
import { reducerForm } from "./reducer/form.reducer";

interface HooksApiInterface {
	handleChange: (value: keyof FormApi) => (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleLogin: () => void;
	postResource: WrapperApi | null;
	values: FormApi;
}

export default function UseFormApi(): HooksApiInterface {
	const [ values, dispatchValue ] = React.useReducer(reducerForm, {
		codeReferral: "",
		email: "",
		password: "",
		username: "",
		isSubmit: ""
	});

	const [ postResource, setPostResource ] = React.useState<WrapperApi | null>(null);

	const handleChange = (value: keyof FormApi) => (e: React.ChangeEvent<HTMLInputElement>): void => {
		const key = value as keyof FormApi;
		dispatchValue({ type: key, value: e.target.value });
	};

	const handleLogin = (): void => {
		const data: LoginModel = {
			username: values.username,
			password: values.password
		};

		const fetcher = callFetch("POST", loginUrl, data);
		setPostResource({ result: wrapFetccher(fetcher) });
	};

	return { handleChange, handleLogin, postResource, values };
}