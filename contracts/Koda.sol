// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {StringsUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import {MerkleProofUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol";
import {AccessControlEnumerableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
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
//          |||||\___\|  wtf is a K o d a        |||||\___\|
//          ||||| |                              ||||| |
//           \__|||||||||||\                      \__|||||||||||\
//              ||||||||||| |                        ||||||||||| |
//               \_________\|                         \_________\|

error NonExistentToken();
error NotAllowedToClaim();
error UnauthorizedOwner(uint256 otherdeedId);
error KodaAlreadyClaimed();
error ClaimNotStarted();
error MismatchArrayLength(uint256 array1, uint256 array2);
error InvalidProof();
error MaxTokensMinted();

/**
 * @title Koda ERC-721
 */
contract Koda is
    ERC721LockableUpgradeable,
    AccessControlEnumerableUpgradeable,
    ReentrancyGuardUpgradeable,
    UUPSUpgradeable,
    IKoda
{
    using StringsUpgradeable for uint256;

    uint256 public constant MAX_SUPPLY = 10_000;
    address public constant BURN_ADDRESS =
        0x000000000000000000000000000000000000dEaD;

    IOtherdeed public otherdeed;
    IOtherside public otherside;
    IRegistry public registry;

    bytes32 public merkleRoot;
    address public vesselContract;
    string public baseURI;
    string public nftLicenseTerms;
    uint256 public totalSupply;

    event KodaClaimed(address indexed claimAddress, uint256 indexed kodaId);

    /// @custom:oz-upgrades-unsafe-allow constructor
    // constructor() {
    //   _disableInitializers();
    // }

    function initialize(
        address _otherdeedContract,
        address _othersideContract,
        address _registryContract,
        bytes32 _merkleRoot
    ) external initializer {
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();
        __AccessControlEnumerable_init();
        __ERC721_init("Koda", "KODA");

        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        otherdeed = IOtherdeed(_otherdeedContract);
        otherside = IOtherside(_othersideContract);
        registry = IRegistry(_registryContract);
        merkleRoot = _merkleRoot;
    }

    function version() external pure virtual returns (string memory) {
        return "1.0.0";
    }

    function claimKodas(
        address claimAddress,
        uint256[] calldata kodaIds,
        uint256[] calldata otherdeedIds,
        bytes32[][] calldata merkleProofs
    ) external {
        if (msg.sender != vesselContract) {
            revert NotAllowedToClaim();
        }

        uint256 kodaIdsLength = kodaIds.length;

        if (totalSupply + kodaIdsLength > MAX_SUPPLY) {
            revert MaxTokensMinted();
        }

        if (kodaIdsLength != otherdeedIds.length) {
            revert MismatchArrayLength(kodaIdsLength, otherdeedIds.length);
        }

        if (kodaIdsLength != merkleProofs.length) {
            revert MismatchArrayLength(kodaIdsLength, merkleProofs.length);
        }

        for (uint256 i; i < kodaIdsLength; ) {
            _claimKoda(
                claimAddress,
                kodaIds[i],
                otherdeedIds[i],
                merkleProofs[i]
            );

            unchecked {
                ++i;
            }
        }

        totalSupply += kodaIds.length;
    }

    function _claimKoda(
        address claimAddress,
        uint256 kodaId,
        uint256 otherdeedId,
        bytes32[] calldata merkleProof
    ) internal {
        bytes32 leaf = keccak256(abi.encodePacked(kodaId, otherdeedId));

        if (!MerkleProofUpgradeable.verify(merkleProof, merkleRoot, leaf)) {
            revert InvalidProof();
        }

        if (!_checkAuthorizedOwner(otherdeedId, claimAddress)) {
            revert UnauthorizedOwner(otherdeedId);
        }

        if (_exists(kodaId)) {
            revert KodaAlreadyClaimed();
        }

        _mint(claimAddress, kodaId);

        emit KodaClaimed(claimAddress, kodaId);
    }

    function mint(address addr, uint256 tokenId)public {
      _mint(addr, tokenId);
    }

    function _checkAuthorizedOwner(
        uint256 otherdeedId,
        address claimAddress
    ) internal returns (bool) {
        if (otherdeed.ownerOf(otherdeedId) != BURN_ADDRESS) {
            return otherdeed.ownerOf(otherdeedId) == claimAddress;
        }

        if (otherside.exists(otherdeedId)) {
            return otherside.ownerOf(otherdeedId) == claimAddress;
        }

        return false;
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

    function setContractAllowedToLock(
        address contractAddress,
        bool isAllowed
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setContractAllowedToLock(contractAddress, isAllowed);
    }

    function setVesselAddress(
        address contractAddress
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        vesselContract = contractAddress;
    }

    function setRegistryAddress(
        address contractAddress
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        registry = IRegistry(contractAddress);
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
        //   super._beforeTokenTransfer(
        //     from,
        //     to,
        //     tokenId,
        //     batchSize
        //   );
        // } else {
        //   revert IRegistry.NotAllowed();
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
