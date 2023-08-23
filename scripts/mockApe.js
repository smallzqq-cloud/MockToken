const { ethers } = require('hardhat');

async function main() {
	const feeData = await ethers.provider.getFeeData();

    const costLimit = {
        gasLimit: 6000000,
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    };
    const BAYC = "0x8Cd194F4ced354a14960f76f49305fEB8510f73F";
    const MAYC = "0xa9ABe1ED980729E8E9e5a16574f37B99d0DAaE0A";
    const BAKC = "0x5e09f763b63b8cc053370fb06aa0681927c98c81";
    const ApeCoinFactory = await ethers.getContractFactory("SimpleToken");
    const ApeCoinStakingFactory = await ethers.getContractFactory("ApeCoinStaking");
    const ApeCoin =  await ApeCoinFactory.deploy("ApeCoin", "APE", "1000000000000000000000000000", costLimit);
   // const apeCoinAddress = "0x435f5A833405ac6209C93C9e50B12C305d9aC1c3"
    const ApeCoinStaking = await ApeCoinStakingFactory.deploy(ApeCoin.address, BAYC, MAYC, BAKC, costLimit);
    console.log("ApeCoin", ApeCoin.address);
    console.log("ApeCoinStaking", ApeCoinStaking.address);
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
