import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import CategoryPage from "./customer/pages/CategoryPage.tsx";
import HomePage from "./customer/pages/HomePage.tsx";
import ProductPage from "./customer/pages/ProductPage.tsx";
import "./index.css";
import SignInPage from "./shared/pages/SignInPage.tsx";
import SignUpPage from "./shared/pages/SignUpPage.tsx";
import theme from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakraProvider theme={theme}>
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
						<Route path="/login" element={<SignInPage />} />
						<Route path="/register" element={<SignUpPage />} />
					</Routes>
				</Router>
			</ChakraProvider>
		</Provider>
	</React.StrictMode>
);
