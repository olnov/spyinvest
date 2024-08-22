import { useState, useEffect } from 'react';
import { getMyAssets } from '../../services/portfolioAssetServices';
import { getPortfolios } from '../../services/PortfoliosServices';
import PortfolioCard from './PortfolioCard';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import AssetSummary from '../PortfolioAssets/AssetSummary';
import AddAsset from '../PortfolioAssets/AddAsset';
import './PortfolioList.scss';

// Portfolio List - displays all portfolios and their assets - This is the heart of the application

const PortfolioList = () => {
  const [portfolioAssets, setPortfolioAssets] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showPotforlioModal, setShowPortfolioModal] = useState(false)

  const handleToggleAssetModal = () => {
    setShowAssetModal(!showAssetModal)
    setShowPortfolioModal(!showPotforlioModal)
  }

  const fetchPortfolioAssets = async () => {
    const data = await getMyAssets(localStorage.getItem('token'));
    setPortfolioAssets(data);
  };

  const fetchPortfolios = async () => {
    const data = await getPortfolios(localStorage.getItem('token'));
    setPortfolios(data)
    // console.log('Fetch Portfolio data: ' + data);
  };

  useEffect(() => {
    fetchPortfolioAssets();
    fetchPortfolios();
  }, []);

  const calculatePortfolioValue = (portfolioId) => {
    let totalValue = 0;
    portfolioAssets.forEach((portfolioAsset) => {
      if (portfolioAsset.portfolio_id === portfolioId) {
        totalValue += portfolioAsset.quantity_purchase * portfolioAsset.price_buy;
      }
    });
    return totalValue;
  };

  return (
    <div>
      <h1>Portfolios</h1>
      <Accordion flush>
        {portfolios.map((portfolio, index) => (
          <Accordion.Item eventKey={index.toString()} key={portfolio.id}>
            <Accordion.Header className="acc-header">
              {/* <button
              // className="btn btn-primary"
              // data-bs-toggle="modal"
              // data-bs-target={`#addAssetModal-${portfolio.id}`}
              // data-bs-dismiss="modal"
              >
                Add an Asset
              </button> */}
              <PortfolioCard
                key={portfolio.id}
                portfolioId={portfolio.id}
                portfolioName={portfolio.title}
                portfolioDescription={portfolio.description}

                totalInvestment={calculatePortfolioValue(portfolio.id)}
                // pAndL={/* calculate P&L here */}
                // percPAndL={/* calculate % P&L here */}
                // lastUpdated={/* format last updated date */}
                portfolioAssets={portfolioAssets}
                fetchPortfolioAssets={fetchPortfolioAssets}

              >


              </PortfolioCard>
            </Accordion.Header>
            <Accordion.Body>
              {portfolioAssets.map((portfolioAsset) => {
                if (portfolioAsset.portfolio_id === portfolio.id) {
                  return (
                    <>
                      <AssetSummary
                        key={portfolioAsset.id}
                        assetName={portfolioAsset.asset_name}
                        assetSymbol={portfolioAsset.symbol}
                        datePurchased={portfolioAsset.date_purchased}
                        dateSell={portfolioAsset.date_sell}
                        quantity={portfolioAsset.quantity_purchase}
                        buyingPrice={portfolioAsset.price_buy}
                        sellingPrice={portfolioAsset.price_sell}
                      />


                    </>
                  )

                }
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



    </div >
  );
};

export default PortfolioList;
