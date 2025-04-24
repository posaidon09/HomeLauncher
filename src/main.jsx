import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ContextProvider } from "./lib/Context";
ReactDOM.createRoot(document.getElementById("root")).render(
	<ContextProvider>
		<App />
		<SpeedInsights />
	</ContextProvider>,
);
