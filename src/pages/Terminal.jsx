import { useContext, useEffect, useRef, useState } from "react";
import { context } from "../lib/Context";
import "./../App.css";
import { evaluate } from "mathjs";

export default function Terminal() {
	const { setMessages, messages, sites, setSites, newTab } =
		useContext(context);
	const [suggestion, setSuggest] = useState({ type: "site", value: "" });
	const [intersection, setIntersect] = useState({ values: [], indexes: [] });
	const inputRef = useRef(null);
	const [cmd, setCmd] = useState("");
	const [anim, setAnim] = useState({
		transform: "translateY(-100px)",
		opacity: "0%",
	});

	async function handleSubmit(e) {
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
				const cmds = sites.terminal.commands.map(
					(command) => `${command.name}: ${command.description}`,
				);
				output = ["Commands:", ...cmds, "", "Websites:", ...commands].join(
					"\n",
				);
				break;
			}
			case "google":
			case "g": {
				window.open(
					`https://www.google.com/search?q=${args.join("+")}`,
					newTab,
				);
				break;
			}
			case "math":
			case "calc": {
				try {
					output = evaluate(args.join(" "));
				} catch {
					output = "incorrect expression. try again";
				}
				break;
			}
			case "create":
			case "cmd": {
				const name = args[0];
				const url = args[1];
				setSites((prev) => ({
					...prev,
					terminal: {
						...prev.terminal,
						sites: [...prev.terminal.sites, { name, url }],
					},
				}));
				break;
			}
			case "delete":
			case "rm":
				{
					if (!args.length)
						output = "Empty command. provide a website to remove";
					else if (!commands.includes(args[0]))
						output = `Error removing ${args[0]}, check if it exists`;
					else {
						setSites((prev) => ({
							...prev,
							terminal: {
								...prev.terminal,
								sites: prev.terminal.sites.filter(
									(site) => site.name != args[0],
								),
							},
						}));
						output = `Removed ${args[0]} from website list`;
					}
				}
				break;
			case "visit":
			case "goto": {
				location.href = args[0];
				break;
			}
			default: {
				const url = urls[commands.indexOf(command)];
				if (urls.includes(url)) {
					output = `Opening ${url}`;
					window.open(url, newTab);
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
		const response = await fetch(`/google?q=${encodeURIComponent(query)}`);
		const data = await response.json();
		return data[0];
	}

	async function handleCommand(command, args) {
		if (!args.length) return;
		switch (command) {
			case "google":
			case "g":
				return await autoCompleteQuery(args.join(" "));
			default:
				return;
		}
	}

	function handleChange(e) {
		e?.preventDefault();
		const actions = sites.terminal.commands;
		const websites = sites.terminal.sites;
		const commands = websites
			.map((site) => site.name)
			.concat(actions.map((action) => action.name))
			.concat(actions.map((action) => action.alias))
			.sort((a, b) => a.length - b.length);
		const text = e.target.value.split(" ");
		const input = e.target.value;
		const command = text.shift();
		const args = text;
		setCmd(input);
		if (
			actions
				.map((action) => action.name)
				.concat(actions.map((action) => action.alias))
				.includes(command)
		) {
			if (input.split(" ").length > 1) {
				handleCommand(command, args).then((res) => {
					setSuggest({ type: "command", value: res });
				});
			} else {
				const tooltip = sites.terminal.commands.find(
					(action) => action.name === command || action.alias === command,
				).description;
				setSuggest({ type: "command", value: tooltip });
			}
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
		} else if (e.key == "ArrowUp") {
			e.preventDefault();
			setCmd(messages[messages.length - 1].command.replace(">", ""));
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
			<div
				className="bg-gradient-to-br from-purple-500 to-pink-500 p-[5px] rounded-xl transition-all duration-500 ease-out"
				style={anim}
			>
				<form
					className="bg-black w-[1000px] min-h-[700px] max-h-[800px] transition-transform duration-300 rounded-xl p-4 text-text-50 text-xl font-mono flex flex-row overflow-y-scroll overflow-x-hidden"
					onSubmit={(event) => handleSubmit(event)}
					id="terminal"
				>
					<div className="flex flex-col gap-4 w-full">
						{messages.map((msg, key) => (
							<div key={key} className="flex flex-col whitespace-pre-line">
								<p className="text-gray-500">{msg.command}</p>
								<p>{msg.output}</p>
							</div>
						))}

						<div className="flex flex-row items-center">
							<span className="mr-2">{">"}</span>
							<input
								className="bg-transparent outline-none w-full h-min"
								id="msg"
								value={cmd}
								ref={inputRef}
								onChange={(event) => handleChange(event)}
								onKeyDown={(event) => handleAutocomplete(event)}
							/>
						</div>

						<div className="mb-32 flex flex-row flex-wrap">
							{suggestion.type === "site" ? (
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
								<p className="text-white">{suggestion.value}</p>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
