const { ethers } = require('hardhat');

async function main() {
    const feeData = await ethers.provider.getFeeData();
    const [owner] = await ethers.getSigners();
    const costLimit = {
        gasLimit: 6000000,
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    };
	
    const WrappedPunk = await ethers.getContractFactory("WrappedPunk");
    const wrappedPunkDeployed = await WrappedPunk.deploy(owner.address, costLimit);
    console.log("wrappedPunkDeployed", wrappedPunkDeployed.address);
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
