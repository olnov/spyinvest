
import { useState, useContext, useEffect } from 'react';
import { fetchAssetsandCurrentPrices } from '../../services/assetsServices';
import { getMyAssets } from '../../services/portfolioAssetServices';

import { getPortfolios } from '../../services/PortfoliosServices';
import PortfolioCard from './PortfolioCard';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import AssetSummary from '../PortfolioAssets/AssetSummary';

import Dashboard from '../Dashboard/Dashboard'

import AddAsset from '../PortfolioAssets/AddAsset';

import './PortfolioList.scss';


import Context from '../../context/Context';

const PortfolioList = () => {
  const { portfolioAssetsState, setPortfolioAssetsState } = useContext(Context);
  const [portfolios, setPortfolios] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showPotforlioModal, setShowPortfolioModal] = useState(false)

  const handleToggleAssetModal = () => {
    setShowAssetModal(!showAssetModal)
    setShowPortfolioModal(!showPotforlioModal)
  }


  const fetchPortfolioAssets = async () => {
    try {
      const data = await fetchAssetsandCurrentPrices(localStorage.getItem('token'));
      setPortfolioAssetsState(data);
      console.log('Fetch Portfolio Assets data:', portfolioAssetsState);
    } catch (error) {
      console.error('Error fetching portfolio assets:', error);
    }
  };

  const assets = portfolioAssetsState;
  const fetchPortfolios = async () => {

    try {
      const data = await getPortfolios(localStorage.getItem('token'));

      setPortfolios(data);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchPortfolioAssets();
    fetchPortfolios();
  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (!portfolios.length) {
    return <div>No portfolios available.</div>;
  }

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
              portfolioAssets={portfolioAssetsState.filter((portfolioAsset) => portfolioAsset.portfolio_id === portfolio.id)}
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
                  qtysell={portfolioAsset.quantity_sell}
                  buyingPrice={portfolioAsset.price_buy}
                  sellingPrice={portfolioAsset.price_sell}
                  portAssetId={portfolioAsset.port_asset_id}
                  currentPrice = {portfolioAsset.currentPrice}
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
