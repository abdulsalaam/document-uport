pragma solidity ^0.4.18;
//0x1a2e0b5725a67b1cc3d1d33d5e80b3f91941fbf9  contract address on rinkeby
//deployed using remix 

contract Contract {
 string ipfsHash;
 
 function sendHash(string x) public {
   ipfsHash = x;
 }

 function getHash() public view returns (string x) {
   return ipfsHash;
 }
}