const { ethers } = require('hardhat');

async function main() {

    //const feeData = await ethers.provider.getFeeData();

    // const costLimit = {
    //     maxFeePerGas: feeData.maxFeePerGas,
    //     maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    //     gasLimit: 6000000
    //   };
    
    // const [deployer] = await ethers.getSigners();
   // const receiver = "0xe42241114e2B344074e6aa7CF8D9684C9C6e41dE";
    const side = await ethers.getContractFactory("Otherside");
    this.side = await side.deploy();
    console.log("side",this.side.address);

    const koda = await ethers.getContractFactory("Koda");
    this.koda = await koda.deploy();
    console.log("koda",this.koda.address);

    const vessel = await ethers.getContractFactory("Vessel");
    this.vessel = await vessel.deploy();
    console.log("vessel",this.vessel.address);

    this.merkleRoot = "0x678fac52d41986dd51bae527e21b2b08a980b6758c0d4b5aeede625242039b09";
    this.othdreed = "0xF81639558D54a03D6620c5bdb2f1C2e5c87736d0";

    const register = await ethers.getContractFactory("Registry");
    this.register = await register.deploy();
    console.log("this.register",this.register.address);

    await this.side.initialize(this.othdreed, this.register.address);
    await this.koda.initialize(this.othdreed, sideAddress, registerAddress, this.merkleRoot);
    await this.vessel.initialize(this.othdreed, sideAddress, kodaAddress, registerAddress, 1680742800);
    // await this.side.mint(receiver, 201  );
    // await this.side.mint(receiver, 5201);


    // side 0x0F2664707a793E76565Ee6f3b652E5F326799510
    // koda 0xA54E66a61Fd621671889Cbf8C9e596F0124e25B9
    // vessel 0x1a8349182C4d2d72C6a267CAF3459982Ed4d31Ff
    this.merkleRoot = "0x678fac52d41986dd51bae527e21b2b08a980b6758c0d4b5aeede625242039b09";
    this.othdreed = "0x1cCd54D325607DEe1F7d52E222fa4ed75468d2dC";
    sideAddress = "0x0F2664707a793E76565Ee6f3b652E5F326799510"
    kodaAddress = "0xA54E66a61Fd621671889Cbf8C9e596F0124e25B9"
    vesselAddress = "0x1a8349182C4d2d72C6a267CAF3459982Ed4d31Ff";
    registerAddress = "0x0D23B68A44f0A5A8034c3F6cdb28d15657490C53"

    //this.koda = await ethers.getContractAt("Koda", kodaAddress);
    await this.koda.initialize(this.othdreed, sideAddress, registerAddress, this.merkleRoot);
    // await this.koda.mint(receiver, 201);
    // await this.koda.mint(receiver, 5201);

   // this.vessel = await ethers.getContractAt("Vessel", vesselAddress);
    // await this.vessel.initialize(this.othdreed, sideAddress, kodaAddress, registerAddress, 1680742800);
    //console.log("vessel",this.vessel.address);
    // await this.vessel.mint(receiver, 201);
    // await this.vessel.mint(receiver, 5201);


}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});