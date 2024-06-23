import { Text } from "@chakra-ui/react";

interface Props {
	heading?: string;
	description?: string;
}

const HeaderText = ({ heading, description }: Props) => {
	return (
		<>
			<Text as="h4" fontWeight="bold">
				{heading}
			</Text>

			{description && (
				<Text as="p" fontSize="sm">
					{description}
				</Text>
			)}
		</>
	);
};

export default HeaderText;
