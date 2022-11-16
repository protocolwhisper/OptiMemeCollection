// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface RandomContract {
    function displayrandomNumbers(uint256 _requestId, uint256 index)
        external
        returns (uint256);

    function lastRequestId() external view returns (uint);
}

contract optimisticMemes is ERC1155, Ownable {
    using SafeMath for uint256;
    address private randomness = 0x2A96d70F4105FDeC6322B47dcD8Fa7bD72Daf48B;
    uint256 public maxTime = 1673682915;
    uint256 public NftMinted = 0;
    mapping(address => uint256) stampToMint;
    string public baseUri;

    // uint256 public lastRequestId;
    // uint256 public randomNumber;
    constructor() ERC1155("OptiMeme") {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
        baseUri = newuri;
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        require(
            block.timestamp >= stampToMint[msg.sender],
            "You are not allowed to mint yet"
        );
        _mint(account, id, amount, data);
        NftMinted += 1;
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        require(
            block.timestamp >= stampToMint[msg.sender],
            "You are not allowed to mint yet"
        );
        _mintBatch(to, ids, amounts, data);
    }

    function drawForMint() public returns (uint256) {
        stampToMint[msg.sender] = 1; //Here need to lay the future timestamp
        return stampToMint[msg.sender];
    }

    function _requestRandomNumber(uint256 index) public returns (uint256) {
        uint256 requestId = RandomContract(randomness).lastRequestId();
        return
            RandomContract(randomness).displayrandomNumbers(requestId, index);
    }

    function _randomToStamp(uint256 max, uint256 randomNumber)
        public
        pure
        returns (uint256)
    {
        // We will set a top limit of time to be minted so lets say 3 month
        //uint256 stamp = maxTime.sub(randomNumber);
        return randomNumber.div(max);
    }

    /**
     * @dev Returns an URI for a given token ID
     */
    function uri(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return string.concat(baseUri, Strings.toString(_tokenId));
    }

    //Deploy
}
