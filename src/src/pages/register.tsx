/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@material-ui/core";
import { Register } from "../components";
import { useStyles } from "../utils";
import { Link } from "react-router-dom";
import { formContext } from "../context/form.context";

export default function RegisterPage (): JSX.Element {
	const classes = useStyles();
	const { actions, values } = React.useContext(formContext);
	const { handleChange, handleRegister } = actions;
	return (
		<Card className={classes.loginOrRegister}>
			<CardHeader title="Register"/>
			<CardContent style={{ width: "80%" }}>
				<Register type="register"  handleChange={handleChange} values={values}/>
				<Button variant="contained" onClick={handleRegister} fullWidth>Register</Button>
			</CardContent>
			<CardActions>
				<Typography variant="body1">Already have account? Login <Link to="/login" >here</Link></Typography>
			</CardActions>
		</Card>
	);
}
