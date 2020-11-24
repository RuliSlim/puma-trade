/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@material-ui/core";
import { Loading, Register } from "../components";
import { useStyles } from "../utils";
import { Link, useHistory } from "react-router-dom";
import { PagesProps } from "../model/components/pages";
import UseFormApi from "../hooks/form_api";
import { formContext } from "../context/form.context";
import MySnackbarSuspense from "../components/utils/snack.suspense";

export default function LoginPage (props: PagesProps): JSX.Element {
	const classes = useStyles();
	const history = useHistory();

	console.log(props, "INI PROPSADSFAS");

	// const { handleLogin, postResource, handleChange, values } = UseFormApi();
	const { actions, values } = React.useContext(formContext);
	const { handleChange, handleLogin } = actions;

	return (
		<Card className={classes.loginOrRegister}>
			<CardHeader title="Login"/>
			<CardContent className={classes.loginOrRegister}>
				<img src="https://cdn.pixabay.com/photo/2017/05/10/17/19/libra-2301362_1280.png" width="250px"/>
				<Register type="login" handleChange={handleChange} values={values}/>
				<Button variant="contained" onClick={handleLogin}>Login</Button>
			</CardContent>
			<CardActions>
				<Typography variant="body1">Don't have account yet? Register <Link to="/register" >here</Link></Typography>
			</CardActions>
			<React.Suspense fallback={<Loading />}>
				<MySnackbarSuspense />
			</React.Suspense>
		</Card>
	);
}