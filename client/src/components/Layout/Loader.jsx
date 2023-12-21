import Lottie from "lottie-react";
import animationData from "../../assets/127493-ecommerce-loader.json";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Lottie animationData={animationData} width={300} height={300} />
    </div>
  );
};

export default Loader;
