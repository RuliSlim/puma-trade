import { useHistory } from "react-router-dom";
import { loginUrl, registerUrl } from "../lib/url";
import { FetchApi, PostBody, ResponsePost, WrapperGet } from "../model/api/fetcher";
import { User } from "../model/models/user.model";
import { getToken, saveToken, saveUser } from "./auth";

export const callFetch = async (type: string, url: string, data?: {} | string): Promise<Response> => {
	// const token: string = getToken();
	// let option;
	// if (url !== countryURL && url !== numVerify) {
	const option = {
		"Content-Type": "application/json",
		// ...((url !== loginUrl && url !== registerUrl) && { Authorization: `Token ${token}` })
	};
	// }

	// if (url === numVerify || url === emailVerify) {
	// 	url += data;
	// }

	console.log(data, "<<<<<");

	const response: Response = await fetch(url, {
		method: type,
		headers: option,
		// ... url.includes("numvalidate") && { mode: "no-cors" },
		...type !== "GET" && { body: JSON.stringify(data) },
	});

	return response;
};

// export const wrapFetccher = (promise: Promise<Response>): WrapperGet => {
// 	let status = "pending";
// 	let result: {};
// 	const suspender = promise.then(
// 		r => {
// 			console.log(r, "Ini di reEEEe<<<<<<<<<");
// 			// if (r.ok) {
// 			r.json().then(
// 				d => {
// 					console.log(d, "ini di sucksead");
// 					status = "success";
// 					result = d;
// 				},
// 				e => {
// 					console.log(e, "ini di e json,");
// 					status = "error";
// 					result = e;
// 				}
// 			);
// 			// } else {
// 			// 	throw new Error("ada tang gagaal");
// 			// }
// 		},
// 		e => {
// 			console.log(e, "ini di ea sebleum json");
// 			status = "error";
// 			result = e;
// 		}
// 	);

// 	return {
// 		read(): User {
// 			if (status === "pending") {
// 				throw suspender;
// 			} else if (status === "error") {
// 				throw result;
// 			} else {
// 				return result as User;
// 			}
// 		},
// 		write(): ResponsePost {
// 			if (status === "pending") {
// 				console.log("di pending");
// 				throw suspender;
// 			} else if (status === "error") {
// 				console.log("di errorrr");
// 				throw result;
// 			}
// 			console.log("di elseee");
// 			if ((result as ResponsePost).data !== null) {
// 				if ((result as ResponsePost).data.token !== null) {
// 					const { token, ...rest } = (result as ResponsePost).data;
// 					saveToken(token!);
// 					saveUser(rest);
// 				}
// 			}
// 			return result as ResponsePost;
// 		}
// 	};
// };

// export function fetchApi(): FetchApi {
// 	const user = callFetch("GET", "https://jsonplaceholder.typicode.com/posts");
// 	// const login = (data?: PostBody): Promise<Response> => fetcher("POST", "login", data?.body);

// 	return {
// 		user: wrapFetccher(user),
// 	};
// }