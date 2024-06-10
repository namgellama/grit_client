import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { JSXElementConstructor, LegacyRef, ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";

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
}: {
	path: string;
	name: string;
	icon: ReactElement<any, string | JSXElementConstructor<any>>;
}) => {
	const navigate = useNavigate();

	return (
		<Flex
			align="center"
			w="100%"
			transition="all 0.03s ease-in"
			_hover={{ bg: "background.100" }}
			pl={4}
			borderRadius={5}
		>
			{icon}
			<Button
				variant="ghost"
				onClick={() => navigate(path)}
				_hover={{ bg: "inherit" }}
			>
				{name}
			</Button>
		</Flex>
	);
};
