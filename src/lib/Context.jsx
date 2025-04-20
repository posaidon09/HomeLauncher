import { createContext, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect } from "react";
export const context = createContext();
export const ContextProvider = ({ children }) => {
	const api = "https://home-launcher.vercel.app";
	const [messages, setMessages] = useState([]);
	const [settings, setSettings] = useLocalStorage("settings", null);
	const [bg, setBg] = useState(null);
	const [page, setPage] = useState(1);
	useEffect(() => {
		if (settings?.style) {
			setPage(settings.style);
		}
	}, []);
	const [id, setId] = useLocalStorage("id", null);
	const set = async (key, value) => {
		await axios
			.post(`${api}/settings`, {
				id,
				k: key,
				v: value,
			})
			.then((res) => {
				//const { background, ...safeSettings } = res.data;
				//setBg(background);
				//setSettings(safeSettings);
				console.log(res.data);
			});
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
				bg,
				setBg,
			}}
		>
			{children}
		</context.Provider>
	);
};
