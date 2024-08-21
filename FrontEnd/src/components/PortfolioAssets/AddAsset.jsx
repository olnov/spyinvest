import React, { useState } from 'react';
import { createAsset } from '../../services/portfolioAssetServices';
import Modal from 'react-bootstrap/Modal';
// Add Asset form - is called from the portfolio modal and is used to add an asset to a portfolio
// Added modal more for visual to help explain user flow


const AddAsset = (props) => {
  console.log(props);
  const portfolioId = props.portfolioId;
  const [formData, setFormData] = useState({
    portfolio_id: portfolioId,
  });


  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'quantity':
        setFormData({ ...formData, quantity: parseInt(value) });
        break;
      case 'buying_price':
        setFormData({ ...formData, buying_price: parseInt(value) });
        break;
      case 'selling_price':
        setFormData({ ...formData, selling_price: parseInt(value) });
        break;
      case 'quantity_sell':
        setFormData({ ...formData, quantity_sell: parseInt(value) });
        break;
      default:
        setFormData({
          ...formData,
          [id]: value
        });
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formattedDateSell = formData.date_sell ? new Date(formData.date_sell).toISOString() : null;
    const formattedDatePurchased = formData.date_purchased ? new Date(formData.date_purchased).toISOString() : null;
    const payload = { ...formData, date_sell: formattedDateSell, date_purchased: formattedDatePurchased }
    await createAsset(token, payload);

    props.fetchPortfolioAssets()
    props.handleToggleAssetModal(false)
  };

  return (
    <Modal show={props.showAssetModal} onHide={() => props.handleToggleAssetModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Asset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <input id="asset_name" type='text' placeholder='Asset Name' required value={formData.asset_name} onChange={handleChange} />
          <input id="asset_symbol" type='text' placeholder='Asset Symbol' required value={formData.asset_symbol} onChange={handleChange} />
          <input id="date_purchased" type='date' placeholder='Date Purchased' required value={formData.date_purchased} onChange={handleChange} />
          <input id="date_sell" type='date' placeholder='Date Sell' value={formData.date_sell} onChange={handleChange} />
          <input id="quantity" type='number' placeholder='Quantity' required value={formData.quantity} onChange={handleChange} />
          <input id="buying_price" type='number' placeholder='Buying Price' required value={formData.buying_price} onChange={handleChange} />
          <input id="selling_price" type='number' placeholder='Selling Price' value={formData.selling_price} onChange={handleChange} />
          <input id="quantity_sell" type='number' placeholder='Quantity Sold' value={formData.quantity_sell} onChange={handleChange} />
          <button type='submit'>Add</button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAsset;
