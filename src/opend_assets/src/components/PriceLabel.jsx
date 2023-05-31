import React from "react";

const PriceLabel = ({ price }) => {
  return (
    <div className="disButtonBase-root disChip-root makeStyles-price-23 disChip-outlined">
      <span className="disChip-label">{price} DERI</span>
    </div>
  );
};

export default PriceLabel;
