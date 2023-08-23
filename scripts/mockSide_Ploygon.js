const { ethers } = require('hardhat');

async function main() {

    //const feeData = await ethers.provider.getFeeData();

    // const costLimit = {
    //     maxFeePerGas: feeData.maxFeePerGas,
    //     maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    //     gasLimit: 6000000
    //   };
    
    const [deployer] = await ethers.getSigners();
    const receiver = "0xe42241114e2B344074e6aa7CF8D9684C9C6e41dE";
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
    this.othdreed = "0x6F77D9847a69A8bC97179dd8b4413f4281ed7e18";

    // const register = await ethers.getContractFactory("Registry");
    // this.register = await register.deploy();
    // console.log("this.register",this.register.address);

    // await this.side.initialize(this.othdreed, this.register.address);
    

    // await this.side.mint(receiver, 201  );
    // await this.side.mint(receiver, 5201);

    // side 0xbda50FB224C9226154933e7F6129acdB622e3BFb
    // koda 0xE651DDec12EC7bEe337d7718B52Af51dDFe32149
    // vessel 0x3c0A05fF07F4AAa4F8D47db18aDF9110E8a63ecF
    // this.register 0xEE045fe07fe101A21a1D8f5ef123B335F84D1364
    // this.merkleRoot = "0x678fac52d41986dd51bae527e21b2b08a980b6758c0d4b5aeede625242039b09";
    // this.othdreed = "0x6F77D9847a69A8bC97179dd8b4413f4281ed7e18";
    // sideAddress = "0xbda50FB224C9226154933e7F6129acdB622e3BFb"
    // kodaAddress = "0xE651DDec12EC7bEe337d7718B52Af51dDFe32149"
    // vesselAddress = "0x3c0A05fF07F4AAa4F8D47db18aDF9110E8a63ecF";
    // registerAddress = "0xEE045fe07fe101A21a1D8f5ef123B335F84D1364"

    // this.side = await ethers.getContractAt("Otherside", sideAddress);
    // await this.side.initialize(this.othdreed, registerAddress);
    // await this.side.mint(receiver, 201);
    // await this.side.mint(receiver, 5201);

    // this.koda = await ethers.getContractAt("Koda", kodaAddress);
    // await this.koda.initialize(this.othdreed, sideAddress, registerAddress, this.merkleRoot);
    // await this.koda.mint(receiver, 201);
    // await this.koda.mint(receiver, 5201);

    // this.vessel = await ethers.getContractAt("Vessel", vesselAddress);
    // await this.vessel.initialize(this.othdreed, sideAddress, kodaAddress, registerAddress, 1680742800);
    // await this.vessel.mint(receiver, 201);
    // await this.vessel.mint(receiver, 5201);


}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});