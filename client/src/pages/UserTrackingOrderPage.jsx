import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import OrderTracking from "../components/Profile/OrderTracking";

const UserTrackingOrderPage = () => {
  return (
    <div>
      <Header />
      <OrderTracking />
      <Footer />
    </div>
  );
};
export default UserTrackingOrderPage;
