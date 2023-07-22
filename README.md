## The Bridge
In this project I have first Batch Minted 5 NFT's  and then deployed it to the Sepolia testnet and after this i have simply bridged it over to the Polygon chain by using FXPortal bridge.
For the NFT images I have used the DAllE and stored the imaged in the IPFS (Inter planetary file System) through Pinata.
And I have also stored the NFT Metadata in the IPFS.
I am using React for the frontend here. 


## Executing The Program
Download the code by downloading the entire repository which will give you access to other contents of the repository. Navigate to the root directory, run:

Step 1 : ``` npm i ```

Step 2 : ``` npx hardhat node ```

Step 3 : ``` npx hardhat compile  ```  For compiling the solidity file

Step 4 : ``` npx hardhat run --network sepolia scripts/deploy.js ``` For deploying the contract to the testnet

Step 5 : ``` npm run dev ```  This is for running in the browser

##
