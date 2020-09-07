import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components";
import { Dashboard, Trees } from "./pages";

function App() {
	return (
		<div className="App">
			<Navbar />
			{/* <Dashboard /> */}
			<Trees />
		</div>
	);
}

export default App;
