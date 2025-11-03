"use server";

import { Account } from "@/lib/domain/account/types";
import { createAccount as dbCreateAccount } from "@/lib/external/supabase/account";
import { isAddress } from "viem";

interface CreateAccountResult {
  success: boolean;
  account?: Account;
  error?: string;
}

/**
 * Server Action: Create a new account
 *
 * Validates wallet address and creates account in database.
 * This replaces the POST /api/account endpoint with better security.
 *
 * @param walletAddress - Ethereum wallet address (0x...)
 * @param txHash - Optional transaction hash for verification
 * @returns Result with account data or error message
 */
export async function createAccountAction(walletAddress: string, txHash: string): Promise<CreateAccountResult> {
  try {
    // Validation: Check if address provided
    if (!isAddress(walletAddress)) {
      return {
        success: false,
        error: "walletAddress is required",
      };
    }

    // Validation: Check transaction hash format if provided
    if (!txHash) {
      return {
        success: false,
        error: "txHash is required",
      };
    }

    // Create account in database
    const account = await dbCreateAccount(walletAddress, txHash);

    if (!account) {
      return {
        success: false,
        error: "Failed to create account in database",
      };
    }

    return {
      success: true,
      account,
    };
  } catch (error) {
    console.error("Error creating account:", error);

    // Check for specific database errors
    if (error instanceof Error) {
      if (error.message.includes("duplicate") || error.message.includes("unique")) {
        return {
          success: false,
          error: "Account already exists for this wallet address",
        };
      }
    }

    return {
      success: false,
      error: "Internal server error",
    };
  }
}
