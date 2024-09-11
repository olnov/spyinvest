import {
  CurrentTotalValue,
  initialTotalValue,
  calculateBigWin,
  calculateBigLoss,
  calculatePandL,
} from "../../utils/PortfolioCalucations";
import { useEffect, useState } from "react";
import "./Dashboard.scss";

const Dashboard = (props) => {
  const [totalCurrentValue, setTotalCurrentValue] = useState(0);
  const [totalInitialValue, setTotalInitialValue] = useState(0);
  const [biggestWin, setBiggestWin] = useState("");
  const [biggestLoss, setBiggestLoss] = useState("");
  const [totalPandL, setTotalPandL] = useState(0);

  const { assets = [] } = props;

  // Refactor the company name if it's too long
  const refactorCompanyName = (name) => {
    const nameArray = String(name).split(" ");
    if (nameArray.length > 3) {
      return (
        nameArray[0] +
        " " +
        nameArray[1] +
        " " +
        nameArray[nameArray.length - 1]
      );
    } else {
      return name;
    }
  };

  useEffect(() => {
    setTotalCurrentValue(CurrentTotalValue(assets));
    setTotalInitialValue(initialTotalValue(assets));
    setBiggestWin(calculateBigWin(assets));
    setBiggestLoss(calculateBigLoss(assets));
    setTotalPandL(calculatePandL(assets));
  }, [assets]);

  return (
    <div className="dashboard-container">
      {/* <h1 className="dashboard-title-top">My Porftolios</h1> */}
      <h5>Portfolios summary</h5>
      <span></span>
      {totalPandL > 0 ? (
        <h1 className="dashboard-title">
          Total Value: ${totalCurrentValue}
          <div className="dashboard-totalValue-p">
            &#9650; {((totalPandL * 100) / totalInitialValue).toFixed(2)}%
          </div>
          <br />
          <div className="dashboard-card-win-lose">
            Total profit: <div className="dashboard-card__p">${totalPandL}</div>
          </div>
        </h1>
      ) : (
        <h1 className="dashboard-title">
          Total Value: ${totalCurrentValue}
          <div className="dashboard-totalValue-l">
            &#9660;{" "}
            {((Math.abs(totalPandL) * 100) / totalInitialValue).toFixed(2)}%
          </div>
          <br />
          <div className="dashboard-card-win-lose">
            Total loss:{" "}
            <div className="dashboard-card__l">
              &#9660; ${Math.abs(totalPandL)}
            </div>
          </div>
        </h1>
      )}

      <div className="dashboard-totalValue" />

      <div className="dashboard-card-win-lose">
        <div className="dashboard-bigWin">
          Biggest Winner: {refactorCompanyName(biggestWin)}
        </div>
        <div className="dashboard-bigLose">
          Biggest Loser: {refactorCompanyName(biggestLoss)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
