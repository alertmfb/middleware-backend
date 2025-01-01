import { Injectable } from '@nestjs/common';

@Injectable()
export class PosService {
  async getBusinesses() {}

  async generateAccountNumber() {}

  async assignAccountNumberToTerminal() {}

  async assignTerminalToBusiness() {}

  async deactivateTerminal() {}

  async getBusinessTerminals() {}

  async getBusinessTransactions() {}

  async getTerminalTransactions() {}
}
