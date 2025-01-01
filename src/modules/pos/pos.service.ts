import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { GenerateAccountNumber } from './dto/pos.dto';
import { AxiosError } from 'axios';
@Injectable()
export class PosService {
  constructor() {}

  async getBusinesses() {
    // TODO: Fetch Businesses from business backend
    let businesses = [];

    for (let i = 0; i < 20; i++) {
      businesses.push({
        id: faker.string.uuid(),
        name: faker.company.name(),
        ownersName: faker.person.fullName(),
        dateRegistered: faker.date.anytime(),
        terminals: faker.number.int({ min: 1, max: 30 }),
        kybStatus: true,
      });
    }

    return businesses;
  }

  async getBusinessById(id: string) {
    // TODO: Fetch business data from busiess backend

    const business = {
      id: faker.string.uuid(),
      name: faker.company.name(),
      ownersName: faker.person.fullName(),
      dateRegistered: faker.date.anytime(),
      terminals: faker.number.int({ min: 1, max: 30 }),
      kybStatus: true,
      CustomerId: faker.string.alphanumeric(8),
      BVN: faker.string.numeric(11),

      // TODO: Tell frontend to map gender to enum of 1 and 0
      Gender: faker.person.sex(),
      FirstName: faker.person.firstName(),
      LastName: faker.person.lastName(),
      OtherNames: faker.person.middleName(),
      PlaceOfBirth: faker.location.city(),
      DateOfBirth: faker.date.anytime(),
      PhoneNo: faker.phone.number(),
      Address: faker.location.streetAddress(),
      Email: faker.internet.email(),
    };

    return business;
  }

  async getBusinessTerminals() {}

  async getBusinessAccountNumbers(customerId: string) {}

  async getBusinessTransactions(customerId: string) {}

  async getBusinessTransactionsByAccount(accountNumber: string) {}

  async generateBusinessAccountNumber(payload: GenerateAccountNumber) {
    try {
      return '00119281721';
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async assignTerminalToBusiness() {}

  async assignBusinessAccountNumberToTerminal() {}

  async deactivateTerminal() {}

  async getTerminalTransactions() {}
}
