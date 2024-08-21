import React, { useContext } from 'react';
import AssetSummary from '../PortfolioAssets/AssetSummary';
import AddAsset from '../PortfolioAssets/AddAsset';
// import { biggestWinner, biggestLoser } from '../../utils/PortfolioCalucations';
import Context from '../../context/Context';
import CalculatedContext from '../../context/calculatedContext';

const PortfolioCard = ({
  portfolioId,
  portfolioName,
  portfolioDescription,
}) => {
  const modalId = `portfolioModal-${portfolioId}`;

  const { portfolioAssetsState } = useContext(Context);
  console.log('Portfolio Assets State:', portfolioAssetsState);
  const { calculatedAssets } = useContext(CalculatedContext);
  console.log("THIS IS THE OBJECTS TYPE" + Object.keys(calculatedAssets).length)
  const portfolioAssets = portfolioAssetsState.filter((portfolioAsset) => portfolioAsset.portfolio_id === portfolioId);
  console.log('filtered Portfolio Assets:', portfolioAssets);
  // const calculatedPortfolioAssets = calculatedAssets.filter((calculatedAsset) => portfolioAssets.map((portfolioAsset) => portfolioAsset.port_asset_id).includes(calculatedAsset.portAssetId));
  // console.log('calculated Portfolio Assets:', calculatedPortfolioAssets);
  console.log('Portfolio Assets:', portfolioAssets);
  // const bigWin = biggestWinner(portfolioAssets);


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
      <div className="port-card__total-investment">$Here: {calculatedAssets.currentValue}</div>
      {/* <div className="port-card__biggest-winner"> {bigWin} </div> */}
      <div className="port-card__p-and-l">{/* P&L logic here */}</div>
      <div className="port-card__perc-p-and-l">{/* % P&L logic here */}</div>
      <div className="port-card__last-updated">{/* last updated date */}</div>

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
              {portfolioAssets.map((portfolioAsset) => (
                <AssetSummary
                  key={portfolioAsset.id}
                  assetName={portfolioAsset.asset_name}
                  assetSymbol={portfolioAsset.symbol}
                  datePurchased={portfolioAsset.date_purchase}
                  dateSell={portfolioAsset.date_sell}
                  quantity={portfolioAsset.quantity_purchase}
                  qtysell={portfolioAsset.quantity_sell}
                  buyingPrice={portfolioAsset.price_buy}
                  sellingPrice={portfolioAsset.price_sell}
                  portAssetId={portfolioAsset.port_asset_id}
                />
              ))}
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
        onSubmit={() => {/* refresh logic if needed */ }}
      />
    </div>
  );
};

export default PortfolioCard;
