export const getSaleStatus = (status: string) => {
	return status === "OnSale" ? "green" : "gray";
};

export const getAgeStatus = (status: string) => {
	return status === "New" ? "green" : "gray";
};
