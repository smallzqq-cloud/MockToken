// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";

contract Renga is
  ERC721PausableUpgradeable,
  OwnableUpgradeable,
  UUPSUpgradeable,
  AccessControlEnumerableUpgradeable,
  ReentrancyGuardUpgradeable
{
  using StringsUpgradeable for uint256;

  string internal baseURI;
  address internal boxContractAddress;

//   /// @custom:oz-upgrades-unsafe-allow constructor
//   constructor() initializer {}

  function initialize() external initializer {
    __Ownable_init();
    __UUPSUpgradeable_init();
    __ERC721Pausable_init();
    __AccessControlEnumerable_init();
    __ERC721_init("RENGA", "RENGA");

    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
  }

  function mint(address addr, uint256 tokenId) public {
    _mint(addr, tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
  public
  view
  virtual
  override(AccessControlEnumerableUpgradeable, ERC721Upgradeable)
  returns (bool)
  {
    return interfaceId == type(IERC721Upgradeable).interfaceId
    || super.supportsInterface(interfaceId);
  }

  function version()
  external
  pure
  virtual
  returns (string memory)
  {
    return "1.0.0";
  }

  function setBaseURI(string memory uri)
  external
  onlyRole(DEFAULT_ADMIN_ROLE)
  {
    baseURI = uri;
  }

  function tokenURI(uint256 tokenId)
  public
  view
  virtual
  override
  returns (string memory)
  {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

    return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
  }

  function getBoxContractAddress()
  external
  view
  returns (address)
  {
    return boxContractAddress;
  }

  function setBoxContractAddress(
    address contractAddress
  )
  external
  onlyRole(DEFAULT_ADMIN_ROLE)
  {
    boxContractAddress = contractAddress;
  }

  function openBox(address to, uint256 boxId)
  external
  virtual
  nonReentrant
  returns (uint256) 
  {
    require(_msgSender() == boxContractAddress, "Only box contract allowed to call");
    _safeMint(to, boxId);
    return boxId;
  }

  function _authorizeUpgrade(address newImplementation)
  internal
  virtual
  override
  onlyRole(DEFAULT_ADMIN_ROLE)
  {}
}