import { loginUrl, registerUrl } from "../lib/url";
import { getToken } from "./auth";

export const fetcher = async (type: string, url: string, data?: {} | string) => {
	const token: string = getToken();
	// let option;

	// if (url !== countryURL && url !== numVerify) {
	const option = {
		"Content-Type": "application/json",
		...((url !== loginUrl && url !== registerUrl) && { Authorization: `Token ${token}` })
	};
	// }

	// if (url === numVerify || url === emailVerify) {
	// 	url += data;
	// }

	const response: Response = await fetch(url, {
		method: type,
		headers: option,
		// ... url.includes("numvalidate") && { mode: "no-cors" },
		...type !== "GET" && { body: JSON.stringify(data) },
	});

	return response;
};