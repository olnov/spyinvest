import {useState} from 'react'

import ViewAsset from '../components/ViewAsset';

const CheckAssets = () => {
    const [assets, setAssets] = useState([{ id: 1, assetName: "Portfolio 1", assetId: 1000, datePurchased: 200, dateSell: "20%", quantity: "2021-09-01" }, { id: 2, assetName: "Portfolio 2", assetId: 2000, datePurchased: 400, dateSell: "20%", quantity: "2021-09-01" }, { id: 3, assetName: "Portfolio 3", assetId: 3000, datePurchased: 600, dateSell: "20%", quantity: "2021-09-01" }]); // Hardcoded for now
  return (
    <>
    
    {assets.map((asset) => (
        <ViewAsset
        key = {asset.id}
        assetName = {asset.assetName}
        assetId = {asset.id}
        date_purchased={asset.datePurchased}
        date_sell={asset.dateSell}
        quantity={asset.quantity}
        />
    ))}
    </>
  )
}

export default CheckAssets