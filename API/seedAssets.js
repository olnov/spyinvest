require('dotenv').config();
const { sequelize } = require('./db/db');
const Asset = require('./models/Asset');


const fetchAssetsData = async () => {
try {
    const request = await fetch("https://www.sec.gov/files/company_tickers.json");
    if (request){
        console.log(request)
    }
    const response = await request.json();
    console.log("Response:", response);
    const count = Object.keys(response).length;
    console.log("Lenght:", count);
    await sequelize.sync({ force: true });
    for (var i = 0; i < count; i++) {

        const asset = await Asset.create({
            asset: response[i].ticker,
            description: response[i].title
        })

        console.log("Ticker:", response[i].ticker);
        console.log("Description:", response[i].title)
    }
} catch (error) {
    console.error("Error fetching data:", error);
}
}

fetchAssetsData();
