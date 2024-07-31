import React, { useState } from "react";

// internal Import !
import UploadLogo from "./UploadLogo";
import Input from "./Input";
import Button from "./Button";

const TokenCreator = ({
  CreateERC20,
  shortenAddress,
  setOpenTokenCreator,
  setLoader,
  address,
  connectWallet,
  PINATA_API_KEY,
  PINATA_SECRET_KEY,
}) => {
  const [imageURL, setimageURL] = useState();
  const [token, setToken] = useState({
    name: "",
    symbol: "",
    supply: "",
  });

  return (
    <div id={"myModal"} className="{modal}">
      <div className="modal-content">
        <span onClick={() => setOpenTokenCreator(false)} className="close">
          &times;
        </span>
        <h2 style={{ marginBottom: "1rem" }}> Create Token</h2>

        <UploadLogo
          imageURL={setimageURL}
          setLoader={setLoader}
          PINATA_API_KEY={PINATA_API_KEY}
          PINATA_SECRET_KEY={PINATA_SECRET_KEY}
        />
        <div className="input-Container">
          <Input
            placeholder={"Name"}
            handleChange={(e) => setToken({ ...token, name: e.target.value })}
          />

          <Input
            placeholder={"Symbol"}
            handleChange={(e) => setToken({ ...token, symbol: e.target.value })}
          />

          <Input
            placeholder={"Supply"}
            handleChange={(e) => setToken({ ...token, supply: e.target.value })}
          />
        </div>
        <div className="button-box" style={{
          marginTop: "1rem"}}>
            {address ? (
              <Button name = "Create Token" handleClick={() => CreateERC20(token,address,imageURL)}/>
            ) : (
              <Button name="Connect Wallet"
              handleClick={() => connectWallet()}/>
            )}
          </div>
      </div>
    </div>
  );
};

export default TokenCreator;

