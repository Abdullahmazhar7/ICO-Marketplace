
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const TokenHistory = ({ shortenAddress, setopenTokenHistory }) => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const copyAddress = (text) => {
    if (document.hasFocus()) {
      navigator.clipboard.writeText(text)
        .then(() => {
          notifySuccess("Copied Successfully");
        })
        .catch((error) => {
          notifyError("Failed to copy");
          console.error('Failed to copy to clipboard:', error);
        });
    } else {
      notifyError("Document is not focused. Cannot copy to clipboard.");
      console.error('Document is not focused. Cannot copy to clipboard.');
    }
  };

  const [history, setHistory] = useState(null);

  useEffect(() => {
    const StoreData = localStorage.getItem("TOKEN_HISTORY");

    if (StoreData) {
      try {
        const parsedData = JSON.parse(StoreData);
        setHistory(parsedData);
        console.log(parsedData);
      } catch (error) {
        console.error("Failed to parse token history data:", error);
      }
    }
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <span onClick={() => setopenTokenHistory(false)} className="close">
          &times;
        </span>
        <h2>Token History</h2>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <td>Logo</td>
                <td>Name</td>
                <td>Symbol</td>
                <td>Supply</td>
                <td>Address</td>
                <td>Hash</td>
              </tr>
            </thead>
            <tbody>
              {history?.map((token, index) => (
                <tr key={index + 1}>
                  <td onClick={() => copyAddress(token?.logo)}>
                    <img
                      src={token.logo}
                      alt=""
                      style={{
                        width: "30px",
                        height: "auto",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    />
                  </td>
                  <td>📛{token?.name}</td>
                  <td>🔣{token?.symbol}</td>
                  <td>🚚{token?.supply}</td>
                  <td onClick={() => copyAddress(token?.tokenAddress)}>
                  🧾{shortenAddress(token?.tokenAddress)}
                  </td>
                  <td onClick={() => copyAddress(token?.transactionHash)}>
                  🧾{shortenAddress(token?.transactionHash)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TokenHistory;






















