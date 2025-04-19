import { createContext, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect } from "react";
export const context = createContext();
export const ContextProvider = ({ children }) => {
	const api = "https://home-launcher.vercel.app";
	const [messages, setMessages] = useState([]);
	const [settings, setSettings] = useLocalStorage("settings", null);
	const [page, setPage] = useState(1);
	useEffect(() => {
		if (settings?.style) {
			setPage(settings.style);
		}
	}, [settings]);
	const [id, setId] = useLocalStorage("id", null);
	const set = async (key, value) => {
		await axios.post("/settings", {
			id,
			k: key,
			v: value,
		});
		const res = await axios.get(`${api}/settings`, {
			params: {
				id,
			},
		});
		setSettings(res.data);
	};
	return (
		<context.Provider
			value={{
				page,
				setPage,
				messages,
				setMessages,
				id,
				setId,
				settings,
				setSettings,
				set,
				api,
			}}
		>
			{children}
		</context.Provider>
	);
};
