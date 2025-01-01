import { Injectable } from '@nestjs/common';

@Injectable()
export class PosService {
  constructor() {}

  async getBusinesses() {}

  async getBusinessTerminals() {}

  async getBusinessAccountNumbers(customerId: string) {}

  async getBusinessTransactions(customerId: string) {}

  async getBusinessTransactionsByAccount(accountNumber: string) {}

  async generateBusinessAccountNumber(customerId: string) {}

  async assignTerminalToBusiness() {}

  async assignBusinessAccountNumberToTerminal() {}

  async deactivateTerminal() {}

  async getTerminalTransactions() {}
}
