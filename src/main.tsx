import App from "@/App.tsx";
import { store } from "@/app/store.ts";
import { AdminRoute, PrivateRoute } from "@/components";
import "@/index.css";
import {
	AdminCategoriesPage,
	AdminDashboardPage,
	AdminOrderDetailPage,
	AdminOrdersPage,
	AdminProductAddPage,
	AdminProductsPage,
	CategoryPage,
	CheckoutPage,
	HomePage,
	MyOrderDetailPage,
	ProductDetailPage,
	ProductPage,
	ProfilePage,
	AuthPage,
} from "@/pages";
import theme from "@/theme.ts";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (import.meta.env.MODE === "production") {
	disableReactDevTools();
}

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

								<Route path="" element={<PrivateRoute />}>
									<Route
										path="/checkout"
										element={<CheckoutPage />}
									/>
									<Route
										path="/orders/mine/:id"
										element={<MyOrderDetailPage />}
									/>
									<Route
										path="/profile"
										element={<ProfilePage />}
									/>
								</Route>

								{/* Admin Routes */}

								<Route path="" element={<AdminRoute />}>
									<Route
										path="/dashboard/home"
										element={<AdminDashboardPage />}
									/>
									<Route
										path="/dashboard/categories"
										element={<AdminCategoriesPage />}
									/>
									<Route
										path="/dashboard/products"
										element={<AdminProductsPage />}
									/>
									<Route
										path="/dashboard/products/:id"
										element={<AdminProductAddPage />}
									/>
									<Route
										path="/dashboard/orders"
										element={<AdminOrdersPage />}
									/>
									<Route
										path="/dashboard/orders/:id"
										element={<AdminOrderDetailPage />}
									/>
									<Route
										path="/dashboard/products/new"
										element={<AdminProductAddPage />}
									/>
								</Route>
							</Route>
							<Route path="/auth" element={<AuthPage />} />
						</Routes>
					</Router>
				</ChakraProvider>
			</Provider>
		</CookiesProvider>
	</React.StrictMode>
);
