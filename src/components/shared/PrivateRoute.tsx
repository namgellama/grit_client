import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const PrivateRoute = () => {
	const { user } = useAppSelector((state) => state.auth);

	return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
