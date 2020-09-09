import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components";
import { Dashboard, Trees } from "./pages";

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
		</div>
	);
}

export default App;
