import React from "react";
import { Navbar } from "./components";
import { Dashboard, Trees, History } from "./pages";
import { Route, Switch } from "react-router-dom";
import { useDebounce } from "./hooks/debounce";
import { Box } from "@material-ui/core";
import { MyTheme } from "./lib/theme";
import { useDeviceSize } from "./hooks/device";

function App(): JSX.Element {
	const { eventTouch } = useDebounce();

	useDeviceSize();

	React.useEffect(() => {
		// isMobile: window.innerWidth < 480;
		console.log(MyTheme.breakpoints.up("md"));
		console.log(MyTheme.breakpoints.up("lg"));
	}, []);

	return (
		<Box display="flex" flexDirection="column"  width="100vw" height="100vh" {...eventTouch}>
			<Navbar />
			{/* <Box m="auto">
				<ArrowUpward />
			</Box> */}
			<Box m="auto" width="80vw">
				<Switch>
					<Route exact path="/" render={(): JSX.Element => <Dashboard />} />
					<Route path="/trees" render={(): JSX.Element => <Trees />} />
					<Route path="/history" render={(): JSX.Element => <History />} />
				</Switch>
			</Box>
			{/* <Box m="auto">
				<ArrowDownward />
			</Box> */}
		</Box>
	);
}

export default App;
