import { IconButton, Text } from "@chakra-ui/react";
import { LegacyRef, ReactElement, JSXElementConstructor } from "react";
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
