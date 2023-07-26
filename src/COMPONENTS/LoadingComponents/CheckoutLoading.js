import React, { useEffect, useState } from 'react';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';


const CheckoutLoading = () => {
  const [backgroundColor, setBackgroundColor] = useState('rgb(226, 226, 226)');

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundColor((prevColor) =>
        prevColor === 'rgb(226, 226, 226)'
          ? 'rgb(207, 206, 206)'
          : 'rgb(226, 226, 226)'
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mainBodyLoading">
      {/* Header */}
      <div className="headerLoading" style={{ backgroundColor }}></div>

      {/* Cart icon */}
      <ProductionQuantityLimitsIcon style={{fontSize:"calc(50vh + 10vw)",color:backgroundColor,transition:"color 0.9s ease-in-out",marginTop:"10vh"}} />
    </div>
  );
};

export default CheckoutLoading;
