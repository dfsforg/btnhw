// @ts-nocheck
import { BigNumber, Contract, PopulatedTransaction, Signer, utils } from "ethers";
import { task, types } from "hardhat/config";
import { safeSingleton } from "../contracts";
import { buildSafeTransaction, calculateSafeTransactionHash, populateExecuteTx, safeApproveHash, SafeSignature, SafeTransaction } from "@gnosis.pm/safe-contracts";
import { parseEther } from "@ethersproject/units";
import { getAddress } from "@ethersproject/address";
import { isHexString } from "ethers/lib/utils";
import { SafeTxProposal } from "./proposing";
import { loadSignatures, proposalFile, readFromCliCache } from "./utils";
import fs from "fs";



task("send-tokens", "Prepare and sign transactions")
    //.addPositionalParam("hash", "Hash of Safe transaction to display", undefined, types.string)
    //.addParam("signerIndex", "Index of the signer to use", 0, types.int, true)
    //.addParam("signatures", "Comma seperated list of signatures", undefined, types.string, true)
    .addParam("gasPrice", "Gas price to be used", undefined, types.int, true)
    .addParam("gasLimit", "Gas limit to be used", undefined, types.int, true)
    //.addFlag("buildOnly", "Flag to only output the final transaction")
    .setAction(async (taskArgs, hre) => {


        const iface = new ethers.utils.Interface(['function transfer(address sender, uint amount)'])
        const contractWithoutProvider = new Contract(iface, AddressZero); // note that there is no signer or provider here
        const unsignedTx = await contractWithoutProvider.populateTransaction.transfer(AddressZero, parseUnits(amountStr, 18));

        // now you can add more stuff to this unsignedTx like nonce and gas prices
        unsignedTx.gasLimit = 210000;
        unsignedTx.nonce = await this.provider.getTransactionCount(wallet.address);
        unsignedTx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
        unsignedTx.maxFeePerGas = feeData.maxFeePerGas;

        // now broadcast this object to your offline wallet, there it can sign it
        const serializedSignedTx = await walletWithoutProvider.signTransaction(unsignedTx)

        // now broadcast this to the network
        await provider.sendTransaction(serializedSignedTx)
    });

//https://github.com/ethers-io/ethers.js/issues/535
//https://medium.com/@kaishinaw/erc20-using-hardhat-a-comprehensive-guide-3211efba98d4
task("prepare-and-sign", "Prepare and sign transactions")
    //.addPositionalParam("hash", "Hash of Safe transaction to display", undefined, types.string)
    //.addParam("signerIndex", "Index of the signer to use", 0, types.int, true)
    //.addParam("signatures", "Comma seperated list of signatures", undefined, types.string, true)
    .addParam("gasPrice", "Gas price to be used", undefined, types.int, true)
    .addParam("gasLimit", "Gas limit to be used", undefined, types.int, true)
    //.addFlag("buildOnly", "Flag to only output the final transaction")
    .setAction(async (taskArgs, hre) => {
        //console.log(`Running on ${hre.network.name}`)
        //const proposal: SafeTxProposal = await readFromCliCache(proposalFile(taskArgs.hash))
        //const signers = await ethers.getSigners()
        //const signer = signers[taskArgs.signerIndex]

        const contractOwner = '0x9B309dF3ECe2926C727dC078238D4e6F0E708297;'
        const voidSigner = new ethers.VoidSigner(contractOwner, safe.provider);

        console.log(`Deploying contract from: ${contractOwner}`);

        // Hardhat helper to get the ethers contractFactory object
        const FunToken = await ethers.getContractFactory('FunToken');
        console.log('Deploying FunToken...');
        const funToken =  FunToken.populateTransaction.deploy();
        //await funToken.deployed();
        console.log(`FunToken deployed to: ${funToken.address}`)


        const finalTx2sign = await voidSigner.populateTransaction(populatedTx);
        const finalTx2signWithoutFrom = (({ from, ...rest }) => rest)(finalTx2sign);
        console.log("Ethereum transaction to sign:", JSON.stringify(finalTx2signWithoutFrom, null, 2))

        // const receipt = await signer.sendTransaction(populatedTx).then(tx => tx.wait())
        // console.log("Ethereum transaction hash:", receipt.transactionHash)
        // return receipt.transactionHash
        const serializedTx = ethers.utils.serializeTransaction(finalTx2signWithoutFrom);
        //const rlpEncodedTx = RLP.encode(serializedTx);

        const txHash = ethers.utils.keccak256(serializedTx);
        console.log('Hash to sign:', txHash);


        const chainId = await voidSigner.getChainId();
        fs.writeFileSync(`multisigData/unsigned_tnx_bin`, serializedTx.toString());
        fs.writeFileSync(`multisigData/submit_unsigned_tnx_hash_bin`, ethers.utils.arrayify(txHash));
        fs.writeFileSync(`multisigData/submit_unsigned_tnx_chain_id`, chainId.toString());

        // Deploy the contract
        // console.log('Deploying FunToken...');
        // const funToken = await FunToken.deploy();
        // await funToken.deployed();
        // console.log(`FunToken deployed to: ${funToken.address}`)





    });