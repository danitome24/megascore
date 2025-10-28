// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {MegaScore} from "../contracts/MegaScore.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {MockERC20} from "./mocks/MockERC20.sol";

contract MegaScoreTest is Test {
    MegaScore megaScore;

    uint256 constant MINT_PRICE = 0.1 ether;
    uint256 constant UPDATE_PRICE = 0.05 ether;
    uint256 constant TEST_SCORE = 1000;
    string constant TEST_IMAGE_URI = "ipfs://QmTest123";

    address owner;
    uint256 ownerPrivateKey;
    address recipient;
    address user1;
    address user2;
    IERC20 paymentToken;

    event MegaScoreUpdated(address indexed owner, uint256 score, uint256 timestamp);
    event MegaScoreMinted(address indexed by, uint256 tokenId);

    function setUp() public {
        (owner, ownerPrivateKey) = makeAddrAndKey("owner");
        user1 = makeAddr("user1");
        user2 = makeAddr("user2");
        recipient = makeAddr("recipient");

        // Deploy MockERC20 token
        MockERC20 token = new MockERC20("Test Token", "TEST", 1000000e18);
        paymentToken = IERC20(address(token));

        vm.prank(owner);
        megaScore = new MegaScore(MINT_PRICE, UPDATE_PRICE, recipient, address(paymentToken));

        // Fund users with ETH for transactions
        vm.deal(user1, 10 ether);
        vm.deal(user2, 10 ether);

        // Fund users with test tokens
        token.mint(user1, 100e18);
        token.mint(user2, 100e18);

        // Approve MegaScore contract to spend tokens
        vm.prank(user1);
        paymentToken.approve(address(megaScore), type(uint256).max);
        vm.prank(user2);
        paymentToken.approve(address(megaScore), type(uint256).max);
    }

    // --- Recipient/Payment Tests ---
    function test_InitialRecipientIsRecipient() public {
        assertEq(megaScore.recipient(), recipient);
    }

    function test_SetRecipientUpdatesRecipient() public {
        vm.prank(owner);
        megaScore.setRecipient(user2);
        assertEq(megaScore.recipient(), user2);
    }

    function test_MintPaymentGoesToRecipient() public {
        vm.prank(owner);
        megaScore.setRecipient(user2);

        uint256 beforeBalance = paymentToken.balanceOf(user2);

        MegaScore.Score memory score = MegaScore.Score({score: TEST_SCORE, timestamp: block.timestamp});
        bytes32 messageHash = megaScore.getMessageHash(score, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(score, TEST_IMAGE_URI, v, r, s);

        uint256 afterBalance = paymentToken.balanceOf(user2);
        assertEq(afterBalance - beforeBalance, MINT_PRICE);
    }

    // --- Deployment Tests ---
    function test_DeploymentCorrectly() public {
        assertEq(megaScore.name(), "MegaScore SBT");
        assertEq(megaScore.symbol(), "MGS");
        assertEq(megaScore.owner(), owner);
    }

    // --- Minting Tests ---
    function test_MintWithValidSignatureAndPayment() public {
        MegaScore.Score memory score = MegaScore.Score({score: TEST_SCORE, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(score, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectEmit(true, true, false, false);
        emit MegaScoreMinted(user1, 1);

        vm.prank(user1);
        megaScore.mint(score, TEST_IMAGE_URI, v, r, s);

        assertEq(megaScore.getTokenIdByAddress(user1), 1);
    }

    function test_MintFailsIfAlreadyMinted() public {
        MegaScore.Score memory score = MegaScore.Score({score: TEST_SCORE, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(score, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        // First mint
        vm.prank(user1);
        megaScore.mint(score, TEST_IMAGE_URI, v, r, s);

        // Try to mint again
        vm.expectRevert(abi.encodeWithSelector(MegaScore.MegaScore__AlreadyMinted.selector, user1, address(0)));
        vm.prank(user1);
        megaScore.mint(score, TEST_IMAGE_URI, v, r, s);
    }

    function test_MintFailsWithInsufficientPayment() public {
        address poorUser = makeAddr("poorUser");
        vm.deal(poorUser, 1 ether);

        // Fund poor user with only 0.05 tokens (less than MINT_PRICE of 0.1)
        MockERC20 token = MockERC20(address(paymentToken));
        token.mint(poorUser, 0.05e18);

        vm.prank(poorUser);
        paymentToken.approve(address(megaScore), type(uint256).max);

        MegaScore.Score memory score = MegaScore.Score({score: TEST_SCORE, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(score, poorUser);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectRevert(MegaScore.MegaScore__InsufficientPaymentAmount.selector);
        vm.prank(poorUser);
        megaScore.mint(score, TEST_IMAGE_URI, v, r, s);
    }

    function test_MintFailsWithInvalidSignature() public {
        MegaScore.Score memory score = MegaScore.Score({score: TEST_SCORE, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(score, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(0x2, messageHash); // Wrong signer

        vm.expectRevert(MegaScore.MegaScore__MustBeSignedByOwner.selector);
        vm.prank(user1);
        megaScore.mint(score, TEST_IMAGE_URI, v, r, s);
    }

    function test_MintFailsWithEmptyImageUri() public {
        MegaScore.Score memory score = MegaScore.Score({score: TEST_SCORE, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(score, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectRevert(MegaScore.MegaScore__EmptyImageUri.selector);
        vm.prank(user1);
        megaScore.mint(score, "", v, r, s);
    }

    function test_MintFailsWithInvalidScore() public {
        // Score of 0 is invalid
        MegaScore.Score memory score = MegaScore.Score({score: 0, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(score, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectRevert(abi.encodeWithSelector(MegaScore.MegaScore__InvalidScore.selector, 0));
        vm.prank(user1);
        megaScore.mint(score, TEST_IMAGE_URI, v, r, s);
    }

    function test_MintWithERC20Payment() public {
        MegaScore.Score memory score = MegaScore.Score({score: TEST_SCORE, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(score, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        uint256 mintPriceInTokens = MINT_PRICE; // Assuming 1:1 ratio for testing
        uint256 beforeRecipientBalance = paymentToken.balanceOf(recipient);

        // Approve contract to spend tokens
        vm.prank(user1);
        paymentToken.approve(address(megaScore), mintPriceInTokens);

        vm.expectEmit(true, true, false, false);
        emit MegaScoreMinted(user1, 1);

        vm.prank(user1);
        megaScore.mint(score, TEST_IMAGE_URI, v, r, s);

        uint256 afterRecipientBalance = paymentToken.balanceOf(recipient);
        assertEq(megaScore.getTokenIdByAddress(user1), 1);
        assertEq(afterRecipientBalance - beforeRecipientBalance, mintPriceInTokens);
    }

    // --- Update Score Tests ---
    function test_UpdateScoreWithHigherValue() public {
        // First mint
        MegaScore.Score memory initialScore = MegaScore.Score({score: TEST_SCORE, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(initialScore, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(initialScore, TEST_IMAGE_URI, v, r, s);

        // Update with higher score
        MegaScore.Score memory newScore = MegaScore.Score({score: 2000, timestamp: block.timestamp});

        messageHash = megaScore.getMessageHash(newScore, user1);
        (v, r, s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectEmit(true, false, false, true);
        emit MegaScoreUpdated(user1, 2000, block.timestamp);

        vm.prank(user1);
        megaScore.updateScore(newScore, v, r, s);

        MegaScore.Score memory retrievedScore = megaScore.getScoreByAddress(user1);
        assertEq(retrievedScore.score, 2000);
    }

    function test_UpdateFailsIfNotMinted() public {
        MegaScore.Score memory score = MegaScore.Score({score: 2000, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(score, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectRevert(abi.encodeWithSelector(MegaScore.MegaScore__NoSBTMintedYet.selector, user1, address(0)));
        vm.prank(user1);
        megaScore.updateScore(score, v, r, s);
    }

    function test_UpdateFailsWithSameScore() public {
        // First mint
        MegaScore.Score memory score = MegaScore.Score({score: TEST_SCORE, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(score, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(score, TEST_IMAGE_URI, v, r, s);

        // Try to update with same score
        messageHash = megaScore.getMessageHash(score, user1);
        (v, r, s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectRevert(abi.encodeWithSelector(MegaScore.MegaScore__LessOrSameScore.selector, TEST_SCORE, TEST_SCORE));
        vm.prank(user1);
        megaScore.updateScore(score, v, r, s);
    }

    function test_UpdateFailsWithLowerScore() public {
        // First mint
        MegaScore.Score memory score = MegaScore.Score({score: TEST_SCORE, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(score, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(score, TEST_IMAGE_URI, v, r, s);

        // Try to update with lower score
        MegaScore.Score memory lowerScore = MegaScore.Score({score: 500, timestamp: block.timestamp});

        messageHash = megaScore.getMessageHash(lowerScore, user1);
        (v, r, s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectRevert(abi.encodeWithSelector(MegaScore.MegaScore__LessOrSameScore.selector, TEST_SCORE, 500));
        vm.prank(user1);
        megaScore.updateScore(lowerScore, v, r, s);
    }

    function test_UpdateFailsWithInsufficientPayment() public {
        // Create a poor user who can mint but not update
        address poorUser = makeAddr("poorUser2");
        vm.deal(poorUser, 1 ether);

        // Fund poor user with only 0.12 tokens (enough to mint at 0.1, but not enough to both mint and update)
        MockERC20 token = MockERC20(address(paymentToken));
        token.mint(poorUser, 0.12e18);

        vm.prank(poorUser);
        paymentToken.approve(address(megaScore), type(uint256).max);

        // First mint
        MegaScore.Score memory score = MegaScore.Score({score: TEST_SCORE, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(score, poorUser);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(poorUser);
        megaScore.mint(score, TEST_IMAGE_URI, v, r, s);

        // Try update with insufficient payment (would need 0.05 but only has ~0.02 left)
        MegaScore.Score memory newScore = MegaScore.Score({score: 2000, timestamp: block.timestamp});

        messageHash = megaScore.getMessageHash(newScore, poorUser);
        (v, r, s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectRevert(MegaScore.MegaScore__InsufficientPaymentAmount.selector);
        vm.prank(poorUser);
        megaScore.updateScore(newScore, v, r, s);
    }

    // --- Soul Bound Token Tests ---
    function test_PreventTransfer() public {
        // Mint first
        MegaScore.Score memory score = MegaScore.Score({score: TEST_SCORE, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(score, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(score, TEST_IMAGE_URI, v, r, s);

        // Try to transfer
        vm.expectRevert(MegaScore.MegaScore__SoulBoundToken.selector);
        vm.prank(user1);
        megaScore.transferFrom(user1, user2, 1);
    }

    function test_PreventSafeTransfer() public {
        // Mint first
        MegaScore.Score memory score = MegaScore.Score({score: TEST_SCORE, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(score, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(score, TEST_IMAGE_URI, v, r, s);

        // Try safe transfer
        vm.expectRevert(MegaScore.MegaScore__SoulBoundToken.selector);
        vm.prank(user1);
        megaScore.safeTransferFrom(user1, user2, 1);
    }

    // --- Query Tests ---
    function test_GetScoreByAddress() public {
        // Mint
        MegaScore.Score memory score = MegaScore.Score({score: TEST_SCORE, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(score, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(score, TEST_IMAGE_URI, v, r, s);

        // Query
        MegaScore.Score memory retrievedScore = megaScore.getScoreByAddress(user1);
        assertEq(retrievedScore.score, TEST_SCORE);
    }

    function test_GetTokenIdByAddress() public {
        // Mint
        MegaScore.Score memory score = MegaScore.Score({score: TEST_SCORE, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(score, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(score, TEST_IMAGE_URI, v, r, s);

        // Query
        uint256 tokenId = megaScore.getTokenIdByAddress(user1);
        assertEq(tokenId, 1);
    }

    function test_TokenURI() public {
        // Mint
        MegaScore.Score memory score = MegaScore.Score({score: TEST_SCORE, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(score, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(score, TEST_IMAGE_URI, v, r, s);

        // Get URI
        string memory tokenURI = megaScore.tokenURI(1);
        assertTrue(bytes(tokenURI).length > 0);
    }

    // --- Payment Tests ---
    function test_ReceiveMintPayment() public {
        uint256 initialBalance = paymentToken.balanceOf(recipient);

        MegaScore.Score memory score = MegaScore.Score({score: TEST_SCORE, timestamp: block.timestamp});

        bytes32 messageHash = megaScore.getMessageHash(score, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(score, TEST_IMAGE_URI, v, r, s);

        uint256 finalBalance = paymentToken.balanceOf(recipient);
        assertEq(finalBalance - initialBalance, MINT_PRICE);
    }

    // --- Multiple Users Tests ---
    function test_MultipleUsersWithSeparateTokens() public {
        MegaScore.Score memory score1 = MegaScore.Score({score: 1000, timestamp: block.timestamp});

        MegaScore.Score memory score2 = MegaScore.Score({score: 2000, timestamp: block.timestamp});

        // User 1 mints
        bytes32 messageHash = megaScore.getMessageHash(score1, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(score1, TEST_IMAGE_URI, v, r, s);

        // User 2 mints
        messageHash = megaScore.getMessageHash(score2, user2);
        (v, r, s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user2);
        megaScore.mint(score2, TEST_IMAGE_URI, v, r, s);

        // Verify
        MegaScore.Score memory user1Score = megaScore.getScoreByAddress(user1);
        MegaScore.Score memory user2Score = megaScore.getScoreByAddress(user2);

        assertEq(user1Score.score, 1000);
        assertEq(user2Score.score, 2000);
        assertEq(megaScore.getTokenIdByAddress(user1), 1);
        assertEq(megaScore.getTokenIdByAddress(user2), 2);
    }
}
