// scripts/unsigned_deploy.js
import fs from "fs";
const { ethers } = require("hardhat");
//const null




async function main() {
    console.log('Getting the fun token contract...');
    const ownerAddress = process.env.SIGNER;
    const contractAddress = '0x057ef64e23666f000b34ae31332854acbd1c8544';
    const voidSigner = new ethers.VoidSigner(ownerAddress, ethers.getDefaultProvider('http://127.0.0.1:8545'));
    const testToken = await ethers.getContractAt('TestToken', contractAddress, voidSigner);
    console.log('Querying token name...');
    const name = await testToken.name();
    console.log(`Token Name: ${name}\n`);
    console.log('Querying token symbol...');
    const symbol = await testToken.symbol();
    console.log(`Token Symbol: ${symbol}\n`);
    console.log('Querying decimals...');
    const decimals = await testToken.decimals();
    console.log(`Token Decimals: ${decimals}\n`);
    console.log('Querying token supply...');
    const totalSupply = await testToken.totalSupply();
    console.log(`Total Supply including all decimals: ${totalSupply}`);
    console.log(`Total supply including all decimals comma separated: ${ethers.utils.commify(totalSupply)}`);
    console.log(`Total Supply in FUN: ${ethers.utils.formatUnits(totalSupply, decimals)}\n`)

    console.log('Getting the balance of contract owner...');
    //const signers = await ethers.;
    //const ownerAddress = '0xce94011FCA92eA1907334Df66990bA3765107195';

    let ownerBalance = await testToken.balanceOf(ownerAddress);
    console.log(`Contract owner at ${ownerAddress} has a ${symbol} balance of ${ethers.utils.formatUnits(ownerBalance, decimals)}\n`);


    console.log('Initiating a transfer...');

    const transferAmount = 10;
    const testRecipientAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

    //const voidSigner = new ethers.VoidSigner(ownerAddress, ethers.getDefaultProvider('https://holesky.gateway.tenderly.co'));
    const tnx = await testToken.populateTransaction.transfer(testRecipientAddress, ethers.utils.parseUnits(transferAmount.toString(), decimals),{type: 0});
    const finalTx2sign = await voidSigner.populateTransaction(tnx);
    var finalTx2signWithoutFrom = (({ from, ...rest }) => rest)(finalTx2sign);
    const serializedTx = ethers.utils.serializeTransaction(finalTx2signWithoutFrom);
    console.log(`Transferring ${transferAmount} ${symbol} tokens to ${testRecipientAddress} from ${ownerAddress}`);
    console.log(`Unsigned raw transfer tnx: ${JSON.stringify(finalTx2signWithoutFrom, null, 2)}`)

    const txHash = ethers.utils.keccak256(serializedTx);
    console.log('Hash to sign:', txHash);

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


