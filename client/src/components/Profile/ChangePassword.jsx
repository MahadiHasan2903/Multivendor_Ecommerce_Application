import axios from "axios";
import React, { useState } from "react";
import { server } from "../../server";
import { toast } from "react-toastify";
import styles from "../../styles/styles";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("Request succeeded:", res);
        toast.success(res.data.success);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className="w-full mt-2 800px:w-1/2">
            <label className="block pb-2">Enter your new password</label>
            <div className="relative">
              <input
                type={visible1 ? "text" : "password"}
                className={`${styles.input} w-95% pr-10 mb-4 800px:mb-0`}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {visible1 ? (
                <AiOutlineEye
                  className="absolute cursor-pointer right-2 top-2"
                  size={20}
                  onClick={() => setVisible1(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute cursor-pointer right-2 top-2"
                  size={20}
                  onClick={() => setVisible1(true)}
                />
              )}
            </div>
          </div>
          <div className="w-full mt-2 800px:w-1/2">
            <label className="block pb-2">Enter your new password</label>
            <div className="relative">
              <input
                type={visible2 ? "text" : "password"}
                className={`${styles.input} w-95% pr-10 mb-4 800px:mb-0`}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {visible2 ? (
                <AiOutlineEye
                  className="absolute cursor-pointer right-2 top-2"
                  size={20}
                  onClick={() => setVisible2(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute cursor-pointer right-2 top-2"
                  size={20}
                  onClick={() => setVisible2(true)}
                />
              )}
            </div>
          </div>

          <div className="relative w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <div className="relative">
              <input
                type={visible3 ? "text" : "password"}
                className={`${styles.input} w-95% pr-10 mb-4 800px:mb-0`}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {visible3 ? (
                <AiOutlineEye
                  className="absolute cursor-pointer right-2 top-2"
                  size={20}
                  onClick={() => setVisible3(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute cursor-pointer right-2 top-2"
                  size={20}
                  onClick={() => setVisible3(true)}
                />
              )}
            </div>
            <input
              className={`w-[100%] h-[40px] border hover:bg-[#56D2C4] hover:text-[#fff] border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer transition duration-300`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
