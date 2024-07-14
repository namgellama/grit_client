export const toTitleCaseColor = (str: string) => {
	return str.replace(/\w\S*/g, (txt) => {
		return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
	});
};

export const toTitleCaseSize = (str: string) => {
	if (str.length > 1) {
		return str.toUpperCase();
	}
	return str.replace(/\w\S*/g, (txt) => {
		return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
	});
};
