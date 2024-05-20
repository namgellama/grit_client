import { useGetProductsQuery } from "../../app/product/productApiSlice";
import Hero from "../components/Hero";

const HomePage = () => {
	const { data: products } = useGetProductsQuery();

	console.log(products);

	return (
		<>
			<Hero />
		</>
	);
};

export default HomePage;
