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

import "./src/tasks"


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
const SIGNER_ADDRESS = process.env.SIGNER_ADDRESS || "";

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
        overrides: {
            "contracts/test/unidex-periphery/UniswapV2Router02.sol": {
                version: "0.6.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                    },
                },
            },
        }
    },
    networks: {
        //MAINNETS
        ethereum_mainnet: {
            url: `https://rpc.ankr.com/eth`,
            // url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${MAINNET_KEY}`],
        },
        bsc_mainnet: {
            url: `https://rpc.ankr.com/bsc`,
            // url: `https://speedy-nodes-nyc.moralis.io/${MORALIS_API_KEY}/bsc/mainnet`,
            accounts: [`${MAINNET_KEY}`],
        },
        avalanche_mainnet: {
            url: `https://rpc.ankr.com/avalanche`,
            // url: `https://speedy-nodes-nyc.moralis.io/${MORALIS_API_KEY}/avalanche/mainnet`,
            accounts: [`${MAINNET_KEY}`],
        },
        polygon_mainnet: {
            //url: `https://rpc.ankr.com/polygon`,
            url: `https://rpc.ankr.com/polygon/356b8f5bdfb0b6668fe8a2486750659869342e8a26ed7bd8f1e50bf1ec010e26`,
            accounts: [`${MAINNET_KEY}`],
        },
        telos_mainnet: {
            url: `https://mainnet.telos.net/evm`,
            // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${MAINNET_KEY}`],
        },
        milkomeda_mainnet: {
            url: `https://rpc-mainnet-cardano-evm.c1.milkomeda.com`,
            // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${MAINNET_KEY}`],
        },
        boba_eth_mainnet: {
            url: `https://mainnet.boba.network`,
            // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${MAINNET_KEY}`],
        },
        boba_avax_mainnet: {
            url: `https://avax.boba.network`,
            // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${MAINNET_KEY}`],
        },
        boba_bnb_mainnet: {
            url: `https://bnb.boba.network`,
            // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            //accounts: [`${MAINNET_KEY}`],
        },
        aurora_mainnet: {
            url: `https://mainnet.aurora.dev`,
            // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${MAINNET_KEY}`],
        },
        arbitrum_mainnet: {
            url: `https://arb1.arbitrum.io/rpc`,
            // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${MAINNET_KEY}`],
        },
        kava_mainnet: {
            url: `https://evm.kava.io/`,
            // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${MAINNET_KEY}`],
        },
        optimism_mainnet: {
            url: `https://optimism.publicnode.com`,
            // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${MAINNET_KEY}`],
        },
        arbitrum_nova_mainnet: {
            url: `https://nova.arbitrum.io/rpc`,
            // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${MAINNET_KEY}`],
        },
        polygon_zkevm_mainnet: {
            url: `https://polygonzkevm-mainnet.g.alchemy.com/v2/k6y06NaiT4O7NFnwKA5K77PnKolYvJyd`,
            // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${MAINNET_KEY}`],
        },
        arbitrum_one_mainnet: {
            //url: `https://arbitrum-one.publicnode.com`,
            url: `https://rpc.ankr.com/arbitrum`,
            accounts: [`${MAINNET_KEY}`],
        },
        zksync_era_mainnet: {
            url: `https://mainnet.era.zksync.io/`,
            // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${MAINNET_KEY}`],
        },
        linea_mainnet: {
            url: `https://linea-mainnet.infura.io/v3/40d9adf1363d40cc8c0e9e16e56cc008`,
            // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${MAINNET_KEY}`],
        },
        base_mainnet: {
            url: `https://mainnet.base.org/`,
            // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${MAINNET_KEY}`],
        },
        mantle_mainnet: {
            url: `https://mantle-rpc.publicnode.com`,
            // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${MAINNET_KEY}`],
        },
        scroll_mainnet: {
            url: `https://rpc.scroll.io`,
            //https://rpc.scroll.io
            //http://mainnet-rpc.scroll.io/
            // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${MAINNET_KEY}`],
        },
        manta_mainnet:{
            url: `https://pacific-rpc.manta.network/http`,
            accounts: [`${MAINNET_KEY}`],
        },
        metis_mainnet:{
            url: `https://andromeda.metis.io/?owner=1088`,
            accounts: [`${MAINNET_KEY}`],
        },
        bahamut_mainnet:{
            url: `https://rpc1.bahamut.io/`,
            accounts: [`${MAINNET_KEY}`],
        },
        mode_mainnet:{
            url: `https://mainnet.mode.network`,
            accounts: [`${MAINNET_KEY}`],
        },
        rsk_mainnet:{
            url: `https://public-node.rsk.co`,
            accounts: [`${MAINNET_KEY}`],
        },
        blast_mainnet:{
            url: `https://rpc.blast.io/`,
            //url: `https://rpc.blastblockchain.com/`,
            accounts: [`${MAINNET_KEY}`],
        },
        zklink_mainnet:{
            url: `https://rpc.zklink.io/`,
            accounts: [`${MAINNET_KEY}`],
        },
        taiko_mainnet:{
            url: `https://rpc.mainnet.taiko.xyz`,
            accounts: [`${MAINNET_KEY}`],
        },
        sei_mainnet:{
            url: `https://evm-rpc.sei-apis.com`,
            accounts: [`${MAINNET_KEY}`],
        },
        zetachain_mainnet: {
            url: "https://zetachain-evm.blockpi.network/v1/rpc/public",
            accounts: [`${MAINNET_KEY}`],
        },
        cronos_mainnet: {
            url: "https://evm.cronos.org/",
            accounts: [`${MAINNET_KEY}`],
        },
        core_mainnet:{
            url: ` `,
            accounts: [`${MAINNET_KEY}`],
        },
        fraxtal_mainnet:{
            url: `https://rpc.frax.com/`,
            accounts: [`${MAINNET_KEY}`],
        },

        
        
        ///TESTNETS:
        rinkeby: {
            url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${PRIVATE_KEY}`],
        },
        bsct: {
            url: `https://speedy-nodes-nyc.moralis.io/${MORALIS_API_KEY}/bsc/testnet`,
            accounts: [`${PRIVATE_KEY}`],
        },
        fuji: {
            url: `https://api.avax-test.network/ext/bc/C/rpc`,
            accounts: [`${PRIVATE_KEY}`],
        },
        mumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${PRIVATE_KEY}`],
        },
        heco: {
            url: `https://http-testnet.hecochain.com/`,
            accounts: [`${PRIVATE_KEY}`],
        },
        okex: {
            url: `https://exchaintestrpc.okex.org`,
            accounts: [`${PRIVATE_KEY}`],
        },
        aurora_testnet: {
          url: `https://testnet.aurora.dev/`,
          accounts: [`${PRIVATE_KEY}`],
        },
        local1: {
            url: `http://net1rpc:8545/`,
            accounts: [`${PRIVATE_KEY}`],
        },
        hardhat: {
            gas: 10000000000,
            blockGasLimit: 10000000000,
            // gasLimit: 300000000
        },
        goerli_acc1: {
            url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [`${GOERLI_TEST_OWNER_1}`],
            //gasPrice: 8000000000,
        },
        goerli_acc2: {
            url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [`${GOERLI_TEST_OWNER_2}`],
            //gasPrice: 8000000000,
        },
        boba_acc1: {
            url: `https://rinkeby.boba.network/`,
            accounts: [`${BOBA_TEST_OWNER_1}`],
            //gasPrice: 8000000000,
        },
        boba_acc2: {
            url: `https://rinkeby.boba.network/`,
            accounts: [`${BOBA_TEST_OWNER_2}`],
            //gasPrice: 8000000000,
        },
        fork: {
            url: `http://127.0.0.1:8545/`,
        },

    },
    etherscan: {
        apiKey: SCAN_API_KEY,
    },
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
    namedAccounts: {
        deployer: 0,
    },
    gasReporter: {
        enabled: !!(process.env.REPORT_GAS)
    }
};