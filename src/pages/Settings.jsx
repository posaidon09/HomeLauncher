import { useContext, useEffect, useState } from "react";
import { context } from "../lib/Context";

export default function Settings() {
	const { bg, setBg, style, setStyle } = useContext(context);
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
		const background = e.target.value;
		try {
			const url = new URL(background);
			if (background.includes(".")) {
				setBg(background);
				setBgValid(true);
			} else return setBgValid(false);
		} catch {
			return setBgValid(false);
		}
	}

	useEffect(() => {
		setAnim({
			styles: {
				opacity: "100%",
				transform: "translateY(0px)",
			},
			background: {
				opacity: "100%",
				transform: "translateY(0px)",
			},
		});
	}, []);

	return (
		<div className="min-h-screen overflow-auto flex flex-col gap-16 justify-center items-center">
			<div
				className="flex flex-col gap-5 mt-10 transition-all duration-500 ease-out"
				style={anim.styles}
			>
				<span className="text-center text-3xl text-text-50">Home Style</span>
				<div className="flex flex-row gap-10">
					<img
						src="terminal.png"
						className={`w-[500px] h-[300px] rounded-xl border-[6px] transition-all duration-300 cursor-pointer hover:scale-105`}
						style={{ borderColor: style == 1 ? "green" : "#4845ed" }}
						onClick={() => setStyle(1)}
					/>
					<div className="flex flex-col justify-center items-center">
						<img
							src="columns.png"
							className={`w-[500px] h-[300px] rounded-xl border-[6px] transition-all duration-300 cursor-pointer hover:scale-105`}
							style={{ borderColor: style == 0 ? "green" : "#4845ed" }}
							onClick={() => setStyle(0)}
						/>
						<span className="text-red-400 font-bold text-center">
							deprecated
						</span>
					</div>
				</div>
			</div>
			<div
				className="flex flex-col items-center justify-center gap-5 transition-all ease-out duration-500 delay-150 mb-20"
				style={anim.background}
			>
				<span className="text-center text-3xl text-text-50">
					Home Background
				</span>
				<img
					src={bg}
					className="w-[500px] h-[300px] rounded-xl border-[6px] border-accent-700"
				/>
				<input
					id="img"
					placeholder="Background URL"
					onChange={(event) => handleChange(event)}
					className="rounded-xl focus:outline-none bg-black text-text-50 p-2 border-2 transition-colors duration-300"
					style={{ borderColor: bgValid ? "#34eb37" : "#494a49" }}
				/>
			</div>
		</div>
	);
}
