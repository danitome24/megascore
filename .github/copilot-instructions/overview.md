# MegaScore Codebase Guide: Overview

This document provides a high-level summary of the MegaScore project, its tech stack, and the main architectural principles. For detailed context, see the other files in this directory.

## Project Overview

**MegaScore** is a Web3 reputation system for the MegaETH testnet. It calculates on-chain reputation scores (0-1000+) based on user wallet activity (transactions, contracts deployed, NFTs minted) and surfaces them through a Next.js dashboard with wallet connection, leaderboards, and NFT minting mechanics.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, TailwindCSS, Wagmi v2 (Web3), Viem, React Hook Form, TanStack Query, ConnectKit, Radix UI.
