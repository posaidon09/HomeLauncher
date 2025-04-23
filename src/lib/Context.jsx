import { createContext, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";
import pb from "./Pocketbase";

export const context = createContext();
export const ContextProvider = ({ children }) => {
	const api = "https://home-launcher.vercel.app/api";
	const [messages, setMessages] = useState([]);
	const [settings, setSettings] = useLocalStorage("settings", null);
	const [bg, setBg] = useLocalStorage("background", null);
	const [page, setPage] = useState(1);
	useEffect(() => {
		if (settings?.style) {
			setPage(settings.style);
		}
	}, []);
	const [id, setId] = useLocalStorage("id", null);
	const set = async (key, value) => {
		const prev = await pb.collection("settings").getOne(id);
		const res =
			value instanceof FormData
				? await pb.collection("settings").update(id, value)
				: await pb.collection("settings").update(id, {
						...prev,
						[key]: value,
					});
		const { background, ...updated } = res;
		setSettings(updated);
		const newBg = pb.files.getURL(prev, background);
		setBg(newBg);
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
				bg,
				setBg,
				api,
			}}
		>
			{children}
		</context.Provider>
	);
};
