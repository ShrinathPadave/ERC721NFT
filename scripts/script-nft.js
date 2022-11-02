require('dotenv').config();
const API_URL = "";
const PUBLIC_KEY = ""
const PRIVATE_KEY ="";
const {createAlchemyWeb3} = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
 
//console.log(JSON.stringify(contract.abi));

const contractAddress = "0x7072aaC920Ea9D57108aDc965D7a08edC3877b7C";
const nftContract = new web3.eth.Contract(contract.abi,contractAddress);

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
  
    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    };
  
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              );
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              );
            }
          }
        );
      })
      .catch((err) => {
        console.log(" Promise failed:", err);
      });
  }
  mintNFT(
    "https://gateway.pinata.cloud/ipfs/QmVVMRLHkkK5r7ZxtEyZq6dSbz8a5B4zNGUBfm6vPrKVj1"
  );
  //The hash of your transaction is:  0xa08235f75487a6246ebd5c84276cbed70ede6620d1fa62e51375e70d0831a58f