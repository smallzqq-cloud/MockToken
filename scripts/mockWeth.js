const { ethers } = require('hardhat');

async function main() {
	const feeData = await ethers.provider.getFeeData();
    const [owner] = await ethers.getSigners();
    const costLimit = {
        gasLimit: 6000000,
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    };
	
    const WrappedEth = await ethers.getContractFactory("WETH9");
    const WrappedEthDeployed = await WrappedEth.deploy(costLimit);
    console.log("WrappedEthDeployed", WrappedEthDeployed.address);
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});