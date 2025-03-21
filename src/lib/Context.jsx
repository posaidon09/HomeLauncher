import { createContext, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
export const context = createContext();
export const ContextProvider = ({ children }) => {
	const [page, setPage] = useLocalStorage("page", 0);
	const [bg, setBg] = useLocalStorage("bg", "./assets/wind.png");
	const [style, setStyle] = useLocalStorage("style", 1);
	const [messages, setMessages] = useState([]);
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
			}}
		>
			{children}
		</context.Provider>
	);
};
