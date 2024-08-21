import React from "react";
import ApiView from "./ApiView";
import { initialValue, currentValue, deltaPrice, deltaPercentage, deltaWeightedPrice } from "../../utils/AssetCalculations";



const AssetSummary = ({ 
    assetName, 
    assetSymbol, 
    date_purchase, 
    dateSell, 
    quantity, 
    buyingPrice, 
    sellingPrice,
    portAssetId,
    currentPrice
}) => {
    return (
        <div className="summary">
            <h1>{assetName}</h1>
            <h2>{assetSymbol}</h2>
            <ApiView assetSymbol={assetSymbol}
            buyingPrice={buyingPrice}
            quantity={quantity}
            portAssetId={portAssetId} />
            <h1>Initial Value: ${initialValue(buyingPrice, quantity).toFixed(2)}</h1>
            <h2>Current Value: ${currentValue(currentPrice, quantity).toFixed(2)}</h2>
            <h4>Delta Percentage: {deltaPercentage(buyingPrice, currentPrice).toFixed(2)}%</h4>
            <h5> Delta Weight: {deltaWeightedPrice(buyingPrice,currentPrice, quantity)}</h5>

            <h3>Purchase Date: {(datePurchased)}</h3>
            <h5>Quantity Bought: {quantity}</h5>
            <h6>Buy Price: ${buyingPrice.toFixed(2)}</h6>
            {sellingPrice && <h5>Sell Price: ${sellingPrice.toFixed(2)}</h5>}
            {dateSell && <h4>Sold On: {(dateSell)}</h4>}
        </div>
    );
};

export default AssetSummary;