const { ethers } = require('hardhat');

async function main() {
    const feeData = await ethers.provider.getFeeData();
    const [owner] = await ethers.getSigners();
    const costLimit = {
        gasLimit: 6000000,
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    };

    const apeCoinStakingAddr = "0xB71050f97235180b390ddfd776cc465EAf744be7";
    const apeCoinStaking = await ethers.getContractAt("ApeCoinStaking", apeCoinStakingAddr, owner);
	
    let poolsUI = await apeCoinStaking.getPoolsUI();
    console.log(poolsUI);

    await apeCoinStaking.connect(owner).removeLastTimeRange(1, costLimit);
    await apeCoinStaking.connect(owner).removeLastTimeRange(2, costLimit);
    await apeCoinStaking.connect(owner).removeLastTimeRange(3, costLimit);

    await apeCoinStaking.connect(owner).addTimeRange(
        1,
        ethers.utils.parseEther("21.84"),
        poolsUI[1].currentTimeRange.startTimestampHour,
        poolsUI[1].currentTimeRange.endTimestampHour,
        poolsUI[1].currentTimeRange.capPerPosition,
        costLimit
    );
    await apeCoinStaking.connect(owner).addTimeRange(
        2,
        ethers.utils.parseEther("21.84"),
        poolsUI[2].currentTimeRange.startTimestampHour,
        poolsUI[2].currentTimeRange.endTimestampHour,
        poolsUI[2].currentTimeRange.capPerPosition,
        costLimit
    );
    await apeCoinStaking.connect(owner).addTimeRange(
        3,
        ethers.utils.parseEther("21.84"),
        poolsUI[3].currentTimeRange.startTimestampHour,
        poolsUI[3].currentTimeRange.endTimestampHour,
        poolsUI[3].currentTimeRange.capPerPosition,
        costLimit
    );
    poolsUI = await apeCoinStaking.getPoolsUI();
    console.log(poolsUI);
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
