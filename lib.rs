use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
    system_program,
};

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let payer = next_account_info(accounts_iter)?;
    let recipient = next_account_info(accounts_iter)?;

    msg!("Processing donation from payer: {}", payer.key);

    // Solana native transfer
    solana_program::program::invoke(
        &solana_program::system_instruction::transfer(
            payer.key,
            recipient.key,
            1_000_000_000, // Example: 1 SOL
        ),
        &[payer.clone(), recipient.clone()],
    )?;

    msg!("Transfer successful.");
    Ok(())
}
