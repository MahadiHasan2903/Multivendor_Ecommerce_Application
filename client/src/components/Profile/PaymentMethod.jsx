import React from "react";
import styles from "../../styles/styles";
import { AiOutlineDelete } from "react-icons/ai";

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-[25px] font-[600] text-[#000000ba]">
          {" "}
          Payment Methods
        </h1>
        <div className={`${styles.button} rounded-md`}>
          <span className="text-[#fff]">Add new</span>
        </div>
      </div>
      <br />

      <div className="w-full bg-white h-[70px]  rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt=""
          />
          <h5 className="pl-5 font-[600]">Mahadi Hasan</h5>
        </div>

        <div className="flex items-center pl-8">
          <h6>1234 **** *** ****</h6>
          <h5 className="pl-6">08/2023</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
