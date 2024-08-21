const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const ALPACA_KEY = import.meta.env.VITE_APCA_API_KEY_ID
const ALPACA_SEC = import.meta.env.VITE_APCA_API_SECRET_KEY


export const fetchPrices = async (symbol, timeframe = "8H") => {

    const requestOptions = {
        method: "GET",
        headers: {
            'APCA-API-KEY-ID': ALPACA_KEY,
            "APCA-API-SECRET-KEY": ALPACA_SEC,

        },
    };
    const response = await fetch(`https://data.alpaca.markets/v2/stocks/bars?symbols=${symbol}&timeframe=${timeframe}`, requestOptions)
    console.log('response', response)
    const data = await response.json()
    

    return data
}


export const fetchAssetSymbol = async (id) => {
    const response = await fetch(`${BACKEND_URL}/assets/${id}`)
    const data = await response.json()
    return data
}