// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./MockERC721.sol";


contract ERC721Factory {

  address public tokenImplementation;

  constructor() {
    tokenImplementation = address(new MockERC721());
  }

  function deploy(address[] calldata owners, string memory name, string memory symbol) public {
    bytes32 salt = keccak256(abi.encode(symbol));
    address token = Clones.cloneDeterministic(tokenImplementation, salt);
    MockERC721(token).initialize(owners, name, symbol);
  }

  function batchDeploy(address[] calldata owners, string[] calldata names, string[] calldata symbols) external {
    require(names.length == symbols.length, "INCONSISTENT_PARAMS_LENGTH");
    for(uint i = 0; i < names.length; i++) {
      deploy(owners, names[i], symbols[i]);
    }
  }

  function computeAddress(string memory symbol) external view returns(address) {
    bytes32 salt = keccak256(abi.encode(symbol));
    return Clones.predictDeterministicAddress(tokenImplementation, salt);
  }

}