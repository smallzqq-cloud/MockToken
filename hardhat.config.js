require('dotenv').config()
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require('hardhat-contract-sizer');
require('hardhat-deploy');
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-etherscan");
module.exports = {
	namedAccounts: {
		deployer: {
			default: 0
		}
	},
	solidity: {

		compilers: [{
			version: "0.8.0",
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				}
				
			},
		}, {
			version: "0.8.7",
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				}
			},
		}, {
			version: "0.7.6",
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				}
			},
		}, {
			version: "0.8.6",
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				},
				viaIR: true
			},
		}, {
			version: "0.7.0",
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				}
			},
		}, {
			version: "0.4.11",
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				}
			},
		}, {
			version: "0.5.12",
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				}
			},
		}, {
			version: "0.8.10",
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				}
			},
		}, {
			version: "0.8.11",
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				}
			},
		}, {
			version: "0.4.24",
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				}
			},
		}, {
			version: "0.6.12",
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				}
			},
		}, {
			version: "0.4.16",
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				}
			},
		}, {
			version: "0.6.6",
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				}
			},
		},{
			version: "0.8.17",
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				},
				viaIR: true
			},
		},{
			version: "0.8.19",
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				}
			},
		}
	]
	},
	networks: {
		hardhat: {
			forking: {
				url: "https://eth-goerli.g.alchemy.com/v2/Ha8QNWLcgaj-X4AhjxF8-EAmMi422x8C",
				blockNumber: 9007600
			},
			allowUnlimitedContractSize: true
			
		},
		goerli: {
			url: `${process.env.GOERLI_NETWORK}`,
			allowUnlimitedContractSize: true,
			chainId: 5,
			// gasPrice: 'auto',
			accounts: [`${process.env.PRIVATEKEY}`],
			// deploy: ['deploy_1559'],
			timeout:100000000000000
		},

		mainnet: {
			url: `${process.env.MAINNET_NETWORK}`,
			chainId: 1,
			gasPrice: 'auto',
			accounts: [`${process.env.PRIVATEKEY}`],
			timeout: 1000000000000000
		},
		polygon: {
			url: `${process.env.MUMBAI_NETWORK}`, 
			chainId: 80001,
			gasPrice: 'auto',
			accounts: [`${process.env.PRIVATEKEY}`],
			deploy: ['deploy_1559']
		},
		sepolia: {
			url: `${process.env.SEPOLIA_NETWORK2}`,
			chainId: 11155111,
			gasPrice: 'auto',
			accounts: [`${process.env.PRIVATEKEY}`],
			deploy: ['deploy_1559']
		},
	},
	etherscan: {
		apiKey: "NDGE5WU3P4HJ8Y9FB7FCNMXNPNFPPG1AWY"
		,
		customChains: [
			{
				network: "goerli",
				chainId: 5,
				urls: {
					apiURL: "https://api-goerli.etherscan.io/api",
					browserURL: "https://goerli.etherscan.io"
				}
			}
		]
	},
	contractSizer: {
		alphaSort: true,
		runOnCompile: false,
		disambiguatePaths: false,
	}
};