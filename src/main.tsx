import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./customer/pages/HomePage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ChakraProvider>
			<Router>
				<Routes>
					<Route path="/" element={<App />}>
						<Route path="/" element={<HomePage />} />
					</Route>
				</Routes>
			</Router>
		</ChakraProvider>
	</React.StrictMode>
);
