const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const ALPACA_KEY = import.meta.env.VITE_APCA_API_KEY_ID
const ALPACA_SEC = import.meta.env.VITE_APCA_API_SECRET_KEY

import { getMyAssets } from "./portfolioAssetServices"
export const fetchPrices = async (symbol, timeframe = "8H") => {
    const requestOptions = {
        method: "GET",
        headers: {
            'APCA-API-KEY-ID': ALPACA_KEY,
            "APCA-API-SECRET-KEY": ALPACA_SEC,

        },
    };
    const response = await fetch(`https://data.alpaca.markets/v2/stocks/bars?symbols=${symbol}&timeframe=${timeframe}`, requestOptions)
    const data = await response.json()
    return data
}


export const fetchAssetSymbol = async (id) => {
    const response = await fetch(`${BACKEND_URL}/assets/${id}`)
    const data = await response.json()
    return data
}

export const fetchAssetsandCurrentPrices = async (token) => {

    const fetchedAssets = await getMyAssets(token)
    console.log('NEW FETCHED ASSETS AND CURRENT PRICES - ASSETS ONLY: ' + fetchedAssets)
    const symbols = fetchedAssets.map((asset) => asset.symbol)
    const timeframe = "8H"

    for (let i = 0; i < symbols.length; i++) {
        const requestOptions = {
            method: "GET",
            headers: {
                'APCA-API-KEY-ID': ALPACA_KEY,
                "APCA-API-SECRET-KEY": ALPACA_SEC,
    
            },
        };
        const response = await fetch(`https://data.alpaca.markets/v2/stocks/bars?symbols=${symbols[i]}&timeframe=${timeframe}`, requestOptions)
        const data = await response.json()
        console.log('NEW FETCHED ASSETS AND CURRENT PRICES - DATA: ' + data)

        if (data && data['bars'] && data['bars'][symbols[i]]) {
            fetchedAssets[i].currentPrice = data['bars'][symbols[i]][0].c
        }
    }
    return fetchedAssets
};
