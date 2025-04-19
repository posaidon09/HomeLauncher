import { useContext } from "react";
import "./../App.css";
import Card from "./../components/Card.jsx";
import { useEffect, useState } from "react";
import { context } from "../lib/Context.jsx";

export default function Columns() {
	const { settings } = useContext(context);
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
		<div className="min-h-screen overflow-auto flex gap-20 flex-col items-center justify-start">
			<div
				className="bg-black/60 w-[1100px] h-[500px] mt-32 rounded-xl flex flex-row justify-center items-start gap-10 p-10 transition-all duration-500"
				style={anim}
			>
				<Card title={"Socials"} sites={settings.columns.Social} />
				<Card title={"Coding"} sites={settings.columns.Coding} />
				<Card title={"Misc"} sites={settings.columns.Misc} />
			</div>
		</div>
	);
}
