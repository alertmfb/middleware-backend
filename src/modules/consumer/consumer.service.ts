import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Injectable()
export class ConsumerService {
  async getCustomers() {
    // TODO: Fetch Businesses from business backend
    let customers = [];

    for (let i = 0; i < 20; i++) {
      customers.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        lastActive: faker.date.anytime(),
        dateRegistered: faker.date.anytime(),
        kycStatus: true,
      });
    }

    return customers;
  }

  async getCustomerById(id: string) {
    const customer = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      lastActive: faker.date.anytime(),
      dateRegistered: faker.date.anytime(),
      kycStatus: true,
      country: faker.location.county(),
      postCode: faker.location.zipCode(),
      state: faker.location.state(),
      city: faker.location.city(),
      customerId: faker.string.numeric(6),
      accountNumber: faker.finance.accountNumber(10),
    };

    return customer;
  }
}
