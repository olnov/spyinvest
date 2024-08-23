import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CreatePortfolioForm = ({ formData, handleChange }) => {
  return (
    <>
      {/* <input
        id="title"
        value={formData.title || ""}
        placeholder="Portfolio Name"
        onChange={(e) => handleChange(e.target.id, e.target.value)}
      />
      <input
        id="description"
        value={formData.description || ""}
        placeholder="Description (optional)"
        onChange={(e) => handleChange(e.target.id, e.target.value)}
      /> */}
      {/*         <input
          id="user_id"
          value={formData.user_id || ""}
          placeholder="user_id"
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        /> */}


      <div style={{ display: 'flex', flex: "2", gap: "1vw", alignItems: "start" }}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Portfolio Name</Form.Label>
          <Form.Control type="text" placeholder="My Tech Assets" value={formData.title} onChange={(e) => handleChange(e.target.id, e.target.value)} />
          {/* <Form.Text className="text-muted">
              Enter the name of the company
            </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Description (optional)" value={formData.description} onChange={(e) => handleChange(e.target.id, e.target.value)} />
          {/* <Form.Text className="text-muted">
              Enter symbol exact match
            </Form.Text> */}
        </Form.Group>
      </div>
    </>
  );
};

export default CreatePortfolioForm
