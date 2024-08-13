import React from 'react'

const ViewAsset = ({portfolio_id, asset_id, date_purchased, date_sell, quantity, buying_price, selling_price}) => {
    return (
    <>
    <h1>Portfolio Asset</h1>
    <div>{portfolio_id}</div>
    <div>{asset_id}</div>
    <div>{date_purchased}</div>
    <div>{date_sell}</div>
    <div>{quantity}</div>
    <div>{buying_price}</div>
    <div>{selling_price}</div>
    </>
    )
}

export default ViewAsset