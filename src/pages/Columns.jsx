import "./../App.css";
import Card from "./../components/Card.jsx";
import { useEffect, useState } from "react";
import sites from "./../assets/sites.json";

export default function Columns() {
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
		<div className="min-h-screen overflow-auto flex items-center justify-center">
			<div
				className="bg-black/60 w-[1000px] h-[500px] rounded-xl flex flex-row justify-center items-start gap-10 p-10 transition-all duration-500"
				style={anim}
			>
				<Card title={"Socials"} sites={sites.columns.Social} />
				<Card title={"Coding"} sites={sites.columns.Coding} />
				<Card title={"Misc"} sites={sites.columns.Misc} />
			</div>
		</div>
	);
}
