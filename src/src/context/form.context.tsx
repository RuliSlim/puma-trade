/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { reducerForm } from "../hooks/reducer/form.reducer";
import { bonusUrl, cappingUrl, convertUrl, depositUrl, investUrl, loginUrl, logoutUrl, pointUrl, registerUrl, tokenUrl, transferUrl, treeUrl } from "../lib/url";
import { ResponsePost, WrapperApi, WrapperGet } from "../model/api/fetcher";
import { ActionFormApi, FormApi } from "../model/components/form";
import { LoginModel, RegisterInsideModel, RegisterModel, User } from "../model/models/user.model";
import { clearToken, getUser, saveToken, saveUser } from "../utils/auth";
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
		handleLogout: () => void;
		handleRegister: () => void;
		handleInside: (node: RegisterInsideModel) => void;
		handleChange: (value: keyof FormApi) => (e: React.ChangeEvent<HTMLInputElement>) => void;
		handleDeposit: (e: React.FormEvent<HTMLFormElement>) => void;
		handleInvest: (e: React.FormEvent<HTMLFormElement>) => void;
		handlingError: (message: string) => void;
		handlingConvert: () =>  void;
		handleResetAgree: () => void;
		handlingTransfer: () => void;
		fetchingData: (type: string) => void;
		clearPostResource: () => void;
	};
}

const initialData: FormApi = {
	codeReferral: "",
	email: "",
	isSubmit: "",
	password: "",
	password2: "",
	username: "",
	nominal: 35,
	isError: false,
	invest: "50",
	message: "",
	variant: "warning",
	agree: false,
	convert: "",
	point: "",
	receiver: "",
};

export const formContext = React.createContext<FormData>({
	values: initialData,
	token: "",
	resource: undefined,
	postResource: undefined,
	actions: {
		handleLogin: (): void => undefined,
		handleLogout: (): void => undefined,
		handleRegister: (): void => undefined,
		handleInside: (): void => undefined,
		handleChange: () => (): void => undefined,
		handleDeposit: (): void => undefined,
		handleInvest: (): void => undefined,
		handlingError: (): void => undefined,
		handleResetAgree: (): void => undefined,
		handlingConvert: (): void => undefined,
		handlingTransfer: (): void => undefined,
		fetchingData: (): void => undefined,
		clearPostResource: (): void => undefined
	},
});

