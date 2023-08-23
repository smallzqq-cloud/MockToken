const { ethers } = require('hardhat');
const { expect } = require('chai');
const helpers = require("@nomicfoundation/hardhat-network-helpers");
let owner, other, another;

describe('Otherside.test', () => {
	beforeEach(async () => {
		[owner, other, another] = await ethers.getSigners();
        const ownerAddr = "0x5EfAC4Bc165338F511F2eb4411E393AF25D37b23";
        await helpers.impersonateAccount(ownerAddr);
        this.ownerSigner = await ethers.getSigner(ownerAddr);
        const side = await ethers.getContractFactory("Otherside");
        this.side = await side.deploy();

        const koda = await ethers.getContractFactory("Koda");
        this.koda = await koda.deploy();

        const vessel = await ethers.getContractFactory("Vessel");
        this.vessel = await vessel.deploy();
        this.merkleRoot = "0x678fac52d41986dd51bae527e21b2b08a980b6758c0d4b5aeede625242039b09";
        this.othdreed = "0x1cCd54D325607DEe1F7d52E222fa4ed75468d2dC"
        const register = await ethers.getContractFactory("Registry");
        this.register = await register.deploy();
	});

	it("mint", async () => {
        await this.side.initialize(this.othdreed, this.register.address);
        console.log(await this.side.name());
        await this.side.mint(owner.address, 201);
        await this.side.mint(owner.address, 5201);
        expect(await this.side.ownerOf(201)).to.equal(owner.address);
        expect(await this.side.ownerOf(5201)).to.equal(owner.address);

        await this.koda.initialize(this.othdreed, this.side.address, this.register.address, this.merkleRoot);
        await this.koda.mint(owner.address, 201);
        await this.koda.mint(owner.address, 5201);
        expect(await this.koda.ownerOf(201)).to.equal(owner.address);
        expect(await this.koda.ownerOf(5201)).to.equal(owner.address);

        await this.vessel.initialize(this.othdreed, this.side.address, this.koda.address, this.register.address, 1680742800);
        await this.vessel.mint(owner.address, 201);
        await this.vessel.mint(owner.address, 5201);
        expect(await this.vessel.ownerOf(201)).to.equal(owner.address);
        expect(await this.vessel.ownerOf(5201)).to.equal(owner.address);

	});



});