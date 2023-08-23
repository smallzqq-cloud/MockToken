// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";

contract MockERC1155 is Initializable, ContextUpgradeable, AccessControlEnumerableUpgradeable, ERC1155URIStorageUpgradeable, ERC1155BurnableUpgradeable {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    string public name;
    string public symbol;

    function initialize(address[] calldata owners, string memory name_, string memory symbol_, string memory uri_) external initializer {
        name = name_;
        symbol = symbol_;
        __ERC1155_init_unchained(uri_);
        __ERC1155URIStorage_init_unchained();

        for(uint i = 0; i < owners.length; i++) {
            _setupRole(DEFAULT_ADMIN_ROLE, owners[i]);

            _setupRole(MINTER_ROLE, owners[i]);
        }
    }

    function setURI(uint256 tokenId, string memory tokenURI) external virtual {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "MockERC721: caller isn't ADMIN");
        _setURI(tokenId, tokenURI);
    }

    function setBaseURI(string memory baseURI) external virtual {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "MockERC721: caller isn't ADMIN");
        _setBaseURI(baseURI);
    }

    /**
     * @dev Creates `amount` new tokens for `to`, of token type `id`.
     *
     * See {ERC1155-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     */
    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual {
        // require(hasRole(MINTER_ROLE, _msgSender()), "MockERC1155: must have minter role to mint");

        _mint(to, id, amount, data);
    }

    /**
     * @dev xref:ROOT:erc1155.adoc#batch-operations[Batched] variant of {mint}.
     */
    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual {
        require(hasRole(MINTER_ROLE, _msgSender()), "MockERC1155: must have minter role to mint");

        _mintBatch(to, ids, amounts, data);
    }

    function uri(uint256 tokenId) public view virtual override(ERC1155Upgradeable, ERC1155URIStorageUpgradeable) returns (string memory) {
        return super.uri(tokenId);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControlEnumerableUpgradeable, ERC1155Upgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155Upgradeable) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

}