export const toTitleCaseColor = (str: string) => {
	const [color, hexColor] = str.split(", ");

	const titleCaseColor = color.replace(/\w\S*/g, (txt) => {
		return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
	});

	const uppercaseHexColor = hexColor?.toUpperCase() || "";

	return `${titleCaseColor}, ${uppercaseHexColor}`;
};

export const toTitleCaseSize = (str: string) => {
	if (str.length > 1) {
		return str.toUpperCase();
	}
	return str.replace(/\w\S*/g, (txt) => {
		return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
	});
};
