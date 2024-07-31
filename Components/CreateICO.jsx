import React, { useState, useEffect } from "react";

// internal import

import Input from "./Input";
import Button from "./Button";

const CreateICO = ({
  shortenAddress,
  setOpenCreateICO,
  connectWallet,
  address,
  createICOSALE,
}) => {
  const [icoSale, setICOSale] = useState({
    address: "",
    price: "",
  });

  return (
    <div className="modal">
      <div className="modal-content">
        <span onClick={() => setOpenCreateICO(false)} className="close">
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
            placeholder={"Address"}
            handleChange={(e) =>
              setICOSale({ ...icoSale, address: e.target.value })
            }
          />

          <Input
            placeholder={"Price"}
            handleChange={(e) =>
              setICOSale({ ...icoSale, price: e.target.value })
            }
          />
        </div>

        <div className="button-box" style=
        {{marginTop: "1rem"}}>
          {address ? (
            <Button
            name="Create ICO"
            handleClick={()=> {
              createICOSALE(icoSale)}}
            />
          ) : (
            <Button name="Connect Wallet" handleClick={connectWallet} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateICO;






