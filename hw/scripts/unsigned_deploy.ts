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
    //console.log('Deploying FunToken...');
    //const testToken = await TestToken.populateTransaction.deploy();
    const voidSigner = new ethers.VoidSigner('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', ethers.getDefaultProvider('http://localhost:8545'));
    const tnx = await TestToken.getDeployTransaction({type: 0}); //LEGACY TYPE
    //const finalTx2sign = await voidSigner.populateTransaction(tnx);
    const finalTx2sign = await voidSigner.populateTransaction(tnx);
    var finalTx2signWithoutFrom = (({ from, ...rest }) => rest)(finalTx2sign);
    //    finalTx2signWithoutFrom = (({ chainId, ...rest }) => rest)(finalTx2signWithoutFrom);
    const serializedTx = ethers.utils.serializeTransaction(finalTx2signWithoutFrom);
    console.log(`Unsigned raw deploy tnx: ${JSON.stringify(finalTx2signWithoutFrom, null, 2)}`)

    // const voidSigner = new ethers.VoidSigner(SIGNER, safe.provider);
    // const chainId = await voidSigner.getChainId();
    //await testToken.deployed();
    //console.log(`FunToken deployed to: ${testToken.address}`)
    // const chainId = await voidSigner.getChainId();
    const txHash = ethers.utils.keccak256(serializedTx);
    console.log('Hash to sign:', txHash);

    // fs.writeFileSync(`tmp/submit_unsigned_tnx_chain_id`, chainId.toString());



    const chainId = await voidSigner.getChainId();
    console.log('Chain ID:', chainId);

    fs.writeFileSync(`tmp/unsigned_tnx_bin`, serializedTx.toString());
    fs.writeFileSync(`tmp/chain_id`, chainId.toString());
    fs.writeFileSync(`tmp/submit_unsigned_tnx_hash_bin`, ethers.utils.arrayify(txHash));

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });