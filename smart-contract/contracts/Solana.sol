pragma solidity ^0.8.0;

import "@openzepplin/contracts/token/ERC20/ERC20.sol";
import "@openzepplin/contracts/access/Ownable.sol";

contract Btc is ERC20, Ownable {
    constructor() ERC20("Solana", "SOL"){

    }

    function mint(address to, uint256 amount) public payable {
        _mint(to,amount);
    }

    recieve() external payable{
        
    }
}