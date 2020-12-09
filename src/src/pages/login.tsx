/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@material-ui/core";
import { Loading, Register } from "../components";
import { useStyles } from "../utils";
import { Link } from "react-router-dom";
import { formContext } from "../context/form.context";

export default function LoginPage (): JSX.Element {
	const classes = useStyles();

	const { actions, values } = React.useContext(formContext);
	const { handleChange, handleLogin } = actions;

	const loading = <Loading thickness={50} position="absolute" top="45vh" left="25vw" />;
	console.log("logiiiin??????");

	return (
		<Card className={classes.loginOrRegister}>
			<CardHeader title="Login"/>
			<img src="./assets/images/logo_no_text.png" alt="logo libra" className={classes.logo} />
			<CardContent style={{ width: "80%" }}>
				<Register type="login" handleChange={handleChange} values={values}/>
				<React.Suspense fallback={loading}>
					<Button variant="contained" onClick={handleLogin} fullWidth style={{ marginTop: "20px" }}>Login</Button>
				</React.Suspense>
			</CardContent>
			<CardActions>
				<Typography variant="body1">Don't have account yet? Register <Link to="/register" >here</Link></Typography>
			</CardActions>
		</Card>
	);
}