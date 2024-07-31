import { useAppSelector } from "@/app/hooks";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
	const { user } = useAppSelector((state) => state.auth);

	return user ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
