import { useContext, useEffect, useRef, useState } from "react";
import { context } from "../lib/Context";
import sites from "./../assets/sites.json";
import "./../App.css";

export default function Terminal() {
	const { setMessages, messages } = useContext(context);
	const [suggestion, setSuggest] = useState({ type: "site", value: "" });
	const [intersection, setIntersect] = useState({ values: [], indexes: [] });
	const inputRef = useRef(null);
	const [cmd, setCmd] = useState("");
	const [anim, setAnim] = useState({
		transform: "translateY(-100px)",
		opacity: "0%",
	});

	function handleSubmit(e) {
		e.preventDefault();
		const input = e.target.msg.value.trim().split(" ");
		const command = input.shift();
		const args = input;
		const commands = sites.terminal.sites.map((site) => site.name);
		const urls = sites.terminal.sites.map((site) => site.url);
		let output;

		switch (command) {
			case "clear":
			case "clr": {
				setMessages([]);
				break;
			}
			case "ls":
			case "help": {
				output = commands
					.concat(sites.terminal.commands.map((command) => command.name))
					.join(", ");
				break;
			}
			case "google":
			case "g": {
				window.open(
					`https://www.google.com/search?q=${args.join("+")}`,
					"_blank",
				);
				break;
			}
			case "math":
			case "calc": {
				break;
			}
			default: {
				const url = urls[commands.indexOf(command)];
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
			{ command: `>${command} ${args.join(" ")}`, output },
		]);
		setCmd("");
		setSuggest("");
	}

	function intersect(input, suggestion) {
		if (!input || !suggestion) return { values: [], indexes: [] };

		let indexes = [];
		let inputChars = input.split("");

		suggestion.split("").forEach((char, index) => {
			if (inputChars.includes(char)) {
				indexes.push(index);
				inputChars.splice(inputChars.indexOf(char), 1);
			}
		});

		return { indexes };
	}

	async function autoCompleteQuery(query) {
		const response = await fetch(
			`http://localhost:3003/google?q=${encodeURIComponent(query)}`,
		);
		const data = await response.json();
		return data[0];
	}

	async function handleCommand(command, args) {
		if (!args.length) return;
		switch (command) {
			case "google":
				return await autoCompleteQuery(args.join(" "));
			default:
				return "Unknown command";
		}
	}

	function handleChange(e) {
		e.preventDefault();
		const actions = sites.terminal.commands;
		const websites = sites.terminal.sites;
		const commands = websites
			.map((site) => site.name)
			.concat(actions.map((action) => action.name))
			.concat(actions.map((action) => action.alias));
		const text = e.target.value.trim().split(" ");
		const input = e.target.value;
		const command = text.shift();
		const args = text;
		setCmd(input);
		if (actions.map((action) => action.name).includes(command)) {
			handleCommand(command, args).then((res) => {
				setSuggest({ type: "command", value: res });
			});
		} else {
			const matches = commands.map((action) => action.includes(command));
			if (!matches.includes(true)) return;
			setSuggest(() => {
				const newSuggestion = commands[matches.indexOf(true)];
				setIntersect(intersect(command, newSuggestion));
				return { type: "site", value: newSuggestion };
			});
		}
		if (input == "") setSuggest({ type: "site", value: "" });
	}

	function handleKeybinds(e) {
		if (e.ctrlKey && e.key == "k") {
			e.preventDefault();
			inputRef.current.focus();
		}
	}

	function handleAutocomplete(e) {
		if (e.key == "Tab") {
			e.preventDefault();
			if (suggestion.type == "site") setCmd(suggestion.value);
			else if (suggestion.type == "command")
				setCmd(`${cmd.split(" ")[0]} ${suggestion.value}`);
			setIntersect(intersect(suggestion.value, suggestion.value));
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
		const handleGlobalKeybinds = (e) => handleKeybinds(e);
		document.addEventListener("keydown", handleGlobalKeybinds);
		inputRef.current.focus();
		return () => {
			document.removeEventListener("keydown", handleGlobalKeybinds);
		};
	}, []);

	return (
		<div
			className="min-h-screen flex items-center justify-center"
			onKeyDown={(event) => handleKeybinds(event)}
		>
			<form
				className="bg-black/80 w-[1000px] min-h-[700px] max-h-[800px] border-[3px] border-gray-600 rounded-xl p-8 text-text-50 text-xl font-mono flex flex-row overflow-y-scroll overflow-x-hidden transition-all duration-500 ease-out"
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
							ref={inputRef}
							onChange={(event) => handleChange(event)}
							onKeyDown={(event) => handleAutocomplete(event)}
						/>
					</div>

					<div className="mb-32 flex flex-row">
						{suggestion.type == "site" ? (
							suggestion.value.split("").map((value, key) => (
								<p
									style={{
										color: intersection.indexes.includes(key)
											? "white"
											: "gray",
										fontWeight: intersection.indexes.includes(key) ? 700 : 0,
									}}
									key={key}
								>
									{value}
								</p>
							))
						) : (
							<p
								style={{
									color: "white",
								}}
							>
								{suggestion.value}
							</p>
						)}
					</div>
				</div>
			</form>
		</div>
	);
}
