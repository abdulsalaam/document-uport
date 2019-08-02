pragma solidity ^0.4.18;
//0x0a91de6d1b6810786f0e93f22e63267855f43a01  contract address on ropsten
//deployed using remix 

contract OpenSign{
    struct Document {
        uint timestamp;
        bytes ipfs_hash;
        address[] signatures;
    }
    
    mapping(address => bytes[]) public users; 
    mapping(bytes32 => Document) public documents; 

    function addDocument(bytes id, bytes ipfs) public {
        users[msg.sender].push(ipfs); 
        address[] memory sender = new address[](1);
        sender[0] = msg.sender;
        documents[keccak256(id)] = Document(block.timestamp, ipfs, sender);
    }

    function signDocument(bytes id) public {
        users[msg.sender].push(id);
        documents[keccak256(id)].signatures.push(msg.sender);
    }
    
    function getSignatures(bytes id) public view returns (address[]) {
        return documents[keccak256(id)].signatures;
    }
}
