import React from "react";
import PartnerHeader from "../../components/DeliveryPartner/Layout/PartnerHeader";
import Footer from "../../components/Layout/Footer";
import PartnerOrderDetails from "../../components/DeliveryPartner/PartnerOrderDetails";

const DeliveryPartnerOrderDetialsPage = () => {
  return (
    <div>
      <PartnerHeader />
      <PartnerOrderDetails />
      <Footer />
    </div>
  );
};

export default DeliveryPartnerOrderDetialsPage;
