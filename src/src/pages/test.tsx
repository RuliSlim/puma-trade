import React from "react";
import { PagesProps } from "../model/components/pages";

export default function TestApi(props: PagesProps): JSX.Element {
	const { resource } = props;
	const todo = resource?.user.read();
	// const result = todo.json();
	console.log(todo, "inidadasds<<<<<<");
	return (
		<div>SAFSAFSA</div>
	);
}