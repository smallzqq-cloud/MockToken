// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransferAdmin {
    function admin() external view returns(address) {}
    function _setPendingAdmin(address payable newPendingAdmin) external returns (uint) {}
}