import React from 'react'
import { useState } from "react";

const CreatePortfolioForm = () => {
    const [formData, setFormData] = useState({});

    const handleChange = (id, value) => {
        setFormData({...formData, [id]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await createPortfolio(token, content);
            setFormData("");
            // TODO: redirect to the new portfolio
        } catch (err) {
            console.error(err);
        }
    }
  return (
    <>
    <div>Create Portfolio Form</div>
    <input id="title" value={formData.title} placeholder='Portfolio Name' onChange={handleChange} />
    <input id="description" value={formData.description} placeholder='Description (optional)' onChange={handleChange} />
    <button onClick={handleSubmit}>Create Portfolio</button>
    </>
  )
}

export default CreatePortfolioForm