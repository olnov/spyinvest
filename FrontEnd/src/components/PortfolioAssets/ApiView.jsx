// import React, { useEffect, useState, useContext } from "react";
// import { fetchPrices } from "../../services/assetsServices";

// import { initialValue, currentValue, deltaPrice, deltaPercentage, deltaWeightedPrice } from "../../utils/AssetCalculations";

// const ApiView = ({ assetSymbol, buyingPrice, quantity, portAssetId }) => {
//     const [symbolPrice, setSymbolPrice] = useState(null);
//     console.log('Received this symbol: ', assetSymbol);
//     console.log('Received this portAssetId: ', portAssetId);
//     const assetId = portAssetId
   

//     const addNewAsset = (newAsset) => { setCalculatedAssets((prevState) => [...prevState, newAsset]) };

//     useEffect(() => {
//         const fetchAssetPrice = async () => {
//             try {
//                 const result = await fetchPrices(assetSymbol, "8H");

//                 // const calculatedResults = { portAssetId: portAssetId, symbolprice: null, initialValue: null, currentValue: null, deltaPrice: null, deltaPercentage: null, deltaWeightedPrice: null };

//                 if (result && result['bars'] && result['bars'][assetSymbol]) {
//                     const symbolPrice = result['bars'][assetSymbol][0].c;
//                     setSymbolPrice(symbolPrice);
//                     setInitialValue(initialValue(buyingPrice, quantity));
//                     setCurrentValue(currentValue(quantity, symbolPrice));
//                     setDeltaPrice(deltaPrice(buyingPrice, symbolPrice));
//                     setDeltaPercentage(deltaPercentage(buyingPrice, symbolPrice));
//                     setDeltaWeightedPrice(deltaWeightedPrice(buyingPrice, symbolPrice, quantity));
//                     setCalculatedAsset({ assetId: assetId, initialValue: initialValue, currentValue: currentValue, deltaPrice: deltaPrice, deltaPercentage: deltaPercentage, deltaWeightedPrice: deltaWeightedPrice });

//                     addNewAsset(calculatedAsset);

//                     // const ApiView = () => {
//                     //     const { portfolioAssetsState, setPortfolioAssetsState } = useContext(Context);
//                     //     const addNewAsset = (newAsset) => { setPortfolioAssetsState((calculatedAssets) => [...calculatedAssets, newAsset]); };

//                 }
//             } catch (err) {
//                 console.error("Error fetching price:", err);
//             }
//         };

//         fetchAssetPrice();
//     }, [assetSymbol]);
//     console.log('AAAAAAAAJKDBAWKDGAWKJDGAJKWGDAKJWGDAKJWGDAW: :', calculatedAssets)
//     return (
//         <div>
//             <h1>${symbolPrice !== null ? symbolPrice : "Loading..."}</h1>
//         </div>
//     );
// };

// export default ApiView;
