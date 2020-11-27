import React from "react";
import { MyAppbar, MySnackbar, Navbar } from "./components";
import { Dashboard, Trees, History, Register, Todo } from "./pages";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
import { TreeProvider } from "./context/tree_context";
import { dummyData } from "./model/dummy_data";
import { pageData, PageProvider } from "./context/pages_context";
import { getToken } from "./utils/auth";
import { formContext } from "./context/form.context";
import { ErrorBoundary } from "./components/error/boundary";
import MySnackbarSuspense from "./components/utils/snack.suspense";

const routes: string[] = [ "", "trees", "history" ];

// all pages;
const Login = React.lazy(() => import("./pages/login"));

function App(): JSX.Element {
	// const { eventTouch } = useDebounce();
	const [ page, setPage ] = React.useState(0);
	const [ isLogged, setIsLogged ] = React.useState<string>();

	const history = useHistory();

	const { token, values } = React.useContext(formContext);
	const { eventTouch } = React.useContext(pageData);

	const checkToken = (): void => {
		setIsLogged(getToken());
	};

	React.useEffect(() => {
		const route: string = history.location.pathname.slice(1);
		const index: number = routes.findIndex((value) => value === route);

		if (index !== -1) setPage(index);
	}, [ history.location.pathname ]);

	React.useEffect(() => {
		checkToken();
	}, [ token ]);

	return (
		<Box display="flex"
			flexDirection="column"
			width={window.innerWidth}
			height={window.innerHeight}
			{...eventTouch}
		>
			<ErrorBoundary>
				{/* <React.Suspense fallback={<Loading/>}> */}
				{!isLogged ?
					<Box m="auto" mt={5} width="80vw">
						<Switch>
							<Route exact path="/login" render={(): JSX.Element => <Login />} />
							<Route exact path="/register" render={(): JSX.Element => <Register />} />
							<Route exact path="/test" render={(): JSX.Element => <Todo  />} />
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
							<PageProvider initialData={page}>
								<TreeProvider initialData={dummyData}>
									<Switch>
										<Route exact path="/" render={(): JSX.Element => <Dashboard />} />
										<Route exact path="/trees" render={(): JSX.Element => <Trees />} />
										<Route exact path="/history" render={(): JSX.Element => <History />} />
									</Switch>
								</TreeProvider>
							</PageProvider>
						</Box>
					</React.Fragment>
				}
				{/* </React.Suspense> */}
				<MySnackbar isOpen={values.isError} message={values.message} variant={values.variant}/>
				<MySnackbarSuspense />
			</ErrorBoundary>
		</Box>
	);
}

export default App;
