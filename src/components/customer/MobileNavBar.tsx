import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
	isNavBarOpen: boolean;
	onNavBarClose: () => void;
	navLinks: { name: string; path: string }[];
}

const MobileNavBar = ({ isNavBarOpen, onNavBarClose, navLinks }: Props) => {
	const navigate = useNavigate();

	return (
		<Drawer isOpen={isNavBarOpen} placement="left" onClose={onNavBarClose}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader fontWeight="normal">SHOP</DrawerHeader>

				<DrawerBody>
					<Flex direction="column">
						{navLinks.map((link) => (
							<Text
								key={link.name}
								fontWeight={{
									base: "normal",
									md: "semibold",
								}}
								fontSize="lg"
								letterSpacing={1}
								py={1}
								px={2}
								onClick={() => {
									navigate(link.path);
									onNavBarClose();
								}}
							>
								{link.name}
							</Text>
						))}
					</Flex>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default MobileNavBar;
