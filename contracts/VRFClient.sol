pragma solidity ^0.8.17;



contract VRFClient is VRFClientBase {
    address owner;
    uint256 public diceRoll;
    uint256 constant NUM_SIDES = 6;
    event DiceRolled(bytes32 _randomness, uint256 _diceRoll);

    // For referencing VRFServiceOIC and PRTLToken contracts
    address VRFServiceOICAddress;
    PRTLToken PRTL;

    constructor(address _VRFServiceOICAddress, address _PRTLTokenAddress)
        VRFClientBase()
    {
        owner = msg.sender;
        VRFServiceOICAddress = _VRFServiceOICAddress;
        PRTL = PRTLToken(_PRTLTokenAddress);
    }

    // This function makes a VRF request to the VRFServiceOIC contract.
    // The contract's PRTL is locked in the VRFServiceOIC until the VRF
    // request is fulfilled, at which point any excess PRTL is refunded.
    // @ _workerId: the id of the worker enclave that will fulfill the request
    // @ _fullVerify: if true will run verification on-chain (~2M gas), else
    // accepts the result as is since verification was run by the node off-chain.
    function requestVRF(uint32 _workerId, bool _fullVerify) external onlyOwner {
        // The amount of PRTL to lock as part of this VRF request
        uint256 _prtlAmount = 5000000000000000000; // 5 PRTL
        require(
            PRTL.balanceOf(address(this)) >= _prtlAmount,
            "Contract has insufficient PRTL!"
        );

        // max amount of gas allocated to callback function - remaining gas is refunded as PRTL
        uint32 _maxCallbackGas = 200000;

        // address of the contract with the 'rawFulfillVRF(bytes32)' callback function
        address _callbackAddr = address(this);

        // Encode the parameters as bytes which are forwarded with the PRTL
        bytes memory payload = abi.encode(
            _workerId,
            _maxCallbackGas,
            _callbackAddr,
            _fullVerify
        );

        // Send PRTL to the OIC contract to be locked and initiate the VRF request
        PRTL.send(VRFServiceOICAddress, _prtlAmount, payload);
    }

    // The function the VRFServiceOIC will call to fulfill the request
    function rawFulfillVRF(bytes32 _randomness) external {
        require(msg.sender == VRFServiceOICAddress, "Only Enclave can fulfill");
        // call the user defined callback()
        fulfillVRF(_randomness);
    }

    // This is the user's callback function. Only the specified VRFServiceOIC contract
    // can call this function. Any logic to consume the _randomness is implemented here:
    function fulfillVRF(bytes32 _randomness) internal {
        // random dice roll between [1,NUM_SIDES]
        diceRoll = (uint256(_randomness) % NUM_SIDES) + 1;

        // Perform some action using result
        // - mint nft
        // - run lottery
        // - game action
        // ...

        // Emit an event to notify a frontend
        emit DiceRolled(_randomness, diceRoll);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
