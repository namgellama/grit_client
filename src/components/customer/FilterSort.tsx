import { orderStatuses, paymentStatuses } from "@/utilities/data";
import { HStack, IconButton, Select } from "@chakra-ui/react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

interface Props {
	orderStatusValue: string;
	paymentStatusValue: string;
	setOrderStatusValue: (value: string) => void;
	setPaymentStatusValue: (value: string) => void;
	sort: "desc" | "asc";
	setSort: (value: "desc" | "asc") => void;
}

const FilterSort = ({
	orderStatusValue,
	paymentStatusValue,
	setOrderStatusValue,
	setPaymentStatusValue,
	sort,
	setSort,
}: Props) => {
	return (
		<HStack my={7} px={3} align="end">
			<Select
				w="50%"
				placeholder="Filter By Order Status"
				value={orderStatusValue}
				onChange={(e) => setOrderStatusValue(e.target.value)}
			>
				{orderStatuses.map((status) => (
					<option key={status.name} value={status.value}>
						{status.name}
					</option>
				))}
			</Select>

			<Select
				w="50%"
				placeholder="Filter By Payment Status"
				value={paymentStatusValue}
				onChange={(e) => setPaymentStatusValue(e.target.value)}
			>
				{paymentStatuses.map((status) => (
					<option key={status.name} value={status.value}>
						{status.name}
					</option>
				))}
			</Select>

			<IconButton
				icon={
					sort === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />
				}
				aria-label="Sort"
				onClick={() =>
					sort === "asc" ? setSort("desc") : setSort("asc")
				}
			/>
		</HStack>
	);
};

export default FilterSort;
