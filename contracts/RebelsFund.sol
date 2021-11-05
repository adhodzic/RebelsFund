// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract RebelsFund {
  string[] accounts;

  function addAcc(string memory name) public {
      accounts.push(name);
  }

  function getAcc() public view returns (string[] memory) {
    return accounts;
  }
}