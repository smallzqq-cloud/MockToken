// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";

contract MockERC721 is Initializable, ContextUpgradeable, AccessControlEnumerableUpgradeable, ERC721EnumerableUpgradeable, ERC721BurnableUpgradeable {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    string private _baseTokenURI;

    function initialize(address[] calldata owners, string memory name_, string memory symbol_) external initializer {
        __ERC721_init_unchained(name_, symbol_);

        for(uint i = 0; i < owners.length; i++) {
            _setupRole(DEFAULT_ADMIN_ROLE, owners[i]);

            _setupRole(MINTER_ROLE, owners[i]);
        }
    }

    function setBaseTokenURI(string memory baseTokenURI) external virtual {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "MockERC721: caller isn't ADMIN");
        _baseTokenURI = baseTokenURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function mint(address to, uint256 tokenId) public virtual {
        // require(hasRole(MINTER_ROLE, _msgSender()), "MockERC721: must have minter role to mint");
        _mint(to, tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override(ERC721Upgradeable, ERC721EnumerableUpgradeable) {
        super._beforeTokenTransfer(from, to, tokenId,batchSize);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControlEnumerableUpgradeable, ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}