const currentAssetValue = (asset) => {return asset.currentPrice * asset.quantity_purchase}
const initialAssetValue = (asset) => {return asset.price_buy * asset.quantity_purchase}
const delta = (asset) => {return currentAssetValue(asset) - initialAssetValue(asset)}




export const CurrentTotalValue = (portfolioAssets) => {
    let total = 0
    for (let i = 0; i < portfolioAssets.length; i++) {
      if (portfolioAssets[i].currentPrice === undefined) {
        continue
      }
      total += currentAssetValue(portfolioAssets[i])
    }
   
    return total.toFixed(2)
  }

  export const initialTotalValue = (portfolioAssets) => {
    let total = 0
    for (let i = 0; i < portfolioAssets.length; i++) {
        if (portfolioAssets[i].price_buy === undefined) {
            continue
        }
      total += initialAssetValue(portfolioAssets[i])
    }
    return total.toFixed(2)
  }

  export const calculateBigWin = (portfolioAssets) => {
    let biggestWin = 0
    let biggestWinAsset = ''
    for (let i = 0; i < portfolioAssets.length; i++) {
      if (portfolioAssets[i].currentPrice === undefined) {
        continue
      }
      if (delta(portfolioAssets[i]) > biggestWin) {
        biggestWin = delta(portfolioAssets[i])
        biggestWinAsset = portfolioAssets[i]
      }
    }
    if (biggestWin > 0) {
      return `${biggestWinAsset.asset_name} ${(biggestWin*100/initialAssetValue(biggestWinAsset)).toFixed(2)}%`
    }
  }

  export const calculateBigLoss = (portfolioAssets) => {
    let biggestLoss = 0
    let biggestLossAsset = ''
    for (let i = 0; i < portfolioAssets.length; i++) {
      if (portfolioAssets[i].currentPrice === undefined ||  portfolioAssets[i].price_buy === undefined) { 
        continue
      }
    
      if (delta(portfolioAssets[i]) < biggestLoss) {
        biggestLoss = delta(portfolioAssets[i])
        biggestLossAsset = portfolioAssets[i]
      }
    }
    if (biggestLoss < 0) {
      return `${biggestLossAsset.asset_name} ${(biggestLoss*100/initialAssetValue(biggestLossAsset)).toFixed(2)}%`
    }
    return 'No Loss'
  }

  export const calculatePandL = (portfolioAssets) => {
    let total = 0
    for (let i = 0; i < portfolioAssets.length; i++) {
      if (portfolioAssets[i].currentPrice === undefined) {
        continue
      }
        total += delta(portfolioAssets[i])
    }
    return total.toFixed(2)
  }