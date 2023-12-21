import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../data/data";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-[#000] text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7">
        <h1 className="mb-6 text-3xl font-semibold lg:text-4xl md:mb-0 lg:leading-normal md:w-2/5">
          <span className="text-[#56d879]">Subscribe</span> us for get news{" "}
          <br />
          events and offers
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800
                sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-whie md:w-auto w-full">
            Submit
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 px-5 py-16 sm:gird-cols-3 lg:grid-cols-4 sm:px-8 sm:text-center">
        <ul className="flex flex-col items-center px-5 text-center sm:text-start sm:block">
          <Link to="/">
            <img
              src="https://svgshare.com/i/uiJ.svg"
              alt=""
              style={{ width: "15%", filter: "brightness(0) invert(1)" }}
            />
          </Link>
          <br />
          <p>The home and elements needeed to create beatiful products.</p>
          <div className="flex items-center mt-[15px] ">
            <AiFillFacebook
              size={25}
              className="cursor-pointer hover:text-teal-400"
            />
            <AiOutlineTwitter
              size={25}
              style={{
                marginLeft: "15px",
                cursor: "pointer",
                hover: " text-teal-400",
              }}
            />
            <AiFillInstagram
              size={25}
              style={{
                marginLeft: "15px",
                cursor: "pointer",
                hover: " text-teal-400",
              }}
            />
            <AiFillYoutube
              size={25}
              style={{
                marginLeft: "15px",
                cursor: "pointer",
                hover: " text-teal-400",
              }}
            />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>
          {footerProductLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-sm leading-6 text-gray-400 duration-300 cursor-pointer hover:text-teal-400"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Shop</h1>
          {footercompanyLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-sm leading-6 text-gray-400 duration-300 cursor-pointer hover:text-teal-400"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Support</h1>
          {footerSupportLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-sm leading-6 text-gray-400 duration-300 cursor-pointer hover:text-teal-400"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-10 pt-2 pb-8 text-sm text-center text-gray-400 sm:grid-cols-2 lg:grid-cols-3">
        <span>© Mahadi {currentYear} . All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="flex items-center justify-center w-full sm:block">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
