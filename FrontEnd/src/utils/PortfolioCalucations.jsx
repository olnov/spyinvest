import { deltaWeightedPrice , deltaPercentage} from "./AssetCalculations";

export const biggestWinner = (assets) => {
    // This does not take weight into account
    return assets.sort((a, b) => deltaPercentage(b) - deltaPercentage(a))[0]
};

export const weightedBiggestWinner = (assets, portfolioId) => {
    
    let winner = null
    let winnerWeighted = null
    for (let asset of assets){
        if (asset.portfolio_id === portfolioId){
        if (deltaWeightedPrice(asset.price_buy, asset.price_current, asset.quantity) > winnerWeighted || winner === null){
            winner = asset
            winnerWeighted = deltaWeightedPrice(asset.price_buy, asset.price_current, asset.quantity)
        }
    }
    } return winner.description
}

export const biggestLoser = (assets) => {
    // This does not take weight into account
    return assets.sort((a, b) => deltaPercentage(a) - deltaPercentage(b))[0]
};

export const weightedBiggestLosers = (assets) => {
    let loser = null
    let loserWeighted = null
    for (let asset of assets){
        if (deltaWeightedPrice(asset.price_buy, asset.price_current, asset.quantity) < loserWeighted || loser === null){
            loser = asset
            loserWeighted = deltaWeightedPrice(asset.price_buy, asset.price_current, asset.quantity)
        }
        
    } return loser 
}

