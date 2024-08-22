import React, { useState, useContext, useEffect } from 'react';
import { fetchAssetsandCurrentPrices } from '../../services/assetsServices';
import { getPortfolios } from '../../services/PortfoliosServices';
import PortfolioCard from './PortfolioCard';
import Accordion from 'react-bootstrap/Accordion';
import AssetSummary from '../PortfolioAssets/AssetSummary';
import { CurrentTotalValue, initialTotalValue, calculateBigWin, calculateBigLoss,  calculatePandL} from '../../utils/PortfolioCalucations'

import './PortfolioList.scss';


import Context from '../../context/Context';

const PortfolioList = () => {
  const { portfolioAssetsState, setPortfolioAssetsState } = useContext(Context);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ currentValue, setCurrentValue] = useState(0);
  const [ initialValue, setInitialValue] = useState(0);
  const [ bigWin, setBigWin] = useState(0);
  const [ bigLoss, setBigLoss] = useState(0);
  const [ pandL, setPandL] = useState(0);



  

  const fetchPortfolioAssets = async () => {
    try {
      const data = await fetchAssetsandCurrentPrices(localStorage.getItem('token'));
      setPortfolioAssetsState(data);
      console.log('Fetch Portfolio Assets data:', portfolioAssetsState);
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
    setCurrentValue(CurrentTotalValue(portfolioAssetsState));
    setInitialValue(initialTotalValue(portfolioAssetsState));
    setBigWin(calculateBigWin(portfolioAssetsState));
    setBigLoss(calculateBigLoss(portfolioAssetsState));
    setPandL(calculatePandL(portfolioAssetsState));
  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (!portfolios.length) {
    return <div>No portfolios available.</div>;
  }

  return (
    <div>
      <div className = "Account summary">
        <h1>Account Summary</h1>
        <div className="port-card__total-investment"> Initial Value: ${initialValue}</div>
        <div className="port-card__current-value">Current Value: ${currentValue}</div>
        <div className="port-card__biggest-winner"> Biggest Winner: {bigWin} </div>
        <div className="port-card__biggest-loser"> Biggest Loser: {bigLoss} </div>
        {pandL > 0 ? (
          <>
            <div className="port-card__p-and-l"> Profit: ${pandL} </div>
            <div className="port-card__perc-p-and-l">{(pandL*100/initialValue).toFixed(2)} %</div>
          </>
        ) : (
          pandL < 0 ? (
            <>
              <div className="port-card__p"> Loss: ${pandL} </div>
              <div className="port-card__perc-p">{(pandL*100/initialValue).toFixed(2)} %</div>
            </>
          ) : (
            <>
              <div className="port-card__l"> No Profit No Loss </div>
              <div className="port-card__l"> 0 %</div>
            </>
          )
        )}
      </div>


      <Accordion>
      {portfolios.map((portfolio, index) => (
        <Accordion.Item eventKey={index.toString()} key={portfolio.id}>
          <Accordion.Header className="acc-header">
          <PortfolioCard
              key={portfolio.id}
              portfolioId={portfolio.id}
              portfolioName={portfolio.title}
              portfolioDescription={portfolio.description}
              portfolioAssets={portfolioAssetsState.filter((portfolioAsset) => portfolioAsset.portfolio_id === portfolio.id)}
              fetchPortfolioAssets={fetchPortfolioAssets}
              />
          </Accordion.Header>
          <Accordion.Body>
            {portfolioAssetsState.map((portfolioAsset) => {
              if (portfolioAsset.portfolio_id === portfolio.id) {
                return (
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
