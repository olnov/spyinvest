import {
  initialValue,
  currentValue,
  deltaPercentage,
} from "../../utils/AssetCalculations";

import "../portfolio/PortfolioList.scss";

const formatDate = (date) => {
  if (!date) return "N/A";
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString();
};


const AssetSummary = ({
    assetName,
    assetSymbol,
    datePurchased,
    dateSell,
    quantity,
    qtysell,
    buyingPrice,
    sellingPrice,
    portAssetId,
    currentPrice

}) => {
    console.log('AssetSummary:', assetName, assetSymbol, datePurchased, dateSell, quantity, buyingPrice, sellingPrice, portAssetId);
    return (
        <div className="summary">
            <div className="summary__header">
                <h1>{assetName.substring(0, 15)}</h1>
                <h2>{assetSymbol}</h2>

                <h5>Delta: {deltaPercentage(buyingPrice, currentPrice).toFixed(2)}%</h5>
            </div>
            <div className="static-info">
                {!sellingPrice && buyingPrice && <h3>Purchase Date: {formatDate(datePurchased)}</h3>}
                <h5>Qty : {quantity}</h5>
                <h6>Buy price: ${buyingPrice.toFixed(2)}</h6>
                {!sellingPrice && buyingPrice && <h5>Initial: $ {initialValue(buyingPrice, quantity).toFixed(2)}</h5>}
            </div>
            <div className="dynamic-info">
                <h5>Current: $ {currentPrice}</h5>
                <h5>Total: $ {currentValue(quantity, currentPrice).toFixed(2)}</h5>

                {sellingPrice && <h5>Sell Price: ${sellingPrice.toFixed(2)}</h5>}
            </div>
        </div>
    );

};

export default AssetSummary;
