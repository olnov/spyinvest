import React from 'react'
import { useState } from 'react'


const AddAsset = ({date_purchased, date_sell, quantity, buying_price, selling_price}) => {
  const [formData, setFormData] = useState({})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }
  return (
    <div className='form'>
      <form>
        <input id="date-purchased" type='text' placeholder='Date Purchased' value={date_purchased} onChange={handleChange} />
        <input id="date-sold" type='text' placeholder='Date Sell' value={date_sell} onChange={handleChange} />
        <input id="quantity" type='text' placeholder='Quantity' value={quantity} onChange={handleChange} />
        <input id="buying-price" type='text' placeholder='Buying Price' value={buying_price} onChange={handleChange} />
        <input id="selling-price" type='text' placeholder='Selling Price' value={selling_price} onChange={handleChange} />
        <button type='submit' value="add" onClick={handleSubmit}>Add</button>
      </form>
    </div>
  )
}

export default AddAsset