import React from "react";
import "./App.css";
import { Navbar } from "./components";
import { Dashboard, Trees, History } from "./pages";
import { BrowserRouter } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Navbar />
				<div id="dashboard">
					<Dashboard/>
				</div>
				<div id="trees">
					<Trees />
				</div>
				<div id="history">
					<History />
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
