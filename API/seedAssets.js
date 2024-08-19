require('dotenv').config();
const { sequelize } = require('./db/db');
const Asset = require('./models/Asset');


const fetchAssetsData = async () => {
    const request = await fetch("https://www.sec.gov/files/company_tickers.json");
    const response = await request.json();
    const count = Object.keys(response).length;
    console.log("Lenght:", count);
    await sequelize.sync({ force: true });
    for (var i = 0; i < count; i++) {



        const asset = await Asset.create({
            asset: response[i].ticker,
            description: response[i].title
        })

        // console.log("Ticker:", response[i].ticker);
        // console.log("Description:", response[i].title)
    }
}

fetchAssetsData();


const seedDatabase = async () => {

    // const SECseedURL = await fetch("https://www.sec.gov/files/company_tickers.json")
    // const serialized = await SECseedURL.json()
    // // console.log(serialized)
    // for (const property in serialized) {
    //     console.log(`${property}: ${serialized["ticker"]}`)
    // }

    // Use fetch to get the JSON data from the URL
    // fetch('https://www.sec.gov/files/company_tickers.json')
    //     .then(response => response.json()) // Parse the response as JSON
    //     .then(data => {
    //         // Extract the tickers
    //         const tickers = Object.values(data).map(company => company);
    //     })
    //     .catch(error => console.error('Error fetching the data:', error));

    // const getCompTickers = async () => {
    //     const compDetails = await fetch('https://www.sec.gov/files/company_tickers.json')
    //     const result = await compDetails.json()
    //     const tickers = Object.values(result).map(company => company.ticker);
    //     console.log(tickers)
    //     // return result
    // }

    // getCompTickers()

    // for (let k = 0; k < tickers.length; k++) {
    //     let assetTicker = tickers[k].ticker
    //     let assetTitle = tickers[k].title
    //     console.log(assetTicker)
    // const asset = await Asset.create({
    //     asset: assetTicker,
    //     description: assetTitle
    // });
    // assets.push(asset);
    // }


}
// seedDatabase();



