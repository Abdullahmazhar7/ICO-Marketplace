import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "./Button"; // Corrected import statement


const Header = ({
  accountBalance,
  setAddress,
  address,
  connectWallet, // Ensure this is passed as a prop
  ICO_MARKETPLACE_ADDRESS,
  shortenAddress,
  openAllICO,
  setOpenAllICO,
  setOpenTokenCreator,
  openTokenCreator,
  setopenTokenHistory,
  openTokenHistory,
  setOpenICOMarketplace,
  openICOMarketplace,
}) => {
  const [isMetamaskInstalled, setisMetaMaskInstalled] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setisMetaMaskInstalled(true);

      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, [address]);

  const handleAccountsChanged = (accounts) => {
    setAddress(accounts[0]);
  };

  return (
    <header className="header">
      <nav>
        <div className="logo">
          <Link href="/">
           ICO Express <span> Launcher </span>
          </Link>
        </div>

        <input type="checkbox" name="" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">
          &#9776;
        </label>
        <ul className="menu">
          <li>
            <Link href="/"> Home </Link>
          </li>
          <li>
            <Link href="#">
              <span
                onClick={() =>
                  openICOMarketplace
                    ? setOpenICOMarketplace(false)
                    : setOpenICOMarketplace(true)
                }
              >
                ICO History
              </span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span
                onClick={() =>
                  openAllICO
                   ? setOpenAllICO(false)
                   : setOpenAllICO(true)
                }
              >
                 ICO MarketPlace
              </span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span
                onClick={() =>
                  openTokenHistory
                    ? setopenTokenHistory(false)
                    : setopenTokenHistory(true)
                }
              >
                Token History
              </span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span
                onClick={() =>
                  openTokenCreator
                    ? setOpenTokenCreator(false)
                    : setOpenTokenCreator(true)
                }
              >
                Token Creator
              </span>
            </Link>
          </li>
          {address ? (
            <li>
              <Button
               name={
                address
                  ? `${shortenAddress(address)}: $${accountBalance ? accountBalance.slice(0, 5) : '0.00'}`
                  : 'Connect Wallet'
              }
              //  name={`${shortenAddress(address)}: $${accountBalance.slice(0, 5) : '0.00'}`}
              />
            </li>
          ) : (
            <li>
              <Button name="Connect Wallet" handleClick={connectWallet} />
              {/* <w3m-button /> */}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;



