import { createContext, useState } from "react";
export const context = createContext();
export const ContextProvider = ({ children }) => {
	const [page, setPage] = useState(0);
	const [messages, setMessages] = useState([]);
	return (
		<context.Provider value={{ page, setPage, messages, setMessages }}>
			{children}
		</context.Provider>
	);
};
