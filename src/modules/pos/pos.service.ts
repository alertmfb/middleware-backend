import { Injectable } from '@nestjs/common';

@Injectable()
export class PosService {
  async getBusinesses() {}

  async getBusinessTerminals() {}

  async getBusinessAccountNumbers() {}

  async getBusinessTransactions() {}

  async generateBusinessAccountNumber() {}

  async assignTerminalToBusiness() {}

  async assignBusinessAccountNumberToTerminal() {}

  async deactivateTerminal() {}

  async getTerminalTransactions() {}
}
