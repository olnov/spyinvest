import React from 'react';
import AssetSummary from '../PortfolioAssets/AssetSummary';
import AddAsset from '../PortfolioAssets/AddAsset';
import Context from '../../context/Context';
import { useContext } from 'react';
import { biggestWinner, biggestLoser } from '../../utils/PortfolioCalucations';

const PortfolioCard = async ({
  portfolioId,
  portfolioName,
  portfolioDescription

}) => {
  const modalId = `portfolioModal-${portfolioId}`;

  const { PortfolioAssetsState, setPortfolioAssetsState } = useContext(Context);


  console.log(PortfolioAssetsState)
  const portfolioArray = PortfolioAssetsState.filter((portfolioAsset) => portfolioAsset.portfolio_id === portfolioId);
  console.log('Port id', portfolioId)

  console.log('Fetched response: ' + data);
  console.log('expecting this to be a 1 array with 1object per index', portfolioArray)
  console.log('If above is empty, this must be too : ', PortfolioAssetsState)

  return (
    <div className="port-card">
      <div
        className="port-card__name"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
        style={{ cursor: 'pointer' }}
      >
        {portfolioName}
      </div>
      <div className="port-card__description">{portfolioDescription}</div>
      <div className="port-card__total-investment">${}</div>
      <div className="port-card__biggest-winner"> {biggestWinner(PortfolioAssetsState, portfolioId)} </div>
      <div className="port-card__p-and-l">{}</div>
      <div className="port-card__perc-p-and-l">{}</div>
      <div className="port-card__last-updated">{}</div>

      {/* Portfolio Modal */}
      <div
        className="modal fade"
        id={modalId}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={`${modalId}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${modalId}Label`}>
                {portfolioName}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {portfolioArray.map((portfolioAsset) => { 
                  return (
                    <AssetSummary
                      key={portfolioAsset.id}
                      assetName={portfolioAsset.asset_name}
                      assetSymbol={portfolioAsset.symbol}
                      datePurchased={portfolioAsset.date_purchase}
                      dateSell={portfolioAsset.date_sell}
                      quantity={portfolioAsset.quantity_purchase}
                      qtysell= {portfolioAsset.quantity_sell}
                      buyingPrice={portfolioAsset.price_buy}
                      sellingPrice={portfolioAsset.price_sell}
                    />
                  )
                }
              )}


              {/* Add Asset Button */}
              <button
                className="btn btn-primary mt-3"
                data-bs-toggle="modal"
                data-bs-target={`#addAssetModal-${portfolioId}`}
                data-bs-dismiss="modal"
              >
                Add Asset
              </button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AddAsset Component */}
      <AddAsset
        portfolioId={portfolioId}
        portfolioName={portfolioName}
      
      />
    </div>
  );
};

export default PortfolioCard;
