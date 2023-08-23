// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IKoda {
  function claimKodas(
    address claimAddress,
    uint256[] calldata kodaIds,
    uint256[] calldata otherdeedIds,
    bytes32[][] calldata merkleProofs
  ) external;
}