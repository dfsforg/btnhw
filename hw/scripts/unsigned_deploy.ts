// scripts/unsigned_deploy.js
import fs from "fs";
const { ethers } = require("hardhat");
//const null

async function main() {

    // Get the contract owner
    // const contractOwner = await ethers.getSigners();
    // console.log(`Deploying contract from: ${contractOwner[0].address}`);

    // Hardhat helper to get the ethers contractFactory object
    const TestToken = await ethers.getContractFactory('TestToken');

    // Deploy the contract
    console.log('Deploying FunToken...');
    //const testToken = await TestToken.populateTransaction.deploy();
    const testToken = await TestToken.getDeployTransaction();
    console.log(`Unsigned raw deploy tnx: ${testToken.data}`)

    // const voidSigner = new ethers.VoidSigner(SIGNER, safe.provider);
    // const chainId = await voidSigner.getChainId();
    //await testToken.deployed();
    //console.log(`FunToken deployed to: ${testToken.address}`)
    // const chainId = await voidSigner.getChainId();
    const txHash = ethers.utils.keccak256(testToken.data);
    console.log('Hash to sign:', txHash);
    fs.writeFileSync(`tmp/unsigned_tnx_bin`, testToken.data.toString());
    fs.writeFileSync(`tmp/submit_unsigned_tnx_hash_bin`, ethers.utils.arrayify(txHash));
    // fs.writeFileSync(`tmp/submit_unsigned_tnx_chain_id`, chainId.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });