import React from "react";
import { MyAppbar, Navbar } from "./components";
import { Dashboard, Trees, History } from "./pages";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDebounce } from "./hooks/debounce";
import { Box } from "@material-ui/core";
import { TreeProvider } from "./context/tree_context";
import { dummyData } from "./model/dummy_data";
import { PageProvider } from "./context/pages_context";

const routes: string[] = [ "", "trees", "history" ];

function App(): JSX.Element {
	// const { eventTouch } = useDebounce();
	const [ page, setPage ] = React.useState(0);

	const history = useHistory();

	React.useEffect(() => {
		const route: string = history.location.pathname.slice(1);
		// if (route === )
		const index: number = routes.findIndex((value) => value === route);
		console.log(route, ">>>>>>>INIROUTE");

		if (index !== -1) setPage(index);
	}, [ history.location.pathname ]);

	return (
		<Box display="flex"
			flexDirection="column"
			width={window.innerWidth}
			height={window.innerHeight}
			// {...eventTouch}
		>
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
		</Box>
	);
}

export default App;
