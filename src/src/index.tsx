import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { MyTheme } from "./lib/theme";
import { BrowserRouter } from "react-router-dom";
import { FormProvider } from "./context/form.context";
import { Loading } from "./components";

ReactDOM.render(
	<React.StrictMode>
		<MuiThemeProvider theme={MyTheme}>
			<CssBaseline />
			<BrowserRouter>
				<FormProvider>
					<React.Suspense fallback={<Loading thickness={100} position="absolute" left="45%" top="40%"/>}>
						<App />
					</React.Suspense>
				</FormProvider>
			</BrowserRouter>
		</MuiThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
