import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const AdminRoute = () => {
	const { user } = useAppSelector((state) => state.auth);

	return user && user.role === "Admin" ? (
		<Outlet />
	) : (
		<Navigate to="/login" replace />
	);
};

export default AdminRoute;
