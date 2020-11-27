/* eslint-disable no-useless-escape */
import { FormApi } from "../model/components/form";

export const validation = async (type: keyof FormApi, value: string | boolean): Promise<boolean> => {
	let isError = false;
	const pattern = /^(?:(?=.*?[A-Z])(?:(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=])|(?=.*?[a-z])(?:(?=.*?[0-9])|(?=.*?[-!@#$%^&*()_[\]{},.<>+=])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=]))[A-Za-z0-9!@#$%^&*()_[\]{},.<>+=-]{8,20}$/;
	const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	const mimumValueAndNum = /^\b((?:3[5-9]|[4-9][0-9]|[1-9]\d{2,}?|10000))\b/;

	switch (type) {
	case "email": {
		const response = re.test(String(value).toLowerCase());

		console.log(response, "EMAIL VALIDATION<<<<");
		// isError = !result.isValid;
		break;
	}
	case "password":
		isError = !pattern.test(value.toString());
		break;
	case "nominal":
		isError = !mimumValueAndNum.test(value.toString());
	}
	return isError;
	// return false;
};

export const bulshit = "bulshit";