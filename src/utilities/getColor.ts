export const getOrderColor = (status: string) => {
	if (status === "Pending") return "blue";
	if (status === "Shippped") return "yellow";
	if (status === "Delivered") return "green";
	if (status === "Cancelled") return "red";
};

export const getPaymentColor = (status: string) => {
	if (status === "Pending") return "blue";
	if (status === "Completed") return "green";
	if (status === "Failed") return "red";
	if (status === "Refunded") return "orange";
};
