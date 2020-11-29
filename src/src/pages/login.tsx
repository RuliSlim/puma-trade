/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@material-ui/core";
import { Loading, Register } from "../components";
import { useStyles } from "../utils";
import { Link } from "react-router-dom";
import { PagesProps } from "../model/components/pages";
import { formContext } from "../context/form.context";

export default function LoginPage (props: PagesProps): JSX.Element {
	const classes = useStyles();

	const { actions, values } = React.useContext(formContext);
	const { handleChange, handleLogin } = actions;

	const loading = <Loading thickness={50} position="absolute" top="45vh" left="25vw" />;
	console.log("logiiiin??????");

	return (
		<Card className={classes.loginOrRegister}>
			<CardHeader title="Login"/>
			<CardContent style={{ width: "80%" }}>
				{/* <img src="https://cdn.pixabay.com/photo/2017/05/10/17/19/libra-2301362_1280.png" width="105em"/> */}
				<Register type="login" handleChange={handleChange} values={values}/>
				<React.Suspense fallback={loading}>
					<Button variant="contained" onClick={handleLogin} fullWidth>Login</Button>
				</React.Suspense>
			</CardContent>
			<CardActions>
				<Typography variant="body1">Don't have account yet? Register <Link to="/register" >here</Link></Typography>
			</CardActions>
		</Card>
	);
}