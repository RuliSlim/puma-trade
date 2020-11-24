import React from "react";
import { reducerForm } from "../hooks/reducer/form.reducer";
import { loginUrl } from "../lib/url";
import { WrapperApi } from "../model/api/fetcher";
import { ActionFormApi, FormApi } from "../model/components/form";
import { LoginModel } from "../model/models/user.model";
import { callFetch, wrapFetccher } from "../utils/fetcher";

interface FormProviderProps {
	children: JSX.Element;
}

interface FormData {
	values: FormApi;
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

	React.useEffect(() => {
		// const
	}, []);

	const handleChange = (value: keyof FormApi) => (e: React.ChangeEvent<HTMLInputElement>): void => {
		const key = value as keyof FormApi;
		dispatchValue({ type: key, value: e.target.value });
	};

	const handleLogin = (): void => {
		dispatchValue({ type: "isSubmit", value: "s" });

		const data: LoginModel = {
			username: values.username,
			password: values.password
		};

		const fetcher = callFetch("POST", loginUrl, data);
		setResource({ result: wrapFetccher(fetcher) });
	};

	return(
		<formContext.Provider
			value={{
				values,
				resource,
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