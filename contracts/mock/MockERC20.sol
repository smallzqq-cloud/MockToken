// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract MockERC20 is Initializable, ContextUpgradeable, AccessControlEnumerableUpgradeable, ERC20Upgradeable {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    uint8 private _decimals;

    function initialize(address[] calldata owners, string memory name_, string memory symbol_, uint8 decimals_) external initializer {
        for(uint i = 0; i < owners.length; i++) {
            _setupRole(DEFAULT_ADMIN_ROLE, owners[i]);

            _setupRole(MINTER_ROLE, owners[i]);
        }

        __ERC20_init(name_, symbol_);

        _decimals = decimals_;
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function mint(address to, uint256 amount) public virtual {
        // require(hasRole(MINTER_ROLE, _msgSender()), "MockERC20: must have minter role to mint");
        _mint(to, amount);
    }

}