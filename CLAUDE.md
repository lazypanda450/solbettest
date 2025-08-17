# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Next.js development server on localhost:3000
- **Build**: `npm run build` - Creates production build
- **Start**: `npm run start` - Starts production server
- **Lint**: `npm run lint` - Runs Next.js ESLint checks

## Project Architecture

This is a **Solana-based casino gaming platform** called "Solbet" built with Next.js, TypeScript, and the Gamba framework.

### Core Technologies
- **Frontend**: Next.js 14, React 18, TypeScript
- **Blockchain**: Solana web3.js, Anchor framework
- **Gaming Framework**: Gamba (v2) - provides casino game infrastructure
- **UI**: Tailwind CSS, Radix UI components, Framer Motion
- **Wallet Integration**: Solana wallet adapters (Phantom, Solflare)
- **State Management**: Zustand

### Key Architecture Components

1. **Gamba Integration**: The platform is built on Gamba v2 framework which handles:
   - Game logic and provably fair gaming
   - Betting mechanics and payout calculations
   - Platform fees and jackpot systems
   - Game state management

2. **Game Structure**: Located in `/src/games/`
   - Each game is a self-contained module with its own component
   - Games are registered in `/src/games/index.tsx` as `GameBundle` objects
   - All games use dynamic imports for code splitting
   - Available games: Dice, Slots, Flip, HiLo, Mines, Roulette, Plinko, Limbo, Keno

3. **Configuration**: `/config.ts` contains:
   - Platform settings (creator address, fees, social links)
   - Supported token definitions (SOL, USDC, GUAC, JUP)
   - Base wager amounts per token
   - Platform explorer URLs

4. **Solana Program**: `/program/src/lib.rs` 
   - Rust-based Anchor program for SOL staking functionality
   - Handles stake/unstake operations with reward distribution
   - 100-day staking period with 800 tokens per SOL per day reward rate

5. **Component Structure**:
   - `/src/components/game/` - Game-related UI components
   - `/src/components/platform/` - Platform-wide components (recent plays, leaderboards)
   - `/src/components/ui/` - Reusable UI components (Radix-based)

### Environment Setup
- Requires `.env` file (copy from `.env.example`)
- Uses Solana RPC endpoint (defaults to mainnet-beta)
- Supports custom RPC via `NEXT_PUBLIC_RPC_ENDPOINT`

### Development Notes
- Games use the Gamba React hooks for betting, game state, and wallet interactions
- Audio files for each game are stored in `/public/games/[gameId]/`
- Game metadata (backgrounds, descriptions) defined in game bundle configurations
- Platform uses dark theme by default with theme switching capability
- Responsive design with mobile-friendly navigation (SideNav component)