import React, { useState, useEffect } from "react";

// internal import

import Input from "./Input";
import Button from "./Button";

const WidthdrawToken = ({
  address,
  withdrawTokens,
  connectWallet,
  setOpenWithdrawToken,
}) => {

  const [withdrawQuantity, setWithdrawQuantity] = useState({
    token: "",
    amount: "",
  });
  
  return (
    <div className="modal">
      <div className="modal-content">
        <span onClick={() => setOpenWithdrawToken(false)} className="close">
          &times;
        </span>
        <h2>Withdraw Token</h2>
        <div
          className="input-Container"
          style={{
            marginTop: "1rem",
          }}
        >
          <Input
            placeholder={"Token Address"}
            handleChange={(e) =>
              setWithdrawQuantity({
                ...withdrawQuantity,
                token: e.target.value,
              })
            }
          />

          <Input
            placeholder={"Quantity"}
            handleChange={(e) =>
              setWithdrawQuantity({
                ...withdrawQuantity,
                amount: e.target.value,
              })
            }
          />
        </div>

        <div className="button-box" style={{ marginTop: "1rem" }}>
          {address ? (
            <Button
              name="Token Transfer"
              handleClick={() => {
                withdrawTokens(withdrawQuantity);
              }}
            />
          ) : (
            <Button name="Connect Wallet" handleClick={connectWallet} />
          )}
        </div>
      </div>
    </div>
  );

};


export default WidthdrawToken;
