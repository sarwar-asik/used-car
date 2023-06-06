import React from "react";

import Advertisement from "../advertise/Advertisement";
import Banner from "../banner/Banner";
import Categories from "../categories/Categories";
import Hero1 from "../hero1/Hero1";
import ProductsGallery from "../gallery/ProductsGallery";
import Contacts from "../contact/Contact";


const Home = () => {


  return (
    <div >
      <Banner />
      <Categories />

     <Hero1></Hero1>
      <Advertisement />
      <ProductsGallery/>
      <Contacts/>
    </div>
  );
};

export default Home;
