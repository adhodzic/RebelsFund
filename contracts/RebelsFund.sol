// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract RebelsFund {
  event SignatureAdded(string message, string name);
  struct Charity{
    string name;
    address adr;
    uint256 monthAmount;
    uint256 recievedAmount;
    string image;
    string location;
    string email;
    string ytLink;
    bool exist;
    string category;
  }
  struct User{
    string name;
    string location;
    string email;
    string image;
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
  function signCharity(string memory name, uint monthAmount, string memory image, string memory location, string memory email , string memory ytLink, string memory category) public {
    if(!charity[msg.sender].exist){
      charity[msg.sender] = Charity(name,msg.sender, monthAmount, 0, image, location, email, ytLink, true, category);
      charityAddresses[charityAddressesCount] = msg.sender;
      charityAddressesCount++;
      emit SignatureAdded("New charity added!", name);
    }else{
      emit SignatureAdded("You are already charity", name);
    }
  }

  function signUser(string memory name, string memory location, string memory email, string memory image) public {
    if(!user[msg.sender].exist){
      user[msg.sender] = User(name,location,email, image,true);
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

  function getOneCharity(address adr) public view returns(Charity memory newCharity){
    if(charity[adr].exist){
      return charity[adr];
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

  function updateCharity(string memory name, uint256 monthAmount, string memory image, string memory location, string memory email, string memory ytLink , string memory category) public {
    if(keccak256(abi.encodePacked((name))) != ""){
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
    if(keccak256(abi.encodePacked((ytLink))) != ""){
      charity[msg.sender].ytLink = ytLink;
    }
     if(keccak256(abi.encodePacked((category))) != ""){
      charity[msg.sender].category = category;
    }
  }

  function updateDonor(string memory name, string memory location, string memory email, string memory image) public {
    if(keccak256(abi.encodePacked((name))) != ""){
      user[msg.sender].name = name;
    }
    if(keccak256(abi.encodePacked((location))) != ""){
      user[msg.sender].location = location;
    }
    if(keccak256(abi.encodePacked((email))) != ""){
      user[msg.sender].email = email;
    }
    if(keccak256(abi.encodePacked((image))) != ""){
      user[msg.sender].image = image;
    }
  }
}