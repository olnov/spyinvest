import ViewAsset from "../components/ViewAsset";
import { useEffect, useState } from "react";
import { createPortfolio } from "../services/PortfoliosServices";
import { getPortfolioAssetsByPortfolioId } from "../services/portfolioAssetServices";
import { getAllPortfolioAssets } from "../../../API/controllers/portfolioAssets";


const MyAssests = (props) => {
  const portfolioId = props.portfolioId
  const [allAssests, setAllAssests] = useState([]);
  const fetchAllAssests = async () => {
    try { 
    const data = await getPortfolioAssetsByPortfolioId(portfolioId, localStorage.getItem("token"));
    setAllAssests(data);
  } catch(err) {
    console.error(err);
  }
}, [];



useEffect(() => {
  fetchAllAssests();
}, []);
  
    return (
      <>
    
    {assets.map((asset) => (
        <PortfolioAsset
        key = {asset.id}
        assetName = {asset.assetName}
        assetId = {asset.id}
        date_purchased={asset.datePurchased}
        date_sell={asset.dateSell}
        quantity={asset.quantity}
        />
      ))}
    <button link to = "/addAsset">Add Asset</button>
    </>
    );

}
  // This page is to view all account specific assets


export default MyAssests;