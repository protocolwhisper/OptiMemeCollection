// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract optiMeme is
    ERC1155,
    Ownable,
    Pausable,
    ERC1155Burnable,
    ERC1155Supply
{
    constructor() ERC1155("optiMeme") {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        // Put a require so the mint can work
        //Require the price of the mint
        _mint(account, id, amount, data);
        //
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function _nftToMint() public view returns (uint) {
        //TODO: Implement the time of the mint
        uint timeStamp = block.timestamp;
        uint randomTokenId = block.difficulty;
        uint mixedRandom = uint256(timeStamp + randomTokenId) % 3500;
        return mixedRandom;
    }

    function _timeToMint() public view returns (uint256) {
        return block.difficulty; //Whay if we do use signatures and this random number to
        // Get a more random number
    }

    function _time() public view returns (uint256) {
        return block.timestamp; //Whay if we do use signatures and this random number to
        // Get a more random number
        //
    }
}
