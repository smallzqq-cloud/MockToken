// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {StringsUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import {AccessControlEnumerableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ERC721LockableUpgradeable} from "./lib/ERC721LockableUpgradeable.sol";
import {IOtherdeed} from "./lib/IOtherdeed.sol";
import {IRegistry} from "./lib/IRegistry.sol";

//      |||||\          |||||\               |||||\           |||||\
//      ||||| |         ||||| |              ||||| |          ||||| |
//       \__|||||\  |||||\___\|               \__|||||\   |||||\___\|
//          ||||| | ||||| |                      ||||| |  ||||| |
//           \__|||||\___\|       Y u g a         \__|||||\___\|
//              ||||| |             L a b s          ||||| |
//          |||||\___\|     OTHERSIDEEXPANDED    |||||\___\|
//          ||||| |                              ||||| |
//           \__|||||||||||\                      \__|||||||||||\
//              ||||||||||| |                        ||||||||||| |
//               \_________\|                         \_________\|

error NonExistentToken();
error NotAllowedToClaim();
error MaxTokensMinted();

/**
 * @title Otherdeed Expanded
 */
contract Otherside is
    ERC721LockableUpgradeable,
    AccessControlEnumerableUpgradeable,
    ReentrancyGuardUpgradeable,
    UUPSUpgradeable
{
    using StringsUpgradeable for uint256;

    address public constant BURN_ADDRESS =
        0x000000000000000000000000000000000000dEaD;
    uint256 public constant MAX_SUPPLY = 100_000;
    uint256 public constant FUTURE_MAX_SUPPLY = 200_000;

    IOtherdeed public otherdeed;
    IRegistry public registry;

    mapping(address => bool) private addressesAllowedToClaim;
    string private baseURI;
    string public nftLicenseTerms;
    uint256 public totalSupply;
    bool public futureLandAvailable;

    // /// @custom:oz-upgrades-unsafe-allow constructor
    // constructor() {
    //     _disableInitializers();
    // }

    function initialize(
        address _otherdeedContract,
        address _registryContract
    ) external initializer {
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();
        __AccessControlEnumerable_init();
        __ERC721_init("Otherdeed Expanded", "EXP");

        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        otherdeed = IOtherdeed(_otherdeedContract);
        registry = IRegistry(_registryContract);
    }

    function version() external pure virtual returns (string memory) {
        return "1.0.0";
    }

    /**
     * @notice Claims otherside expanded token and sends old otherdeed to a dead address.
     * @param tokenId ID of new token being claimed
     * @param claimAddress Address claiming the new token
     */
    function claim(uint256 tokenId, address claimAddress) external {
        if (addressesAllowedToClaim[_msgSender()] != true) {
            revert NotAllowedToClaim();
        }

        if (futureLandAvailable) {
            if (totalSupply >= FUTURE_MAX_SUPPLY) {
                revert MaxTokensMinted();
            }
        } else {
            if (totalSupply >= MAX_SUPPLY) {
                revert MaxTokensMinted();
            }
        }

        if (!_exists(tokenId)) {
            otherdeed.transferFrom(claimAddress, BURN_ADDRESS, tokenId);
            _mint(claimAddress, tokenId);
            ++totalSupply;
        }
    }

    function mint(address addr, uint256 tokenId) external {
       _mint(addr, tokenId);
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

    function exists(uint256 tokenId) external view returns (bool) {
        return _exists(tokenId);
    }

    function setContractAllowedToLock(
        address contractAddress,
        bool isAllowed
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setContractAllowedToLock(contractAddress, isAllowed);
    }

    function setFutureLandAvailable(
        bool available
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        futureLandAvailable = available;
    }

    function setAddressesAllowedToClaim(
        address contractAddress,
        bool allowed
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        addressesAllowedToClaim[contractAddress] = allowed;
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
