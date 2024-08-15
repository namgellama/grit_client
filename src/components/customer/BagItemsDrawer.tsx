import { useAppSelector } from "@/app/hooks";
import { CookieBagItems, EmptyBagItems } from "@/components";
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
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	btnRef: RefObject<HTMLButtonElement>;
}

const BagItemsDrawer = ({ isOpen, onClose, btnRef }: Props) => {
	const navigate = useNavigate();
	const [cookies] = useCookies(["bagItems"]);
	const { user } = useAppSelector((state) => state.auth);

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
					fontSize="sm"
					textTransform="uppercase"
				>
					Your Bag
				</DrawerHeader>

				<DrawerBody>
					{cookies.bagItems?.length > 0 ? (
						<CookieBagItems bagItems={cookies.bagItems || []} />
					) : (
						<EmptyBagItems onClose={onClose} />
					)}
				</DrawerBody>

				{cookies.bagItems?.length > 0 && (
					<DrawerFooter>
						<Button
							colorScheme="messenger"
							borderRadius={0}
							w="100%"
							onClick={() => {
								user
									? navigate("/checkout")
									: navigate("/auth?redirect=checkout");
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

export default BagItemsDrawer;
