import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { getServiceProviderById } from "../../redux/actions/serviceProviderAction";

const Profile = () => {
  const serviceProvider = useSelector(
    (state) => state.serviceProvider.serviceProvider
  );
  // console.log(serviceProvider);
  const dispatch = useDispatch();

  const [name, setName] = useState(serviceProvider && serviceProvider.name);
  const [email, setEmail] = useState(serviceProvider && serviceProvider.email);
  const [address, setAddress] = useState(
    serviceProvider && serviceProvider.address
  );
  const [phoneNumber, setPhoneNumber] = useState(
    serviceProvider && serviceProvider.phoneNumber
  );
  const [isAvailable, setIsAvailable] = useState(
    serviceProvider && serviceProvider.isAvailable
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [opVisible, setOpVisible] = useState(false);
  const [npVisible, setNpVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedServiceProvider = {
        name,
        email,
        oldPassword,
        newPassword,
        phoneNumber,
        address,
        isAvailable,
      };
      const { data } = await axios.put(
        `${server}/service-provider/update-service-provider/${serviceProvider._id}`,
        updatedServiceProvider
      );
      toast.success("Profile Updated Successfully");
      dispatch(getServiceProviderById(serviceProvider._id));
    } catch (error) {
      console.error("Error updating service provider:", error);
      toast.error("Something went wrong. Check your credentials");
    }
  };

  return (
    <div className="flex flex-col mt-2 w-[80%] 800px:w-[50%]">
      <div className="flex flex-col items-center w-full">
        <div className="relative">
          <img
            src={`${serviceProvider?.avatar?.url}`}
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
            alt=""
          />
        </div>
      </div>
      <br />
      <br />
      <div className="w-full px-5">
        <form onSubmit={handleSubmit} aria-required={true}>
          <div className=" w-[100%] mb-2">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className=" w-[100%] mb-2 ">
            <label className="block pb-2">Email Address</label>
            <input
              type="text"
              className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className=" w-[100%] mb-2">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className=" w-[100%] mb-2">
            <label className="block pb-2">Address</label>
            <input
              type="text"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className=" w-[95%] my-4">
            <label className="block pb-2">Select Availability</label>
            <select
              name="role"
              id="role"
              value={isAvailable}
              onChange={(e) => setIsAvailable(e.target.value === "true")}
              className="block w-full px-3 py-2 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>

          <div className="w-[95%] mb-2">
            <label className="block pb-2">Enter your Old password</label>
            <div className="relative">
              <input
                type={opVisible ? "text" : "password"}
                className={`${styles.input} !w-95% pr-10 mb-4 800px:mb-0`}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {opVisible ? (
                <AiOutlineEye
                  className="absolute cursor-pointer right-2 top-2"
                  size={20}
                  onClick={() => setOpVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute cursor-pointer right-2 top-2"
                  size={20}
                  onClick={() => setOpVisible(true)}
                />
              )}
            </div>
          </div>
          <div className="w-[95%] mb-2">
            <label className="block pb-2">Enter your New password</label>
            <div className="relative">
              <input
                type={npVisible ? "text" : "password"}
                className={`${styles.input} !w-95% pr-10 mb-4 800px:mb-0`}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {npVisible ? (
                <AiOutlineEye
                  className="absolute cursor-pointer right-2 top-2"
                  size={20}
                  onClick={() => setNpVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute cursor-pointer right-2 top-2"
                  size={20}
                  onClick={() => setNpVisible(true)}
                />
              )}
            </div>
          </div>

          <input
            className={`w-[50%] h-[40px]  hover:bg-[#56D2C4] border border-[#3a24db] text-center text-[#3a24db] hover:text-[#ffffff] rounded-[3px] mt-8 cursor-pointer`}
            required
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;
