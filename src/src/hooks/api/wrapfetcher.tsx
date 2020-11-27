import React from "react";
import { formContext } from "../../context/form.context";
import { ResponsePost, WrapperGet } from "../../model/api/fetcher";
import { User } from "../../model/models/user.model";
import { saveToken, saveUser } from "../../utils/auth";

interface ApiSuspenseInterface {
	wrapFetcher: (promise: Promise<Response>) => WrapperGet;
	// resource: undefined | FetchApi;
}

export default function ApiSuspense (): ApiSuspenseInterface {
	const { actions } = React.useContext(formContext);
	const { handlingError } = actions;

	const wrapFetcher = (promise: Promise<Response>): WrapperGet => {
		let status = "pending";
		let result: {};
		console.log("jalaaan");
		const suspender = promise.then(
			r => {
				// if (r.ok) {
				r.json().then(
					d => {
						status = "success";
						result = d;
					},
					e => {
						status = "error";
						result = e;
					}
				);
			},
			e => {
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
					throw suspender;
				} else if (status === "error") {
					throw result;
				} else {
					const data = result as ResponsePost;
					if (data.status !== 200 && data.status !== 201) {
						if (data.message === "invalid token") {
							handlingError("Please relog to get new access");
						} else {
							handlingError("Please Try again later");
						}
					}

					return result as ResponsePost;
				}
			}
		};
	};

	return { wrapFetcher };
}