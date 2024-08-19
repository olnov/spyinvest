const fetchAssetsData = async () => {
    const request = await fetch("https://www.sec.gov/files/company_tickers.json");
    const response = await request.json();
    const count = Object.keys(response).length;
    console.log("Lenght:",count);
    for (var i=0;i<count;i++) {
        console.log("Ticker:",response[i].ticker);
        console.log("Description:",response[i].title)
    }
}

fetchAssetsData();