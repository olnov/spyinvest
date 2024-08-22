import { CurrentTotalValue, initialTotalValue, calculateBigWin, calculateBigLoss,  calculatePandL} from '../../utils/PortfolioCalucations'
import { useEffect, useState } from 'react';

const Dashboard = (
    props
) => { 
    const [totalCurrentValue, setTotalCurrentValue] = useState(0);
    const [totalInitialValue, setTotalInitialValue] = useState(0);
    const [biggestWin, setBiggestWin] = useState(0);
    const [biggestLoss, setBiggestLoss] = useState(0);
    const [totalPandL, setTotalPandL] = useState(0);

    const assets = props.assets;   

    console.log('ASSETS FOR DASHBOARD:', assets);


    useEffect(() => {
        setTotalCurrentValue(CurrentTotalValue(assets));
        setTotalInitialValue(initialTotalValue(assets));
        setBiggestWin(calculateBigWin(assets));
        setBiggestLoss(calculateBigLoss(assets));
        setTotalPandL(calculatePandL(assets));
    }
    , [assets]);

    return (
        <>
        <div className = "Account summary">
        <h1>Account Summary</h1>
        <div className="port-card__total-investment"> Initial Value: ${totalInitialValue}</div>
        <div className="port-card__current-value">Current Value: ${totalCurrentValue}</div>
        <div className="port-card__biggest-winner"> Biggest Winner: {biggestWin} </div>
        <div className="port-card__biggest-loser"> Biggest Loser: {biggestLoss} </div>
        {totalPandL > 0 ? (
          <>
            <div className="port-card__p-and-l"> Profit: ${totalPandL} </div>
            <div className="port-card__perc-p-and-l">{(totalPandL*100/totalInitialValue).toFixed(2)} %</div>
          </>
        ) : (
            totalPandL < 0 ? (
            <>
              <div className="port-card__p"> Loss: ${totalPandL} </div>
              <div className="port-card__perc-p">{(totalPandL*100/totalInitialValue).toFixed(2)} %</div>
            </>
          ) : (
            <>
              <div className="port-card__l"> No Profit No Loss </div>
              <div className="port-card__l"> 0 %</div>
            </>
          )
        )}
      </div>

      </>
    )
}

export default Dashboard;