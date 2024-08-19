
const AssetSummary = ({ assetName, assetSymbol, date_purchase, dateSell, quantity, buyingPrice, sellingPrice }) => {
    
    return (
        <div>
        <h1>{assetName}</h1>
        <h2>{assetSymbol}</h2>
        {/* dates not working v. well  */}
        <h3>Purchase date: {date_purchase}</h3>
    
        <h5>Quantity bought: {quantity}</h5>
    
        <h6>Buy Price: {buyingPrice}</h6>
        <h7>Sell Price: {sellingPrice}</h7>
        <h4>Sold on: {dateSell}</h4>
        </div>
    )
    }

export default AssetSummary