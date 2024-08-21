export const initialValue = (buyPrice, quantity) => {
    return buyPrice * quantity;
}

export const currentValue = (quantity, currentPrice) => {
    return quantity * currentPrice;
}

export const deltaPrice = (buyPrice, currentPrice) => {
    return currentPrice - buyPrice;
}

export const deltaPercentage = (buyPrice, currentPrice) => {
    if (buyPrice === 0) {
        return 100;
    } else {
    return deltaPrice(buyPrice, currentPrice) / buyPrice * 100;
    }
}

export const deltaWeightedPrice = (buyPrice, currentPrice, quantity) => {
    return deltaPrice(buyPrice, currentPrice) * quantity;
}