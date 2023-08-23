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
const fs = require('fs');
const ether = require('@openzeppelin/test-helpers/src/ether');
const erc20Tokens = [];
const erc721Tokens = [];


async function getErc20Info(token) {
    const Info = {name:await token.name(), symbol:await token.symbol(), decimals:await token.decimals(), address:token.address};
    erc20Tokens.push(Info);
}

async function getErc721Info(token) {
    const Info = {name:await token.name(), symbol:await token.symbol(), address:token.address};
    erc721Tokens.push(Info);
}


async function main() {
    const feeData = await ethers.provider.getFeeData();

    const costLimit = {
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
        gasLimit: 30000000
    };

    const [owner] = await ethers.getSigners();




    const usdt = await USDT.new(32297366521996886n, "Tether USD", "USDT", 6, costLimit);
    const usdtName = await usdt.name();
    getErc20Info(usdt);
    console.log(usdtName + ":" + usdt.address);
 
    const usdcImp = await ethers.getContractFactory("FiatTokenV2_1");
    const deployUsds = await usdcImp.deploy();
    await deployUsds.initialize("USD Coin", "USDC", "USD", 6, owner.address, owner.address, owner.address, owner.address);
    //await usdcImp.initialize("USD Coin", "USDC", "USD", 6, owner.address, owner.address, owner.address, owner.address, costLimit);
    //const usdcProxy = await USDC_PROXY.new(usdcImp.address, costLimit);
    const usdcName = await deployUsds.name();
    getErc20Info(deployUsds);
    console.log(usdcName + ":" + deployUsds.address);
    //console.log("usdcProxy:", usdcProxy.address);

    const dai = await DAI.new(5, costLimit);
    const daiName = await dai.name();
    getErc20Info(dai);
    console.log(daiName + ":" + dai.address);

    const wbtc = await WBTC.new(costLimit);
    const wbtcName = await wbtc.name();
    getErc20Info(wbtc);
    console.log(wbtcName + ":" + wbtc.address);

    const bayc = await BAYC.new("BoredApeYachtClub", "BAYC", 10000, 1619820000);
    const baycName = await bayc.name();
    // const baycInfo = {name:baycName, symbol:await bayc.symbol(), address:bayc.address};
    // erc721Tokens.push(baycInfo);
    getErc721Info(bayc);
    console.log(baycName + ":" + bayc.address);

    const cryptoPunksMarket = await CryptoPunksMarket.new(costLimit);
    const cryptoPunksMarketName = await cryptoPunksMarket.name();
    getErc721Info(cryptoPunksMarket);
    console.log(cryptoPunksMarketName + ":" + cryptoPunksMarket.address);

    const Autoglyphs = await ethers.getContractFactory("Autoglyphs");
    const AutoglyphsDeploy = await Autoglyphs.deploy();
    getErc721Info(AutoglyphsDeploy);
    console.log(await AutoglyphsDeploy.name(), AutoglyphsDeploy.address);

    let Meebits = await ethers.getContractFactory("Meebits");
    let MeebitsDeploy = await Meebits.deploy(cryptoPunksMarket.address, AutoglyphsDeploy.address, owner.address);
    getErc721Info(MeebitsDeploy);
    console.log(await MeebitsDeploy.name(), MeebitsDeploy.address);

    let NFTiff = await ethers.getContractFactory("NFTiff");
    let NFTiffUrl = "https://gateway.pinata.cloud/ipfs/QmboJwL8guW9BoVCw96UUswKH3VStp8SvaHVz7zT19FdaU"
    let NFTiffDeploy = await NFTiff.deploy(NFTiffUrl, cryptoPunksMarket.address);
    getErc721Info(NFTiffDeploy);
    console.log(await NFTiffDeploy.name(), NFTiffDeploy.address);

    const proof = await PROOFCollective.new("PROOF Collective", "PROOF", owner.address, costLimit);
    const moonBirds = await Moonbirds.new("Moonbirds", "MOONBIRD", proof.address, owner.address, owner.address, costLimit);
    const moonBirdsName = await moonBirds.name();
    getErc721Info(moonBirds);
    console.log(moonBirdsName + ":" + moonBirds.address);
   
    baycAddress= bayc.address
    const bacc = await BACC.new("https://ipfs.io/ipfs/QmdtARLUPQeqXrVcNzQuRqr9UCFoFvn76X9cdTczt4vqfw/");
    // getErc721Info(bacc);
    const bakc = await BAKC.new("BoredApeKennelClub", "BAKC", 10000, 1624658400, bayc.address);
    const bakcName = await bakc.name();
    getErc721Info(bakc);
    console.log(bakcName + ":" + bakc.address);
    console.log("bacc",bacc.address);

    const mayc = await MAYC.new("MutantApeYachtClub", "MAYC", bayc.address, bacc.address);
    const maycName = await mayc.name();
    getErc721Info(mayc);
    console.log(maycName + ":" + mayc.address);

    const VrfCoordinator = "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D";
    const linktoken = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
    const simpleToken = await ethers.getContractFactory("SimpleToken");
    const SimpleTokenDeploy = await simpleToken.deploy("ApeCoin", "APE", 1000000000000000000000000000n);
    //const simpleToken = await SimpleToken.new("ApeCoin", "APE", 1000000000000000000000000000n);
    getErc20Info(SimpleTokenDeploy);
    console.log("ApeCoin",SimpleTokenDeploy.address);
   
    const land = await Land.new("Otherdeed", "OTHR", [bayc.address, mayc.address, SimpleTokenDeploy.address], [10000, 20000, 55000, 200000], [[owner.address, 201]], VrfCoordinator, linktoken,
    "0xaa77729d3466ca35ae8d28b3bbac7cc36a5031efdc430821c02bc31a238af445", 2000000000000000000n, owner.address);
    const landName = await land.name();
    getErc721Info(land);
    console.log(landName + ":" + land.address);

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
    this.othdreed = land.address;

    const register = await ethers.getContractFactory("Registry");
    this.register = await register.deploy();
    console.log("this.register",this.register.address);

    await this.side.initialize(this.othdreed, this.register.address).then(() => {
        getErc721Info(this.side);
    });

    await this.koda.initialize(this.othdreed, this.side.address, this.register.address, this.merkleRoot).then(() => {
        getErc721Info(this.koda);
    });

    await this.vessel.initialize(this.othdreed, this.side.address, this.koda.address, this.register.address, 1680742800).then(() => {
        getErc721Info(this.vessel);
    });

    let NKMGS = await ethers.getContractFactory("Nakamigos");
    let NKMGSDeployed = await NKMGS.deploy(owner.address);
    getErc721Info(NKMGSDeployed);
    console.log(await NKMGSDeployed.name() + NKMGSDeployed.address);

    let Azuki = await ethers.getContractFactory("Azukis");
    let AzukiDeploy = await Azuki.deploy(201, 201, 201, 201);
    getErc721Info(AzukiDeploy);
    console.log(await AzukiDeploy.name() + AzukiDeploy.address);

    let Beanz = await ethers.getContractFactory("Beanz");
    let Beanzeployed = await Beanz.deploy(AzukiDeploy.address, 19950, VrfCoordinator, linktoken, "Beanz", "BEANZ");
    getErc721Info(Beanzeployed);
    console.log(await Beanzeployed.name(), Beanzeployed.address);

    let WorldOfWomen = await ethers.getContractFactory("WorldOfWomen");
    let WorldOfWomenDeploy = await WorldOfWomen.deploy();
    getErc721Info(WorldOfWomenDeploy);
    console.log(await WorldOfWomenDeploy.name(), WorldOfWomenDeploy.address);

    let Renga = await ethers.getContractFactory("Renga");
    let RengaDeploy = await Renga.deploy();
    await RengaDeploy.initialize().then(() => {
        getErc721Info(RengaDeploy);
    });
    console.log("Renga", RengaDeploy.address);

    let SappySeals = await ethers.getContractFactory("SappySeals");
    let SappySealsDeploy = await SappySeals.deploy("Sappy Seals", "SAPS", "ipfs://QmXUUXRSAJeb4u8p4yKHmXN1iAKtAV7jwLHjw35TNm5jN7/");
    getErc721Info(SappySealsDeploy);
    console.log(await SappySealsDeploy.name(), SappySealsDeploy.address);

    let Operator = await ethers.getContractFactory("Operator");
    let OperatorDeploy = await Operator.deploy(owner.address);
    let HVMTL = await ethers.getContractFactory("HVMTL");
    let HVMTLDeploy = await HVMTL.deploy("HV-MTL", "HV-MTL", OperatorDeploy.address);
    getErc721Info(HVMTLDeploy);
    console.log(await HVMTLDeploy.name(), HVMTLDeploy.address);

    let Captainz = await ethers.getContractFactory("Captainz");
    let CaptainzDeploy = await Captainz.deploy();
    await CaptainzDeploy.initialize("https://captainz-api.memeland.com/metadata/").then(()=> {
        getErc721Info(CaptainzDeploy);
    });
    console.log("Captainz", CaptainzDeploy.address);

    let PunksV1Wrapper = await ethers.getContractFactory("PunksV1Wrapper");
    let PunksV1WrapperDeploy = await PunksV1Wrapper.deploy();
    getErc721Info(PunksV1WrapperDeploy);
    console.log(await PunksV1WrapperDeploy.name(), PunksV1WrapperDeploy.address);

    const wormhole = "0x706abc4E45D419950511e474C7B9Ed348A4a716c";
    let DustToken = await ethers.getContractFactory("DustToken");
    let DustTokenDeploy = await DustToken.deploy("DUST Token", "DUST ", [owner.address], "4965580800000000000000000000")
    let DeGods = await ethers.getContractFactory("DeGods");
    let DeGodsDeploy = await DeGods.deploy(wormhole, DustTokenDeploy.address, "0x7a46b8d0e0f12e54b8ca473f2d09ee8c6c1bfbf18b6f2c4d28fc6ad1c6b07ea7", "0x68747470733a2f2f6d657461646174612e6465676f64732e636f6d2f672f");
    getErc721Info(DeGodsDeploy);
    console.log(await DeGodsDeploy.name(), DeGodsDeploy.address);

    let FactoryUpgradeGate = await ethers.getContractFactory("FactoryUpgradeGate");
    let FactoryUpgradeGateDeploy = await FactoryUpgradeGate.deploy(owner.address);
    let ERC721TransferHelper = await ethers.getContractFactory("ERC721TransferHelper");
    let ERC721TransferHelperDeploy = await ERC721TransferHelper.deploy(owner.address);
    let Open = await ethers.getContractFactory("ERC721Drop");
    let OpenDeploy = await Open.deploy(ERC721TransferHelperDeploy.address, FactoryUpgradeGateDeploy.address, "0x3cc6CddA760b79bAfa08dF41ECFA224f810dCeB6", 0, owner.address);
    getErc721Info(OpenDeploy);
    console.log(await OpenDeploy.name(), OpenDeploy.address);

    let mfers = await ethers.getContractFactory("mfers");
    let mfersDeploy = await mfers.deploy(owner.address);
    getErc721Info(mfersDeploy);
    console.log(await mfersDeploy.name(), mfersDeploy.address);

    let ZoraFeeManager = await ethers.getContractFactory("ZoraFeeManager");
    let ZoraFeeManagerDeploy = await ZoraFeeManager.deploy(201, owner.address); 
    let Check = await ethers.getContractFactory("ERC721Dropv2");
    let CheckDeploy = await Check.deploy(ZoraFeeManagerDeploy.address, ERC721TransferHelperDeploy.address, FactoryUpgradeGateDeploy.address, "0x3cc6CddA760b79bAfa08dF41ECFA224f810dCeB6");
    getErc721Info(CheckDeploy);
    console.log(await CheckDeploy.name(), CheckDeploy.address);

    let Miladys = await ethers.getContractFactory("Miladys");
    let MiladysDeploy = await Miladys.deploy();
    getErc721Info(MiladysDeploy);
    console.log(await MiladysDeploy.name() + MiladysDeploy.address);

    let Outlaws = await ethers.getContractFactory("Outlaws");
    let baseUrl = "https://fuchsia-certain-muskox-472.mypinata.cloud/ipfs/QmVfShB3yzaT6GMDBUmat88RQ3oMhsApRTYWNZ4RzK9jLc/";
    let OutlawsDeploy = await Outlaws.deploy(baseUrl, "Outlaws", "OUT", [owner.address], [201]);
    getErc721Info(OutlawsDeploy);
    console.log(await OutlawsDeploy.name() + OutlawsDeploy.address);

    let Pixelmon = await ethers.getContractFactory("Pixelmon");
    let PixelmonbaseUrl = "https://pixelmon.club/api/";
    let PixelmonDeploy = await Pixelmon.deploy(PixelmonbaseUrl);
    getErc721Info(PixelmonDeploy);
    console.log(await PixelmonDeploy.name() + PixelmonDeploy.address);
    
    let GhostChild = await ethers.getContractFactory("GhostChild");
    let GhostChildDeploy = await GhostChild.deploy();
    getErc721Info(GhostChildDeploy);
    console.log(await GhostChildDeploy.name() + GhostChildDeploy.address);

    let Terraforms = await ethers.getContractFactory("Terraforms");
    const _terraformsDataAddress = "0xA5aFC9fE76a28fB12C60954Ed6e2e5f8ceF64Ff2";
    const _terraformsAugmentationsAddress = "0x2521bEb44D433A5B916Ad9d5aB51B98378870072"
    let TerraformsDeploy = await Terraforms.deploy(_terraformsDataAddress, _terraformsAugmentationsAddress);
    getErc721Info(TerraformsDeploy);
    console.log(await TerraformsDeploy.name() + TerraformsDeploy.address);

    let CyberBrokers = await ethers.getContractFactory("CyberBrokers");
    let CyberBrokersDeploy = await CyberBrokers.deploy();
    getErc721Info(CyberBrokersDeploy);
    console.log(await CyberBrokersDeploy.name() + CyberBrokersDeploy.address);

    let MockERC721 = await ethers.getContractFactory("MockERC721");
    let MockERC721Deploy = await MockERC721.deploy();
    let endPoint = "0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23";
    let ONFTBasedurl = "https://prod.kanpaidev.com/api/token/";
    await MockERC721Deploy.initialize([owner.address], "Zsc", "yy");
    let ONFTBased = await ethers.getContractFactory("ONFTBased");
    let ONFTBasedDeploy = await ONFTBased.deploy("Kanpai Pandas", "YKPS", ONFTBasedurl, endPoint, 2000, 1999, 10052, MockERC721Deploy.address);
    getErc721Info(ONFTBasedDeploy);
    console.log(await ONFTBasedDeploy.name(), ONFTBasedDeploy.address);

    let WeirdoGhostGang = await ethers.getContractFactory("WeirdoGhostGang");
    let WeirdoGhostGangurl = "https://ipfs.io/ipfs/QmU61BwmB9fm3kN4EWS14YxrB1FFJcMWj9GRrf4hsEvaYE/"
    let WeirdoGhostGangDeploy = await WeirdoGhostGang.deploy(WeirdoGhostGangurl, owner.address, "0xe42241114e2B344074e6aa7CF8D9684C9C6e41dE");
    getErc721Info(WeirdoGhostGangDeploy);
    console.log(await WeirdoGhostGangDeploy.name(), WeirdoGhostGangDeploy.address);

    let AKCB = await ethers.getContractFactory("AKCB");
    let AKCBDeploy = await AKCB.deploy();
    getErc721Info(AKCBDeploy);
    console.log(await AKCBDeploy.name(), AKCBDeploy.address);

    let OnChainMonkey = await ethers.getContractFactory("OnChainMonkey");
    let OnChainMonkeyDeploy = await OnChainMonkey.deploy(costLimit);
    getErc721Info(OnChainMonkeyDeploy);
    console.log(await OnChainMonkeyDeploy.name(), OnChainMonkeyDeploy.address);

    let Rektguy = await ethers.getContractFactory("Rektguy");
    let RektguyDeploy = await Rektguy.deploy("Rektguy", "Rektguy", "https://ipfs.io/ipfs/QmeGnSL9fbqkGfAUnLUWgcBkEwbD5BjNpdDWb5EzhhpVLN/");
    getErc721Info(RektguyDeploy);
    console.log(await RektguyDeploy.name(), RektguyDeploy.address);

    let KillaBears = await ethers.getContractFactory("KillaBears");
    let KillaBearsDeploy = await KillaBears.deploy("ipfs://bafybeibv5nh2o2gdeczz7ec6jxpis2u6dylnepe6dhd5ddynnn3zlmh6vi/", "KILLABEARS", "KILLABEARS ");
    getErc721Info(KillaBearsDeploy);
    console.log(await KillaBearsDeploy.name(), KillaBearsDeploy.address);

    let DigiDaigaku = await ethers.getContractFactory("DigiDaigaku");
    let DigiDaigakuDeploy = await DigiDaigaku.deploy();
    getErc721Info(DigiDaigakuDeploy);
    console.log(await DigiDaigakuDeploy.name(), DigiDaigakuDeploy.address);

    let SavedSouls = await ethers.getContractFactory("SavedSouls");
    let SavedSoulsDeploy = await SavedSouls.deploy(owner.address);
    getErc721Info(DigiDaigakuDeploy);
    console.log(await SavedSoulsDeploy.name(), SavedSoulsDeploy.address);

    let Valhalla = await ethers.getContractFactory("Valhalla");
    let ValhallaDeploy = await Valhalla.deploy(owner.address);
    getErc721Info(ValhallaDeploy);
    console.log(await ValhallaDeploy.name(), ValhallaDeploy.address);

    let LilPudgys = await ethers.getContractFactory("LilPudgys");
    let LilPudgysurl = "https://api.pudgypenguins.io/lil/"
    let LilPudgysDeploy = await LilPudgys.deploy(LilPudgysurl,owner.address);
    getErc721Info(LilPudgysDeploy);
    console.log(await LilPudgysDeploy.name(), LilPudgysDeploy.address);

    let RoadsToDreams = await ethers.getContractFactory("RoadsToDreams");
    let RoadsToDreamsurl = "https://chain.nft.porsche.com/0xCcDF1373040D9Ca4B5BE1392d1945C1DaE4a862c/"
    let RoadsToDreamsDeploy = await RoadsToDreams.deploy("PORSCHΞ 911", "911", RoadsToDreamsurl, 0, 1674507600, 1674644400, 7500, 3, 20, owner.address);
    getErc721Info(RoadsToDreamsDeploy);
    console.log(await RoadsToDreamsDeploy.name(), RoadsToDreamsDeploy.address);

    let Potatoz = await ethers.getContractFactory("Potatoz");
    let Potatozsurl = "https://api.pudgypenguins.io/lil/"
    let PotatozDeploy = await Potatoz.deploy();
    await PotatozDeploy.initialize(owner.address, Potatozsurl).then(() =>{
        getErc721Info(PotatozDeploy);
    })
    console.log("PotatozDeploy", PotatozDeploy.address);

    let RAYC = await ethers.getContractFactory("RAYC");
    let RAYCsurl = "https://data.rareapepes.com/"
    let RAYCDeploy = await RAYC.deploy("RareApepeYachtClub", "RAYC", RAYCsurl, 1646499600);
    getErc721Info(RAYCDeploy);
    console.log(await RAYCDeploy.name(), RAYCDeploy.address);

    let Oddities = await ethers.getContractFactory("Oddities");
    let OdditiesDeploy = await Oddities.deploy("0xA8a09b2e4B2C1d532DFB77b42BA6c5B14cE1bFf4", owner.address);
    getErc721Info(OdditiesDeploy);
    console.log(await OdditiesDeploy.name(), OdditiesDeploy.address);

    let CloneX = await ethers.getContractFactory("CloneX");
    let CloneXDeploy = await CloneX.deploy();
    getErc721Info(CloneXDeploy);
    console.log(await CloneXDeploy.name(), CloneXDeploy.address);

    let LedgerNFT = await ethers.getContractFactory("LedgerMarketPass");
    let tokenUrl = "https://metadata.ledger.com/ledger-market-pass-genesis-edition/tokens/"
    let LedgerNFTbaseUrl = "https://metadata.ledger.com/ledger-market-pass-genesis-edition/contract-metadata"
    let LedgerNFTDeploy = await LedgerNFT.deploy(10000, tokenUrl, LedgerNFTbaseUrl, "[ Ledger ] Market Pass - Genesis Edition", "LMP");
    getErc721Info(LedgerNFTDeploy);
    console.log(await LedgerNFTDeploy.name(), LedgerNFTDeploy.address);

    let WebaverseGenesisPass = await ethers.getContractFactory("WebaverseGenesisPass");
    let WebaverseGenesisPassDeploy = await WebaverseGenesisPass.deploy(20000, 0,  owner.address, 0, VrfCoordinator,owner.address);
    getErc721Info(WebaverseGenesisPassDeploy);
    console.log(await WebaverseGenesisPassDeploy.name(), WebaverseGenesisPassDeploy.address);

    let GODAMintPass = await ethers.getContractFactory("GODAMintPass");
    let GODAMintPassDeploy = await GODAMintPass.deploy(owner.address);
    getErc721Info(GODAMintPassDeploy);
    console.log(await GODAMintPassDeploy.name(), GODAMintPassDeploy.address);

    let SuperCoolWorld = await ethers.getContractFactory("SuperCoolWorld");
    let SuperCoolWorldDeploy = await SuperCoolWorld.deploy(owner.address, GODAMintPassDeploy.address);
    getErc721Info(SuperCoolWorldDeploy);
    console.log(await SuperCoolWorldDeploy.name(), SuperCoolWorldDeploy.address);

    let CDBS3 = await ethers.getContractFactory("CDBS3");
    let CDBS3Deploy = await CDBS3.deploy(owner.address);
    getErc721Info(CDBS3Deploy);
    console.log(await CDBS3Deploy.name(), CDBS3Deploy.address);

    let mcgoblintownwtf = await ethers.getContractFactory("mcgoblintownwtf");
    let mcgoblintownwtfDeploy = await mcgoblintownwtf.deploy();
    getErc721Info(mcgoblintownwtfDeploy);
    console.log(await mcgoblintownwtfDeploy.name(), mcgoblintownwtfDeploy.address);

    let NFTWorlds = await ethers.getContractFactory("NFTWorlds");
    let NFTWorldsDeploy = await NFTWorlds.deploy(201, 201, 201, 201, 201);
    getErc721Info(NFTWorldsDeploy);
    console.log(await NFTWorldsDeploy.name(), NFTWorldsDeploy.address);

    let PudgyPenguins = await ethers.getContractFactory("PudgyPenguins");
    let PudgyPenguinsUrl = "https://ipfs.io/ipfs/QmWXJXRdExse2YHRY21Wvh4pjRxNRQcWVhcKw4DLVnqGqs/"
    let PudgyPenguinsDeploy = await PudgyPenguins.deploy(PudgyPenguinsUrl);
    getErc721Info(PudgyPenguinsDeploy);
    console.log(await PudgyPenguinsDeploy.name(), PudgyPenguinsDeploy.address);

    let GmStudioFactura = await ethers.getContractFactory("GmStudioFactura");
    let GmStudioFacturaUrl = "https://ipfs.io/ipfs/QmWXJXRdExse2YHRY21Wvh4pjRxNRQcWVhcKw4DLVnqGqs/"
    let GmStudioFacturaDeploy = await GmStudioFactura.deploy(owner.address, owner.address, owner.address, GmStudioFacturaUrl,[201,201,201],[owner.address],[201],[201]);
    getErc721Info(GmStudioFacturaDeploy);
    console.log(await GmStudioFacturaDeploy.name(), GmStudioFacturaDeploy.address);

    let HyperMintERC721 = await ethers.getContractFactory("HyperMintERC721");
    let HyperMintERC721TokenUrl = "https://ragstorichie.mypinata.cloud/ipfs/QmcXBv2QPZpJv1H5tiZymzTbJEy8zQxmZVosEEwrKTqsaV/"
    let HyperMintERC721ContractUrl = "https://ragstorichie.mypinata.cloud/ipfs/QmYkv8FhjkUxCj5kg6oRXzsgP7YdBQpX1aY8spTGaynd8G" 
    let HyperMintERC721Deploy = await HyperMintERC721.deploy("Rags to Richie by Alec Monopoly","RR",0,3333,HyperMintERC721ContractUrl,HyperMintERC721TokenUrl,true,201,owner.address);
    getErc721Info(HyperMintERC721Deploy);
    console.log(await HyperMintERC721Deploy.name(), HyperMintERC721Deploy.address);

    let StickmenToys = await ethers.getContractFactory("StickmenToys");
    let StickmenToysDeploy = await StickmenToys.deploy();
    getErc721Info(StickmenToysDeploy);
    console.log(await StickmenToysDeploy.name(), StickmenToysDeploy.address);

    let GmV2 = await ethers.getContractFactory("GmV2");
    let GmV2Deploy = await GmV2.deploy("https://api.gmstudio.art/collections/gmv2/token/", owner.address);
    getErc721Info(GmV2Deploy);
    console.log(await GmV2Deploy.name(), GmV2Deploy.address);

    let Doodles = await ethers.getContractFactory("Doodles");
    let DoodlesDeploy = await Doodles.deploy();
    getErc721Info(DoodlesDeploy);
    console.log(await DoodlesDeploy.name(), DoodlesDeploy.address);
    
    const WrappedPunk = await ethers.getContractFactory("WrappedPunk");
    const wrappedPunkDeployed = await WrappedPunk.deploy(owner.address)
    getErc721Info(wrappedPunkDeployed);
    console.log(await wrappedPunkDeployed.symbol() , wrappedPunkDeployed.address);


    const WrappedEth = await ethers.getContractFactory("WETH9");
    const WrappedEthDeployed = await WrappedEth.deploy(costLimit);
    console.log("WrappedEthDeployed", WrappedEthDeployed.address);



    const data = {
        weth: WrappedEthDeployed.address,
        erc20: erc20Tokens,
        erc721: erc721Tokens
      };
      
      const jsonData = JSON.stringify(data, null, 2);

      // 将字符串写入文件
      fs.writeFileSync('token.json', jsonData);
      
      console.log('JSON 文件已生成');

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });