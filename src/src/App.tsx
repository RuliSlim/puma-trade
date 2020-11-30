import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
import { TreeProvider } from "./context/tree_context";
import { dummyData } from "./model/dummy_data";
import { pageData, PageProvider } from "./context/pages_context";
import { getToken } from "./utils/auth";
import { formContext } from "./context/form.context";
import { ErrorBoundary } from "./components/error/boundary";
import { Loading, MyAppbar, MyParticle, Navbar } from "./components";
import { useDebounce } from "./hooks/debounce";

const routes: string[] = [ "", "trees", "history" ];

// all pages;
const Login = React.lazy(() => import("./pages/login"));
const Dashboard = React.lazy(() => import("./pages/dashboard"));
const Trees = React.lazy(() => import("./pages/trees"));
const Profile = React.lazy(() => import("./pages/profile"));
const History = React.lazy(() => import("./pages/history"));
const Register = React.lazy(() => import("./pages/register"));

// components:
const MySnackbar = React.lazy(() => import("./components/utils/snackbar"));

// suspense
const MySnackbarSuspense = React.lazy(() => import("./components/utils/snack.suspense"));

function App(): JSX.Element {
	const [ page, setPage ] = React.useState(0);
	const [ isLogged, setIsLogged ] = React.useState<boolean>(false);

	const history = useHistory();

	const { token, values, resource, postResource } = React.useContext(formContext);
	// const { eventTouch } = React.useContext(pageData);
	// useDebounce();

	const checkToken = (): void => {
		setIsLogged(getToken() ? true : false);
		console.log(getToken() ? true : false);
	};

	// React.useEffect(() => {
	// 	const route: string = history.location.pathname.slice(1);
	// 	const index: number = routes.findIndex((value) => value === route);

	// 	if (index !== -1) setPage(index);
	// }, [ history.location.pathname ]);

	React.useEffect(() => {
		console.log("masuk ga??");
		checkToken();
	}, [ token, postResource, resource ]);

	return (
		<Box display="flex"
			flexDirection="column"
			width={window.innerWidth}
			height={window.innerHeight}
			// {...eventTouch}
		>
			{/* <MyParticle /> */}
			<ErrorBoundary>
				{!isLogged ?
					<Box m="auto" mt={5} width="80vw" height="80vh" >
						<Switch>
							<Route  path="/login" render={(): JSX.Element => <Login />} />
							<Route  path="/register" render={(): JSX.Element => <Register />} />
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
							{/* <PageProvider initialData={page}> */}
							{/* <TreeProvider initialData={dummyData}> */}
							<Switch>
								<Route exact path="/login">
									<Redirect to="/" />
								</Route>
								<Route exact path="/" render={(): JSX.Element => <Dashboard />} />
								<Route exact path="/trees" render={(): JSX.Element => <Trees />} />
								<Route exact path="/profile" render={(): JSX.Element => <Profile />} />
								<Route exact path="/history" render={(): JSX.Element => <History />} />
							</Switch>
							{/* </TreeProvider> */}
							{/* </PageProvider> */}
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
