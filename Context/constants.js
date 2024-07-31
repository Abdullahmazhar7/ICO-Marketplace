import {ethers} from "ethers";
import Web3Modal from "web3modal";


import ERC20Generator from "./ERC20Generator.json";
import icMarketplace from "./icoMarketplace.json";

export const ERC20Generator_ABI = ERC20Generator.abi;
export const ERC20Generator_BYTECODE = ERC20Generator.bytecode;

export const ICO_MARKETPLACE_ADDRESS =
process.env.NEXT_PUBLIC_ICO_MARKETPLACE_ADDRESS;

export const ICO_MARKETPLACE_ABI = icMarketplace.abi;

// PINATA KEY

export const   PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
export const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRECT_KEY;

//Networks 

const networks = {
    polygon_amoy: {
        chainId: `0x${Number(80002).toString(16)}`,
        chainName: "Polygon Amoy",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
        },
        rpcUrls: ["https://rpc-amoy.polygon.technology/"],
        blockExplorerUrls:["https://www.oklink.com/amoy"],
    },
    sepolia: {
        chainId: `0x${Number(11155111).toString(16)}`,
        chainName: "Sepolia Testnet",
        nativeCurrency: {
            name: "Sepolia Ether",
            symbol: "SEPETH",
            decimals: 18,
        },
        rpcUrls: ["https://rpc.sepolia.dev"],
        blockExplorerUrls: ["https://sepolia.etherscan.io"],
    },
}

const changeNetwork = async({networkName})=> {
    try{
        if(!window.ethereum) throw new Error("No crypto Wallet Found");
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    ...networks[networkName],
                },
            ],
        });
    } catch (error) {
        console.log(error);
    }
};

export const handleNetworkSwitch = async()=> {
    const networkName = "sepolia";
    await changeNetwork({networkName});
};

export const shortenAddress = (address)=>
     `${address?.slice(0,5)}...${address?.slice(address.length - 4)}`;

// Contract

const fetchContract = (address,abi,signer)=>
     new ethers.Contract(address,abi,signer);

export const ICO_MARKETPLACE_CONTRACT = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(
            ICO_MARKETPLACE_ADDRESS,
            ICO_MARKETPLACE_ABI,
            signer
        );
        return contract;

    } catch (error){
        console.log(error);
    }
}


export const TOKEN_CONTRACT = async (TOKEN_ADDRESS) => {
    try {

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();

        const contract = fetchContract(TOKEN_ADDRESS, ERC20Generator_ABI, signer);
        return contract;

    } catch (error){
        console.log(error);
    }
}










