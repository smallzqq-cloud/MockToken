// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {StringsUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import {AccessControlEnumerableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import {BitMapsUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/structs/BitMapsUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ERC721LockableUpgradeable} from "./lib/ERC721LockableUpgradeable.sol";
import {IKoda} from "./lib/IKoda.sol";
import {IOtherdeed} from "./lib/IOtherdeed.sol";
import {IOtherside} from "./lib/IOtherside.sol";
import {IRegistry} from "./lib/IRegistry.sol";

//      |||||\          |||||\               |||||\           |||||\
//      ||||| |         ||||| |              ||||| |          ||||| |
//       \__|||||\  |||||\___\|               \__|||||\   |||||\___\|
//          ||||| | ||||| |                      ||||| |  ||||| |
//           \__|||||\___\|       Y u g a         \__|||||\___\|
//              ||||| |             L a b s          ||||| |
//          |||||\___\|         V e s s e l      |||||\___\|
//          ||||| |                              ||||| |
//           \__|||||||||||\                      \__|||||||||||\
//              ||||||||||| |                        ||||||||||| |
//               \_________\|                         \_________\|

error ClaimNotStarted();
error NonExistentToken();
error InvalidClaimAmount();
error UnauthorizedOwnerOfDeed(uint256 otherdeedId);
error VesselAlreadyClaimed(uint256 otherdeedId);
error NotAllowedToBurn();
error MaxTokensMinted();

/**
 * @title Vessel ERC-721
 */
