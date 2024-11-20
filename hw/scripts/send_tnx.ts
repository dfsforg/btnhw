// scripts/unsigned_deploy.js
import fs from "fs";
const { ethers } = require("hardhat");
//const null

async function main() {

    const voidSigner = new ethers.VoidSigner(SIGNER, provider);
    const chainId = await voidSigner.getChainId();

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });