import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Lottie from "lottie-react";
import animationData from "../assets/116087-payment-success.json";
import { clearCart } from "../redux/actions/cartAction";
import { useDispatch } from "react-redux";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <SuccessComponent />
      <Footer />
    </div>
  );
};

const SuccessComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(clearCart());
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center ">
        <Lottie animationData={animationData} />
        <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
          Your order is successful
        </h5>
        <br />
        <br />
      </div>
    </div>
  );
};

export default OrderSuccessPage;
