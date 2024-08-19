import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="grid-container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;