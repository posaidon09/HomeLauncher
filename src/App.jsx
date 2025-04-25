import "./App.css";
import { useContext, useEffect, useState } from "react";
import Columns from "./pages/Columns.jsx";
import Terminal from "./pages/Terminal.jsx";
import { context } from "./lib/Context.jsx";
import Settings from "./pages/Settings.jsx";
import Icon from "./components/Icon.jsx";
import pb from "./lib/Pocketbase.jsx";

function App() {
	const { page, setPage, setId, id, setSettings, settings, bg, setBg } =
		useContext(context);
	const [loaded, setLoaded] = useState(false);
	function getPage() {
		const pages = [
			<Columns key={0} />,
			<Terminal key={1} />,
			<Settings key={2} />,
		];
		return pages[page];
	}

	useEffect(() => {
		if (loaded) return;
		setLoaded(true);
		(async () => {
			if (id == null) {
				const sites = await fetch("/sites.json").then((response) =>
					response.json(),
				);

				const res = await pb.collection("settings").create({
					style: 1,
					urlTarget: "_self",
					terminal: sites.terminal,
					columns: sites.columns,
				});
				setId(res.id);
				setSettings(res);
			} else {
				const res = await pb.collection("settings").getOne(id);
				const bgRes = pb.files.getURL(res, res.background);
				setSettings(res);
				setBg(bgRes);
			}
		})();
	}, []);

	return (
		<div
			className={`bg-cover bg-black transition-all duration-300`}
			style={{ backgroundImage: `url("${bg == "" ? "wind.png" : bg}")` }}
		>
			<div
				className="absolute left-10 top-10 cursor-pointer transition-transform duration-300 hover:scale-110"
				onClick={() => setPage(settings?.style)}
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