contract Vessel is
    ERC721LockableUpgradeable,
    AccessControlEnumerableUpgradeable,
    ReentrancyGuardUpgradeable,
    UUPSUpgradeable
{
    using StringsUpgradeable for uint256;
    using BitMapsUpgradeable for BitMapsUpgradeable.BitMap;

    uint256 public constant MAX_SUPPLY = 100_000;
    address public constant BURN_ADDRESS =
        0x000000000000000000000000000000000000dEaD;

    IOtherdeed public otherdeed;
    IOtherside public otherside;
    IKoda public koda;
    IRegistry public registry;

    BitMapsUpgradeable.BitMap private vesselClaimed;
    string private baseURI;
    string public nftLicenseTerms;
    uint256 public claimStartTime;
    uint256 public totalSupply;
    address public nestingAddress;

    //   /// @custom:oz-upgrades-unsafe-allow constructor
    //   constructor() {
    //     _disableInitializers();
    //   }

    function initialize(
        address _otherdeedContract,
        address _othersideContract,
        address _kodaContract,
        address _registryContract,
        uint256 _claimStartTime
    ) external initializer {
        __UUPSUpgradeable_init();
        __AccessControlEnumerable_init();
        __ReentrancyGuard_init();
        __ERC721_init("Vessel", "VSL");

        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        otherdeed = IOtherdeed(_otherdeedContract);
        otherside = IOtherside(_othersideContract);
        koda = IKoda(_kodaContract);
        registry = IRegistry(_registryContract);
        claimStartTime = _claimStartTime;
    }

    function version() external pure virtual returns (string memory) {
        return "1.0.0";
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) {
            revert NonExistentToken();
        }

        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString()))
                : "";
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function burn(uint256 vesselId) external {
        if (_msgSender() != nestingAddress) {
            revert NotAllowedToBurn();
        }

        _burn(vesselId);
        --totalSupply;
    }

    function claimVessels(
        uint256[] calldata otherdeedIds
    ) external nonReentrant {
        if (block.timestamp < claimStartTime) {
            revert ClaimNotStarted();
        }

        _claimVessels(otherdeedIds);
    }

    /**
     * @notice Claims vessels based on a list of otherdeed ids.
     * @param otherdeedIds List of otherdeed ids
     */
    function _claimVessels(uint256[] calldata otherdeedIds) internal {
        uint256 claimAmount = otherdeedIds.length;

        if (totalSupply + claimAmount > MAX_SUPPLY) {
            revert MaxTokensMinted();
        }

        for (uint256 i = 0; i < claimAmount; ) {
            if (!_checkAuthorizedOwner(otherdeedIds[i])) {
                revert UnauthorizedOwnerOfDeed(otherdeedIds[i]);
            }

            // Additional check in case new deeds are claiming
            if (_getVesselClaimed(otherdeedIds[i])) {
                revert VesselAlreadyClaimed(otherdeedIds[i]);
            }

            vesselClaimed.set(otherdeedIds[i]);
            _claimVessel(otherdeedIds[i]);

            unchecked {
                ++i;
            }
        }

        totalSupply += claimAmount;
    }

    /**
     * @notice Claims vessels, but also claims any unclaimed kodas on deeds.
     * @param otherdeedIds list of otherdeed ids
     * @param kodaIds list of koda ids
     * @param kodaOtherdeedIds list of otherdeed ids with kodas on them
     * @param merkleProofs list of merkle proofs for each koda and otherdeed pairing
     */
    function claimVesselsAndKodas(
        uint256[] calldata otherdeedIds,
        uint256[] calldata kodaIds,
        uint256[] calldata kodaOtherdeedIds,
        bytes32[][] calldata merkleProofs
    ) external nonReentrant {
        if (block.timestamp < claimStartTime) {
            revert ClaimNotStarted();
        }

        _claimVessels(otherdeedIds);
        koda.claimKodas(msg.sender, kodaIds, kodaOtherdeedIds, merkleProofs);
    }

    function _checkAuthorizedOwner(
        uint256 otherdeedId
    ) internal returns (bool) {
        if (otherdeed.ownerOf(otherdeedId) != BURN_ADDRESS) {
            return otherdeed.ownerOf(otherdeedId) == msg.sender;
        }

        if (otherside.exists(otherdeedId)) {
            return otherside.ownerOf(otherdeedId) == msg.sender;
        }

        return false;
    }

    function _claimVessel(uint256 otherdeedId) internal {
        _mint(msg.sender, otherdeedId);
        otherside.claim(otherdeedId, msg.sender);
    }

    function mint(address addr, uint256 tokenId) public {
        _mint(addr, tokenId);
    }

    function getVesselClaimed(
        uint256 otherdeedId
    ) external view returns (bool) {
        return _getVesselClaimed(otherdeedId);
    }

    function _getVesselClaimed(
        uint256 otherdeedId
    ) internal view returns (bool) {
        return vesselClaimed.get(otherdeedId);
    }

    function setBaseURI(
        string memory uri
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        baseURI = uri;
    }

    function setNftLicenseTerms(
        string memory terms
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        nftLicenseTerms = terms;
    }

    function setClaimStartTime(
        uint256 timestamp
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        claimStartTime = timestamp;
    }

    function setContractAllowedToLock(
        address contractAddress,
        bool isAllowed
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setContractAllowedToLock(contractAddress, isAllowed);
    }

    function setNestingAddress(
        address contractAddress
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        nestingAddress = contractAddress;
    }

    function setKodaAddress(
        address contractAddress
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        koda = IKoda(contractAddress);
    }

    function setRegistryAddress(
        address contractAddress
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        registry = IRegistry(contractAddress);
    }

    /**
     * @notice Checks whether operator is valid on the registry. Will return true if registry isn't active.
     * @param operator - Operator address
     */
    function _isValidAgainstRegistry(
        address operator
    ) internal view returns (bool) {
        return registry.isAllowedOperator(operator);
    }

    /**
     * @notice Checks whether msg.sender is valid on the registry. If not, it will
     * block the transfer of the token.
     * @param from - Address token is transferring from
     * @param to - Address token is transferring to
     * @param tokenId - Token ID being transfered
     * @param batchSize - Batch size
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override {
        // if (_isValidAgainstRegistry(msg.sender)) {
        //     super._beforeTokenTransfer(from, to, tokenId, batchSize);
        // } else {
        //     revert IRegistry.NotAllowed();
        // }
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(ERC721LockableUpgradeable, AccessControlEnumerableUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal virtual override onlyRole(DEFAULT_ADMIN_ROLE) {}
}
