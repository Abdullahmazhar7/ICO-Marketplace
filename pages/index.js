'use client';

import React,{useState,useEffect} from "react";
import toast from "react-hot-toast";

import { useStateContext } from "../Context";
import Button from "../Components/Button";
import BuyToken from "../Components/BuyToken";
import Card from "../Components/Card";
import CreateICO from "../Components/CreateICO";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ICOMarket from "../Components/ICOMarket";
import Input from "../Components/Input";
import Loader from "../Components/Loader";
import Marketplace from "../Components/Marketplace";
import PreSaleList from "../Components/PreSaleList";
import Table from "../Components/Table";
import TokenCreator from "../Components/TokenCreator";
import TokenHistory from "../Components/TokenHistory";
import TokenTransfer from "../Components/TokenTransfer";
import UploadLogo from "../Components/UploadLogo";
import WidthdrawToken from "../Components/WidthdrawToken";

const Index = () => {

  const {
    withdrawTokens,
    transferTokens,
    buyToken,
    createICOSALE,
    GET_ALL_USER_ICOSALE_TOKEN,
    GET_ALL_ICOSALE_TOKEN, CreateERC20,
    connectWallet,
    openBuyToken,
    setOpenBuyToken,
    PINATA_API_KEY,
    ICO_MARKETPLACE_ADDRESS,
    PINATA_SECRET_KEY,
    openTransferToken,
    setOpenTransferToken,
    openWithdrawToken,
    setOpenWithdrawToken,
    openTokenCreator,
    setOpenTokenCreator,
    openCreateICO,
    setOpenCreateICO,
    address,
    setAddress,
    accountBalance,
    loader,
    setLoader,
    currency,
    reCall,
    setReCall,
    shortenAddress} = useStateContext();

    
    const notifySuccess = (msg) => toast.success(msg, { duration: 2000  });
    const notifyError = (msg) => toast.error(msg, { duration: 2000 });

    const [allICOs, setAllICOs] = useState();
    const [allUserIcos, setAllUserIcos] = useState();

    // COMPONENT OPEN

    const [openAllICO, setOpenAllICO] = useState(false);
    const [openTokenHistory, setopenTokenHistory] = useState(false);
    const [openICOMarketplace, setOpenICOMarketplace] = useState(false);

    // Buy ICO Token 
    const [buyIco, setbuyIco] = useState(false);

    const copyAddress = () => {
      navigator.clipboard.writeText(ICO_MARKETPLACE_ADDRESS);
      notifySuccess("Copied Successfully");
    };

    useEffect(() => {
      if(address) {
        GET_ALL_ICOSALE_TOKEN().then((token) => {
          console.log("ALL",token);
          setAllICOs(token);
        });
        GET_ALL_USER_ICOSALE_TOKEN().then((token) => {
          console.log("USER",token);
          setAllUserIcos(token);
        });
      }
    },[address]);

  return (
    <div>
      {/* Header */}
      <Header
      accountBalance={accountBalance}
      setAddress={setAddress}
      address={address}
      connectWallet={connectWallet}
      ICO_MARKETPLACE_ADDRESS={ICO_MARKETPLACE_ADDRESS}
      shortenAddress={shortenAddress}
      openAllICO={openAllICO}
      setOpenAllICO={setOpenAllICO}
      setOpenTokenCreator={setOpenTokenCreator}
      openTokenCreator={openTokenCreator}
      setopenTokenHistory={setopenTokenHistory}
      openTokenHistory={openTokenHistory}
      setOpenTransferToken={setOpenTransferToken}
      openTransferToken={openTransferToken}
      setOpenICOMarketplace={setOpenICOMarketplace}
      openICOMarketplace={openICOMarketplace}
      />

      {/* Body */}

      <div className="create">
        <h1 style={{fontSize: "2rem"}}>ICO MarketPlace </h1>
        {
          allICOs?.length != 0 && (
            <Marketplace
            array={allICOs}
            shortenAddress={shortenAddress}
            setbuyIco={setbuyIco}
            setOpenBuyToken={setOpenBuyToken}
            currency={currency}
            />
          )}
           <Card
            setOpenAllICO={setOpenAllICO}
            setOpenTokenCreator={setOpenTokenCreator}
            setOpenTransferToken={setOpenTransferToken}
            setopenTokenHistory={setopenTokenHistory}
            setOpenWithdrawToken={setOpenWithdrawToken}
            setOpenICOMarketplace={setOpenICOMarketplace}
            copyAddress={copyAddress}
            setOpenCreateICO={setOpenCreateICO}
            />
      </div>

      {openAllICO && ( <ICOMarket
       array={allICOs}
        shortenAddress={shortenAddress}
        handleClick={setOpenAllICO}
        currency={currency}
      />

      )}

      {openTokenCreator && (
        <TokenCreator
        CreateERC20={CreateERC20}
        shortenAddress={shortenAddress}
        setOpenTokenCreator={setOpenTokenCreator}
        setLoader={setLoader}
        address={address}
        connectWallet={connectWallet}
        PINATA_API_KEY={PINATA_API_KEY}
        PINATA_SECRET_KEY={PINATA_SECRET_KEY}
       />
      )}
      {openTokenHistory && <TokenHistory
       shortenAddress={shortenAddress}
      setopenTokenHistory={setopenTokenHistory}
      />
      }
      {openCreateICO && (
         <CreateICO
         shortenAddress={shortenAddress}
         setOpenCreateICO={setOpenCreateICO}
         connectWallet={connectWallet}
         address={address}
         createICOSALE={createICOSALE}
         />
        )}

      {openICOMarketplace && <ICOMarket
      array={allUserIcos}
      shortenAddress={shortenAddress}
      handleClick={setOpenICOMarketplace}
      currency={currency}
      />
      }
      {openBuyToken && (
       <BuyToken
        address={address}
        buyToken={buyToken}
        connectWallet={connectWallet}
        setOpenBuyToken={setOpenBuyToken}
        buyIco={buyIco}
        currency={currency}
         />
         )}
      {openTransferToken && ( 
        <TokenTransfer
        address={address}
        transferTokens={transferTokens}
        connectWallet={connectWallet}
        setOpenBuyToken={setOpenTransferToken}
        />
      )}
      {openWithdrawToken && (
         <WidthdrawToken
         address={address}
         withdrawTokens={withdrawTokens}
         connectWallet={connectWallet}
         setOpenWithdrawToken={setOpenWithdrawToken}
         />
        )}


      <Footer/>
      {loader && <Loader/>}

    </div>
  );
}

export default Index;






