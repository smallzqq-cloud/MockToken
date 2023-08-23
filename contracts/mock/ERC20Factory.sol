// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./MockERC20.sol";


contract ERC20Factory {

  address public tokenImplementation;

  constructor() {
    tokenImplementation = address(new MockERC20());
  }

  function deploy(address[] calldata owners, string memory name, string memory symbol, uint8 decimals) public {
    bytes32 salt = keccak256(abi.encode(symbol));
    address token = Clones.cloneDeterministic(tokenImplementation, salt);
    MockERC20(token).initialize(owners, name, symbol, decimals);
  }

  function batchDeploy(address[] calldata owners, string[] calldata names, string[] calldata symbols, uint8[] calldata decimals) external {
    require(names.length == symbols.length && names.length == decimals.length, "INCONSISTENT_PARAMS_LENGTH");
    for(uint i = 0; i < names.length; i++) {
      deploy(owners, names[i], symbols[i], decimals[i]);
    }
  }

  function computeAddress(string memory symbol) external view returns(address) {
    bytes32 salt = keccak256(abi.encode(symbol));
    return Clones.predictDeterministicAddress(tokenImplementation, salt);
  }

}