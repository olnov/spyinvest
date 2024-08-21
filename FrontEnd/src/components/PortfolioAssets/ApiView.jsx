import React, { useEffect, useState, useContext } from "react";
import { fetchPrices } from "../../services/assetsServices";
import CalculatedContext from "../../context/calculatedContext";
import { initialValue, currentValue, deltaPrice, deltaPercentage, deltaWeightedPrice} from "../../utils/AssetCalculations";

const ApiView = ({ assetSymbol , buyingPrice, quantity, portAssetId}) => {
    const [symbolPrice, setSymbolPrice] = useState(null);
    console.log('Received this symbol: ', assetSymbol);
    console.log('Received this portAssetId: ', portAssetId);
    
    const { calculatedAssets, setCalculatedAssets } = useContext(CalculatedContext)
    
    useEffect(() => {
        const fetchAssetPrice = async () => {
            try {
                const result = await fetchPrices(assetSymbol, "8H");
                console.log('result',result);
                
                const calculatedResults = {portAssetId: portAssetId, symbolprice: null, initialValue: null, currentValue: null, deltaPrice: null, deltaPercentage: null, deltaWeightedPrice: null};

                if (result && result['bars'] && result['bars'][assetSymbol]) {
                    const symbolPrice = result['bars'][assetSymbol][0].c;
                    setSymbolPrice(symbolPrice);
                    calculatedResults.symbolprice = result['bars'][assetSymbol][0].c;
                    calculatedResults.initialValue = initialValue(buyingPrice, quantity);
                    calculatedResults.currentValue = currentValue(quantity, calculatedResults.symbolprice);
                    calculatedResults.deltaPrice = deltaPrice(buyingPrice, calculatedResults.symbolprice);
                    calculatedResults.deltaPercentage = deltaPercentage(buyingPrice, calculatedResults.symbolprice);
                    calculatedResults.deltaWeightedPrice = deltaWeightedPrice(buyingPrice, calculatedResults.symbolprice, quantity);
                    const final = await calculatedAssets.push(calculatedResults);
                    setCalculatedAssets(final);
                    
                }
               ;
            } catch (err) {
                console.error("Error fetching price:", err);
            }
        };

        fetchAssetPrice();
    }, [assetSymbol]);
    console.log('AAAAAAAAJKDBAWKDGAWKJDGAJKWGDAKJWGDAKJWGDAW: :', calculatedAssets)
    return (
        <div>
            <h1>${ symbolPrice !== null ?  symbolPrice.toFixed(2) : "Loading..."}</h1>
        </div>
    );
};

export default ApiView;
