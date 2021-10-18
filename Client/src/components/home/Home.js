import React from "react";
import Navbar from "../navbar/Navbar";
import Card from "../cards/Card";
import Header from "../header/Header";
import Contact from "../contact/Contact";
import RightCard from "../cards/RightCard";
import Footer from "../footer/Footer";
import "./home.css";
const Home = () => {
  return (
    <div>
      <Header />
      <div className="home-page">
        <div className="article-blog">
          <Card />
          <Card />
          <Card />
        </div>
        <RightCard />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
