pragma solidity ^0.8.17;

import "./IERC1820Registry.sol";

contract VRFClientBase {
    // Reference to the ERC1820 Registry contract available on all chains
    IERC1820Registry internal constant _ERC1820_REGISTRY =
        IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);

    constructor() {
        // Tell erc1820 registry that this contract can send PRTL
        _ERC1820_REGISTRY.setInterfaceImplementer(
            address(this), // account
            keccak256("ERC777TokensSender"), // interfaceHash
            address(this) // implementer
        );
        // Tell erc1820 registry that this contract can receive PRTL
        _ERC1820_REGISTRY.setInterfaceImplementer(
            address(this), // account
            keccak256("ERC777TokensRecipient"), // interfaceHash
            address(this) // implementer
        );
    }

    // The required interface so this contract can send PRTL
    function tokensToSend(
        address operator,
        address from,
        address to,
        uint256 amount,
        bytes calldata userData,
        bytes calldata operatorData
    ) external {
        // insert logic here to run before contract sends PRTL
    }

    // The required interface so this contract can receive PRTL
    function tokensReceived(
        address operator,
        address from,
        address to,
        uint256 amount,
        bytes calldata userData,
        bytes calldata operatorData
    ) external {
        // when tokens arrive at this contract…
    }
}
