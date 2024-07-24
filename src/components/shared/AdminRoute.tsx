import { useAppSelector } from "@/app/hooks";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
	const { user } = useAppSelector((state) => state.auth);

	return user && user.role === "Admin" ? (
		<Outlet />
	) : (
		<Navigate to="/login" replace />
	);
};

export default AdminRoute;
