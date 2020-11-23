// import { CountryModel } from "../models/models/country.model";
// import { UserInput } from "../models/input.state";
// import { fetcher } from "./fetcher";
// import { emailVerify, numVerify } from "../lib/urls";

// export const validation = async (type: keyof UserInput, value: string | boolean | CountryModel) => {
// 	let isError = false;
// 	const pattern = /^(?:(?=.*?[A-Z])(?:(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=])|(?=.*?[a-z])(?:(?=.*?[0-9])|(?=.*?[-!@#$%^&*()_[\]{},.<>+=])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=]))[A-Za-z0-9!@#$%^&*()_[\]{},.<>+=-]{8,20}$/;
// 	const mimumValueAndNum = /^\b((?:1[0-90-9]\d|[1-9]\d{2,}?|10000))\b/;

// 	switch (type) {
// 	case "name":
// 		isError = String(value).length < 4;
// 		break;
// 	case "phone": {
// 		const respone = await fetcher("GET", numVerify, value);
// 		if (respone.status === 403) {
// 			isError = false;
// 			return;
// 		}
// 		const result: {isValid: boolean} = await respone.json();
// 		isError = !result.isValid;
// 		break;
// 	}
// 	case "email": {
// 		const response = await fetcher("GET", emailVerify, value);

// 		if (response.status === 403) {
// 			isError = false;
// 			return;
// 		}

// 		if (response.status === 400) {
// 			isError = true;
// 			return;
// 		}
// 		const result: {isValid: boolean} = await response.json();

// 		isError = !result.isValid;
// 		break;
// 	}
// 	case "password":
// 		isError = !pattern.test(value.toString());
// 		break;
// 	case "amount purchase":
// 		isError = !mimumValueAndNum.test(value.toString());
// 	}
// 	return isError;
// 	// return false;
// };

export const bulshit = "bulshit";