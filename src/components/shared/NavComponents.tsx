import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import {
	JSXElementConstructor,
	LegacyRef,
	ReactElement,
	ReactNode,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const NavLink = ({ path, name }: { path: string; name: string }) => (
	<Link to={path}>
		<Text fontWeight="semibold" fontSize="small" letterSpacing={1}>
			{name}
		</Text>
	</Link>
);

export const NavIcon = ({
	reference,
	label,
	icon,
	onClick,
}: {
	reference?: LegacyRef<HTMLButtonElement>;
	label: string;
	icon: ReactElement<any, string | JSXElementConstructor<any>>;
	onClick: any;
}) => {
	return (
		<IconButton
			ref={reference}
			aria-label={label}
			icon={icon}
			variant="ghost"
			borderRadius="100%"
			_hover={{ background: "inherit" }}
			onClick={onClick}
		/>
	);
};

export const NavLinkIcon = ({
	label,
	icon,
	link,
}: {
	label: string;
	icon: ReactElement<any, string | JSXElementConstructor<any>>;
	link: string;
}) => {
	const navigate = useNavigate();

	return (
		<IconButton
			aria-label={label}
			icon={icon}
			variant="ghost"
			borderRadius="100%"
			_hover={{ background: "inherit" }}
			onClick={() => navigate(link)}
		/>
	);
};

export const NavLinkButton = ({
	path,
	name,
	icon,
	onClose,
}: {
	path: string;
	name: string;
	icon: ReactElement<any, string | JSXElementConstructor<any>>;
	onClose: () => void;
}) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	return (
		<Flex
			align="center"
			w="100%"
			cursor="pointer"
			transition="all 0.03s ease-in"
			_hover={{ bg: "background.100" }}
			pl={4}
			borderRadius={5}
			py={2}
			gap={3}
			onClick={() => {
				navigate(path);
				onClose();
			}}
			bg={pathname.includes(path) ? "lightgray" : "inherit"}
		>
			{icon}
			<Text fontSize="small" fontWeight="semibold">
				{name}
			</Text>
		</Flex>
	);
};

export const ButtonLink = ({
	icon,
	text,
	action,
}: {
	icon: ReactNode;
	text: string;
	action: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => (
	<Flex
		align="center"
		transition="all 0.03s ease-in"
		_hover={{ bg: "background.100" }}
		pl={4}
		borderRadius={5}
	>
		{icon}
		<Button
			variant="ghost"
			onClick={action}
			_hover={{ bg: "inherit" }}
			fontSize="small"
		>
			{text}
		</Button>
	</Flex>
);
