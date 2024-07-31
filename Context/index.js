import React, {useState,useEffect,useContext,createContext} from "react";
import { ethers } from "ethers";
import { ContractFactory } from "ethers";
import Web3Modal from "web3modal";
import toast from "react-hot-toast";

// INTERNAL IMPORTS

import {
  ERC20Generator,
  ERC20Generator_BYTECODE,
  handleNetworkSwitch,
  shortenAddress,
  ICO_MARKETPLACE_ADDRESS,
  ICO_MARKETPLACE_CONTRACT,
  TOKEN_CONTRACT,
  PINATA_API_KEY,
  PINATA_SECRET_KEY,
  ERC20Generator_ABI,
} from "./constants";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

  // State Variables

  const [address, setAddress] = useState();
  const [accountBalance, setAccountBalance] = useState(null);
  const [loader, setLoader] = useState(false);
  const [reCall, setReCall] = useState(0);
  const [currency, setCurrency] = useState("ETH");  

  // COMPONENT
  const [openBuyToken, setOpenBuyToken] = useState(false);
  const [openWithdrawToken, setOpenWithdrawToken] = useState(false);
  const [openTransferToken, setOpenTransferToken] = useState(false);
  const [openTokenCreator, setOpenTokenCreator] = useState(false);
  const [openCreateICO, setOpenCreateICO] = useState(false);

  // Notifications

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  // FUNCTIONALITIES
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return notifyError("No crypto Wallet Found");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setAddress(accounts[0]);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const getbalance = await provider.getBalance(accounts[0]);
        const bal = ethers.utils.formatEther(getbalance);
        setAccountBalance(bal);
        return accounts[0];
      } else {
        notifyError("No Accounts Connected");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=> {
    checkIfWalletConnected();
  },[address]);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return notifyError("No crypto Wallet Found");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length) {
        setAddress(accounts[0]);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const getbalance = await provider.getBalance(accounts[0]);
        const bal = ethers.utils.formatEther(getbalance);
        setAccountBalance(bal);
        return accounts[0];
      } else {
        notifyError("No Accounts Connected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // MAIN FUNCTION

  const _deployContract = async (signer, account, name, symbol, supply, imageURL) => {
    try {
      const factory = new ContractFactory(
        ERC20Generator_ABI,
        ERC20Generator_BYTECODE,
        signer
      );
  
      const totalSupply = Number(supply);
      const _initialSupply = ethers.utils.parseEther(totalSupply.toString(), "ether");
  
      let contract = await factory.deploy(_initialSupply, name, symbol);
  
      await contract.deployed(); // Wait for the contract to be deployed
  
      if (contract.address) {
        const today = Date.now();
        const date = new Date(today);
        const _tokenCreatedDate = date.toLocaleDateString("en-US");
  
        const _token = {
          account,
          supply: supply.toString(),
          name,
          symbol,
          tokenAddress: contract.address,
          transactionHash: contract.deployTransaction.hash,
          createdAt: _tokenCreatedDate,
          logo: imageURL,
        };
  
        let tokenHistory = [];
  
        const history = localStorage.getItem("TOKEN_HISTORY");
        if (history) {
          try {
            tokenHistory = JSON.parse(history);
          } catch (error) {
            console.error("Failed to parse token history data:", error);
          }
        }
  
        tokenHistory.push(_token);
        localStorage.setItem("TOKEN_HISTORY", JSON.stringify(tokenHistory));
  
        setLoader(false);
        setReCall(reCall + 1);
        setOpenTokenCreator(false);
      }
    } catch (error) {
      setLoader(false);
      notifyError("Something went wrong!");
      console.log(error);
    }
  };
  
  const CreateERC20 = async (token, account, imageURL) => {
    const { name, symbol, supply } = token;
    try {
      setLoader(true);
      notifySuccess("Creating Token");
      if (!name || !symbol || !supply) {
        notifyError(" Missing Credetials ! ");
      } else {
        
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();

        _deployContract(signer, account, name, symbol, supply, imageURL);
      }
    } catch (error) {
      setLoader(false);
      notifyError(" Something went wrong ! ");
      console.log(error);
    }
  };

  const GET_ALL_ICOSALE_TOKEN = async () => {
    try {
      setLoader(true);
      const address = await connectWallet();
      const contract = await ICO_MARKETPLACE_CONTRACT();

      if(address){
        const _allTokens = await contract.getAllTokens();

        const _tokenArray = Promise.all(
          _allTokens.map(async (token) => {
            const tokenContract = await TOKEN_CONTRACT(token?.token);

            const balance = await tokenContract.balanceOf(
              ICO_MARKETPLACE_ADDRESS
            );

            return {
              creator: token.creator,
              token: token.token,
              name: token.name,
              symbol: token.symbol,
              supply: token.supply,
              supported: token.supported,
              price: ethers.utils.formatEther(token?.price.toString()),
              icoSalebal: ethers.utils.formatEther(balance.toString()),
            };
          })
        );

        setLoader(false);
        return _tokenArray;
      }

    } catch (error) {
      notifyError("Something went Wrong");
      console.log(error);
    }
  };

  const GET_ALL_USER_ICOSALE_TOKEN = async () => {
    try {
      setLoader(true);
      const address = await connectWallet();
      const contract = await ICO_MARKETPLACE_CONTRACT();

      if(address){
        const _allTokens = await contract.getTokenCreatedBy(address);

        const _tokenArray = Promise.all(
          _allTokens.map(async (token) => {
            const tokenContract = await TOKEN_CONTRACT(token?.token);

            const balance = await tokenContract.balanceOf(
              ICO_MARKETPLACE_ADDRESS
            );

            return {
              creator: token.creator,
              token: token.token,
              name: token.name,
              symbol: token.symbol,
              supply: token.supply,
              supported: token.supported,
              price: ethers.utils.formatEther(token?.price.toString()),
              icoSalebal: ethers.utils.formatEther(balance.toString()),
            };
          })
        );

        setLoader(false);
        return _tokenArray;
      }

    } catch (error) {
      notifyError("Something went Wrong");
      console.log(error);
    }
  };

  const createICOSALE = async (icoSale) => {
    try {
      const { address, price } = icoSale;
      if (!address | !price) return notifyError("Missing Credentials");

      setLoader(true);
      notifySuccess("Creating icoSale...");
      await connectWallet();

      const contract = await ICO_MARKETPLACE_CONTRACT();

      const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

      const transaction = await contract.createICOSale(address, payAmount, {
        gasLimit: ethers.utils.hexlify(8000000),
      });

      await transaction.wait();

      if (transaction.hash) {
        setLoader(false);
        setOpenCreateICO(false);
        setReCall(reCall + 1);
      }
    } catch (error) {
      setLoader(false);
      setOpenCreateICO(false);
      notifyError("something went Wrong");
      console.log(error);
    }
  };

  const buyToken = async (tokenAddress, tokenQuantity) => {
    try {
      setLoader(true);
      notifySuccess("Purchasing Token...");
  
      if (!tokenQuantity || !tokenAddress) {
        setLoader(false);
        return notifyError("Missing Credentials");
      }
  
      const address = await connectWallet();
      const contract = await ICO_MARKETPLACE_CONTRACT();
  
      const _tokenBal = await contract.getBalance(tokenAddress);
      const _tokenDetails = await contract.getTokenDetails(tokenAddress);
  
      const availableToken = ethers.utils.formatEther(_tokenBal.toString());
  
      if (availableToken > 0) {
        const price =
          ethers.utils.formatEther(_tokenDetails.price.toString()) *
          Number(tokenQuantity);
  
        const payAmount = ethers.utils.parseUnits(price.toString(), "ether");
  
        const transaction = await contract.buyToken(
          tokenAddress,
          Number(tokenQuantity),
          {
            value: payAmount.toString(),
            gasLimit: ethers.utils.hexlify(8000000), // Consider adjusting this if needed
          }
        );
        console.log(address)
        await transaction.wait();
        setLoader(false);
        setReCall(reCall + 1);
        setOpenBuyToken(false);
        notifySuccess("Transaction Completed Successfully");
      } else {
        setLoader(false);
        setOpenBuyToken(false);
        notifyError("Your Token Balance is 0");
      }
    } catch (error) {
      setLoader(false);
      setOpenBuyToken(false);
      notifyError("Something Went Wrong!");
      console.error("buyToken error:", error);
    }
  };
  

  // const buyToken = async (tokenAddress, tokenQuantity) => {
  //   try {
  //     setLoader(true);
  //     notifySuccess("Purchasing Token.....");

  //     if(!tokenQuantity || !tokenAddress) return notifyError("Missing Credentials");

  //     const address = await connectWallet();
  //     const contract = await ICO_MARKETPLACE_CONTRACT();

  //     const _tokenBal = await contract.getBalance(tokenAddress);
  //     const _tokenDetails = await contract.getTokenDetails(tokenAddress);

  //     const availableToken = ethers.utils.formatEther(_tokenBal.toString());

  //     if (availableToken > 0) {
  //       const price =
  //         ethers.utils.formatEther(_tokenDetails.price.toString()) *
  //         Number(tokenQuantity);

  //       const payAmount = ethers.utils.parseUnits(price.toString(), "ethers");

  //       const transaction = await contract.buyToken(
  //         tokenAddress,
  //         Number(tokenQuantity),
  //         {
  //           value: payAmount.toString(),
  //           gasLimit: ethers.utils.hexlify(8000000),
  //         }
  //       );

  //       await transaction.wait();
  //       setLoader(false);
  //       setReCall(reCall + 1);
  //       setOpenBuyToken(false);
  //       notifySuccess("Transaction Completed Successfully ");
  //     } else {
  //       setLoader(false);
  //       setOpenBuyToken(false);
  //       notifyError("Your Token Balance is 0 ");
  //     }
  //   } catch (error) {
  //     setLoader(false);
  //     setOpenBuyToken(false);
  //     notifyError(" Something Went Wrong !");
  //     console.log(error);
  //   }
  // };


  const transferTokens = async (transferTokenData) => {
    try {
      if (
        !transferTokenData.address ||
        !transferTokenData.amount ||
        !transferTokenData.tokenAdd
      )
        return notifyError("Missing Credentials");

      setLoader(true);
      notifySuccess("Transaction is Processing..");
      const address = await walletconnect();

      const contract = await TOKEN_CONTRACT(transferTokenData.tokenAdd);

      const _availableBal = await contract.balanceOf(address);
      const availableToken = ethers.utils.formatEther(_availableBal.toString());

      if (availableToken > 1) {
        const payAmount = ethers.utils.parseUnits(
          transferTokenData.amount.toString(),
          "ether"
        );
        const transaction = await contract.transfer(
          transferTokenData.address,
          payAmount,
          {
            gasLimit: ethers.utils.hexlify(8000000),
          }
        );
        await transaction.wait();
        setLoader(false);
        setReCall(reCall + 1);
        setOpenTransferToken(false);
        notifySuccess("Transaction Completed Successfully ");

      } else {
        setLoader(false);
        setReCall(reCall + 1);
        setOpenTransferToken(false);
        notifyError("Your balance is 0 ");
      }
    } catch (error) {
      setLoader(false);
        setReCall(reCall + 1);
        setOpenTransferToken(false);
        notifyError("Something Went Wrong !");
      console.log(error);
    }
  };

  const withdrawTokens = async (withdrawQuantity) => {
    try {
      if(!withdrawQuantity.amount || !withdrawQuantity.token)
        return notifyError("Missing Credentials");

      setLoader(true);
      notifySuccess("Transaction is Processing..");

      const address = await connectWallet();
      const contract = await ICO_MARKETPLACE_CONTRACT();

      const payAmount = ethers.utils.parseUnits(
        withdrawQuantity.amount.toString(),
        "ether"
      );

      const transaction = await contract.withdrawTokens(
        withdrawQuantity.token,
        payAmount,
        {
          gasLimit: ethers.utils.hexlify(8000000),
        }
      );

      await transaction.wait();
      setLoader(false);
      setReCall(reCall + 1)
      setOpenWithdrawToken(false);
      notifySuccess("Transaction Completed Successfully");

    } catch (error) {
      setLoader(false);
      setReCall(reCall + 1)
      setOpenWithdrawToken(false);
      notifySuccess("Something Went Wrong !");
      console.log(error);
    }
  };

  return <StateContext.Provider
   value={{
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
    openWithdrawToken,
    setOpenWithdrawToken,
    openTransferToken,
    setOpenTransferToken,
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
    shortenAddress

   }}>{children}</StateContext.Provider>;
};


export const useStateContext = () => useContext(StateContext);







