import "./App.css";
import { useContext } from "react";
import Columns from "./pages/Columns.jsx";
import Terminal from "./pages/Terminal.jsx";
import { context } from "./lib/Context.jsx";
import Settings from "./pages/Settings.jsx";
import Icon from "./components/Icon.jsx";

function App() {
	const { page, setPage, bg, style, setBg } = useContext(context);
	function getPage() {
		const pages = [
			<Columns key={0} />,
			<Terminal key={1} />,
			<Settings key={2} />,
		];
		return pages[page];
	}
	return (
		<div className={`bg-cover`} style={{ backgroundImage: `url("${bg}")` }}>
			<div
				className="absolute left-10 top-10 cursor-pointer transition-transform duration-300 hover:scale-110"
				onClick={() => setPage(style)}
			>
				<Icon name={"TbHome"} className={"text-gray-300 scale-[250%] "} />
			</div>
			<div
				className="absolute left-10 top-24 cursor-pointer transition-transform duration-300 hover:rotate-180"
				onClick={() => setPage(2)}
			>
				<Icon name={"TbSettings"} className={"text-gray-300 scale-[250%] "} />
			</div>
			{getPage()}
		</div>
	);
}

export default App;
