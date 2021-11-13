// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract RebelsFund {
  event SignatureAdded(string message, bytes32 name);
  struct Charity{
    address adr;
    bytes32 name;
    uint monthAmount;
    uint recievedAmount;
    bool exist;
  }
  struct User{
    bytes32 name;
    bool exist;
  }
  mapping (address => User) public user;
  mapping (address => Charity) public charity;
  
  mapping (uint => address) private charityAddresses;
  uint charityAddressesCount;
 

  function transferEther(address payable receiver)payable external {
    if(charity[receiver].exist){
      receiver.transfer(msg.value);
      charity[receiver].recievedAmount += msg.value/(1 ether);
    }
  }
  function signCharity(bytes32 name, uint monthAmount) public {
    if(!charity[msg.sender].exist){
      charity[msg.sender] = Charity(msg.sender,name, monthAmount, 0, true);
      charityAddresses[charityAddressesCount] = msg.sender;
      charityAddressesCount++;
      emit SignatureAdded("New charity added!", name);
    }else{
      emit SignatureAdded("You are already charity", name);
    }
  }

  function signUser(bytes32 name) public {
    if(!user[msg.sender].exist){
      user[msg.sender] = User(name,true);
      emit SignatureAdded("New donor added!", name);
    }else{
      emit SignatureAdded("You are already donor", name);
    }
  }

  function getRole() public view returns(uint16){
    if(charity[msg.sender].exist){
      return 1;
    }else if(user[msg.sender].exist){
      return 2;
    }else{
      return 0;
    }
  }

  function getAllCharity() public view returns (Charity[] memory){
    Charity[] memory charities = new Charity[](charityAddressesCount);
    for (uint i = 0; i < charityAddressesCount; i++) {
        Charity storage charitie = charity[charityAddresses[i]];
        charities[i] = charitie;
    }
    return charities;
  }
}