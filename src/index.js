import React from "react";
import { createRoot } from "react-dom/client";
import "./scss/reset.css";
import "./scss/colors.css";
import App from "./components/App";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
