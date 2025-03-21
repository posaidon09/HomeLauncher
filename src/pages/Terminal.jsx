import { useContext, useEffect, useState } from "react";
import { context } from "../lib/Context";
import sites from "./../assets/sites.json";

export default function Terminal() {
	const { setMessages, messages } = useContext(context);
	const [suggestion, setSuggest] = useState("");
	const [cmd, setCmd] = useState("");
	const [anim, setAnim] = useState({
		transform: "translateY(-50px)",
		opacity: "0%",
	});

	function handleSubmit(e) {
		e.preventDefault();
		const input = e.target.msg.value.trim();
		const commands = sites.terminal.sites.map((site) => site.name);
		const urls = sites.terminal.sites.map((site) => site.url);
		let output;

		switch (input) {
			case "clear": {
				setMessages([]);
				break;
			}
			case "ls":
			case "help": {
				output = commands.join(", ");
				break;
			}
			default: {
				const url = urls[commands.indexOf(input)];
				if (urls.includes(url)) {
					output = `Opening ${url}`;
					window.open(url, "_blank");
				} else {
					output = "Unknown command.";
				}
			}
		}

		setMessages((prevMessages) => [
			...prevMessages,
			{ command: `>${input}`, output },
		]);
		setCmd("");
		setSuggest("");
	}

	function handleChange(e) {
		e.preventDefault();
		const commands = sites.terminal.sites
			.map((site) => site.name)
			.concat(sites.terminal.commands);
		const input = e.target.value;
		setCmd(input);
		const matches = commands.map((command) => command.includes(input));
		if (!matches.includes(true)) return;
		setSuggest(commands[matches.indexOf(true)]);
		if (input.length === 0) setSuggest("");
	}

	function autoComplete(e) {
		if (e.key == "Tab") {
			e.preventDefault();
			setCmd(suggestion);
		}
	}

	useEffect(() => {
		const terminal = document.getElementById("terminal");
		terminal.scrollTop = terminal.scrollHeight;
	}, [messages, setMessages]);

	useEffect(() => {
		setAnim({
			transform: "translateY(0px)",
			opacity: "100%",
		});
	}, []);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<form
				className="bg-black/80 w-[1000px] min-h-[600px] max-h-[800px] rounded-xl p-8 text-text-50 text-xl font-mono flex flex-row overflow-y-scroll overflow-x-hidden transition-all duration-500"
				onSubmit={(event) => handleSubmit(event)}
				id="terminal"
				style={anim}
			>
				<div className="flex flex-col gap-4">
					{messages.map((msg, key) => {
						return (
							<div key={key} className="flex flex-col">
								<p className="text-gray-500">{msg.command}</p>
								<p>{msg.output}</p>
							</div>
						);
					})}
					<div className="flex flex-row">
						{">"}
						<input
							className="bg-transparent outline-none w-[940px] h-min"
							id="msg"
							value={cmd}
							onChange={(event) => handleChange(event)}
							onKeyDown={(event) => autoComplete(event)}
						/>
					</div>
					<p className="pb-32">{suggestion}</p>
				</div>
			</form>
		</div>
	);
}
