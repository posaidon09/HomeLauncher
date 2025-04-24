import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Analytics } from "@vercel/analytics/react";
import { ContextProvider } from "./lib/Context";
ReactDOM.createRoot(document.getElementById("root")).render(
	<ContextProvider>
		<App />
		<Analytics />
	</ContextProvider>,
);
