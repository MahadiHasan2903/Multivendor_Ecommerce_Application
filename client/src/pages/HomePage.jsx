import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored/Sponsored";
import Footer from "../components/Layout/Footer";

const HomePage = () => {
  const { isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <div>
        <Header activeHeading={1} />
        <Hero />
        <Categories />
        <BestDeals />
        <Events />
        <FeaturedProduct />
        <Sponsored />
        <Footer />
      </div>
      {/* )} */}
    </>
  );
};

export default HomePage;
