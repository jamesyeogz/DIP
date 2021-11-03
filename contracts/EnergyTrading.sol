//SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract Factory {
    EnergySale[] public deployedEnergySalesAddresses;

    function createEnergySale(uint256 minimum, uint256 energySold) public {
        EnergySale energySale = new EnergySale(minimum, energySold, msg.sender);
        deployedEnergySalesAddresses.push(energySale);
    }

    function getDeployedEnergySalesAddresses()
        public
        view
        returns (EnergySale[] memory)
    {
        return deployedEnergySalesAddresses;
    }
}

contract EnergySale {
    address payable public seller;
    address public buyer;
    uint256 public energySold;
    uint256 public highestBid;
    address payable public highestBidderAddress;
    uint256 public minimumContribution;
    uint256 public start;
    bool public complete;

    modifier restricted() {
        require(msg.sender == seller);
        _;
    }

    constructor(
        uint256 _minimum,
        uint256 _energySold,
        address payable creator
    ) public {
        seller = creator;
        minimumContribution = _minimum;
        energySold = _energySold;
        start = block.timestamp;
    }

    function bid() public payable {
        require(msg.value >= minimumContribution && msg.value > highestBid);

        highestBidderAddress.transfer(highestBid);
        highestBid = msg.value;
        highestBidderAddress = msg.sender;
    }

    function sell() public payable restricted {
        require(block.timestamp >= start);

        seller.transfer(highestBid);
        buyer = highestBidderAddress;
        complete = true;
    }
}
