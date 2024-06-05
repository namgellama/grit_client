import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import "./index.css";
import {
	CategoryPage,
	CheckoutPage,
	HomePage,
	MyOrdersPage,
	ProductDetailPage,
	SignInPage,
	SignUpPage,
} from "./pages";
import ProductPage from "./pages/customer/ProductPage.tsx";
import theme from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<CookiesProvider>
			<Provider store={store}>
				<ChakraProvider theme={theme}>
					<Router>
						<Routes>
							<Route path="/" element={<App />}>
								<Route path="/" element={<HomePage />} />
								<Route
									path="/products"
									element={<ProductPage />}
								/>
								<Route
									path="/products/:id"
									element={<ProductDetailPage />}
								/>
								<Route
									path="/categories/:id"
									element={<CategoryPage />}
								/>
								<Route
									path="/checkout"
									element={<CheckoutPage />}
								/>
								<Route
									path="/orders/mine"
									element={<MyOrdersPage />}
								/>
							</Route>
							<Route path="/login" element={<SignInPage />} />
							<Route path="/register" element={<SignUpPage />} />
						</Routes>
					</Router>
				</ChakraProvider>
			</Provider>
		</CookiesProvider>
	</React.StrictMode>
);
