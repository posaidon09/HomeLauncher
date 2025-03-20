import { context } from "../lib/Context.jsx";
import "./../App.css";
import Card from "./../components/Card.jsx";
import Icon from "./../components/Icon.jsx";
import { useContext, useEffect, useState } from "react";
import sites from "./../assets/sites.json";

export default function Columns() {
	const { setPage } = useContext(context);
	const [anim, setAnim] = useState({
		transform: "translateY(-50px)",
		opacity: "0%",
	});

	useEffect(() => {
		setAnim({
			transform: "translateY(0px)",
			opacity: "100%",
		});
	}, []);

	return (
		<div className="bg-[url('./assets/store.png')] bg-cover min-h-screen flex items-center justify-center">
			<div
				className="absolute left-12 top-12 cursor-pointer"
				onClick={() => setPage(1)}
			>
				<Icon
					name={"TbTerminal2"}
					className={"scale-[400%] text-black rounded-xl"}
				/>
			</div>
			<div
				className="bg-black/60 w-[1000px] h-[500px] rounded-xl flex flex-row justify-center items-start gap-10 p-10 transition-all duration-1000"
				style={anim}
			>
				<Card title={"Socials"} sites={sites.columns.Social} />
				<Card title={"Coding"} sites={sites.columns.Coding} />
				<Card title={"Misc"} sites={sites.columns.Misc} />
			</div>
		</div>
	);
}
