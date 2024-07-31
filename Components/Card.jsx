
import React from "react";

const Card = ({
  setOpenAllICO,
  setOpenTokenCreator,
  setOpenTransferToken,
  setopenTokenHistory,
  setOpenWithdrawToken,
  setOpenICOMarketplace,
  copyAddress,
  setOpenCreateICO,
}) => {
  const features = [
    {
      title: "ICO Address",
      description:
        "Get Detail of ICO Contract and copy the ICO contract address to transfer the token to ICO Contract",
      btnName: "Copy Address",
    },
    {
      title: "Create ICO",
      description:
        "Get Detail of ICO Contract and copy the ICO contract address to transfer the token to ICO Contract",
      btnName: "Create ICO",
    },
    {
      title: "Your Created ICO",
      description:
        "Get All Your Created ICO is an innovative platform designed for managing and tracking your own Initial Coin Offerings (ICOs)",
      btnName: "Get All Created ICO",
    },
    {
      title: "ICO Marketplace",
      description:
        "Get All Created ICO is a comprehensive platform providing detailed information on Initial Coin Offerings (ICOs) worldwide",
      btnName: "Listed ICOs",
    },
    {
      title: "Create Token",
      description:
        "Creating a token involves defining it on a blockchain platform, such as Ethereum, Binance Smart Chain, or others that support smart contracts",
      btnName: "Create Token",
    },
    {
      title: "History",
      description:
        "To create a token that logs the history of token creation by a single user, we can extend the ERC-20 contract with additional functionality to record each instance a user mints new tokens",
      btnName: "Get Token History",
    },
    {
      title: "Transfer Token",
      description:
        "To enable the transfer of tokens between users within your smart contract, you'll need to implement functions that allow token holders to send tokens to others",
      btnName: "Transfer Token",
    },
    {
      title: "Withdraw Token",
      description:
        "To enable the transfer of tokens between users within your smart contract, you'll need to implement functions that allow token holders to send tokens to others",
      btnName: "Withdraw Token",
    },
  ];

  return (
    <>
      <div className="wrapper">
        {features.map((feature, index) => (
          <div key={index} className="card">
            <p
              className="card-content"
              style={{
                marginTop: "1rem",
              }}
            >
              {feature.description}
            </p>
            <button
              className="card-btn"
              style={{
                marginTop: "1rem",
              }}
              onClick={() =>
                feature.title === "Your Created ICO"
                  ? setOpenAllICO(true)
                  : feature.title === "ICO Marketplace"
                  ? setOpenICOMarketplace(true)
                  : feature.title === "Create Token"
                  ? setOpenTokenCreator(true)
                  : feature.title === "History"
                  ? setopenTokenHistory(true)
                  : feature.title === "Transfer Token"
                  ? setOpenTransferToken(true)
                  : feature.title === "Withdraw Token"
                  ? setOpenWithdrawToken(true)
                  : feature.title === "ICO Address"
                  ? copyAddress()
                  : feature.title === "Create ICO"
                  ? setOpenCreateICO(true)
                  : ""
              }
            >
              {feature.btnName}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;