export const FormProvider = (props: FormProviderProps): JSX.Element => {
	const { children } = props;

	const [ values, dispatchValue ] = React.useReducer<(state: FormApi, action: ActionFormApi) => FormApi>(reducerForm, initialData);
	const [ resource, setResource ] = React.useState<undefined | WrapperApi>();
	const [ postResource, setPostResource ] = React.useState<undefined | WrapperApi>();
	const [ token, setToken ] = React.useState<string>("");

	const handleResetAgree = (): void => {
		dispatchValue({ type: "agree", value: false });
	};

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

		if (value === "agree") {
			dispatchValue({ type: "agree", value: !values.agree });
			console.log("masuk sini ga siiih?????????<D<SAD<?SADSA");
		}
	};

	const handlingError = (message: string): void => {
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

	const _clearGetResource = (): void => {
		setResource(undefined);
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
					// clearPostResource();
					return result as ResponsePost;
				}
			}
		};
	};

	const handleLogin = (): void => {
		// clearPostResource();
		handleResetAgree();
		const data: LoginModel = {
			username: values.username.toUpperCase(),
			password: values.password
		};

		const fetcher = callFetch("POST", loginUrl, data);
		setPostResource({ result: wrapFetcher(fetcher, "login") });
		dispatchValue({ type: "isSubmit", value: "login" });
		dispatchValue({ type: "username", value: "" });
		dispatchValue({ type: "password", value: "" });
	};

	const handleRegister = (): void => {
		clearPostResource();
		handleResetAgree();
		const data: RegisterModel = {
			email: values.email,
			password: values.password,
			referal_code: values.codeReferral,
			username: values.username.toUpperCase()
		};

		const fetcher = callFetch("POST", registerUrl, data);
		setPostResource({ result: wrapFetcher(fetcher, "register") });
		dispatchValue({ type: "isSubmit", value: "register" });
		dispatchValue({ type: "username", value: "" });
		dispatchValue({ type: "password", value: "" });
		dispatchValue({ type: "password2", value: "" });
		dispatchValue({ type: "email", value: "" });
		dispatchValue({ type: "codeReferral", value: "" });
	};

	const handleInside = (node: RegisterInsideModel): void => {
		// name: "register here"
		// parent:
		// attributes:
		// omset: 0
		// position: "1"
		console.log(node, "<<<<<<<DSADS");
		clearPostResource();
		const data = {
			username: values.username,
			email: values.email,
			password: values.password,
			// password2: values.password2,
			code_referal: values.codeReferral,
			position: node.position,
			parent: node.parent.name
		};

		const fetcher = callFetch("POST", registerUrl, data);
		setPostResource({ result: wrapFetcher(fetcher, "inside") });
	};

	const handleLogout = (): void => {
		clearPostResource();
		_clearGetResource();
		handleResetAgree();
		setToken("safasfasfa");
		const user = getUser();
		const data = {
			username: user.username
		};

		const fetcher = callFetch("POST", logoutUrl, data);
		setPostResource({ result: wrapFetcher(fetcher, "logout") });

		dispatchValue({ type: "isError", value: true });
		dispatchValue({ type: "message", value: "success log out!" });
		clearToken();
		setTimeout(() => {
			dispatchValue({ type: "isError", value: false });
		}, 5000);
	};

	const handleDeposit = (e: React.FormEvent<HTMLFormElement>): void => {
		clearPostResource();
		handleResetAgree();
		e.preventDefault();
		const data: {jumlah: number} = {
			jumlah: values.nominal
		};

		const fetcher = callFetch("POST", depositUrl, data);
		setPostResource({ result: wrapFetcher(fetcher, "deposit") });
	};

	const handleInvest = (e: React.FormEvent<HTMLFormElement>): void => {
		clearPostResource();
		handleResetAgree();
		e.preventDefault();
		const data: {nominal: string} = {
			nominal: values.invest
		};

		const fetcher = callFetch("POST", investUrl, data);
		setPostResource({ result: wrapFetcher(fetcher, "invest") });
	};

	const handlingConvert = (): void => {
		clearPostResource();
		handleResetAgree();
		const data: {nominal: string} = {
			nominal: values.convert
		};

		const fetcher = callFetch("POST", convertUrl, data);
		setPostResource({ result: wrapFetcher(fetcher, "convert") });
	};

	const handlingTransfer = (): void => {
		clearPostResource();
		handleResetAgree();
		const data: {receiver: string; poin: string} = {
			receiver: values.receiver,
			poin: values.point
		};

		const fetcher = callFetch("POST", transferUrl, data);
		setPostResource({ result: wrapFetcher(fetcher, "transfer") });
	};

	const fetchingData = (type: string): void => {
		// const fetcher = callFetch("GET", url);
		// setResource({ result: wrapFetcher(fetcher, type) });
		if (type === "dashboard") {
			const point = callFetch("GET", pointUrl);
			const token = callFetch("GET", tokenUrl);
			const bonus = callFetch("GET", bonusUrl);
			const capping = callFetch("GET", cappingUrl);
			// const trees = callFetch("GET", treeUrl);
			setResource({
				point: wrapFetcher(point, "point"),
				capping: wrapFetcher(capping, "capping"),
				token: wrapFetcher(token, "token"),
				bonus: wrapFetcher(bonus, "bonus"),
				// tree: wrapFetcher(trees, "tree")
			});
		} else if (type === "trees") {
			console.log("ANJING KENAPA GA KE CALL LAGI BANGSAAAAT!!!");
			const user = getUser().username;
			const trees = callFetch("GET", treeUrl + user + "/");
			setResource({
				tree: wrapFetcher(trees, "tree")
			});
		} else {
			const trees = callFetch("GET", treeUrl + type + "/");
			setResource({
				tree: wrapFetcher(trees, "tree")
			});
			console.log(type, "masuk siniiii");
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
					handleLogout,
					handleRegister,
					handleInside,
					handleChange,
					handleDeposit,
					handleInvest,
					handlingError,
					handlingConvert,
					handlingTransfer,
					handleResetAgree,
					fetchingData,
					clearPostResource
				}
			}}
		>
			{children}
		</formContext.Provider>
	);
};