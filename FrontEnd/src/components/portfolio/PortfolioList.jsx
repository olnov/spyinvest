import React, { useState, useContext, useEffect } from 'react';
import { getMyAssets } from '../../services/portfolioAssetServices';
import { getPortfolios } from '../../services/PortfoliosServices';
import PortfolioCard from './PortfolioCard';
import Accordion from 'react-bootstrap/Accordion';
import AssetSummary from '../PortfolioAssets/AssetSummary';
import './PortfolioList.scss';
import CalculatedContext from '../../context/calculatedContext';

import Context from '../../context/Context';

const PortfolioList = () => {
  const { portfolioAssetsState, setPortfolioAssetsState } = useContext(Context);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("THIS IS THE CALCULATED" + CalculatedContext)

  const fetchPortfolioAssets = async () => {
    try {
      const data = await getMyAssets(localStorage.getItem('token'));
      setPortfolioAssetsState(data);
      console.log('Fetch Portfolio Assets data:', data);
    } catch (error) {
      console.error('Error fetching portfolio assets:', error);
    }
  };

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
      <Accordion>
      {portfolios.map((portfolio, index) => (
        <Accordion.Item eventKey={index.toString()} key={portfolio.id}>
          <Accordion.Header className="acc-header">
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
              />
          </Accordion.Header>
          <Accordion.Body>
            {portfolioAssets.map((portfolioAsset) => {
              if (portfolioAsset.portfolio_id === portfolio.id) {
                return (
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
                );
              }
            })}
          </Accordion.Body>
          </Accordion.Item>
      ))}
      </Accordion>
    </div>
  );
};

export default PortfolioList;
