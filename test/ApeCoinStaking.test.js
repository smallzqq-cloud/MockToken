const { expect } = require("chai");

const helpers = require("@nomicfoundation/hardhat-network-helpers");

const { artifacts, ethers } = require('hardhat');

describe("ApeCoinStaking", function () {

    let owner;

    beforeEach(async () => {
		[owner] = await ethers.getSigners();

        const apeCoinStakingAddr = "0xB71050f97235180b390ddfd776cc465EAf744be7";
        this.apeCoinStaking = await ethers.getContractAt("ApeCoinStaking", apeCoinStakingAddr, owner);
	});
    
    it("test", async () => {
        const ownerAddr = await this.apeCoinStaking.owner();
        await helpers.impersonateAccount(ownerAddr);
        const ownerSigner = await ethers.getSigner(ownerAddr);

        let poolsUI = await this.apeCoinStaking.getPoolsUI();
        console.log(poolsUI);

        // await this.apeCoinStaking.connect(ownerSigner).removeLastTimeRange(1);
        // await this.apeCoinStaking.connect(ownerSigner).removeLastTimeRange(2);
        // await this.apeCoinStaking.connect(ownerSigner).removeLastTimeRange(3);

        // await this.apeCoinStaking.connect(ownerSigner).addTimeRange(
        //     1,
        //     ethers.utils.parseEther("21.84"),
        //     poolsUI[1].currentTimeRange.startTimestampHour,
        //     poolsUI[1].currentTimeRange.endTimestampHour,
        //     poolsUI[1].currentTimeRange.capPerPosition
        // );
        // await this.apeCoinStaking.connect(ownerSigner).addTimeRange(
        //     2,
        //     ethers.utils.parseEther("21.84"),
        //     poolsUI[2].currentTimeRange.startTimestampHour,
        //     poolsUI[2].currentTimeRange.endTimestampHour,
        //     poolsUI[2].currentTimeRange.capPerPosition
        // );
        // await this.apeCoinStaking.connect(ownerSigner).addTimeRange(
        //     3,
        //     ethers.utils.parseEther("21.84"),
        //     poolsUI[3].currentTimeRange.startTimestampHour,
        //     poolsUI[3].currentTimeRange.endTimestampHour,
        //     poolsUI[3].currentTimeRange.capPerPosition
        // );
        // poolsUI = await this.apeCoinStaking.getPoolsUI();
        // console.log(poolsUI);
    });

});