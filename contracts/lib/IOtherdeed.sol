// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IOtherdeed {
  function ownerOf(uint256 tokenId) external returns (address);
  function transferFrom(address from, address to, uint256 tokenId) external;
}