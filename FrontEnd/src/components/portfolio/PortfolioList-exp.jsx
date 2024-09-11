import { useState, useContext, useEffect } from "react";
import { fetchAssetsandCurrentPrices } from "../../services/assetsServices";
import { getPortfolios } from "../../services/PortfoliosServices";
import PortfolioCard from "./PortfolioCard";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import AssetSummary from "../PortfolioAssets/AssetSummary";
import Dashboard from "../Dashboard/Dashboard";
import AddAsset from "../PortfolioAssets/AddAsset";
import "./PortfolioList.scss";
import Context from "../../context/Context";

const PortfolioList = () => {
  const { portfolioAssetsState, setPortfolioAssetsState } = useContext(Context);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);

  const handleToggleAssetModal = () => {
    setShowAssetModal(!showAssetModal);
    setShowPortfolioModal(!showPortfolioModal);
  };

  const fetchPortfolioAssets = async () => {
    try {
      const data = await fetchAssetsandCurrentPrices(
        localStorage.getItem("token")
      );
      setPortfolioAssetsState(data);
    } catch (error) {
      console.error("Error fetching portfolio assets:", error);
    }
  };

  const fetchPortfolios = async () => {
    try {
      const data = await getPortfolios(localStorage.getItem("token"));
      setPortfolios(data);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioAssets();
    fetchPortfolios();
  }, []);

  if (loading) {
    return <h1 style={{ color: "white" }}>Loading...</h1>;
  }

  if (!portfolios.length) {
    return <h1 style={{ color: "white" }}>No portfolios available.</h1>;
  }

  return (
    <div className="portfolio-list-container">
      {/* Left Sidebar (Optional) */}
      <div className="left-sidebar">
        {/* Add any content or components you want in the left sidebar */}
      </div>

      {/* Center Feed */}
      <div className="center-feed">
        <Accordion flush>
          {portfolios.map((portfolio, index) => (
            <Accordion.Item eventKey={index.toString()} key={portfolio.id}>
              <Accordion.Header>
                <PortfolioCard
                  key={portfolio.id}
                  portfolioId={portfolio.id}
                  portfolioName={portfolio.title}
                  portfolioDescription={portfolio.description}
                  portfolioAssets={portfolioAssetsState.filter(
                    (portfolioAsset) =>
                      portfolioAsset.portfolio_id === portfolio.id
                  )}
                  fetchPortfolioAssets={fetchPortfolioAssets}
                />
              </Accordion.Header>
              <Accordion.Body>
                {portfolioAssetsState.map((portfolioAsset) => {
                  if (portfolioAsset.portfolio_id === portfolio.id) {
                    return (
                      <div
                        key={portfolioAsset.id}
                        style={{
                          display: "inline-block",
                          margin: "0.5vw",
                          alignItems: "start",
                          flexWrap: "wrap",
                        }}
                      >
                        <AssetSummary
                          key={portfolioAsset.id}
                          assetName={portfolioAsset.asset_name}
                          assetSymbol={portfolioAsset.symbol}
                          datePurchased={portfolioAsset.date_purchased}
                          dateSell={portfolioAsset.date_sell}
                          quantity={portfolioAsset.quantity_purchase}
                          qtysell={portfolioAsset.quantity_sell}
                          buyingPrice={portfolioAsset.price_buy}
                          sellingPrice={portfolioAsset.price_sell}
                          portAssetId={portfolioAsset.port_asset_id}
                          currentPrice={portfolioAsset.currentPrice}
                        />
                      </div>
                    );
                  }
                  return null;
                })}

                <AddAsset
                  portfolioId={portfolio.id}
                  portfolioName={portfolio.title}
                  fetchPortfolioAssets={fetchPortfolioAssets}
                  showAssetModal={showAssetModal}
                  handleToggleAssetModal={handleToggleAssetModal}
                />
                <Button variant="primary" onClick={handleToggleAssetModal}>
                  Add Asset
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>

      {/* Right Sidebar - Dashboard */}
      <div className="right-sidebar">
        <Dashboard assets={portfolioAssetsState} />
      </div>
    </div>
  );
};

export default PortfolioList;
