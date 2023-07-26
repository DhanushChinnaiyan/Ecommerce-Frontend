import "./Loading.css";
import React, { useEffect, useState } from "react";

const BodyLoading = () => {
  const [backgroundColor, setBackgroundColor] = useState("rgb(226, 226, 226)");

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundColor((prevColor) =>
        prevColor === "rgb(226, 226, 226)"
          ? "rgb(207, 206, 206)"
          : "rgb(226, 226, 226)"
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mainBodyLoading">
      {/* Header */}
      <div className="headerLoading" style={{ backgroundColor }}></div>
      {/* Categories  */}
      <div className="categoryLoading">
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
      </div>

      {/* Slides */}
      <div className="slidesLoading" style={{ backgroundColor }}></div>
      {/* Recently viewed products */}
      <div className="RecentlyViewedProductLoading">
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
      </div>

      

      {/* Products */}
      <div className="ProductsLoading">
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
      </div>
    </div>
  );
};

export default BodyLoading;
