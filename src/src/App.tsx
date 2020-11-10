import React from "react";
import { Navbar } from "./components";
import { Dashboard, Trees, History } from "./pages";
import { Route, Switch } from "react-router-dom";
import { useDebounce } from "./hooks/debounce";

function App(): JSX.Element {
	useDebounce();

	return (
		<div className="App">
			<Navbar />
			<Switch>
				<Route exact path="/" render={(): JSX.Element => <Dashboard />} />
				<Route path="/trees" render={(): JSX.Element => <Trees />} />
				<Route path="/history" render={(): JSX.Element => <History />} />
			</Switch>
		</div>
	);
}

export default App;
