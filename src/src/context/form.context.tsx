import React from "react";
import { useHistory } from "react-router-dom";
import ApiSuspense from "../hooks/api/wrapfetcher";
import { reducerForm } from "../hooks/reducer/form.reducer";
import { loginUrl } from "../lib/url";
import { ResponsePost, WrapperApi, WrapperGet } from "../model/api/fetcher";
import { ActionFormApi, FormApi } from "../model/components/form";
import { LoginModel, User } from "../model/models/user.model";
import { getToken, saveToken, saveUser } from "../utils/auth";
import { callFetch } from "../utils/fetcher";

interface FormProviderProps {
	children: JSX.Element;
}

interface FormData {
	values: FormApi;
	token: string;
	resource: undefined | WrapperApi;
	actions: {
		handleLogin: () => void;
		handleChange: (value: keyof FormApi) => (e: React.ChangeEvent<HTMLInputElement>) => void;
	};
}

const initialData: FormApi = {
	codeReferral: "",
	email: "",
	isSubmit: "",
	password: "",
	username: ""
};

export const formContext = React.createContext<FormData>({
	values: initialData,
	token: "",
	resource: undefined,
	actions: {
		handleLogin: (): void => undefined,
		handleChange: () => (): void => undefined,
	},
});

export const FormProvider = (props: FormProviderProps): JSX.Element => {
	const { children } = props;

	const [ values, dispatchValue ] = React.useReducer<(state: FormApi, action: ActionFormApi) => FormApi>(reducerForm, initialData);
	const [ resource, setResource ] = React.useState<undefined | WrapperApi>();
	const [ token, setToken ] = React.useState<string>("");

	const history = useHistory();

	// const { wrapFetcher } = ApiSuspense();

	React.useEffect(() => {
		// const
	}, []);

	const handleChange = (value: keyof FormApi) => (e: React.ChangeEvent<HTMLInputElement>): void => {
		const key = value as keyof FormApi;
		dispatchValue({ type: key, value: e.target.value });
	};

	const _saveToken = (resource: WrapperApi) => {
		console.log(resource.result.write().data, "<<<<<<<<<DSAD");

	};

	const wrapFetcher = (promise: Promise<Response>): WrapperGet => {
		let status = "pending";
		let result: {};
		const suspender = promise.then(
			r => {
				console.log(r, "Ini di reEEEe<<<<<<<<<");
				// if (r.ok) {
				r.json().then(
					d => {
						console.log(d, "ini di sucksead");
						status = "success";
						result = d;
					},
					e => {
						console.log(e, "ini di e json,");
						status = "error";
						result = e;
					}
				);
				// } else {
				// 	throw new Error("ada tang gagaal");
				// }
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
					if ((result as ResponsePost).data !== null) {
						if ((result as ResponsePost).data.token !== null) {
							const { token, ...rest } = (result as ResponsePost).data;
							if (token !== undefined) {
								saveToken(token);
								saveUser(rest);
								setToken("trueee");
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
		setResource({ result: wrapFetcher(fetcher) });
		dispatchValue({ type: "isSubmit", value: "login" });
	};

	return(
		<formContext.Provider
			value={{
				values,
				resource,
				token,
				actions: {
					handleLogin,
					handleChange,
				}
			}}
		>
			{children}
		</formContext.Provider>
	);
};