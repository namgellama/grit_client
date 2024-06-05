export const getStringDate = (data: Date) => {
	return (
		new Date(data).toDateString() +
		", " +
		new Date(data).toLocaleTimeString()
	);
};
