import {
	Box,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useGetSearchProductsQuery } from "../../app/features/search/searchApiSlice";
import ProductList from "./ProductList";

interface Props {
	setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search = ({ setShowSearch }: Props) => {
	const [search, setSearch] = useState<string | undefined>(undefined);

	const {
		data: searchProducts,
		isLoading,
		error,
	} = useGetSearchProductsQuery({
		name: search,
	});

	return (
		<Box>
			<InputGroup bg="#F5F5F5" mt={4} mb={1}>
				<InputLeftElement pointerEvents="none">
					<IoSearch color="gray.300" />
				</InputLeftElement>
				<Input
					type="text"
					placeholder="Search..."
					variant="flushed"
					onChange={(e) => setSearch(e.target.value)}
				/>

				<InputRightElement
					cursor="pointer"
					onClick={() => {
						setShowSearch(false);
						setSearch(undefined);
					}}
				>
					<RxCross2 color="gray.300" />
				</InputRightElement>
			</InputGroup>

			{searchProducts?.length! > 0 && (
				<Box
					onClick={() => {
						setShowSearch(false);
						setSearch(undefined);
					}}
				>
					<ProductList
						error={error}
						products={searchProducts}
						isLoading={isLoading}
						show={false}
					/>
				</Box>
			)}
		</Box>
	);
};

export default Search;
