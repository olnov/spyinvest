import React from "react";
import ApiView from "./ApiView";
import "../portfolio/PortfolioList.scss";

const formatDate = (date) => {
    if (!date) return "N/A";
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString();
};

const AssetSummary = ({
    assetName,
    assetSymbol,
    date_purchase,
    dateSell,
    quantity,
    buyingPrice,
    sellingPrice
}) => {
    return (
        <div className="summary">
            <h1>{assetName}</h1>
            <h2>{assetSymbol}</h2>
            <ApiView assetSymbol={assetSymbol} />

            <h3>Purchase Date: {formatDate(date_purchase)}</h3>
            <h5>Quantity Bought: {quantity}</h5>
            <h6>Buy Price: ${buyingPrice.toFixed(2)}</h6>
            {sellingPrice && <h5>Sell Price: ${sellingPrice.toFixed(2)}</h5>}
            {dateSell && <h4>Sold On: {formatDate(dateSell)}</h4>}
        </div>
    );
};

export default AssetSummary;