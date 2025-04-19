import { useContext, useEffect, useState } from "react";
import { context } from "../lib/Context";
import axios from "axios";

export default function Settings() {
	const { settings } = useContext(context);
	const [anim, setAnim] = useState({
		styles: {
			opacity: "0%",
			transform: "translateY(-50px)",
		},
		background: {
			opacity: "0%",
			transform: "translateY(-50px)",
		},
	});
	const [bgValid, setBgValid] = useState(false);

	function handleChange(e) {
		try {
			const background = e.target.files[0];
			const fr = new FileReader();
			fr.readAsDataURL(background);
			fr.onloadend = () => {
				setBg(fr.result);
				axios.post("/settings", { k: "background", v: fr.result });
				setBgValid(true);
			};
		} catch {
			setBgValid(false);
		}
	}

	useEffect(() => {
		setAnim({
			opacity: "100%",
			transform: "translateY(0px)",
		});
	}, []);

	return (
		<div className="min-h-screen overflow-auto flex flex-col gap-5 justify-center items-center">
			<div
				className="flex flex-col gap-5 mt-10 transition-all duration-500 ease-out"
				style={anim}
			>
				<span className="text-center text-3xl text-text-50">Home Style</span>
				<div className="flex flex-row gap-10">
					<img
						src="terminal.png"
						className={`w-[500px] h-[300px] rounded-xl border-[6px] transition-all duration-300 cursor-pointer hover:scale-105`}
						style={{ borderColor: settings.style == 1 ? "green" : "#4845ed" }}
						onClick={async () =>
							await axios.post("/settings", { k: "style", v: 1 })
						}
					/>
					<div className="flex flex-col justify-center items-center">
						<img
							src="columns.png"
							className={`w-[500px] h-[300px] rounded-xl border-[6px] transition-all duration-300 cursor-pointer hover:scale-105`}
							style={{ borderColor: settings.style == 0 ? "green" : "#4845ed" }}
							onClick={async () =>
								await axios.post("/settings", { k: "style", v: 2 })
							}
						/>
						<span className="text-red-400 font-bold text-center">
							deprecated
						</span>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-20">
				<div
					className="flex flex-col items-center justify-center gap-5 transition-all ease-out duration-500 delay-150 mb-20"
					style={anim}
				>
					<span className="text-center text-3xl text-text-50">
						Home Background
					</span>
					<img
						src={settings.bg}
						className="w-[500px] h-[300px] rounded-xl border-[6px] border-accent-700"
					/>
					<input
						type="file"
						placeholder="bwa"
						onChange={(event) => handleChange(event)}
						className="rounded-xl focus:outline-none bg-black text-text-50 p-2 border-2 transition-colors duration-300"
						style={{ borderColor: bgValid ? "#34eb37" : "#494a49" }}
					/>
				</div>
				<div className="flex flex-col items-center justify-center gap-5">
					<span className="text-center text-3xl text-text-50 mb-10 -mt-20">
						Url Destination
					</span>
					<div className="flex flex-row gap-20">
						<div
							className="bg-black p-2 border-[3px] rounded-xl text-white text-2xl cursor-pointer transition-all duratio-300"
							style={{
								borderColor: settings.newTab == "_self" ? "green" : "#4845ed",
							}}
							onClick={async () =>
								await axios.post("/settings", { k: "newTab", v: "_self" })
							}
						>
							Current tab
						</div>
						<div
							className="bg-black p-2 border-[3px] rounded-xl text-white text-2xl cursor-pointer transition-all duratio-300"
							style={{
								borderColor: settings.newTab == "_blank" ? "green" : "#4845ed",
							}}
							onClick={async () =>
								await axios.post("/settings", { k: "newTab", v: "_blank" })
							}
						>
							New tab
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
