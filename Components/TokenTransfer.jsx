import React, { useState, useEffect } from "react";

// internal import

import Input from "./Input";
import Button from "./Button";

const TokenTransfer = ({
  address,
  transferTokens,
  connectWallet,
  setOpenBuyToken,
}) => {
  const [transferTokenData, setTransferTokenData] = useState({
    address: "",
    TokenAdd: "",
    amount: "",
  });

  return (
    <div className="modal">
      <div className="modal-content">
        <span onClick={() => setOpenBuyToken(false)} className="close">
          &times;
        </span>
        <h2>Create ICO</h2>
        <div
          className="input-Container"
          style={{
            marginTop: "1rem",
          }}
        >
          <Input
            placeholder={"To Address"}
            handleChange={(e) =>
              setTransferTokenData({
                ...transferTokenData,
                address: e.target.value,
              })
            }
          />

          <Input
            placeholder={"Token Address"}
            handleChange={(e) =>
              setTransferTokenData({
                ...transferTokenData,
                TokenAdd: e.target.value,
              })
            }
          />

          <Input
            placeholder={"amount"}
            handleChange={(e) =>
              setTransferTokenData({
                ...transferTokenData,
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
                transferTokens(transferTokenData);
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

export default TokenTransfer;
















