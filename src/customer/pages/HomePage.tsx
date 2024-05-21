import { useGetProductsQuery } from "../../app/product/productApiSlice";
import CategoryList from "../components/CategoryList";
import Hero from "../components/Hero";

const HomePage = () => {
	const { data: products } = useGetProductsQuery();

	console.log(products);

	return (
		<>
			<Hero />
			<CategoryList />
		</>
	);
};

export default HomePage;
