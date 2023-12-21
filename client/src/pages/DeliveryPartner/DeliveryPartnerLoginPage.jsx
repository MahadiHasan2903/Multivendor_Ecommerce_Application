import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PartnerLogin from "../../components/DeliveryPartner/PartnerLogin";

const DeliveryPartnerLoginPage = () => {
  const navigate = useNavigate();
  const serviceProvider = useSelector(
    (state) => state.serviceProvider.serviceProvider
  );

  useEffect(() => {
    if (serviceProvider && serviceProvider._id) {
      navigate("/partner-profile");
    }
  }, [navigate, serviceProvider]);

  return (
    <div>
      <PartnerLogin />
    </div>
  );
};

export default DeliveryPartnerLoginPage;
