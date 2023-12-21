import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const PartnerProtectedRoute = ({ children }) => {
  const isLoading = useSelector((state) => state.serviceProvider.isLoading);
  const serviceProvider = useSelector(
    (state) => state.serviceProvider.serviceProvider
  );
  // console.log(serviceProvider);

  const allowedRoles = ["Transporter", "Deliveryman"];

  if (
    !serviceProvider ||
    !serviceProvider.role ||
    !allowedRoles.includes(serviceProvider.role)
  ) {
    return <Navigate to="/partner-login" replace />;
  }

  return children;
};

export default PartnerProtectedRoute;
