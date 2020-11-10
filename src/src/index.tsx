import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { MyTheme } from "./lib/theme";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
	<React.StrictMode>
		<MuiThemeProvider theme={MyTheme}>
			<CssBaseline />
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</MuiThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
