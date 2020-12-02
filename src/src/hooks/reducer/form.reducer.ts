import { ActionFormApi, FormApi } from "../../model/components/form";

export const reducerForm = (state: FormApi, action: ActionFormApi): FormApi => {
	switch (action.type) {
	case "email":
	case "codeReferral":
	case "oldPassword":
	case "password":
	case "password2":
	case "isSubmit":
	case "nominal":
	case "isError":
	case "message":
	case "variant":
	case "invest":
	case "agree":
	case "convert":
	case "receiver":
	case "point":
	case "username": {
		return { ...state, [action.type]: action.value };
	}
	default:
		return state;
	}
};