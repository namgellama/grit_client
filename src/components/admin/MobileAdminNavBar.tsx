import { Logo } from "@/assets";
import {
	Divider,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	HStack,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import { CgWebsite } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ButtonLink, NavLinkButton } from "../shared/NavComponents";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	navLinks: { name: string; path: string; icon: JSX.Element }[];
	handleLogout: () => void;
}

const MobileAdminNavBar = ({
	isOpen,
	onClose,
	navLinks,
	handleLogout,
}: Props) => {
	const navigate = useNavigate();

	return (
		<Drawer isOpen={isOpen} placement="left" onClose={onClose}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>
					<HStack py={2} px={5} justify="space-between">
						<Flex align="center" gap={4}>
							<Image src={Logo} alt="Logo" boxSize="24px" />
							<Text fontWeight="medium" fontSize="small">
								Welcome Admin!
							</Text>
						</Flex>
					</HStack>
				</DrawerHeader>

				<Divider
					orientation="horizontal"
					borderColor="background.400"
				/>

				<DrawerBody>
					<VStack gap={10} mt={5} px={4}>
						<VStack align="center" w="100%" gap={3}>
							{navLinks.map((link) => (
								<NavLinkButton
									key={link.name}
									name={link.name}
									path={link.path}
									icon={link.icon}
									onClose={onClose}
								/>
							))}
						</VStack>

						<Flex direction="column" w="100%" gap={1}>
							<ButtonLink
								icon={<CgWebsite />}
								text="Go to Website"
								action={() => navigate("/")}
							/>
							<ButtonLink
								icon={<MdLogout />}
								text="Logout"
								action={handleLogout}
							/>
						</Flex>
					</VStack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default MobileAdminNavBar;
