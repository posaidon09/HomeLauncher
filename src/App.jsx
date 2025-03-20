import "./App.css";
import { useContext } from "react";
import Columns from "./pages/Columns.jsx";
import Terminal from "./pages/Terminal.jsx";
import { context } from "./lib/Context.jsx";

function App() {
	const { page } = useContext(context);
	function getPage() {
		const pages = [<Columns key={0} />, <Terminal key={1} />];
		return pages[page];
	}
	return <div>{getPage()}</div>;
}

export default App;
