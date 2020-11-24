import React from "react";
import { Loading, MyAppbar, Navbar } from "./components";
import { Dashboard, Trees, History, Register, Todo, Login } from "./pages";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useDebounce } from "./hooks/debounce";
import { Box } from "@material-ui/core";
import { TreeProvider } from "./context/tree_context";
import { dummyData } from "./model/dummy_data";
import { PageProvider } from "./context/pages_context";
import { getToken } from "./utils/auth";
import { fetchApi } from "./utils/fetcher";
import { FetchApi } from "./model/api/fetcher";
import { FormProvider } from "./context/form.context";

const routes: string[] = [ "", "trees", "history" ];
// const resource = fetchApi();

// all pages;
// const Todo = React.lazy(() => import("./pages/test"));
// const Login = React.lazy(() => import("./pages/login"));

function App(): JSX.Element {
	// const { eventTouch } = useDebounce();
	const [ page, setPage ] = React.useState(0);
	const [ isLogged, setIsLogged ] = React.useState<string>();
	// const [ resource, setResource ] =  React.useState<FetchApi | null>(null);

	const history = useHistory();

	React.useEffect(() => {
		const route: string = history.location.pathname.slice(1);
		const index: number = routes.findIndex((value) => value === route);

		if (index !== -1) setPage(index);
	}, [ history.location.pathname ]);

	React.useEffect(() => {
		setIsLogged(getToken());
	}, []);

	return (
		<Box display="flex"
			flexDirection="column"
			width={window.innerWidth}
			height={window.innerHeight}
			// {...eventTouch}
		>
			{/* <React.Suspense fallback={<Loading/>}> */}
			<FormProvider>
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
			</FormProvider>
			{/* </React.Suspense> */}
		</Box>
	);
}

export default App;
