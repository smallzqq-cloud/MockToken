// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IOtherside {
  function ownerOf(uint256 tokenId) external returns (address);
  function exists(uint256 tokenId) external returns (bool);
  function claim(uint256 otherdeedId, address claimAddress) external;
}