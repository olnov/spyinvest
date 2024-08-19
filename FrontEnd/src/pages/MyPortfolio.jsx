import PortfolioList from "../components/portfolio/PortfolioList";
import { useState } from "react";
import CreatePortfolioForm from "../components/input/CreatePortfolioForm";
import { createPortfolio } from "../services/PortfoliosServices";

// My portfolio  -> portfolio list  | create portfolio

const MyPortfolio = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await createPortfolio(token, formData);
      setFormData({});
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>My Portfolio</h1>
      <PortfolioList />
      <button data-bs-toggle="modal" data-bs-target="#create-portfolio-modal">
        Create Portfolio
      </button>

      <div
        className="modal fade"
        id="create-portfolio-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="createModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create New Portfolio
              </h5>
            </div>
            <div className="modal-body">
              <CreatePortfolioForm
                formData={formData}
                handleChange={handleChange}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Create Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPortfolio;
