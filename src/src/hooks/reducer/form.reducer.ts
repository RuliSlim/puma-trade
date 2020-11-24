import { ActionFormApi, FormApi } from "../../model/components/form";

export const reducerForm = (state: FormApi, action: ActionFormApi): FormApi => {
	console.log(state, action, "ini di reducer anjonga");
	switch (action.type) {
	case "email":
	case "codeReferral":
	case "password":
	case "username": {
		console.log("masuk sinigasadas");
		return { ...state, [action.type]: action.value };
	}
	default:
		return state;
	}
};