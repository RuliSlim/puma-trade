import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components";
import { Dashboard } from "./pages";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Dashboard />
		</div>
	);
}

export default App;
