const { expect } = require("chai");


const helpers = require("@nomicfoundation/hardhat-network-helpers");
// const {
//     encodeSqrtRatioX96,
//     sqrtRatioX96,
//     getPrice,
//     sortTokens,
//     getTickAtSqrtRatio,
//     getSqrtRatioAtTick,
//     getPriceAtTick,
//     getMarketMakingRange
// } = require("@rhynie/uniswap-math/scripts/v3/v3-utils");

const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');
const { artifacts, ethers } = require('hardhat');

const USDT = artifacts.require('TetherToken');
const USDC_IMP = artifacts.require('FiatTokenV2_1');
const USDC_PROXY = artifacts.require('FiatTokenProxy');
const DAI = artifacts.require('Dai');
const WBTC = artifacts.require('WBTC');
const BAYC = artifacts.require('BoredApeYachtClub');
const CryptoPunksMarket = artifacts.require('CryptoPunksMarket'); 
const Land = artifacts.require('Land'); 
const BAKC = artifacts.require('BoredApeKennelClub');
const MAYC = artifacts.require('MutantApeYachtClub');
const BACC = artifacts.require('BoredApeChemistryClub');
const Moonbirds = artifacts.require('Moonbirds');
const PROOFCollective = artifacts.require('PROOFCollective');
const SimpleToken = artifacts.require('SimpleToken');
const OnChainMonkey = artifacts.require('OnChainMonkey');


