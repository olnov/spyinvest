import React, { useEffect, useState } from "react";
import { fetchPrices } from "../../services/assetsServices";

const ApiView = ({ assetSymbol }) => {
    // const [symbolTicker, setSymbolTicker] = useState("");
    // const [symbolName, setSymbolName] = useState("");
    const [symbolPrice, setSymbolPrice] = useState(0);
    console.log('Received this symbol: ', assetSymbol);

    useEffect(() => {
        const fetchAssetPrice = async () => {
            try {
                const result = await fetchPrices(assetSymbol, "8H");
                console.log('result',result);

                if (result && result['bars'] && result['bars'][assetSymbol]) {
                    setSymbolPrice(result['bars'][assetSymbol][0].c);

                }
            } catch (err) {
                console.error("Error fetching price:", err);
            }
        };

        // const internalApi = async () => {
        //     try {
        //         const result = await fetchPrices(assetSymbol, "8H");
        //         console.log(result);
        //         setSymbolTicker(result.asset)
        //         setSymbolDesc(result.description)
        //         return result.asset
        //         }
        //     catch (err) {
        //         console.error(err);
        //     }

        fetchAssetPrice();
    }, [assetSymbol]); // Dependency array includes assetSymbol to re-fetch if it changes

    return (
        <div>
            <h1>${symbolPrice ? symbolPrice.toFixed(2) : "Loading..."}</h1>
        </div>
    );
};

export default ApiView;
