import { useState } from "react";
import { createAsset } from "../../services/portfolioAssetServices";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
      case "quantity":
        setFormData({ ...formData, quantity: parseInt(value) });
        break;
      case "buying_price":
        setFormData({ ...formData, buying_price: parseInt(value) });
        break;
      case "selling_price":
        setFormData({ ...formData, selling_price: parseInt(value) });
        break;
      case "quantity_sell":
        setFormData({ ...formData, quantity_sell: parseInt(value) });
        break;
      default:
        setFormData({
          ...formData,
          [id]: value,
        });
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formattedDateSell = formData.date_sell
      ? new Date(formData.date_sell).toISOString()
      : null;
    const formattedDatePurchased = formData.date_purchased
      ? new Date(formData.date_purchased).toISOString()
      : null;
    const payload = {
      ...formData,
      date_sell: formattedDateSell,
      date_purchased: formattedDatePurchased,
    };
    await createAsset(token, payload);

    props.fetchPortfolioAssets();
    props.handleToggleAssetModal(false);
  };

  return (
    <div style={{ minWidth: "800px" }}>
      <Modal
        show={props.showAssetModal}
        onHide={() => props.handleToggleAssetModal(true)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Asset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", flex: "2", gap: "20px" }}>
              <Form.Group className="mb-3" controlId="asset_name">
                <Form.Label>Asset Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the name of the company"
                  value={formData.asset_name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="asset_symbol">
                <Form.Label>Asset Symbol</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter symbol exact match"
                  value={formData.asset_symbol}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div style={{ display: "flex", flex: "3", gap: "20px" }}>
              <Form.Group className="mb-3" controlId="date_purchased">
                <Form.Label>Date purchased</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date purchased"
                  value={formData.date_purchased}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  min="1"
                  type="number"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="buying_price">
                <Form.Label>Buying Price</Form.Label>
                <Form.Control
                  min="1"
                  type="number"
                  placeholder="Buying Price"
                  value={formData.buying_price}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div style={{ display: "flex", flex: "3", gap: "20px" }}>
              <Form.Group className="mb-3" controlId="date_sell">
                <Form.Label>Date sell</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date sell"
                  value={formData.date_sell}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="quantity_sell">
                <Form.Label>Quantity Sold</Form.Label>
                <Form.Control
                  min="1"
                  type="number"
                  placeholder="Quantity Sold"
                  value={formData.quantity_sell}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="selling_price">
                <Form.Label>Selling Price</Form.Label>
                <Form.Control
                  min="1"
                  type="number"
                  placeholder="Selling Price"
                  value={formData.selling_price}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                alignItems: "right",
              }}
            >
              <Button variant="primary" type="submit">
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
