import { loginUrl, registerUrl } from "../lib/url";
import { FetchApi, PostBody, ResponsePost, WrapperGet } from "../model/api/fetcher";
import { User } from "../model/models/user.model";
import { getToken } from "./auth";

export const callFetch = async (type: string, url: string, data?: {} | string): Promise<Response> => {
	// const token: string = getToken();
	// let option;
	console.log(data, "<<<<INI DATA DI FETCHER");

	// if (url !== countryURL && url !== numVerify) {
	const option = {
		"Content-Type": "application/json",
		// ...((url !== loginUrl && url !== registerUrl) && { Authorization: `Token ${token}` })
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

export const wrapFetccher = (promise: Promise<Response>): WrapperGet => {
	let status = "pending";
	let result: {};
	const suspender = promise.then(
		r => {
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
				console.log("masuk sini dulu");
				throw suspender;
			} else if (status === "error") {
				console.log("masuk error");
				throw result;
			} else {
				console.log("berahsil");
				return result as ResponsePost;
			}
		}
	};
};

export function fetchApi(): FetchApi {
	const user = callFetch("GET", "https://jsonplaceholder.typicode.com/posts");
	// const login = (data?: PostBody): Promise<Response> => fetcher("POST", "login", data?.body);

	return {
		user: wrapFetccher(user),
	};
}