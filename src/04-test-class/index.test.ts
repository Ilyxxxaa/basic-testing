// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

const initialBalance = 100;
const fetchedBalance = 10;
let bankAccount: BankAccount;

describe('BankAccount', () => {
  beforeEach(() => {
    bankAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(initialBalance + 10)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const accountToTransfer = getBankAccount(initialBalance);
    expect(() =>
      bankAccount.transfer(bankAccount.getBalance() + 10, accountToTransfer),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      bankAccount.transfer(bankAccount.getBalance() - 1, bankAccount),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const balance: number = bankAccount.getBalance();
    const deposit = 2000;

    expect(bankAccount.deposit(deposit).getBalance()).toBe(balance + deposit);
  });

  test('should withdraw money', () => {
    const balance: number = bankAccount.getBalance();
    const withdraw = 10;

    expect(bankAccount.withdraw(withdraw).getBalance()).toBe(
      balance - withdraw,
    );
  });

  test('should transfer money', () => {
    const accountToTransfer = getBankAccount(initialBalance);
    const balance: number = bankAccount.getBalance();
    const accountToTransferBalance: number = accountToTransfer.getBalance();
    const transferAmount = 50;

    expect(
      bankAccount.transfer(transferAmount, accountToTransfer).getBalance(),
    ).toBe(balance - transferAmount);
    expect(accountToTransfer.getBalance()).toBe(
      accountToTransferBalance + transferAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(fetchedBalance)
      .mockReturnValueOnce(1);
    const result = await bankAccount.fetchBalance();
    expect(result).toBe(fetchedBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockResolvedValueOnce(fetchedBalance);

    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(fetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
