import "./../App.css";
import Card from "./../components/Card.jsx";
import { useEffect, useState } from "react";
import sites from "./../assets/sites.json";

export default function Columns() {
	const [anim, setAnim] = useState({
		transform: "translateY(-50px)",
		opacity: "0%",
	});
	const [bookmark, setBookmark] = useState({
		active: false,
		category: "",
	});

	function handleSubmit(e) {
		console.log(e.target);
	}

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
				<Card title={"Socials"} sites={sites.columns.Social} />
				<Card title={"Coding"} sites={sites.columns.Coding} />
				<Card title={"Misc"} sites={sites.columns.Misc} />
			</div>
			<form
				onSubmit={(event) => handleSubmit(event)}
				className="transition-all duration-300"
				style={{
					display: bookmark.active ? "" : "none",
				}}
			>
				<input placeholder="name" />
				<input placeholder="URL" />
				<input placeholder="Icon" />
				<input placeholder="Icon color" />
			</form>
		</div>
	);
}
