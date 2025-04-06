import { createContext, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import commands from "./../assets/sites.json";
export const context = createContext();
export const ContextProvider = ({ children }) => {
	const [page, setPage] = useLocalStorage("page", 0);
	const [messages, setMessages] = useState([]);
	const [bg, setBg] = useLocalStorage("bg", "wind.png");
	const [style, setStyle] = useLocalStorage("style", 1);
	const [sites, setSites] = useLocalStorage("commands", commands);
	return (
		<context.Provider
			value={{
				page,
				setPage,
				messages,
				setMessages,
				bg,
				setBg,
				style,
				setStyle,
				sites,
				setSites,
			}}
		>
			{children}
		</context.Provider>
	);
};
