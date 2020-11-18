import React from "react";
import { MyAppbar, Navbar } from "./components";
import { Dashboard, Trees, History } from "./pages";
import { Route, Switch } from "react-router-dom";
import { useDebounce } from "./hooks/debounce";
import { Box, Paper } from "@material-ui/core";
import { TreeProvider } from "./context/tree_context";
import { dummyData } from "./model/dummy_data";

function App(): JSX.Element {
	const { eventTouch } = useDebounce();

	return (
		<Box display="flex"
			flexDirection="column"
			width={window.innerWidth}
			height={window.innerHeight}
			{...eventTouch}
		>
			<Navbar />
			<MyAppbar />
			<Box m="auto" mt={5} width="80vw">
				{/* <Paper> */}
				<TreeProvider initialData={dummyData}>
					<Switch>
						<Route exact path="/" render={(): JSX.Element => <Dashboard />} />
						<Route path="/trees" render={(): JSX.Element => <Trees />} />
						<Route path="/history" render={(): JSX.Element => <History />} />
					</Switch>
				</TreeProvider>
				{/* </Paper> */}
			</Box>
		</Box>
	);
}

export default App;
