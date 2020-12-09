import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Box } from "@material-ui/core";
import { getToken } from "./utils/auth";
import { formContext } from "./context/form.context";
import { MyAppbar, MyParticle, Navbar } from "./components";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/error/boundary";
// import { History } from "./pages";

// all pages;
const Login = React.lazy(() => import("./pages/login"));
const Dashboard = React.lazy(() => import("./pages/dashboard"));
const Trees = React.lazy(() => import("./pages/trees"));
const Profile = React.lazy(() => import("./pages/profile"));
const History = React.lazy(() => import("./pages/history"));
const Register = React.lazy(() => import("./pages/register"));
const Confirmation = React.lazy(() => import("./pages/email"));

// components:
const MySnackbar = React.lazy(() => import("./components/utils/snackbar"));

// suspense
const MySnackbarSuspense = React.lazy(() => import("./components/utils/snack.suspense"));

function App(): JSX.Element {
	const [ isLogged, setIsLogged ] = React.useState<boolean>(false);

	const { token, values, resource, postResource } = React.useContext(formContext);

	const checkToken = (): void => {
		setIsLogged(getToken() ? true : false);
	};

	React.useEffect(() => {
		checkToken();
	}, [ token, postResource, resource ]);

	return (
		<Box display="flex"
			flexDirection="column"
			width={window.innerWidth}
			height={window.innerHeight}
			// {...eventTouch}
		>
			<MyParticle />
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
			>
				{!isLogged ?
					<Box m="auto" mt={5} width="80vw" height="80vh" >
						<Switch>
							<Route  path="/login" render={(): JSX.Element => <Login />} />
							<Route  path="/register" render={(): JSX.Element => <Register />} />
							<Route  path="/confirmation/token" render={(): JSX.Element => <Confirmation />} />
							<Route path="*">
								<Redirect to="/login" />
							</Route>
						</Switch>
					</Box>
					:
					<React.Fragment>
						<Navbar />
						<MyAppbar />
						<Box m="auto" mt={5} width="80vw">
							<Switch>
								<Route exact path="/login">
									<Redirect to="/" />
								</Route>
								<Route exact path="/register">
									<Redirect to="/" />
								</Route>
								<Route exact path="/" render={(): JSX.Element => <Dashboard />} />
								<Route exact path="/trees" render={(): JSX.Element => <Trees />} />
								<Route exact path="/profile" render={(): JSX.Element => <Profile />} />
								<Route exact path="/history" render={(): JSX.Element => <History />} />
							</Switch>
						</Box>
					</React.Fragment>
				}
				<MySnackbar isOpen={values.isError} message={values.message} variant={values.variant}/>
				<MySnackbarSuspense />
			</ErrorBoundary>
		</Box>
	);
}

export default App;
