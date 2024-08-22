import PortfolioList from "../components/portfolio/PortfolioList";
import { useState, useEffect } from "react";
import CreatePortfolioForm from "../components/input/CreatePortfolioForm";
import { createPortfolio } from "../services/PortfoliosServices";
import { TopBar } from "../components/TopBar/TopBar";
import { getUserProfile } from "../services/userServices";

// My portfolio  -> portfolio list  | create portfolio

const MyPortfolio = () => {
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem('token');
  const currentUserId = localStorage.getItem('userId');
  const [termsAccepted, setTermsAccepted] = useState(null);

  const checkTerms = async () => {
    try {
      const profile = await getUserProfile(token, currentUserId);
      const terms_accepted = profile.terms_accepted;
      setTermsAccepted(profile.terms_accepted);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=> {
    checkTerms();
  },[]);

  if (termsAccepted === null) {
    // While we are checking the terms, we can show a loading spinner or nothing
    return <div>Loading...</div>;
  }

  if (!termsAccepted) {
    // If terms are not accepted, prevent the page from rendering
    return (
      <>
      <TopBar />
      <div><h5>You must accept the terms of use to access your portfolio.</h5></div>
      </>
    )
  }

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
      <TopBar />
      <h1>My Portfolio</h1>
      <div className="portfolio-list">
        <PortfolioList />
      </div>
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
        style={{ minWidth: "800px" }}
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
