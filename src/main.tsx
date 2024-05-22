import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./customer/pages/HomePage.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import CategoryPage from "./customer/pages/CategoryPage.tsx";
import ProductPage from "./customer/pages/ProductPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakraProvider>
				<Router>
					<Routes>
						<Route path="/" element={<App />}>
							<Route path="/" element={<HomePage />} />
							<Route path="/products" element={<ProductPage />} />
							<Route
								path="/categories/:id"
								element={<CategoryPage />}
							/>
						</Route>
					</Routes>
				</Router>
			</ChakraProvider>
		</Provider>
	</React.StrictMode>
);
