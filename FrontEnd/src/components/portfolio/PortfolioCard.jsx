

import Context from '../../context/Context';
import { useContext, useEffect, useState } from 'react';
import { CurrentTotalValue, initialTotalValue, calculateBigWin, calculateBigLoss, calculatePandL } from '../../utils/PortfolioCalucations'


import AssetSummary from '../PortfolioAssets/AssetSummary';
import AddAsset from '../PortfolioAssets/AddAsset';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const PortfolioCard = ({
  portfolioId,
  portfolioName,
  portfolioDescription,
  portfolioAssets,
}) => {
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showPotforlioModal, setShowPortfolioModal] = useState(false)

  const handleToggleAssetModal = () => {
    setShowAssetModal(!showAssetModal)
    setShowPortfolioModal(!showPotforlioModal)
  }

  const [currentValue, setCurrentValue] = useState(0);
  const [initialValue, setInitialValue] = useState(0);
  const [bigWin, setBigWin] = useState(0);
  const [bigLoss, setBigLoss] = useState(0);
  const [pandL, setPandL] = useState(0);


  console.log('THESE ARE THE ASSETS I HAVE RECEIVED FROM THE LIST: ', portfolioAssets);





  useEffect(() => {
    setCurrentValue(CurrentTotalValue(portfolioAssets));
    setInitialValue(initialTotalValue(portfolioAssets));
    setBigWin(calculateBigWin(portfolioAssets));
    setBigLoss(calculateBigLoss(portfolioAssets));
    setPandL(calculatePandL(portfolioAssets));
  }, [portfolioAssets]);

  return (
    <div className="port-card">
      <div
        className="port-card__name"
        // data-bs-toggle="modal"
        // data-bs-target={`#${modalId}`}
        onClick={() => setShowPortfolioModal(true)}
        style={{ cursor: 'pointer' }}
      >
        {portfolioName}
      </div>
      <div className="port-card__description">{ }</div>
      <div className="port-card__total-investment"> Initial Value: ${initialValue}</div>
      <div className="port-card__current-value">Current Value: ${currentValue}</div>
      <div className="port-card__biggest-winner"> Biggest Winner: {bigWin} </div>
      <div className="port-card__biggest-loser"> Biggest Loser: {bigLoss} </div>
      {pandL > 0 ? (
        <>
          <div className="port-card__p"> Profit: ${pandL} </div>
          <div className="port-card__perc-p">{(pandL * 100 / initialValue).toFixed(2)} %</div>
        </>
      ) : (
        pandL < 0 ? (
          <>
            <div className="port-card__l"> Loss: ${pandL} </div>
            <div className="port-card__perc_l">{(pandL * 100 / initialValue).toFixed(2)} %</div>
          </>
        ) : (
          <>
            <div className="port-card__z"> No Profit No Loss </div>
            <div className="port-card__z"> 0 %</div>
          </>
        )
      )}


      {/* Portfolio Modal */}

      <Modal style={{ minWidth: "890px" }} backdrop="static" show={showPotforlioModal} onHide={() => setShowPortfolioModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title> {portfolioName}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {portfolioAssets.map((portfolioAsset) => {
            if (portfolioAsset.portfolio_id === portfolioId) {
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
                />
              );
            }
            return null;
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleToggleAssetModal}>
            Add Asset
          </Button>
          {/* <Button variant="secondary" onClick={handleToggleAssetModal}>
            Close
          </Button> */}

        </Modal.Footer>
      </Modal>


      {/* AddAsset Component */}
      <AddAsset
        portfolioId={portfolioId}
        portfolioName={portfolioName}


        showAssetModal={showAssetModal}
        handleToggleAssetModal={handleToggleAssetModal}

      />
    </div>
  );
};

export default PortfolioCard;