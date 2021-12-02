// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract RebelsFund {
  event SignatureAdded(string message, bytes32 name);
  struct Charity{
    bytes32 name;
    address adr;
    uint256 monthAmount;
    uint256 recievedAmount;
    string image;
    string location;
    string email;
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
      charity[receiver].recievedAmount += msg.value;
    }
  }
  function signCharity(bytes32 name, uint monthAmount, string memory image, string memory location, string memory email) public {
    if(!charity[msg.sender].exist){
      charity[msg.sender] = Charity(name,msg.sender, monthAmount, 0, image, location, email, true);
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

  function getUser() public view returns(User memory newUser){
    if(user[msg.sender].exist){
      return user[msg.sender];
    }
  }

  function getCharity() public view returns(Charity memory newCharity){
    if(charity[msg.sender].exist){
      return charity[msg.sender];
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

  function updateCharity(bytes32 name, uint256 monthAmount, string memory image, string memory location, string memory email) public {
    if(name != 0){
      charity[msg.sender].name = name;
    }
    if(monthAmount >= 0){
      charity[msg.sender].monthAmount = monthAmount;
    }
    if(keccak256(abi.encodePacked((image))) != ""){
      charity[msg.sender].image = image;
    }
    if(keccak256(abi.encodePacked((location))) != ""){
      charity[msg.sender].location = location;
    }
    if(keccak256(abi.encodePacked((email))) != ""){
      charity[msg.sender].email = email;
    }
  }
}