describe("MOCK", function () {

    
    // it("USDT", async function () {
    //     const [owner, addr1, addr2] = await ethers.getSigners();
    //     const token = await USDT.new(32297366521996886n,"Tether USD", "USDT", 6);
    //     const name = await token.name();
    //     const total = await token.totalSupply();
    //     const symbol = await token.symbol();
    //     await token.transfer(addr1.address,201);
    //     await token.approve(addr1.address,201);
    //     console.log(await token.allowance(owner.address,addr1.address));
    //     console.log(name + ":" + token.address + " " + total + " " +symbol);
    // });
  
    // it("USDC", async function () {
    //     const [owner, addr1, addr2] = await ethers.getSigners();
    //     const tokenImp = await USDC_IMP.new();
    //     await tokenImp.initialize("USD Coin", "USDC", "USD",6,owner.address,owner.address,owner.address,owner.address);
    //     const tokenProxy = await USDC_PROXY.new(tokenImp.address);
    //     const implementation = await tokenProxy.implementation();
    //     console.log("implementation",implementation);
    //     const name = await tokenImp.name();
    //     const symbol = await tokenImp.symbol();
    //     await tokenImp.configureMinter(owner.address,1314201);
    //     await tokenImp.mint(owner.address,1314201);
    //     await tokenImp.transfer(addr1.address,201);
    //     await tokenImp.approve(addr1.address,201);
    //     const total = await tokenImp.totalSupply();
    //     console.log(await tokenImp.allowance(owner.address,addr1.address));
    //     console.log(name + ":" + tokenImp.address + " " + total + " " +symbol);
    // });

    // it("Dai", async function () {
    //     const [owner, addr1, addr2] = await ethers.getSigners();
    //     const token = await DAI.new(5);
    //     const name = await token.name();
    //     const symbol = await token.symbol();
    //     await token.mint(owner.address,1314201);
    //     await token.transfer(addr1.address,201);
    //     await token.approve(addr1.address,201);
    //     const total = await token.totalSupply();
    //     console.log(await token.allowance(owner.address,addr1.address));
    //     console.log(name + ":" + token.address + " " + total + " " +symbol);
    // });

    // it("WBTC", async function () {
    //     const [owner, addr1, addr2] = await ethers.getSigners();
    //     const token = await WBTC.new();
    //     const name = await token.name();
    //     const symbol = await token.symbol();
    //     await token.mint(owner.address,1314201);
    //     await token.transfer(addr1.address,201);
    //     await token.approve(addr1.address,201);
    //     const total = await token.totalSupply();
    //     console.log(await token.allowance(owner.address,addr1.address));
    //     console.log(name + ":" + token.address + " " + total + " " +symbol);
    // });

    // it("BAYC", async function () {
    //     const [owner, addr1, addr2] = await ethers.getSigners();
    //     const token = await BAYC.new("BoredApeYachtClub","BAYC",10000,1619820000);
    //     const name = await token.name();
    //     const symbol = await token.symbol();
    //     await token.flipSaleState();
    //     await token.mintApe(2,{value: ethers.utils.parseEther("0.16")});
    //     await token.mint(owner.address, 201);
    //     await token.transferFrom(owner.address,addr1.address,0);
    //     console.log(name + " " + symbol +  ":" + token.address );

    // });

    // it("CryptoPunksMarket", async function () {
    //     const [owner, addr1, addr2] = await ethers.getSigners();
    //     const token = await CryptoPunksMarket.new();
    //     const name = await token.name();
    //     const symbol = await token.symbol();
    //     await token.allInitialOwnersAssigned();
    //     await token.getPunk(201);
    //     await token.transferPunk(addr1.address,201);
    //     console.log(name + " " + symbol +  ":" + token.address );
    // });

    // it("Moonbirds", async function () {
    //     const [owner, addr1, addr2] = await ethers.getSigners();
    //     const proof = await PROOFCollective.new("PROOF Collective","PROOF",owner.address);
    //     const token = await Moonbirds.new("Moonbirds","MOONBIRD",proof.address,owner.address,owner.address);
    //     const name = await token.name();
    //     const symbol = await token.symbol();
    //     await proof.setAuctionStartPoint(2);
    //     await proof.buy({value: ethers.utils.parseEther("1")});
    //     await token.setPROOFMintingOpen(true);
    //     await token.mintUnclaimed(owner.address,1);
    //     await token.mintPROOF([1,1]);
    //     await token.mint(owner.address, 201);
    //     await token.transferFrom(owner.address,addr1.address,1);
    //     console.log(name + " " + symbol +  ":" + token.address );
    // });

    // it("Land", async function () {
    //     const VrfCoordinator = 	"0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D";
    //     const linktoken = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
    //     const [owner, addr1, addr2] = await ethers.getSigners();
    //     const bacc = await BACC.new("https://ipfs.io/ipfs/QmdtARLUPQeqXrVcNzQuRqr9UCFoFvn76X9cdTczt4vqfw/");
    //     const bayc = await BAYC.new("BoredApeYachtClub","BAYC",10000,1619820000);
    //     const mayc = await MAYC.new("MutantApeYachtClub","MAYC",bayc.address,bacc.address);
    //     const simpleToken = await SimpleToken.new("ApeCoin","APE",1000000000000000000000000000n);
    //     const token = await Land.new("Otherdeed","OTHR",[bayc.address,mayc.address,simpleToken.address],[10000,20000,55000,200000],[[owner.address,201]],VrfCoordinator,linktoken,
    //     "0xaa77729d3466ca35ae8d28b3bbac7cc36a5031efdc430821c02bc31a238af445",2000000000000000000n,owner.address);
    //     const name = await token.name();
    //     const symbol = await token.symbol();
    //     await token.startContributorsClaimPeriod();
    //     await token.contributorsClaimLand(2,owner.address);
    //     await token.mintByTokenId(owner.address, 201);
    //     await token.transferFrom(owner.address,addr1.address,30000);
    //     console.log(name + " " + symbol +  ":" + token.address );
    // });

    // it("BAKC", async function () {
    //     const [owner, addr1, addr2] = await ethers.getSigners();
    //     const bayc = await BAYC.new("BoredApeYachtClub","BAYC",10000,1619820000);
    //     await bayc.flipSaleState();
    //     await bayc.mintApe(1,{value: ethers.utils.parseEther("0.16")})
    //     const token = await BAKC.new("BoredApeKennelClub","BAKC",10000,1624658400,bayc.address);
    //     await token.mint(owner.address, 201);
    //     const name = await token.name();
    //     const symbol = await token.symbol();
    //     await token.flipSaleState();
    //     await token.adoptDog(0);
    //     await token.transferFrom(owner.address,addr1.address,0);
    //     console.log(name + " " + symbol +  ":" + token.address );
    // });

    // it("MAYC", async function () {
    //     const [owner, addr1, addr2] = await ethers.getSigners();
    //     const bacc = await BACC.new("https://ipfs.io/ipfs/QmdtARLUPQeqXrVcNzQuRqr9UCFoFvn76X9cdTczt4vqfw/");
    //     const bayc = await BAYC.new("BoredApeYachtClub","BAYC",10000,1619820000);
    //     const token = await MAYC.new("MutantApeYachtClub","MAYC",bayc.address,bacc.address);
    //     const name = await token.name();
    //     const symbol = await token.symbol();
    //     await token.startPublicSale(86400,1);
    //     await token.mint(owner.address, 201);
    //     await token.mintMutants(1,{value: ethers.utils.parseEther("0.16")});
    //     await token.transferFrom(owner.address,addr1.address,0);
    //     console.log(name + " " + symbol +  ":" + token.address );
    // });

    // it("WP", async function() {
    //     const [owner, addr1, addr2] = await ethers.getSigners();
    //     let wp = await ethers.getContractFactory("WrappedPunk");
    //     let wpDeployed = await wp.deploy(owner.address);
    //     await wpDeployed.freeMint(owner.address, 201);
    // });

    it("NKMGS", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let NKMGS = await ethers.getContractFactory("Nakamigos");
        let NKMGSDeployed = await NKMGS.deploy(owner.address);
        await NKMGSDeployed.mint(owner.address, 2);
    });

    it("Beanz", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const AZUKI = "0x47B4D94E8CDb94A86Cc9C497aC5a733428a6De6A";
        const VrfCoordinator = 	"0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D";
        const linktoken = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
        let Beanz = await ethers.getContractFactory("Beanz");
        let Beanzeployed = await Beanz.deploy(AZUKI, 19950, VrfCoordinator, linktoken, "Beanz", "BEANZ");
        await Beanzeployed.mint(owner.address, 2);
        expect(await Beanzeployed.ownerOf(0)).to.equal(owner.address);
    });

    it("WorldOfWomen", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let WorldOfWomen = await ethers.getContractFactory("WorldOfWomen");
        let WorldOfWomenDeploy = await WorldOfWomen.deploy();
        await WorldOfWomenDeploy.mintById(owner.address, 201);
        expect(await WorldOfWomenDeploy.ownerOf(201)).to.equal(owner.address);
    });

    it("Renga", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let Renga = await ethers.getContractFactory("Renga");
        let RengaDeploy = await Renga.deploy();
        await RengaDeploy.initialize();
        await RengaDeploy.mint(owner.address, 201);
        expect(await RengaDeploy.ownerOf(201)).to.equal(owner.address);
    });
 
    it("SappySeals", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let SappySeals = await ethers.getContractFactory("SappySeals");
        let SappySealsDeploy = await SappySeals.deploy("Sappy Seals", "SAPS", "ipfs://QmXUUXRSAJeb4u8p4yKHmXN1iAKtAV7jwLHjw35TNm5jN7/");
        await SappySealsDeploy.mint(owner.address, 201);
        expect(await SappySealsDeploy.ownerOf(201)).to.equal(owner.address);
    });

    it("HVMTL", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let Operator = await ethers.getContractFactory("Operator");
        let OperatorDeploy = await Operator.deploy(owner.address);
        let HVMTL = await ethers.getContractFactory("HVMTL");
        let HVMTLDeploy = await HVMTL.deploy("HV-MTL", "HV-MTL", OperatorDeploy.address);
        await HVMTLDeploy.mint(owner.address, 201);
        expect(await HVMTLDeploy.ownerOf(201)).to.equal(owner.address);
    });

    it("Captainz", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let Captainz = await ethers.getContractFactory("Captainz");
        let CaptainzDeploy = await Captainz.deploy();
        await CaptainzDeploy.initialize("https://captainz-api.memeland.com/metadata/");
        await CaptainzDeploy.mint(owner.address, 2);
        expect(await CaptainzDeploy.ownerOf(0)).to.equal(owner.address);
    });

    it("PunksV1Wrapper", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let PunksV1Wrapper = await ethers.getContractFactory("PunksV1Wrapper");
        let PunksV1WrapperDeploy = await PunksV1Wrapper.deploy();
        await PunksV1WrapperDeploy.mint(owner.address, 201);
        expect(await PunksV1WrapperDeploy.ownerOf(201)).to.equal(owner.address);
    });

    it("DeGods", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const wormhole = "0x706abc4E45D419950511e474C7B9Ed348A4a716c";
        let DustToken = await ethers.getContractFactory("DustToken");
        let DustTokenDeploy = await DustToken.deploy("DUST Token", "DUST ", [owner.address], "4965580800000000000000000000")
        let DeGods = await ethers.getContractFactory("DeGods");
        let DeGodsDeploy = await DeGods.deploy(wormhole, DustTokenDeploy.address, "0x7a46b8d0e0f12e54b8ca473f2d09ee8c6c1bfbf18b6f2c4d28fc6ad1c6b07ea7", "0x68747470733a2f2f6d657461646174612e6465676f64732e636f6d2f672f");
        await DeGodsDeploy.mint(owner.address, 201);
        expect(await DeGodsDeploy.ownerOf(201)).to.equal(owner.address);
    });

    it("Open", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        // let OwnedRegistrant = await ethers.getContractFactory("OwnedRegistrant");
        // let OwnedRegistrantDeploy = await OwnedRegistrant.deploy(owner.address);
        let FactoryUpgradeGate = await ethers.getContractFactory("FactoryUpgradeGate");
        let FactoryUpgradeGateDeploy = await FactoryUpgradeGate.deploy(owner.address);
        let ERC721TransferHelper = await ethers.getContractFactory("ERC721TransferHelper");
        let ERC721TransferHelperDeploy = await ERC721TransferHelper.deploy(owner.address);
        let Open = await ethers.getContractFactory("ERC721Drop");
        let OpenDeploy = await Open.deploy(ERC721TransferHelperDeploy.address, FactoryUpgradeGateDeploy.address, "0x3cc6CddA760b79bAfa08dF41ECFA224f810dCeB6", 0, owner.address);
        await OpenDeploy.mint(owner.address, 2);
        expect(await OpenDeploy.ownerOf(1)).to.equal(owner.address);
    });

    it("mfers", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let mfers = await ethers.getContractFactory("mfers");
        let mfersDeploy = await mfers.deploy(owner.address);
        await mfersDeploy.mintById(owner.address, 201);
        expect(await mfersDeploy.ownerOf(201)).to.equal(owner.address);
    });

    it("Check", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let ZoraFeeManager = await ethers.getContractFactory("ZoraFeeManager");
        let ZoraFeeManagerDeploy = await ZoraFeeManager.deploy(201, owner.address); 
        let FactoryUpgradeGate = await ethers.getContractFactory("FactoryUpgradeGate");
        let FactoryUpgradeGateDeploy = await FactoryUpgradeGate.deploy(owner.address);
        let ERC721TransferHelper = await ethers.getContractFactory("ERC721TransferHelper");
        let ERC721TransferHelperDeploy = await ERC721TransferHelper.deploy(owner.address);
        let Check = await ethers.getContractFactory("ERC721Dropv2");
        let CheckDeploy = await Check.deploy(ZoraFeeManagerDeploy.address, ERC721TransferHelperDeploy.address, FactoryUpgradeGateDeploy.address, "0x3cc6CddA760b79bAfa08dF41ECFA224f810dCeB6");
        await CheckDeploy.mint(owner.address, 2);
        expect(await CheckDeploy.ownerOf(1)).to.equal(owner.address);
    });

    it("Miladys", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let Miladys = await ethers.getContractFactory("Miladys");
        let MiladysDeploy = await Miladys.deploy();
        await MiladysDeploy.mint(owner.address, 201);
        expect(await MiladysDeploy.ownerOf(201)).to.equal(owner.address);
    });

    it("Outlaws", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let Outlaws = await ethers.getContractFactory("Outlaws");
        let baseUrl = "https://fuchsia-certain-muskox-472.mypinata.cloud/ipfs/QmVfShB3yzaT6GMDBUmat88RQ3oMhsApRTYWNZ4RzK9jLc/";
        let OutlawsDeploy = await Outlaws.deploy(baseUrl, "Outlaws", "OUT", [owner.address], [201]);
        await OutlawsDeploy.mintTokens(owner.address, 2);
        expect(await OutlawsDeploy.ownerOf(1)).to.equal(owner.address);
    });

    it("Pixelmon", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let Pixelmon = await ethers.getContractFactory("Pixelmon");
        let baseUrl = "https://pixelmon.club/api/";
        let PixelmonDeploy = await Pixelmon.deploy(baseUrl);
        await PixelmonDeploy.mint(owner.address, 350);
        expect(await PixelmonDeploy.ownerOf(350)).to.equal(owner.address);
    });

    it("GhostChild", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let GhostChild = await ethers.getContractFactory("GhostChild");
        let GhostChildDeploy = await GhostChild.deploy();
        await GhostChildDeploy.mintTokens(owner.address, 2);
        expect(await GhostChildDeploy.ownerOf(1)).to.equal(owner.address);
    });

    it("Terraforms", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let Terraforms = await ethers.getContractFactory("Terraforms");
        const _terraformsDataAddress = "0xA5aFC9fE76a28fB12C60954Ed6e2e5f8ceF64Ff2";
        const _terraformsAugmentationsAddress = "0x2521bEb44D433A5B916Ad9d5aB51B98378870072"
        let TerraformsDeploy = await Terraforms.deploy(_terraformsDataAddress, _terraformsAugmentationsAddress);
        await TerraformsDeploy.mintById(owner.address, 201);
        expect(await TerraformsDeploy.ownerOf(201)).to.equal(owner.address);
    });

    
    it("CyberBrokers", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let CyberBrokers = await ethers.getContractFactory("CyberBrokers");
        let CyberBrokersDeploy = await CyberBrokers.deploy();
        await CyberBrokersDeploy.mintById(owner.address, 201);
        expect(await CyberBrokersDeploy.ownerOf(201)).to.equal(owner.address);
    });

    it("ONFTBased", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let MockERC721 = await ethers.getContractFactory("MockERC721");
        let MockERC721Deploy = await MockERC721.deploy();
        let endPoint = "0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23";
        let url = "https://prod.kanpaidev.com/api/token/";
        await MockERC721Deploy.initialize([owner.address], "Zsc", "yy");
        let ONFTBased = await ethers.getContractFactory("ONFTBased");
        let ONFTBasedDeploy = await ONFTBased.deploy("Kanpai Pandas", "YKPS", url, endPoint, 2000, 1999, 10052, MockERC721Deploy.address);
        await ONFTBasedDeploy.mintById(owner.address, 201);
        expect(await ONFTBasedDeploy.ownerOf(201)).to.equal(owner.address);
    });

    it("WeirdoGhostGang", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let WeirdoGhostGang = await ethers.getContractFactory("WeirdoGhostGang");
        let url = "https://ipfs.io/ipfs/QmU61BwmB9fm3kN4EWS14YxrB1FFJcMWj9GRrf4hsEvaYE/"
        let WeirdoGhostGangDeploy = await WeirdoGhostGang.deploy(url, owner.address, addr1.address);
        await WeirdoGhostGangDeploy.mintTokens(owner.address, 2);
        expect(await WeirdoGhostGangDeploy.ownerOf(1)).to.equal(owner.address);
    });

    it("AKCB", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let AKCB = await ethers.getContractFactory("AKCB");
        let AKCBDeploy = await AKCB.deploy();
        await AKCBDeploy.mintById(owner.address, 201);
        expect(await AKCBDeploy.ownerOf(201)).to.equal(owner.address);
    });

    it("OnChainMonkey", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        //let OnChainMonkey = await ethers.getContractFactory("OnChainMonkey");
        let OnChainMonkeyDeploy = await OnChainMonkey.new();
        await OnChainMonkeyDeploy.mintById(owner.address, 201);
        expect(await OnChainMonkeyDeploy.ownerOf(201)).to.equal(owner.address);
    });

    it("Rektguy", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let Rektguy = await ethers.getContractFactory("Rektguy");
        let RektguyDeploy = await Rektguy.deploy("Rektguy", "Rektguy", "https://ipfs.io/ipfs/QmeGnSL9fbqkGfAUnLUWgcBkEwbD5BjNpdDWb5EzhhpVLN/");
        await RektguyDeploy.mintById(owner.address, 201);
        expect(await RektguyDeploy.ownerOf(201)).to.equal(owner.address);
    });

    it("KillaBears", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let KillaBears = await ethers.getContractFactory("KillaBears");
        let KillaBearsDeploy = await KillaBears.deploy("ipfs://bafybeibv5nh2o2gdeczz7ec6jxpis2u6dylnepe6dhd5ddynnn3zlmh6vi/", "KILLABEARS", "KILLABEARS ");
        await KillaBearsDeploy.mintById(owner.address, 201);
        expect(await KillaBearsDeploy.ownerOf(201)).to.equal(owner.address);
    });

    it("DigiDaigaku", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let DigiDaigaku = await ethers.getContractFactory("DigiDaigaku");
        let DigiDaigakuDeploy = await DigiDaigaku.deploy();
        await DigiDaigakuDeploy.mintById(owner.address, 201);
        expect(await DigiDaigakuDeploy.ownerOf(201)).to.equal(owner.address);
    });

    it("SavedSouls", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let SavedSouls = await ethers.getContractFactory("SavedSouls");
        let SavedSoulsDeploy = await SavedSouls.deploy(owner.address);
        await SavedSoulsDeploy.mintTokens(owner.address, 2);
        expect(await SavedSoulsDeploy.ownerOf(1)).to.equal(owner.address);
    });

    it("Valhalla", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let Valhalla = await ethers.getContractFactory("Valhalla");
        let ValhallaDeploy = await Valhalla.deploy(owner.address);
        await ValhallaDeploy.mintById(owner.address, 201);
        expect(await ValhallaDeploy.ownerOf(201)).to.equal(owner.address);
    });

    it("LilPudgys", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let LilPudgys = await ethers.getContractFactory("LilPudgys");
        let url = "https://api.pudgypenguins.io/lil/"
        let LilPudgysDeploy = await LilPudgys.deploy(url,owner.address);
        await LilPudgysDeploy.mintById(owner.address, 201);
        expect(await LilPudgysDeploy.ownerOf(201)).to.equal(owner.address);
    });

    it("RoadsToDreams", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        let RoadsToDreams = await ethers.getContractFactory("RoadsToDreams");
        let url = "https://chain.nft.porsche.com/0xCcDF1373040D9Ca4B5BE1392d1945C1DaE4a862c/"
        let RoadsToDreamsDeploy = await RoadsToDreams.deploy("PORSCHΞ 911", "911", url, 0, 1674507600, 1674644400, 7500, 3, 20, owner.address);
        await RoadsToDreamsDeploy.mintTokens(owner.address, 2);
        expect(await RoadsToDreamsDeploy.ownerOf(1)).to.equal(owner.address);
    });
});