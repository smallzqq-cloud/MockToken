// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IERC721LockableUpgradeable {
  /// @notice Emitted when a subscription expiration changes
  event TokenLocked(uint256 indexed tokenId, uint256 unlockBlock);

  /**
    * @notice temporary lock the transferring of a token by a smart contract
    * @param tokenId id of the locked token
    * @param unlockBlock number of block to unlock token
    */
  function lockTokenByContract(uint256 tokenId, uint256 unlockBlock) external;

  /**
    * @notice unlock the transferring of a token by a smart contract
    * @param tokenId id of the locked token
    */
  function unlockTokenByContract(uint256 tokenId) external;

  /**
    * @notice temporary lock the transferring of a token by owner
    * @param tokenId id of the locked token
    * @param unlockBlock number of block to unlock token
    */
  function lockTokenByOwner(uint256 tokenId, uint256 unlockBlock) external;

  /**
    * @notice check if a token is currently locked
    * @param tokenId id of the locked token
    * @return boolean if token is locked
    */
  function isLocked(uint256 tokenId) external view returns (bool);

  /**
    * @notice check when token lock expires
    * @param tokenId id of the locked token
    * @return blockNumber the block number the token expires
    */
  function lockExpiration(uint256 tokenId) external view returns (uint256);
}