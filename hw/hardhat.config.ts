require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
import "hardhat-deploy";
import type { HardhatUserConfig, HttpNetworkUserConfig } from "hardhat/types";
require("@openzeppelin/hardhat-upgrades");
require("@openzeppelin/hardhat-defender");
require('solidity-coverage');
require("hardhat-gas-reporter");
require("dotenv").config();

//import "./src/tasks"


const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const GOERLI_TEST_OWNER_1 = process.env.GOERLI_TEST_OWNER_1 || "";
const GOERLI_TEST_OWNER_2 = process.env.GOERLI_TEST_OWNER_2 || "";
const BOBA_TEST_OWNER_1 = process.env.BOBA_TEST_OWNER_1 || "";
const BOBA_TEST_OWNER_2 = process.env.BOBA_TEST_OWNER_2 || "";
const SCAN_API_KEY = process.env.SCAN_API_KEY || "";
const MORALIS_API_KEY = process.env.MORALIS_API_KEY || "";
const MAINNET_KEY = process.env.MAINNET_KEY || "";
const SIGNER = process.env.SIGNER || "";


module.exports = {
    defender: {
        apiKey: process.env.DEFENDER_TEAM_API_KEY,
        apiSecret: process.env.DEFENDER_TEAM_API_SECRET_KEY,
    },
    solidity: {
        compilers: [{
                version: "0.8.7",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 2000,
                    },
                },
            },
            {
                version: "0.5.16",
                settings: {},
            },
            {
                version: "0.6.6",
                settings: {},
            },
        ],
        // overrides: {
        //     "contracts/test/unidex-periphery/UniswapV2Router02.sol": {
        //         version: "0.6.6",
        //         settings: {
        //             optimizer: {
        //                 enabled: true,
        //                 runs: 1000,
        //             },
        //         },
        //     },
        // }
    },
    networks: {
        //MAINNETS
        ethereum_mainnet: {
            url: `https://rpc.ankr.com/eth`,
            // url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            //accounts: [`${MAINNET_KEY}`],
        },
        bsc_mainnet: {
            url: `https://rpc.ankr.com/bsc`,
            // url: `https://speedy-nodes-nyc.moralis.io/${MORALIS_API_KEY}/bsc/mainnet`,
            //accounts: [`${MAINNET_KEY}`],
        },
        avalanche_mainnet: {
            url: `https://rpc.ankr.com/avalanche`,
            // url: `https://speedy-nodes-nyc.moralis.io/${MORALIS_API_KEY}/avalanche/mainnet`,
            //accounts: [`${MAINNET_KEY}`],
        },
        polygon_mainnet: {
            //url: `https://rpc.ankr.com/polygon`,
            url: `https://rpc.ankr.com/polygon/356b8f5bdfb0b6668fe8a2486750659869342e8a26ed7bd8f1e50bf1ec010e26`,
            //accounts: [`${MAINNET_KEY}`],
        },


        
        
        ///TESTNETS:

        hardhat: {
            chainId: 6
        }

    },
    // etherscan: {
    //     apiKey: SCAN_API_KEY,
    // },
    contractSizer: {
        alphaSort: true,
        runOnCompile: true,
        disambiguatePaths: false,
    },
    docgen: {
        path: "./docs-docgen",
        clear: true,
        runOnCompile: true,
    },
    mocha: {
        timeout: 100000
    },
    // namedAccounts: {
    //     deployer: 0,
    // },
    gasReporter: {
        enabled: !!(process.env.REPORT_GAS)
    }
};