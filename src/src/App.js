import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components";
import { Dashboard, Trees, History } from "./pages";

function App() {
	return (
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
	);
}

export default App;
