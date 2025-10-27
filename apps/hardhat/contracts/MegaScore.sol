// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title MegaScore
 * @dev The MegaScore is a soul bound token that is used to track the score of a MegaEth network.
 */
contract MegaScore is ERC721, Ownable, EIP712 {
    // --- Errors ---
    error MegaScore__SoulBoundToken();
    error MegaScore__AlreadyMinted(address owner, address lensAccountAddress);
    error MegaScore__NoSBTMintedYet(address owner, address lensAccountAddress);
    error MegaScore__LessOrSameScore(uint256 actualScore, uint256 newScore);
    error MegaScore__MustBeSignedByOwner();
    error MegaScore__InsufficientPaymentAmount();
    error MegaScore__ErrorOnPayment();
    error MegaScore__InvalidScore(uint256 score);
    error MegaScore__EmptyImageUri();

    // --- Events ---
    event MegaScoreUpdated(address indexed owner, uint256 score, uint256 timestamp);
    event MegaScoreMinted(address indexed by, uint256 tokenId);

    // --- Structs ---
    struct Score {
        uint256 score;
        uint256 timestamp;
    }

    // --- Constants ---
    string public constant NAME = "MegaScore SBT";
    string public constant SYMBOL = "MGS";
    string public constant DOMAIN = "MegaScore";
    string public constant VERSION = "0.0.1";
    bytes32 private constant MESSAGE_TYPEHASH = keccak256("Score(uint256 score,uint256 timestamp,address wallet)");

    // --- State Variables ---
    uint256 immutable i_mintPrice;
    uint256 immutable i_updatePrice;

    uint256 public s_tokenId = 0;
    mapping(address => uint256) private s_ownerToTokenId;
    mapping(uint256 => Score) private s_tokenIdToScore;
    mapping(uint256 => string) private s_tokenIdToImageUri;

    // --- Constructor ---
    /**
     * @dev Initializes the contract with mint and update prices.
     */
    constructor(uint256 mintPrice, uint256 updatePrice)
        ERC721(NAME, SYMBOL)
        Ownable(msg.sender)
        EIP712(DOMAIN, VERSION)
    {
        i_mintPrice = mintPrice;
        i_updatePrice = updatePrice;
    }

    // --- Modifiers ---
    /**
     * @dev Ensures the caller has already minted an SBT.
     */
    modifier onlyIfMinted() {
        if (s_ownerToTokenId[msg.sender] == 0) {
            revert MegaScore__NoSBTMintedYet(msg.sender, address(0));
        }
        _;
    }

    /**
     * @dev Ensures the caller has not minted an SBT yet.
     */
    modifier onlyIfNotMinted() {
        if (s_ownerToTokenId[msg.sender] != 0) {
            revert MegaScore__AlreadyMinted(msg.sender, address(0));
        }
        _;
    }

    /**
     * @dev Ensures the provided signature is valid.
     */
    modifier validSignature(bytes32 digest, uint8 v, bytes32 r, bytes32 s) {
        if (!_isValidSignature(digest, v, r, s)) {
            revert MegaScore__MustBeSignedByOwner();
        }
        _;
    }

    // --- Public Functions ---
    /**
     * @dev Mints a new SBT for the caller with the provided score and image URI.
     * @param score The score to associate with the SBT.
     * @param imageUri The URI of the image to associate with the SBT.
     * @param v The recovery id of the signature.
     * @param r The r value of the signature.
     * @param s The s value of the signature.
     */
    function mint(Score calldata score, string calldata imageUri, uint8 v, bytes32 r, bytes32 s)
        public
        payable
        onlyIfNotMinted
        validSignature(getMessageHash(score, msg.sender, false), v, r, s)
    {
        _validateScoreForMint(score.score);
        _validateImageUri(imageUri);

        _payOrFail(msg.value, i_mintPrice);

        // Autoincrement NFT tokenId.
        s_tokenId++;

        // Mint SBT NFT.
        _safeMint(msg.sender, s_tokenId);
        s_ownerToTokenId[msg.sender] = s_tokenId;

        // Set initial score and image URI.
        _updateNFTData(s_tokenId, score.score, imageUri);

        emit MegaScoreMinted(msg.sender, s_tokenId);
    }

    /**
     * @dev Updates the score of the caller's SBT.
     * @param score The new score to associate with the SBT.
     * @param v The recovery id of the signature.
     * @param r The r value of the signature.
     * @param s The s value of the signature.
     */
    function updateScore(Score calldata score, uint8 v, bytes32 r, bytes32 s)
        public
        payable
        validSignature(getMessageHash(score, msg.sender, false), v, r, s)
        onlyIfMinted
    {
        uint256 tokenId = s_ownerToTokenId[msg.sender];

        Score memory currentScore = s_tokenIdToScore[tokenId];

        // Validate the new score
        _validateScoreForUpdate(score.score, currentScore.score);

        // Ensure the payment is sufficient
        _payOrFail(msg.value, i_updatePrice);

        // Update the score
        _setScore(score.score, tokenId);
    }

    /**
     * @dev Generates the hash of the message to be signed.
     */
    function getMessageHash(Score memory score, address wallet, bool hasReducedPrice) public view returns (bytes32) {
        return _hashTypedDataV4(keccak256(abi.encode(MESSAGE_TYPEHASH, score.score, score.timestamp, wallet)));
    }

    /**
     * @dev Returns the score associated with the given address.
     */
    function getScoreByAddress(address account) public view returns (Score memory) {
        uint256 tokenId = s_ownerToTokenId[account];
        return s_tokenIdToScore[tokenId];
    }

    /**
     * @dev Returns the token ID associated with the given address.
     */
    function getTokenIdByAddress(address owner) public view returns (uint256) {
        return s_ownerToTokenId[owner];
    }

    /**
     * @dev Returns the token URI for the given token ID.
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        Score memory userScore = s_tokenIdToScore[tokenId];
        string memory userImageUri = s_tokenIdToImageUri[tokenId];

        return string(
            abi.encodePacked(
                _baseURI(),
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name": "',
                            name(),
                            '", "description": "A Soul Bound Token (SBT) that tracks a user score on the MegaETH network.", ',
                            '"attributes": [',
                            '{"trait_type": "score", "value": ',
                            Strings.toString(userScore.score),
                            "},",
                            '{"trait_type": "tokenId", "value": ',
                            Strings.toString(tokenId),
                            "},",
                            '{"trait_type": "lastUpdateOn", "value": ',
                            Strings.toString(userScore.timestamp),
                            "}",
                            '], "image":"',
                            userImageUri,
                            '"}'
                        )
                    )
                )
            )
        );
    }

    // --- Internal Functions ---
    /**
     * @dev Validates the provided signature.
     */
    function _isValidSignature(bytes32 digest, uint8 v, bytes32 r, bytes32 s) internal view returns (bool) {
        (address actualSigner,,) = ECDSA.tryRecover(digest, v, r, s);
        return (actualSigner == owner());
    }

    /**
     * @dev Updates the score and image URI of the given token ID.
     */
    function _updateNFTData(uint256 tokenId, uint256 score, string calldata imageUri) private {
        _setScore(score, tokenId);
        _setImageUri(imageUri, tokenId);
    }

    /**
     * @dev Transfers the payment to the owner or reverts if insufficient.
     */
    function _payOrFail(uint256 amount, uint256 requiredPaymentAmount) private {
        if (amount < requiredPaymentAmount) {
            revert MegaScore__InsufficientPaymentAmount();
        }
        (bool success,) = (owner()).call{value: amount}("");
        if (!success) {
            revert MegaScore__ErrorOnPayment();
        }
    }

    /**
     * @dev Sets the score for the given token ID.
     */
    function _setScore(uint256 score, uint256 tokenId) private {
        Score memory newScore = Score(score, block.timestamp);
        s_tokenIdToScore[tokenId] = newScore;
        emit MegaScoreUpdated(msg.sender, score, block.timestamp);
    }

    /**
     * @dev Sets the image URI for the given token ID.
     */
    function _setImageUri(string calldata _imageUri, uint256 tokenId) private {
        s_tokenIdToImageUri[tokenId] = _imageUri;
    }

    /**
     * @dev Returns the base URI for the token metadata.
     */
    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    // --- Private Functions ---
    /**
     * @dev Validates the provided image URI.
     */
    function _validateImageUri(string calldata imageUri) private pure {
        if (bytes(imageUri).length == 0) {
            revert MegaScore__EmptyImageUri();
        }
    }

    /**
     * @dev Validates the score for minting.
     */
    function _validateScoreForMint(uint256 score) private pure {
        if (score <= 0) {
            revert MegaScore__InvalidScore(score);
        }
    }

    /**
     * @dev Validates the score for updating.
     */
    function _validateScoreForUpdate(uint256 newScore, uint256 currentScore) private pure {
        if (newScore <= currentScore) {
            revert MegaScore__LessOrSameScore(currentScore, newScore);
        }
    }

    // --- Overrides ---
    /**
     * @dev Prevents transferring the SBT.
     */
    function transferFrom(address from, address to, uint256 tokenId) public override {
        revert MegaScore__SoulBoundToken();
    }

    /**
     * @dev Prevents safe transferring the SBT.
     */
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public override {
        revert MegaScore__SoulBoundToken();
    }
}
