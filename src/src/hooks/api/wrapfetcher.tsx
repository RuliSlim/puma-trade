import React from "react";
import { useHistory } from "react-router-dom";
import { ResponsePost, WrapperGet } from "../../model/api/fetcher";
import { User } from "../../model/models/user.model";
import { saveToken, saveUser } from "../../utils/auth";

interface ApiSuspenseInterface {
	wrapFetcher: (promise: Promise<Response>) => WrapperGet;
	token: string;
	setToken: React.Dispatch<React.SetStateAction<string>>;
}

export default function ApiSuspense (): ApiSuspenseInterface {
	const history = useHistory();
	const [ token, setToken ] =  React.useState<string>("");

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
								// setToken(token);

							}
						}
					}
					return result as ResponsePost;
				}
			}
		};
	};

	return { wrapFetcher, token, setToken };
}