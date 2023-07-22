// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";

contract Bridge is ERC721A {
    address public Owner;

    // Maximum number of tokens that can be minted
    uint256 public max_quantity = 5;

    uint256 public Supply = 0;

    // Base urls for the nfts
    string info_url = "https://gateway.pinata.cloud/ipfs/QmUkLMnkBLv32XT1mW5V39Vg2zPmCm1SV5UVgZJj6weqph/";
    

    constructor() ERC721A("Cypher", "CPH") {
        Owner = msg.sender;
    }

    // Modifier that only allows the owner to execute a function
    modifier onlyOwner() {
        require(msg.sender == Owner, "Only owner can perform this action!");
        _;
    }

    // Function to mint NFT which only owner can perform
    function mint(uint256 quantity) external payable onlyOwner {
        require(Supply + quantity <= max_quantity, "You can not mint more than 5");

        Supply += quantity;       // for checking the quantity 

        _mint(msg.sender, quantity);
    }

    // Return the URL for the prompt description and names and all that
    function nftUrl() external view returns (string memory) {
        return info_url;
    }
}
