import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
} from "@chakra-ui/react";
import { RefObject } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBagItemsQuery } from "../../app/features/bagItem/bagItemApiSlice";
import { useAppSelector } from "../../app/hooks";
import DBBagItems from "./DBBagItems";
import DBEmptyBagItems from "./DBEmptyBagItems";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	btnRef: RefObject<HTMLButtonElement>;
}

const DBBagItemsDrawer = ({ isOpen, onClose, btnRef }: Props) => {
	const { user } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();
	const { data: bagItems } = useGetBagItemsQuery(user?.token ?? "");

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
					{bagItems?.length! > 0 ? (
						<DBBagItems
							bagItems={bagItems || []}
							user={user || null}
						/>
					) : (
						<DBEmptyBagItems onClose={onClose} />
					)}
				</DrawerBody>

				{bagItems?.length! > 0 && (
					<DrawerFooter>
						<Button
							colorScheme="blue"
							w="100%"
							onClick={() => {
								navigate("/checkout");
								onClose();
							}}
						>
							Checkout
						</Button>
					</DrawerFooter>
				)}
			</DrawerContent>
		</Drawer>
	);
};

export default DBBagItemsDrawer;
