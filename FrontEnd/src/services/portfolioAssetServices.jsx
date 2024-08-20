const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const createAsset = async ( portfolioId, assetName, assetSymbol, datePurchased, dateSell, quantity, buyingPrice, sellingPrice, token) => {
    //tbc//
    const response = await fetch(`${BACKEND_URL}/portfolio_assets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ portfolioId, assetName, assetSymbol, datePurchased, dateSell, quantity, buyingPrice, sellingPrice }),
    });

    if (response.status === 201) {
        let data = await response.json();
        return data;
    } else {
        throw new Error(`Received status ${response.status} when creating asset. Expected 201`)
    }
}

export const getAllPortfolioAssets = async (token) => {
    const response = await fetch(`${BACKEND_URL}/portfolio_assets`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }, 
    });

    if (response.status === 200) {
        let data = await response.json();
        return data;
    }
    else {
        throw new Error(`Received status ${response.status} when fetching portfolio assets. Expected 200`)
    }
};

export const getPortfolioAssetsByPortfolioId = async (portfolioId, token) => {
    const response = await fetch(`${BACKEND_URL}/portfolio_assets/${portfolioId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (response.status === 200) {
        let data = await response.json();
        return data;
    } else {
        throw new Error(`Received status ${response.status} when fetching portfolio assets. Expected 200`)
    }
}