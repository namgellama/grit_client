import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Input,
} from "@chakra-ui/react";
import { RefObject } from "react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	btnRef: RefObject<HTMLButtonElement>;
}

const BagItemsDrawer = ({ isOpen, onClose, btnRef }: Props) => {
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
				<DrawerHeader>Create your account</DrawerHeader>

				<DrawerBody>
					<Input placeholder="Type here..." />
				</DrawerBody>

				<DrawerFooter>
					<Button variant="outline" mr={3} onClick={onClose}>
						Cancel
					</Button>
					<Button colorScheme="blue">Save</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default BagItemsDrawer;
