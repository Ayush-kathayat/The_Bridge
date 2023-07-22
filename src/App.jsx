// import dotenv from 'dotenv'
// dotenv.config()

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import Bridge from "../artifacts/contracts/Bridge.sol/Bridge.json";
import FXRootContractAbi from "../artifacts/FXRootContractAbi.js";


const contractAddress = "0xE7093B6B3c7161Fc7536548c8D4E184d5a4FC2F5"; // Replace with your contract's address

// Connect to an Ethereum provider
const provider = new ethers.providers.Web3Provider(window.ethereum); // Replace with your Ethereum provider URL

const signer = provider.getSigner();

// Create a contract instance  this is the ERC21A contract instance here
const contract = new ethers.Contract(contractAddress, Bridge.abi, signer);


// wallet instance below
const privateKey = "4e57ba9be1bd7cef459afcade5c49c31e9f66a924a95be0148f8e55038fe498e";
const wallet = new ethers.Wallet(privateKey, provider);

// below is the instance of the FXRoot contract
const fxRootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";

function App() {
  const [url, setUrl] = useState("");
  const [nftData, setNftData] = useState([]);
  const [divIndex, setDivIndex] = useState(undefined);
  const [promptContent, setPromptContent] = useState(``);
  const [isMinted, setIsMinted] = useState(false);
  const [isApprovedAndDeposited, setIsApprovedAndDeposited] = useState(false);
  const [contractBalance, setContractBalance] = useState("LOADING ....");
  const [fxRoot, setFxRoot] = useState(null);
  const [dontKnowWhatToName , setDontKnowWhatToName] = useState(false);




  // This below use effect fetching the URL

  // so I am thinking that i will combine these two function below the first function is just calling a function
  // which is present in the solidity file and returning it what is returned by that function
  // the second function is fetching the data from that returned url

  // so i will make a function which will do these both and at last it will make a new p element and it will do its thing

  const fetchNFTData = async (token_str, div_index) => {
    try {
      const returnedUrl = await contract.nftUrl();
      const updatedUrl = returnedUrl + token_str;
      setUrl(updatedUrl);
      setDivIndex(div_index);
    } catch (error) {
      console.error("Error fetching NFT URL:", error);
    }
  };

  useEffect(() => {
    // will only run when the url state will be changed
    const fetchData = async () => {
      if (url) {
        try {
          const response = await fetch(url);
          console.log(response);
          const jsonData = await response.json();
          console.log(jsonData);
          setNftData(jsonData);
        } catch (error) {
          console.error("Error fetching NFT data:", error);
        }
      }
    };

    fetchData();
  }, [url]);

  useEffect(() => {
    // will only run when the nftData is UPDATED
    const add_prompt = () => {
      console.log(nftData.prompt);
      setPromptContent(nftData.prompt);
    };
    add_prompt();
  }, [nftData]);

  const mintNFT = async (amount) => {
    try {
      const tx = await contract.mint(amount);
      await tx.wait();
      console.log(` ${amount} NFT minted successfully`);
      setIsMinted(true);
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  // Now Below is the briding part //


  // Define an async function to fetch the FXRoot contract
  const fetchFxRootContract = async () => {
    try {
      const fxRootContractFactory = new ethers.ContractFactory(FXRootContractAbi, Bridge.bytecode, signer);
      const fxRootContract = fxRootContractFactory.attach(fxRootAddress);
      setFxRoot(fxRootContract);


    } catch (error) {
      console.error("Error fetching FXRoot contract:", error);
    }
  };



  // Call the fetchFxRootContract function when the component mounts
  useEffect(() => {
    fetchFxRootContract();
  }, []);


  const token_ids = [0, 1, 2, 3, 4];

  const approveAndDepositNFT = async () => {
    try {
      //Approval

      // we will approve the nfts here
      const approveTx = await contract.connect(signer).setApprovalForAll(fxRootAddress, true);

      await approveTx.wait();

      console.log("Approval confirmed"); // confirmation for the approval

      // Depoist

      // Deposit the NFTs to the FXRoot contracts
      for (let i = 0; i < token_ids.length; i++) {
        const depositTx = await fxRoot.connect(signer).deposit(contract.address, wallet.address, token_ids[i],
          '0x6566');

        // Wait for the deposit to be confirmed
        await depositTx.wait();
      }

      console.log("Approved and deposited"); // confirmation in the console
      setIsApprovedAndDeposited(true);

      // Fetch contract balance after FXRoot contract is fetched successfully
      const balance = await contract.balanceOf(wallet.address);
      setContractBalance(parseInt(balance.toString(), 10));
    } catch (err) {
      console.error("Error while approving and depositing NFTs:", err);
    }
  };

  const getbal = () => {
    setDontKnowWhatToName(true);
  };





  // my html below
  return (
    <div className="App">
      <h1 className="title"> ONLY I CAN MINT </h1>

      <h3 className="title subtitle">A COLLECTER'S COLLECTIONS</h3>

      <div className="nft-container">
        <div className="nft">
          <div className="nft-image-container">
            <img className="nft-image" src="assets/NFT-1.jpg" alt="NFT-1" />
          </div>

          <h1 className="name">Barry Allen</h1>
          <button
            className="get-prompt-btn btn-1"
            onClick={() => fetchNFTData("token1.json", 0)}
          >
            CLICK TO GET THE PROMPT
          </button>
          {divIndex === 0 && promptContent && (
            <p className="prompt_para">{promptContent}</p>
          )}
        </div>

        <div className="nft">
          <div className="nft-image-container">
            <img className="nft-image" src="assets/NFT-2.jpg" alt="NFT-2" />
          </div>

          <h1 className="name">Naruto Uzumaki</h1>
          <button
            className="get-prompt-btn btn-2"
            onClick={() => fetchNFTData("token2.json", 1)}
          >
            CLICK TO GET THE PROMPT
          </button>
          {divIndex === 1 && promptContent && (
            <p className="prompt_para">{promptContent}</p>
          )}
        </div>

        <div className="nft">
          <div className="nft-image-container">
            <img className="nft-image" src="assets/NFT-3.jpg" alt="NFT-3" />
          </div>

          <h1 className="name">Miles Morales</h1>
          <button
            className="get-prompt-btn btn-3"
            onClick={() => fetchNFTData("token3.json", 2)}
          >
            CLICK TO GET THE PROMPT
          </button>
          {divIndex === 2 && promptContent && (
            <p className="prompt_para">{promptContent}</p>
          )}
        </div>

        <div className="nft">
          <div className="nft-image-container">
            <img className="nft-image" src="assets/NFT-4.jpg" alt="NFT-4" />
          </div>

          <h1 className="name">ROBOT</h1>
          <button
            className="get-prompt-btn btn-4"
            onClick={() => fetchNFTData("token4.json", 3)}
          >
            CLICK TO GET THE PROMPT
          </button>
          {divIndex === 3 && promptContent && (
            <p className="prompt_para">{promptContent}</p>
          )}
        </div>

        <div className="nft">
          <div className="nft-image-container">
            <img className="nft-image" src="assets/NFT-5.jpg" alt="NFT-5" />
          </div>

          <h1 className="name">UFO</h1>
          <button
            className="get-prompt-btn btn-5"
            onClick={() => fetchNFTData("token5.json", 4)}
          >
            CLICK TO GET THE PROMPT
          </button>
          {divIndex === 4 && promptContent && (
            <p className="prompt_para">{promptContent}</p>
          )}
        </div>
      </div>

      <div className="action-btn">
        <div className="batch-mint">
          <button
            className="mint-btn"
            onClick={() => {
              mintNFT(5);
            }}
          >
            MINT THEM ALL
          </button>
          {isMinted && (
            <h1 className="minted-para">N-F-T MINTED SUCCESSFULLY!</h1>
          )}
        </div>
        <div className="convert-tokens">
          <button className="bridge-btn" onClick={approveAndDepositNFT}>BRIDGE OVER TO POLYGON</button>
          {isApprovedAndDeposited && <h1> APPROVED AND DEPOSIT</h1>}
        </div>
      </div>

      <div className="balance">
        <button className="get-balance-btn" onClick={getbal}>GET BALANCE</button>
        { dontKnowWhatToName && (<h1 className="bal-para"> The Balance of the Bridge Contract {wallet.address} is: {contractBalance}</h1>
        )}
      </div>
      <footer className="footer"> Made with love<span>❤️</span> by Ayush Kathayat</footer>
    </div>
  );
}

export default App;
