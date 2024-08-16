import React from 'react'
import { useState } from 'react'
import { createAsset } from '../services/assetServices'



const AddAsset = (props) => {
  const [formData, setFormData] = useState({
    asset_name: '',
    asset_symbol: '',
    date_purchased: '',
    date_sell: '',
    quantity: '',
    buying_price: '',
    selling_price: ''
  })
const portfolioId = props.portfolioId

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    createAsset(portfolioId, formData)
    // Send form data to service //
  }
  return (
    <div className='form'>
      <form>
        <input id="asset-name" type='text' placeholder='Asset Name' required value={formData.asset_name} onChange={handleChange} />
        <input id="asset-symbol" type='text' placeholder='Asset Symbol' required value={formData.asset_symbol} onChange={handleChange} />
        <input id="date-purchased" type='text' placeholder='Date Purchased'required value={formData.date_purchased} onChange={handleChange} />
        <input id="date-sold" type='text' placeholder='Date Sell' required value={formData.date_sell} onChange={handleChange} />
        <input id="quantity" type='text' placeholder='Quantity' required value={formData.quantity} onChange={handleChange} />
        <input id="buying-price" type='text' placeholder='Buying Price' required value={formData.buying_price} onChange={handleChange} />
        <input id="selling-price" type='text' placeholder='Selling Price' required value={formData.selling_price} onChange={handleChange} />
        <button type='submit' value="add" onClick={handleSubmit}>Add</button>
      </form>
    </div>
  )
}

export default AddAsset