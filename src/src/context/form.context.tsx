import React from "react";
import { reducerForm } from "../hooks/reducer/form.reducer";
import { bonusUrl, cappingUrl, depositUrl, investUrl, loginUrl, pointUrl, tokenUrl } from "../lib/url";
import { ResponsePost, WrapperApi, WrapperGet } from "../model/api/fetcher";
import { ActionFormApi, FormApi } from "../model/components/form";
import { LoginModel, User } from "../model/models/user.model";
import { saveToken, saveUser } from "../utils/auth";
import { callFetch } from "../utils/fetcher";
import { validation } from "../utils/validation";

interface FormProviderProps {
	children: JSX.Element;
}

interface FormData {
	values: FormApi;
	token: string;
	resource: undefined | WrapperApi;
	postResource: undefined | WrapperApi;
	actions: {
		handleLogin: () => void;
		handleChange: (value: keyof FormApi) => (e: React.ChangeEvent<HTMLInputElement>) => void;
		handleDeposit: (e: React.FormEvent<HTMLFormElement>) => void;
		handleInvest: (e: React.FormEvent<HTMLFormElement>) => void;
		handlingError: (message: string) => void;
		fetchingData: (type: string) => void;
		clearPostResource: () => void;
	};
}

const initialData: FormApi = {
	codeReferral: "",
	email: "",
	isSubmit: "",
	password: "",
	username: "",
	nominal: 35,
	isError: false,
	invest: "50",
	message: "",
	variant: "warning",
};

export const formContext = React.createContext<FormData>({
	values: initialData,
	token: "",
	resource: undefined,
	postResource: undefined,
	actions: {
		handleLogin: (): void => undefined,
		handleChange: () => (): void => undefined,
		handleDeposit: (e: React.FormEvent<HTMLFormElement>): void => undefined,
		handleInvest: (e: React.FormEvent<HTMLFormElement>): void => undefined,
		handlingError: (message: string): void => undefined,
		fetchingData: (type: string) => undefined,
		clearPostResource: (): void => undefined
	},
});

export const FormProvider = (props: FormProviderProps): JSX.Element => {
	const { children } = props;

	const [ values, dispatchValue ] = React.useReducer<(state: FormApi, action: ActionFormApi) => FormApi>(reducerForm, initialData);
	const [ resource, setResource ] = React.useState<undefined | WrapperApi>();
	const [ postResource, setPostResource ] = React.useState<undefined | WrapperApi>();
	const [ token, setToken ] = React.useState<string>("");

	const handleChange = (value: keyof FormApi) => async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		const key = value as keyof FormApi;
		dispatchValue({ type: key, value: e.target.value });
		if (value === "nominal") {
			const isError = await validation("nominal", e.target.value);
			dispatchValue({ type: "isError", value: isError });
			if (isError) {
				dispatchValue({ type: "message", value: "input must be greateer than 35 and in number!" });
				dispatchValue({ type: "variant", value: "error" });
			}
		}
	};

	const handlingError = (message: string) => {
		dispatchValue({ type: "isError", value: true });
		dispatchValue({ type: "message", value: message });

		setTimeout(() => {
			dispatchValue({ type: "isError", value: false });
		}, 5000);
	};

	const clearPostResource = (): void => {
		console.log("<<<<<<<<<<<<<D>>>>>>>>>>>>>");
		setPostResource(undefined);
	};

	const wrapFetcher = (promise: Promise<Response>, type: string): WrapperGet => {
		let status = "pending";
		let result: void | Response | User | ResponsePost;
		const suspender = promise.then(
			r => {
				console.log(r, "Ini di reEEEe<<<<<<<<<");
				r.json().then(
					d => {
						console.log(d, "ini di sucksead");
						if (!r.ok){
							handlingError(d.message);
						}
						status = "success";
						result = d;
					},
					e => {
						console.log(e, "ini di e json,");
						status = "error";
						result = e;
					}
				);
			},
			e => {
				console.log(e, "ini di ea sebleum json");
				status = "error";
				result = e;
			}
		);

		return {
			read(): User {
				if (status === "pending") {
					throw suspender;
				} else if (status === "error") {
					throw result;
				} else {
					console.log("<<object>>");
					return result as User;
				}
			},
			write(): ResponsePost {
				if (status === "pending") {
					console.log("di pending");
					throw suspender;
				} else if (status === "error") {
					console.log("di errorrr");
					throw result;
				} else {
					console.log("di elseee");
					if (type === "login" || type === "register") {
						if ((result as ResponsePost).data !== null) {
							if (((result as ResponsePost).data as User).token !== null) {
								const { token, ...rest } = (result as ResponsePost).data as User;
								if (token !== undefined) {
									saveToken(token);
									saveUser(rest);
									setToken("trueee");
								}
							}
						}
					}
					return result as ResponsePost;
				}
			}
		};
	};

	const handleLogin = (): void => {
		const data: LoginModel = {
			username: values.username,
			password: values.password
		};

		const fetcher = callFetch("POST", loginUrl, data);
		setPostResource({ result: wrapFetcher(fetcher, "login") });
		dispatchValue({ type: "isSubmit", value: "login" });
	};

	const handleDeposit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const data: {jumlah: number} = {
			jumlah: values.nominal
		};

		const fetcher = callFetch("POST", depositUrl, data);
		setPostResource({ result: wrapFetcher(fetcher, "deposit") });
	};

	const handleInvest = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const data: {nominal: string} = {
			nominal: values.invest
		};

		const fetcher = callFetch("POST", investUrl, data);
		setPostResource({ result: wrapFetcher(fetcher, "invest") });
	};

	const fetchingData = (type: string) => {
		// const fetcher = callFetch("GET", url);
		// setResource({ result: wrapFetcher(fetcher, type) });
		if (type === "dashboard") {
			const point = callFetch("GET", pointUrl);
			const token = callFetch("GET", tokenUrl);
			const bonus = callFetch("GET", bonusUrl);
			const capping = callFetch("GET", cappingUrl);
			setResource({
				point: wrapFetcher(point, "point"),
				capping: wrapFetcher(capping, "capping"),
				token: wrapFetcher(token, "token"),
				bonus: wrapFetcher(bonus, "bonus"),
			});
		}
	};

	return(
		<formContext.Provider
			value={{
				values,
				resource,
				postResource,
				token,
				actions: {
					handleLogin,
					handleChange,
					handleDeposit,
					handleInvest,
					handlingError,
					fetchingData,
					clearPostResource
				}
			}}
		>
			{children}
		</formContext.Provider>
	);
};