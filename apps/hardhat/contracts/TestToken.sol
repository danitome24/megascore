// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TestToken
 * @dev Simple ERC20 token for testing and deployment purposes
 */
contract TestToken is ERC20, Ownable {
    /**
     * @dev Initializes the contract with a name, symbol, and mints initial supply to owner
     * @param name The name of the token
     * @param symbol The symbol of the token
     * @param initialSupply The initial supply of tokens to mint
     */
    constructor(string memory name, string memory symbol, uint256 initialSupply)
        ERC20(name, symbol)
        Ownable(msg.sender)
    {
        _mint(msg.sender, initialSupply);
    }

    /**
     * @dev Allows anyone to mint new tokens (for testing purposes)
     * @param to The address to mint tokens to
     * @param amount The amount of tokens to mint
     */
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    /**
     * @dev Allows anyone to burn tokens
     * @param from The address to burn tokens from
     * @param amount The amount of tokens to burn
     */
    function burn(address from, uint256 amount) external {
        _burn(from, amount);
    }
}
