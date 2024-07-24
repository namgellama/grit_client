import { useGetBagItemsQuery } from "@/app/features/bagItem/bagItemApiSlice";
import { useAppSelector } from "@/app/hooks";
import { DBBagItems, DBEmptyBagItems, ErrorMessage } from "@/components";
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Spinner,
} from "@chakra-ui/react";
import { RefObject } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	btnRef: RefObject<HTMLButtonElement>;
}

const DBBagItemsDrawer = ({ isOpen, onClose, btnRef }: Props) => {
	const { user } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();
	const {
		data: bagItems,
		isLoading,
		error,
	} = useGetBagItemsQuery(user?.token ?? "");

	return (
		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={onClose}
			finalFocusRef={btnRef}
			size="sm"
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader
					textAlign="center"
					fontSize="small"
					textTransform="uppercase"
				>
					Your Bag
				</DrawerHeader>

				<DrawerBody>
					{error ? (
						<ErrorMessage>Something went wrong</ErrorMessage>
					) : bagItems?.length! > 0 ? (
						<DBBagItems
							bagItems={bagItems || []}
							user={user || null}
							isLoading={isLoading}
						/>
					) : (
						<DBEmptyBagItems onClose={onClose} />
					)}
				</DrawerBody>

				{bagItems?.length! > 0 && (
					<DrawerFooter>
						<Button
							colorScheme="messenger"
							borderRadius={0}
							w="100%"
							onClick={() => {
								navigate("/checkout");
								onClose();
							}}
							isDisabled={isLoading}
						>
							{isLoading ? <Spinner /> : "Checkout"}
						</Button>
					</DrawerFooter>
				)}
			</DrawerContent>
		</Drawer>
	);
};

export default DBBagItemsDrawer;
