import { createContext, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
export const context = createContext();
export const ContextProvider = ({ children }) => {
	const [page, setPage] = useLocalStorage("page", 0);
	const [bg, setBg] = useLocalStorage(
		"bg",
		"https://i.postimg.cc/X7kb3Zd9/127729035-p2-master1200.jpg",
	);
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
