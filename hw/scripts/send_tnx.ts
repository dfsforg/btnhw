// scripts/unsigned_deploy.js
import fs from "fs";
const { ethers } = require("hardhat");
//const null
import fs from "fs";

async function main() {

    const provider = new ethers.getDefaultProvider('http://127.0.0.1:8545')
    let rawTnx = fs.readFileSync('./tmp/raw_signed_transaction.hex', 'utf8');
    const txResponse = await provider.sendTransaction(rawTnx);
    console.log("Transaction Hash:", txResponse.hash);

    const receipt = await txResponse.wait();
    console.log("Transaction was mined in block number:", receipt.blockNumber);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });