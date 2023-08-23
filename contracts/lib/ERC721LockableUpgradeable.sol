// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {IERC721LockableUpgradeable} from "./IERC721LockableUpgradeable.sol";

error TokenIsLocked();
error NotAllowedToLockToken();
error ExceedsMaxableLockTime();

/**
 * @title ERC721Lockable enables the temporary transfer lock on a token.
 */
abstract contract ERC721LockableUpgradeable is
  ERC721Upgradeable,
  IERC721LockableUpgradeable
{
  uint256 public constant MAX_LOCK_EPOCH = 31536000; // 1 year in seconds
  mapping(uint256 => uint256) private lockedTokens;
  mapping(address => bool) public contractsAllowedToLock;
  uint256[49] private __gap;

  modifier onlyTokenLocker() {
    if (contractsAllowedToLock[msg.sender] == false) {
      revert NotAllowedToLockToken();
    }
    _;
  }

  /**
  * @notice temporary lock the transferring of a token by a smart contract
  * @param tokenId id of the locked token
  * @param unlockTimestamp timestamp where token unlocks
  */
  function lockTokenByContract(
    uint256 tokenId,
    uint256 unlockTimestamp
  )
  external
  onlyTokenLocker
  {
    _lockToken(tokenId, unlockTimestamp);
  }

  /**
  * @notice unlocks token by authorized smart contract
  * @param tokenId id of the locked token
  */
  function unlockTokenByContract(
    uint256 tokenId
  )
  external
  onlyTokenLocker
  {
    delete lockedTokens[tokenId];
  }

  /**
  * @notice temporary lock the transferring of a token by owner Token lock time can
  * only be extended.
  * @param tokenId id of the locked token
  * @param unlockEpochOffset offset of number of epochs to unlock token from current
  */
  function lockTokenByOwner(
    uint256 tokenId,
    uint256 unlockEpochOffset
  )
  external
  {
    if (ownerOf(tokenId) != msg.sender) {
      revert NotAllowedToLockToken();
    }

    if (unlockEpochOffset > MAX_LOCK_EPOCH) {
      revert ExceedsMaxableLockTime();
    }

    uint256 currentUnlockEpoch = lockedTokens[tokenId];
    _lockToken(tokenId, currentUnlockEpoch + unlockEpochOffset);
  }

  /**
    * @notice temporary lock the transferring of a token by owner
    * @param tokenId id of the locked token
    * @param unlockTimestamp number of epochs to unlock token
    */
  function _lockToken(
    uint256 tokenId,
    uint256 unlockTimestamp
  )
  private
  {
    lockedTokens[tokenId] = unlockTimestamp;
    emit TokenLocked(tokenId, unlockTimestamp);
  }

  /**
    * @notice check if a token is currently locked
    * @param tokenId id of the locked token
    * @return boolean if token is locked
    */
  function isLocked(uint256 tokenId)
  external
  view
  returns (bool)
  {
    return _isLocked(tokenId);
  }

  /**
    * @notice check if a token is currently locked
    * @param tokenId id of the locked token
    * @return boolean if token is locked
    */
  function _isLocked(uint256 tokenId)
  internal
  view
  returns (bool)
  {
    return lockedTokens[tokenId] > block.timestamp;
  }

  /**
    * @notice check when token lock expires
    * @param tokenId id of the locked token
    * @return blockNumber the block number the token expires
    */
  function lockExpiration(uint256 tokenId)
  external
  view
  returns (uint256)
  {
    return lockedTokens[tokenId];
  }

  /**
    * @notice sets status of contract allowed to lock
    * @param _tokenLockContract address of contract
    * @param _isAllowed if contract is allowed to lock
    */
    
  function _setContractAllowedToLock(
    address _tokenLockContract,
    bool _isAllowed
  )
  internal
  {
    contractsAllowedToLock[_tokenLockContract] = _isAllowed;
  }

  /**
    * @notice override of _beforeTokenTransfer
    */
  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId,
    uint256 batchSize
  )
  internal
  virtual
  override
  {
    // if (_isLocked(tokenId)) {
    //   revert TokenIsLocked();
    // }

    super._beforeTokenTransfer(from, to, tokenId, batchSize);
  }

   function supportsInterface(bytes4 interfaceId)
   public
   view
   virtual
   override(ERC721Upgradeable)
   returns (bool)
   {
    return super.supportsInterface(interfaceId);
  }
}