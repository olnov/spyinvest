import React from 'react'

const CreatePortfolioForm = ({ formData, handleChange }) => {
    return (
      <>
        <input
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
        />
{/*         <input
          id="user_id"
          value={formData.user_id || ""}
          placeholder="user_id"
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        /> */}
      </>
    );
  };

export default CreatePortfolioForm
