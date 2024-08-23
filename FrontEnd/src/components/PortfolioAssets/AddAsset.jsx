import React, { useState } from 'react';
import { createAsset } from '../../services/portfolioAssetServices';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Add Asset form - is called from the portfolio modal and is used to add an asset to a portfolio
// Added modal more for visual to help explain user flow


const AddAsset = (props) => {
  // console.log(props);
  const portfolioId = props.portfolioId;
  const [formData, setFormData] = useState({
    portfolio_id: portfolioId,
  });


  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'asset_symbol':
        setFormData({ ...formData, asset_symbol: value.toUpperCase() });
        break;
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
    <div style={{ minWidth: "800px" }}>


      <Modal show={props.showAssetModal} onHide={() => props.handleToggleAssetModal(true)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Asset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form onSubmit={handleSubmit}>
          <input id="asset_name" type='text' placeholder='Asset Name' required value={formData.asset_name} onChange={handleChange} />
          <input id="asset_symbol" type='text' placeholder='Asset Symbol' required value={formData.asset_symbol} onChange={handleChange} />
          <input id="date_purchased" type='date' placeholder='Date Purchased' required value={formData.date_purchased} onChange={handleChange} />
          <input id="date_sell" type='date' placeholder='Date Sell' value={formData.date_sell} onChange={handleChange} />
          <input id="quantity" type='number' placeholder='Quantity' required value={formData.quantity} onChange={handleChange} />
          <input id="buying_price" type='number' placeholder='Buying Price' required value={formData.buying_price} onChange={handleChange} />
          <input id="selling_price" type='number' placeholder='Selling Price' value={formData.selling_price} onChange={handleChange} />
          <input id="quantity_sell" type='number' placeholder='Quantity Sold' value={formData.quantity_sell} onChange={handleChange} />
          <button type='submit'>Add</button>
        </form> */}

          <Form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", gap: "1rem" }}>

            <div style={{ display: 'flex', flex: "2", gap: "1vw" }}>
              <Form.Group className="mb-3" controlId="asset_name">
                <Form.Label>Asset Name</Form.Label>
                <Form.Control type="text" placeholder="Enter the name of the company" value={formData.asset_name} onChange={handleChange} />
                {/* <Form.Text className="text-muted">
              Enter the name of the company
            </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="asset_symbol">
                <Form.Label>Asset Symbol</Form.Label>
                <Form.Control type="text" placeholder="Enter exact match" value={formData.asset_symbol} onChange={handleChange} />
                {/* <Form.Text className="text-muted">
              Enter symbol exact match
            </Form.Text> */}
              </Form.Group>
            </div>


            <div style={{ display: 'flex', flex: "3", gap: "1vw" }}>
              <Form.Group className="mb-3" controlId="date_purchased">
                <Form.Label>Date Purchased</Form.Label>
                <Form.Control type="date" placeholder="Date purchased" value={formData.date_purchased} onChange={handleChange} />
                {/* <Form.Text className="text-muted">
              Enter symbol exact match
            </Form.Text> */}
              </Form.Group>



              <Form.Group className="mb-3" controlId="quantity">
                <Form.Label>Quantity Bought</Form.Label>
                <Form.Control min="1" type="number" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />
                {/* <Form.Text className="text-muted">
              Enter symbol exact match
              </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="buying_price">
                <Form.Label>Buying Price</Form.Label>
                <Form.Control min="1" type="number" placeholder="Buying Price" value={formData.buying_price} onChange={handleChange} />
                {/* <Form.Text className="text-muted">
              Enter symbol exact match
              </Form.Text> */}
              </Form.Group>
            </div>

            <div style={{ display: 'flex', flex: "3", gap: "1vw" }}>
              <Form.Group className="mb-3" controlId="date_sell">
                <Form.Label>Date Sold</Form.Label>
                <Form.Control type="date" placeholder="Date Sold" value={formData.date_sell} onChange={handleChange} />
                {/* <Form.Text className="text-muted">
              Enter symbol exact match
            </Form.Text> */}
              </Form.Group>



              <Form.Group className="mb-3" controlId="quantity_sell">
                <Form.Label>Quantity Sold</Form.Label>
                <Form.Control min="1" type="number" placeholder="Quantity Sold" value={formData.quantity_sell} onChange={handleChange} />
                {/* <Form.Text className="text-muted">
              Enter symbol exact match
            </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="selling_price">
                <Form.Label>Selling Price</Form.Label>
                <Form.Control min="1" type="number" placeholder="Selling Price" value={formData.selling_price} onChange={handleChange} />
                {/* <Form.Text className="text-muted">
              Enter symbol exact match
            </Form.Text> */}
              </Form.Group>
            </div>

            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group> */}
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
            <div style={{ display: "flex", justifyContent: "right", alignItems: "right" }}>

              <Button variant="primary" type="submit" >
                Save Asset
              </Button>
            </div>
          </Form>


        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddAsset;