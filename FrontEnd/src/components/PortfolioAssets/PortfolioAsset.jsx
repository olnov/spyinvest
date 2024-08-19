import React from 'react'

const PortfolioAsset = ({portfolio_id, asset_id, buying_price, selling_price}) => {
  return (
    <>
    <h1>Portfolio Asset</h1>
    <div>{portfolio_id}</div>
    <div>{asset_id}</div>
    <div>{buying_price}</div>
    <div>{selling_price}</div>
    </>
  )
}

export default PortfolioAsset