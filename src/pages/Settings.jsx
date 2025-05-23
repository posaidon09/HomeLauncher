import { useContext, useEffect, useState } from "react";
import { context } from "../lib/Context";

export default function Settings() {
	const { settings, set, bg } = useContext(context);
	const [anim, setAnim] = useState({
		opacity: "0%",
		transform: "translateY(-50px)",
	});
	const [bgValid, setBgValid] = useState(false);

	async function handleChange(e) {
		try {
			const background = e.target.files[0];
			const form = new FormData();
			form.append("background", background);
			set("background", form);
			setBgValid(true);
		} catch (err) {
			console.error("Upload failed:", err);
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
		<div className="min-h-screen flex flex-col gap-5 justify-center items-center">
			<div
				className="flex flex-col gap-5 mt-4 transition-all duration-500 ease-out"
				style={anim}
			>
				<span className="text-center text-3xl text-white">Home Style</span>
				<div className="flex flex-row gap-10">
					<img
						src="terminal.png"
						className={`w-[500px] h-[300px] rounded-xl border-[6px] transition-all duration-300 cursor-pointer hover:scale-105`}
						style={{ borderColor: settings.style == 1 ? "green" : "#4845ed" }}
						onClick={async () => await set("style", 1)}
					/>
					<div className="flex flex-col justify-center items-center">
						<img
							src="columns.png"
							className={`w-[500px] h-[300px] rounded-xl border-[6px] transition-all duration-300 cursor-pointer hover:scale-105`}
							style={{ borderColor: settings.style == 0 ? "green" : "#4845ed" }}
							onClick={async () => await set("style", 0)}
						/>
						<span className="text-red-400 font-bold text-center">
							deprecated
						</span>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-20">
				<div
					className="flex flex-col items-center justify-center gap-5 transition-all ease-out duration-500 delay-150"
					style={anim}
				>
					<span className="text-center text-3xl text-white">
						Home Background
					</span>
					<img
						src={bg}
						className="w-[500px] h-[300px] rounded-xl border-[6px] border-accent-700"
					/>
					<label
						className="inline-block cursor-pointer bg-black text-white p-2 rounded-xl border-2 transition-colors duration-300"
						style={{ borderColor: bgValid ? "#34eb37" : "#494a49" }}
					>
						Choose File
						<input
							type="file"
							accept="image/png, image/jpeg"
							onChange={handleChange}
							className="hidden"
						/>
					</label>
				</div>
				<div className="flex flex-col mt-40 gap-10">
					<div
						className="flex flex-col items-center justify-center gap-5 transition-all duration-500 delay-150"
						style={anim}
					>
						<span className="text-center text-3xl text-white mb-10 -mt-20">
							Url Destination
						</span>
						<div className="flex flex-row gap-20 -mt-10">
							<div
								className="bg-black p-2 border-[3px] rounded-xl text-white text-2xl cursor-pointer transition-all duration-300"
								style={{
									borderColor:
										settings.urlTarget == "_self" ? "green" : "#4845ed",
								}}
								onClick={async () => await set("urlTarget", "_self")}
							>
								Current tab
							</div>
							<div
								className="bg-black p-2 border-[3px] rounded-xl text-white text-2xl cursor-pointer transition-all duration-300"
								style={{
									borderColor:
										settings.urlTarget == "_blank" ? "green" : "#4845ed",
								}}
								onClick={async () => await set("urlTarget", "_blank")}
							>
								New tab
							</div>
						</div>
					</div>
					<div
						className="flex flex-col items-center transition-all duration-500 delay-150"
						style={anim}
					>
						<span className="text-3xl text-white text-center">
							Terminal Glow
						</span>

						<label
							className="inline-block cursor-pointer mt-4 w-16 bg-black text-white p-2 rounded-xl border-[3px] transition-colors duration-300"
							style={{
								borderColor: settings.terminalGlow ? "green" : "#494a49",
							}}
						>
							<div
								className={`flex items-center transition-all duration-300`}
								style={{
									transform: settings.terminalGlow
										? "translateX(70%)"
										: "translateX(0%)",
								}}
							>
								<div className="w-4 h-4 bg-gray-500 rounded-full"></div>
							</div>
							<input
								type="checkbox"
								checked={settings.terminalGlow}
								onChange={() => set("terminalGlow", !settings.terminalGlow)}
								className="hidden"
							/>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
