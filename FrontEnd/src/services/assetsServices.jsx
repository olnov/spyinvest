// const PlaceHolderSymbol = ""

export const fetchPrices = async (symbol, timeframe = "8H") => {
    console.log("Symbol:" + symbol)
    console.log(timeframe)

    // console.log(symbol)
    const requestOptions = {
        method: "GET",
        headers: {
            'APCA-API-KEY-ID': "PK1ODACYZZ6N9AZ5UFC5",
            "APCA-API-SECRET-KEY": "jbw0HcX0zbk3Yb3p7nKbdBPn6Q3tF6wADuMP7Uie"

        },
    };
    const response = await fetch(`https://data.alpaca.markets/v2/stocks/bars?symbols=${symbol}&timeframe=${timeframe}`, requestOptions)
    const data = await response.json()

    return data

    // setSymbolState(symbol)
    // setSymbolPrice(data.bars[symbol][0].c)
    // return console.log(data.bars[symbol][0].c)
}


export const fetchAssetSymbol = async (id) => {
    const response = await fetch(`http://localhost:3000/assets/${id}`)
    const data = await response.json()
    console.log("Here to identify:")
    console.log(data)
    return data
}