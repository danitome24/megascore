import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format wallet address to shortened version (0x1234...abcd)
 */
export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Extract image URL from base64-encoded JSON metadata
 * Handles URIs like: https://gateway.com/ipfs/data:application/json;base64,...
 * @param tokenUri - The token URI that may contain base64-encoded JSON metadata
 * @returns The extracted image URL or the original URI if it's already a direct URL
 */
export function extractImageFromTokenUri(tokenUri: string): string | null {
  try {
    // Check if it's a data URI with base64-encoded JSON
    if (tokenUri.includes("data:application/json;base64,")) {
      const base64Part = tokenUri.split("data:application/json;base64,")[1];
      if (base64Part) {
        const decodedJson = Buffer.from(base64Part, "base64").toString("utf-8");
        const metadata = JSON.parse(decodedJson);
        return metadata.image || null;
      }
    }
    // Return as-is if it's a direct URL
    return tokenUri;
  } catch (error) {
    console.error("Error parsing token URI:", error);
    return tokenUri; // Fallback to original URI
  }
}
