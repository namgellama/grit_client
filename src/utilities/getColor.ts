export const getOrderColor = (status: string) => {
	if (status === "PENDING") return "blue";
	if (status === "SHIPPED") return "yellow";
	if (status === "DELIVERED") return "green";
	if (status === "CANCELLED") return "red";
};

export const getPaymentColor = (status: string) => {
	if (status === "PENDING") return "blue";
	if (status === "COMPLETED") return "green";
	if (status === "FAILED") return "red";
	if (status === "REFUNDED") return "orange";
};
