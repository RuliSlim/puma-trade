import { ActionFormApi, FormApi } from "../../model/components/form";

export const reducerForm = (state: FormApi, action: ActionFormApi): FormApi => {
	switch (action.type) {
	case "email":
	case "codeReferral":
	case "password":
	case "isSubmit":
	case "username": {
		return { ...state, [action.type]: action.value };
	}
	default:
		return state;
	}
};