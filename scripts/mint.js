const { ethers } = require('hardhat');

async function main() {
    const [owner] = await ethers.getSigners();


    const nftAddress = "0xa9ABe1ED980729E8E9e5a16574f37B99d0DAaE0A"

    const nft = await ethers.getContractAt("MockERC721",nftAddress);

	const feeData = await ethers.provider.getFeeData();

    const receiver = "0x57eD5c3B5ce571f612E9A81BCf59e476A8A88902";

    const costLimit = {
        gasLimit: 6000000,
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    };
    // const num = 5311
    // for (let index = 5300; index < num; index++) {
    //     let res = await nft.mint(receiver, index, costLimit);
    //     console.log("Res", res);
    // }

    const tNum = 247
    for (let index = 238; index < tNum; index++) {
        let res = await nft.transferFrom(owner.address ,receiver, index, costLimit);
        console.log("Res", res);
    }

}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});