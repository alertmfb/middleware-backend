import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
@Injectable()
export class PosService {
  constructor() {}

  async getBusinesses() {
    let businesses = [];

    for (let i = 0; i < 20; i++) {
      businesses.push({
        name: faker.company.name(),
        ownersName: faker.person.fullName(),
        dateRegistered: faker.date.anytime(),
        terminals: faker.number.int({ min: 1, max: 30 }),
        kybStatus: true,
      });
    }

    return businesses;
  }

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
