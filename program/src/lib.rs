use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
use anchor_lang::solana_program::system_instruction;
use anchor_lang::solana_program::program::invoke;

declare_id!("5kP2Xzwtu6tavCubsRcPtrXkuZTNVGcAhd5JSyPhJUVp");

#[program]
pub mod sol_staking_vault {
    use super::*;

    const MIN_STAKE_AMOUNT_LAMPORTS: u64 = 100_000_000; // 0.1 SOL
    const MAX_STAKE_AMOUNT_LAMPORTS: u64 = 100_000_000_000; // 100 SOL
    const SECONDS_PER_DAY: i64 = 86_400;
    const REWARD_RATE: u64 = 800; // 800 tokens per SOL per day
    const REWARD_PERIOD_DAYS: i64 = 100;

    pub fn initialize_vault(ctx: Context<InitializeVault>, reward_mint: Pubkey) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        vault.reward_mint = reward_mint;
        Ok(())
    }

    pub fn stake_sol(ctx: Context<StakeSol>, amount: u64) -> Result<()> {
        require!(
            amount >= MIN_STAKE_AMOUNT_LAMPORTS && amount <= MAX_STAKE_AMOUNT_LAMPORTS,
            ErrorCode::InvalidStakeAmount
        );

        // Correctly transfer SOL from the staker to the vault
        let ix = system_instruction::transfer(
            &ctx.accounts.staker.key(),
            &ctx.accounts.vault.to_account_info().key(),
            amount,
        );
        invoke(
            &ix,
            &[
                ctx.accounts.staker.to_account_info(),
                ctx.accounts.vault.to_account_info(),
            ],
        )?;

        let stake_account = &mut ctx.accounts.stake_account;
        stake_account.owner = *ctx.accounts.staker.key;
        stake_account.sol_staked += amount;
        stake_account.start_time = Clock::get()?.unix_timestamp;
        stake_account.last_claim_time = stake_account.start_time;

        Ok(())
    }

    pub fn claim_rewards(ctx: Context<ClaimRewards>) -> Result<()> {
        let stake_account = &mut ctx.accounts.stake_account;
        let current_time = Clock::get()?.unix_timestamp;

        require!(
            &ctx.accounts.staker.key() == &stake_account.owner,
            ErrorCode::Unauthorized
        );

        let staking_period_end = stake_account.start_time + (REWARD_PERIOD_DAYS * SECONDS_PER_DAY);
        let effective_time = current_time.min(staking_period_end);

        let elapsed_time = effective_time - stake_account.last_claim_time;
        let elapsed_days = elapsed_time as u64 / SECONDS_PER_DAY as u64;

        let rewards = (stake_account.sol_staked / 1_000_000_000) * REWARD_RATE * elapsed_days;

        if rewards > 0 {
            let cpi_accounts = Transfer {
                from: ctx.accounts.vault_spl_token_account.to_account_info(),
                to: ctx.accounts.staker_spl_token_account.to_account_info(),
                authority: ctx.accounts.vault_signer.to_account_info(),
            };
            let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);
            token::transfer(cpi_ctx, rewards)?;

            stake_account.last_claim_time = effective_time;
        }

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(reward_mint: Pubkey)]
pub struct InitializeVault<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 1,
    )]
    pub vault: Account<'info, Vault>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct StakeSol<'info> {
    #[account(mut)]
    pub vault: Account<'info, Vault>,
    #[account(
        init,
        payer = staker,
        space = 8 + 32 + 8 + 8 + 8,
    )]
    pub stake_account: Account<'info, StakeAccount>,
    #[account(mut)]
    pub staker: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClaimRewards<'info> {
    #[account(mut)]
    pub vault: Account<'info, Vault>,
    pub vault_signer: AccountInfo<'info>,
    #[account(mut)]
    pub vault_spl_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub stake_account: Account<'info, StakeAccount>,
    pub staker: Signer<'info>,
    #[account(mut)]
    pub staker_spl_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct Vault {
    pub reward_mint: Pubkey,
}

#[account]
pub struct StakeAccount {
    pub owner: Pubkey,
    pub sol_staked: u64,
    pub start_time: i64,
    pub last_claim_time: i64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("The amount of SOL staked is not within the allowed range.")]
    InvalidStakeAmount,
    #[msg("Only the owner of the stake account can claim rewards.")]
    Unauthorized,
}