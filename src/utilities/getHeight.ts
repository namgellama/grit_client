export const getHeight = (length: number) => {
	return length === 1
		? "80px"
		: length === 2
		? "200px"
		: length === 3
		? "250px"
		: length === 4
		? "350px"
		: "380px";
};
