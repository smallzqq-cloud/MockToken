const { ethers } = require('hardhat');
const BigNumber = require('bignumber.js');

function getAmount(startTime, endTime, rewardsPerHour) {
    const timeRange = endTime - startTime;
    const reward = (timeRange*rewardsPerHour) / 3600
    const bigNumberReward = new BigNumber(reward.toString());
    const result = bigNumberReward.toString(10);
    return result;
}


async function main() {

    const ApeCoinStaking = await ethers.getContractAt("ApeCoinStaking","0xF4434Ec3C0Ae104896F182F6e7cb64074fafD8df");

	const feeData = await ethers.provider.getFeeData();

    const costLimit = {
        gasLimit: 6000000,
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    };

    console.log("ApeCoinStaking", ApeCoinStaking.address);

    const startTime = 1681884000;
    const endTime = 1689746400;
    
    let amount0 = getAmount(startTime, endTime, "4076086956521739130434");
    console.log("amount0",amount0);

    let amount1 = getAmount(startTime, endTime, "6400135869565217391304");
    console.log("amount1",amount1);
    
    let amount2 = getAmount(startTime, endTime, "2589673913043478260869");
    console.log("amount2",amount2);

    let amount3 = getAmount(startTime, endTime, "521059782608695652173");
    console.log("amount3",amount3);

    let res1 = await ApeCoinStaking.addTimeRange(0, ethers.BigNumber.from(amount0), startTime, endTime, 0 , costLimit);
	console.log(res1);
    let res2 = await ApeCoinStaking.addTimeRange(1, amount1.toString(), startTime, endTime, "10094000000000000000000", costLimit);
	console.log(res2);
    let res3 = await ApeCoinStaking.addTimeRange(2, amount2.toString(), startTime, endTime, "2042000000000000000000", costLimit);
	console.log(res3);
    let res4 = await ApeCoinStaking.addTimeRange(3, amount3.toString(), startTime, endTime, "856000000000000000000", costLimit);
	console.log(res4);

}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});