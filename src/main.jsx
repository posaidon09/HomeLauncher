import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ContextProvider } from "./lib/Context";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
