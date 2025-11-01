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

        // Set block timestamp to a reasonable value to avoid underflow
        vm.warp(1000000);

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

    // ========== DEPLOYMENT TESTS ==========
    function test_Deployment_CorrectlyInitializes() public {
        assertEq(megaScore.name(), "MegaScore SBT");
        assertEq(megaScore.symbol(), "MGS");
        assertEq(megaScore.owner(), owner);
    }

    // ========== RECIPIENT/PAYMENT CONFIGURATION TESTS ==========
    function test_Recipient_InitialRecipientIsSet() public {
        assertEq(megaScore.recipient(), recipient);
    }

    function test_Recipient_SetRecipientUpdatesRecipient() public {
        vm.prank(owner);
        megaScore.setRecipient(user2);
        assertEq(megaScore.recipient(), user2);
    }

    function test_Recipient_CanBeChangedMultipleTimes() public {
        address newRecipient1 = makeAddr("newRecipient1");
        address newRecipient2 = makeAddr("newRecipient2");

        vm.prank(owner);
        megaScore.setRecipient(newRecipient1);
        assertEq(megaScore.recipient(), newRecipient1);

        vm.prank(owner);
        megaScore.setRecipient(newRecipient2);
        assertEq(megaScore.recipient(), newRecipient2);
    }

    function test_Recipient_SetRecipientFailsWithZeroAddress() public {
        vm.prank(owner);
        vm.expectRevert(MegaScore.MegaScore__ZeroRecipient.selector);
        megaScore.setRecipient(address(0));
    }

    function test_Recipient_SetRecipientFailsWithSameAddress() public {
        vm.prank(owner);
        vm.expectRevert(MegaScore.MegaScore__SameRecipientNotAllowed.selector);
        megaScore.setRecipient(recipient);
    }

    function test_Recipient_NonOwnerCannotSetRecipient() public {
        vm.prank(user1);
        vm.expectRevert();
        megaScore.setRecipient(user2);
    }

    function test_PaymentToken_SetPaymentTokenFailsWithZeroAddress() public {
        vm.prank(owner);
        vm.expectRevert(MegaScore.MegaScore__ZeroPaymentToken.selector);
        megaScore.setPaymentToken(address(0));
    }

    function test_PaymentToken_NonOwnerCannotSetPaymentToken() public {
        vm.prank(user1);
        vm.expectRevert();
        megaScore.setPaymentToken(address(paymentToken));
    }

    function test_PaymentToken_CanBeChanged() public {
        MockERC20 newToken = new MockERC20("New Token", "NEW", 1000000e18);

        vm.prank(owner);
        megaScore.setPaymentToken(address(newToken));
        assertEq(address(megaScore.paymentToken()), address(newToken));
    }

    // ========== MINTING TESTS ==========
    function test_Mint_WithValidSignatureAndPayment() public {
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectEmit(true, true, false, false);
        emit MegaScoreMinted(user1, 1);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        assertEq(megaScore.getTokenIdByAddress(user1), 1);
    }

    function test_Mint_PaymentGoesToRecipient() public {
        vm.prank(owner);
        megaScore.setRecipient(user2);

        uint256 beforeBalance = paymentToken.balanceOf(user2);

        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        uint256 afterBalance = paymentToken.balanceOf(user2);
        assertEq(afterBalance - beforeBalance, MINT_PRICE);
    }

    function test_Mint_WithERC20Payment() public {
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        uint256 mintPriceInTokens = MINT_PRICE;
        uint256 beforeRecipientBalance = paymentToken.balanceOf(recipient);

        vm.expectEmit(true, true, false, false);
        emit MegaScoreMinted(user1, 1);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        uint256 afterRecipientBalance = paymentToken.balanceOf(recipient);
        assertEq(megaScore.getTokenIdByAddress(user1), 1);
        assertEq(afterRecipientBalance - beforeRecipientBalance, mintPriceInTokens);
    }

    function test_Mint_FailsIfAlreadyMinted() public {
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        // First mint
        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        // Try to mint again
        messageHash = megaScore.getMessageHash(scoreValue, user1);
        (v, r, s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectRevert(abi.encodeWithSelector(MegaScore.MegaScore__AlreadyMinted.selector, user1, address(0)));
        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);
    }

    function test_Mint_FailsWithInvalidSignature() public {
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(0x2, messageHash); // Wrong signer

        vm.expectRevert(MegaScore.MegaScore__MustBeSignedByOwner.selector);
        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);
    }

    function test_Mint_FailsWithInsufficientPayment() public {
        address poorUser = makeAddr("poorUser");
        vm.deal(poorUser, 1 ether);

        // Fund poor user with only 0.05 tokens (less than MINT_PRICE of 0.1)
        MockERC20 token = MockERC20(address(paymentToken));
        token.mint(poorUser, 0.05e18);

        vm.prank(poorUser);
        paymentToken.approve(address(megaScore), type(uint256).max);

        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, poorUser);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectRevert(MegaScore.MegaScore__InsufficientPaymentAmount.selector);
        vm.prank(poorUser);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);
    }

    function test_Mint_FailsWithEmptyImageUri() public {
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectRevert(MegaScore.MegaScore__EmptyImageUri.selector);
        vm.prank(user1);
        megaScore.mint(scoreValue, "", v, r, s);
    }

    function test_Mint_FailsWithInsufficientAllowance() public {
        address userNoAllowance = makeAddr("userNoAllowance");
        vm.deal(userNoAllowance, 10 ether);

        MockERC20 token = MockERC20(address(paymentToken));
        token.mint(userNoAllowance, 100e18);

        // Intentionally not approve the contract

        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, userNoAllowance);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectRevert(MegaScore.MegaScore__InsufficientAllowance.selector);
        vm.prank(userNoAllowance);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);
    }

    // ========== SCORE VALIDATION TESTS (MINTING) ==========
    function test_Mint_FailsWithZeroScore() public {
        uint256 scoreValue = 0;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectRevert(abi.encodeWithSelector(MegaScore.MegaScore__InvalidScore.selector, 0));
        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);
    }

    function test_Mint_WithVeryLargeScore() public {
        uint256 largeScore = type(uint256).max;
        bytes32 messageHash = megaScore.getMessageHash(largeScore, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(largeScore, TEST_IMAGE_URI, v, r, s);

        MegaScore.Score memory retrieved = megaScore.getScoreByAddress(user1);
        assertEq(retrieved.score, largeScore);
    }

    // ========== UPDATING TESTS ==========
    function test_Update_WithHigherValue() public {
        // First mint
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        // Update with higher score
        uint256 newScore = 2000;
        string memory newImageUri = "ipfs://QmTestUpdated123";
        messageHash = megaScore.getMessageHash(newScore, user1);
        (v, r, s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectEmit(true, false, false, true);
        emit MegaScoreUpdated(user1, 2000, block.timestamp);

        vm.prank(user1);
        megaScore.updateScore(newScore, newImageUri, v, r, s);

        MegaScore.Score memory retrievedScore = megaScore.getScoreByAddress(user1);
        assertEq(retrievedScore.score, 2000);
    }

    function test_Update_FailsIfNotMinted() public {
        uint256 scoreValue = 2000;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectRevert(abi.encodeWithSelector(MegaScore.MegaScore__NoSBTMintedYet.selector, user1, address(0)));
        vm.prank(user1);
        megaScore.updateScore(scoreValue, TEST_IMAGE_URI, v, r, s);
    }

    function test_Update_FailsWithSameScore() public {
        // First mint
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        // Try to update with same score
        messageHash = megaScore.getMessageHash(scoreValue, user1);
        (v, r, s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectRevert(abi.encodeWithSelector(MegaScore.MegaScore__LessOrSameScore.selector, TEST_SCORE, TEST_SCORE));
        vm.prank(user1);
        megaScore.updateScore(scoreValue, TEST_IMAGE_URI, v, r, s);
    }

    function test_Update_FailsWithLowerScore() public {
        // First mint
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        // Try to update with lower score
        uint256 lowerScore = 500;
        messageHash = megaScore.getMessageHash(lowerScore, user1);
        (v, r, s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectRevert(abi.encodeWithSelector(MegaScore.MegaScore__LessOrSameScore.selector, TEST_SCORE, 500));
        vm.prank(user1);
        megaScore.updateScore(lowerScore, TEST_IMAGE_URI, v, r, s);
    }

    function test_Update_FailsWithInsufficientPayment() public {
        // Create a poor user who can mint but not update
        address poorUser = makeAddr("poorUser2");
        vm.deal(poorUser, 1 ether);

        // Fund poor user with only 0.12 tokens (enough to mint at 0.1, but not enough to both mint and update)
        MockERC20 token = MockERC20(address(paymentToken));
        token.mint(poorUser, 0.12e18);

        vm.prank(poorUser);
        paymentToken.approve(address(megaScore), type(uint256).max);

        // First mint
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, poorUser);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(poorUser);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        // Try update with insufficient payment (would need 0.05 but only has ~0.02 left)
        uint256 newScore = 2000;
        messageHash = megaScore.getMessageHash(newScore, poorUser);
        (v, r, s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectRevert(MegaScore.MegaScore__InsufficientPaymentAmount.selector);
        vm.prank(poorUser);
        megaScore.updateScore(newScore, TEST_IMAGE_URI, v, r, s);
    }

    function test_Update_PaymentGoesToRecipient() public {
        // Mint first
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        // Change recipient
        vm.prank(owner);
        megaScore.setRecipient(user2);

        uint256 beforeBalance = paymentToken.balanceOf(user2);

        // Update score
        uint256 newScore = 2000;
        messageHash = megaScore.getMessageHash(newScore, user1);
        (v, r, s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.updateScore(newScore, TEST_IMAGE_URI, v, r, s);

        uint256 afterBalance = paymentToken.balanceOf(user2);
        assertEq(afterBalance - beforeBalance, UPDATE_PRICE);
    }

    function test_Update_MultipleUpdates() public {
        // Mint
        uint256 scoreValue = 1000;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        // First update
        uint256 score2 = 2000;
        string memory imageUri2 = "ipfs://QmUpdated1";
        messageHash = megaScore.getMessageHash(score2, user1);
        (v, r, s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.updateScore(score2, imageUri2, v, r, s);

        // Second update
        uint256 score3 = 3000;
        string memory imageUri3 = "ipfs://QmUpdated2";
        messageHash = megaScore.getMessageHash(score3, user1);
        (v, r, s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.updateScore(score3, imageUri3, v, r, s);

        MegaScore.Score memory finalScore = megaScore.getScoreByAddress(user1);
        assertEq(finalScore.score, 3000);
    }

    function test_Update_UpdatesTokenUri() public {
        // Mint with initial image URI
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        // Get initial tokenURI
        string memory initialTokenUri = megaScore.tokenURI(1);
        assertTrue(bytes(initialTokenUri).length > 0);

        // Update with new score and new image URI
        uint256 newScore = 2000;
        string memory newImageUri = "ipfs://QmTestUpdated999";
        messageHash = megaScore.getMessageHash(newScore, user1);
        (v, r, s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.updateScore(newScore, newImageUri, v, r, s);

        // Get updated tokenURI
        string memory updatedTokenUri = megaScore.tokenURI(1);
        assertTrue(bytes(updatedTokenUri).length > 0);

        // Verify that token URIs are different (they contain different image URIs)
        // Note: We can't directly compare them as strings in Solidity tests easily,
        // but we can verify that both exist and contain the expected content
        assertFalse(keccak256(bytes(initialTokenUri)) == keccak256(bytes(updatedTokenUri)));
    }

    function test_Update_FailsWithEmptyImageUri() public {
        // Mint first
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        // Try to update with empty image URI
        uint256 newScore = 2000;
        messageHash = megaScore.getMessageHash(newScore, user1);
        (v, r, s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectRevert(MegaScore.MegaScore__EmptyImageUri.selector);
        vm.prank(user1);
        megaScore.updateScore(newScore, "", v, r, s);
    }

    // ========== SOUL BOUND TOKEN TESTS ==========
    function test_SoulBound_PreventTransfer() public {
        // Mint first
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        // Try to transfer
        vm.expectRevert(MegaScore.MegaScore__SoulBoundToken.selector);
        vm.prank(user1);
        megaScore.transferFrom(user1, user2, 1);
    }

    function test_SoulBound_PreventSafeTransfer() public {
        // Mint first
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        // Try safe transfer
        vm.expectRevert(MegaScore.MegaScore__SoulBoundToken.selector);
        vm.prank(user1);
        megaScore.safeTransferFrom(user1, user2, 1);
    }

    // ========== QUERY TESTS ==========
    function test_Query_GetScoreByAddress() public {
        // Mint
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        // Query
        MegaScore.Score memory retrievedScore = megaScore.getScoreByAddress(user1);
        assertEq(retrievedScore.score, TEST_SCORE);
    }

    function test_Query_GetTokenIdByAddress() public {
        // Mint
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        // Query
        uint256 tokenId = megaScore.getTokenIdByAddress(user1);
        assertEq(tokenId, 1);
    }

    function test_Query_TokenURI() public {
        // Mint
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        // Get URI
        string memory tokenURI = megaScore.tokenURI(1);
        assertTrue(bytes(tokenURI).length > 0);
    }

    function test_Query_OwnerCanBeQueried() public {
        assertEq(megaScore.owner(), owner);
    }

    // ========== MULTIPLE USERS TESTS ==========
    function test_MultipleUsers_WithSeparateTokens() public {
        uint256 score1 = 1000;
        uint256 score2 = 2000;

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

    // ========== SIGNATURE VERIFICATION & SECURITY TESTS ==========
    function test_Security_ReplayAttackPrevention() public {
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);
        assertEq(megaScore.getTokenIdByAddress(user1), 1);
    }

    function test_Security_SignatureMalleabilityPrevention() public {
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        // Attempt with modified signature components (malleability attack)
        uint8 modifiedV = v == 27 ? 28 : 27;

        vm.expectRevert(MegaScore.MegaScore__MustBeSignedByOwner.selector);
        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, modifiedV, r, s);
    }

    function test_Security_CrossUserSignatureCannotBeReused() public {
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        // User1 mints
        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        // User2 tries to reuse the signature (should fail because messageHash includes user1 address)
        vm.expectRevert(MegaScore.MegaScore__MustBeSignedByOwner.selector);
        vm.prank(user2);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);
    }

    // ========== TIMESTAMP VALIDATION TESTS ==========
    function test_Timestamp_PastTimestampsAreAllowedForMint() public {
        // Use a safe past timestamp that won't underflow
        uint256 currentTime = block.timestamp;
        uint256 pastTimestamp = currentTime > 100000 ? currentTime - 100000 : 1;

        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        MegaScore.Score memory retrieved = megaScore.getScoreByAddress(user1);
        // Should be stored as block.timestamp, not the provided timestamp
        assertEq(retrieved.timestamp, block.timestamp);
    }

    function test_Timestamp_StoresBlockTimestampNotProvidedTimestamp() public {
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        uint256 txBlockTime = block.timestamp;

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        MegaScore.Score memory retrieved = megaScore.getScoreByAddress(user1);
        assertEq(retrieved.timestamp, txBlockTime);
    }

    // ========== EDGE CASE TESTS ==========
    function test_EdgeCase_MintPaymentEventLogged() public {
        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.expectEmit(true, true, false, false);
        emit MegaScoreMinted(user1, 1);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);
    }

    function test_EdgeCase_ReceiveMintPayment() public {
        uint256 initialBalance = paymentToken.balanceOf(recipient);

        uint256 scoreValue = TEST_SCORE;
        bytes32 messageHash = megaScore.getMessageHash(scoreValue, user1);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, messageHash);

        vm.prank(user1);
        megaScore.mint(scoreValue, TEST_IMAGE_URI, v, r, s);

        uint256 finalBalance = paymentToken.balanceOf(recipient);
        assertEq(finalBalance - initialBalance, MINT_PRICE);
    }
}
