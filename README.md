# The Bridge

In this project, I first minted 5 NFTs using Batch Minting and then deployed them to the Goerli testnet. After this, I bridged them over to the Polygon chain using the FXPortal bridge. For the NFT images, I used DALL-E and stored the images in the IPFS (Interplanetary File System) through Pinata. Additionally, I stored the NFT Metadata in IPFS. The frontend of the project is built using React.

## Executing The Program

To run the project, follow these steps:

Step 1: Install the necessary dependencies by running:
```
npm i
```

Step 2: Start a local development node by running:
```
npx hardhat node
```

Step 3: Compile the Solidity smart contract by running:
```
npx hardhat compile
```

Step 4: Deploy the contract to the Goerli testnet by running:
```
npx hardhat run --network goerli scripts/deploy.js
```

Step 5: Run the React frontend in the browser with the command:
```
npm run dev
```

## Key Points

1. Ensure to change your private key.
2. Store all private keys and other sensitive information in the `.env` file in the root directory.
3. You can modify or add networks in the `hardhat.config.js` file.
4. Metamask should be installed in your browser for wallet interaction.

## Interacting with the Code in the Frontend

1. To view the prompt for an NFT, click the button below each NFT to display the prompt for that specific NFT.
2. There are three more buttons: `BATCH MINT`, `APPROVE & DEPOSIT`, and `GET_BALANCE`.
3. Clicking the `BATCH MINT` button will mint the 5 NFTs in batches.
4. The `APPROVE & DEPOSIT` button will approve and deposit the NFTs.
5. Lastly, the `GET_BALANCE` button will fetch the balance of the provided wallet address.

## Authors

This project was created by Ayush Kathayat.

## License

This project is licensed under the MIT License.
