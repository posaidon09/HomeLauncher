import { createContext, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
export const context = createContext();
export const ContextProvider = ({ children }) => {
	const [page, setPage] = useLocalStorage("page", 0);
	const [messages, setMessages] = useState([]);
	const [bg, setBg] = useLocalStorage("bg", "wind.png");
	const [style, setStyle] = useLocalStorage("style", 1);
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
